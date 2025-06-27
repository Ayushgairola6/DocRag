import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from 'fs';
import os from 'os';
import path from 'path';
import { GenerateEmbeddings, GenerateResponse } from "./ModelController.js";
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid';

dotenv.config()


const pc = new Pinecone({
    apiKey: process.env.PINECONE_DB_API_KEY
});

const index = pc.index("knowledge-base-index");

export const FileUploadHandle = async (req, res) => {
    try {

        const { category, name, email, feedback } = req.body
        const file = req.file


        if (!category || !name || !email || !feedback || !file) {
            return res.status(400).json({ message: "Some fields are missing !" })
        }

        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        const loader = new PDFLoader(blob, {
            splitPages: false
        });

        const docs = await loader.load();
        if (!docs || !docs[0].pageContent) {
            return res.status(400).json({ message: "Error while uploading the file" })
        }

        // splitting the text into chunks

        const textChunks = await splitTextIntoChunks(docs[0].pageContent)

        if (!textChunks || textChunks.length === 0) {
            return res.status(400).json({ message: "Error while chunking the text data" })
        }
        // random id for the doc
        const documentId = uuidv4();
        const commonMetadata = {
            name, email, category, date: Date.UTC().toString()
        }

        // array to store a unique record array for upsert operation
        const recordsToUpsert = [];
        // the size of one batch that we process
        const batchSize = 100; // Adjust batch size based on your index type and data size

        // loop to start pushing chunks into the db
        for (let i = 0; i < textChunks.length; i++) {
            // Generate a unique ID for each chunk
            // Option 1: documentId-chunkIndex (simple)
            const chunkId = `${documentId}-${i}`;


            // pushing the chunk data in formatted way to store in the db
            recordsToUpsert.push({
                id: chunkId,
                text: textChunks[i],
                metadata: JSON.stringify({
                    ...commonMetadata,
                    document_id: documentId,
                    chunk_index: i
                })
            });

            // If batch is full or it's the last chunk, upsert the batch
            if (recordsToUpsert.length === batchSize || i === textChunks.length - 1) {
                try {
                    await index.upsertRecords(recordsToUpsert); // Pass the array of records
                    // console.log(`Upserted batch of ${recordsToUpsert.length} records.`);
                    recordsToUpsert.length = 0; // Clear the batch array
                } catch (error) {
                    console.error("Error during batch upsert:", error);
                    // Implement more specific error handling if needed
                    return res.status(500).json({ message: "Error during Pinecone upsert operation." });
                }
            }
        }

        // If there are any remaining records after the loop (e.g., if total records not divisible by batchSize)
        if (recordsToUpsert.length > 0) {
            try {
                await index.upsertRecords(recordsToUpsert);
                // console.log(`Upserted final batch of ${recordsToUpsert.length} records.`);
            } catch (error) {
                console.error("Error during final batch upsert:", error);
                return res.status(500).json({ message: "Error during Pinecone upsert operation." });
            }
        }
        return res.json({ message: "Upload successfull", commonMetadata })

    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" })
    }

}

// functin to split text content into chunks
async function splitTextIntoChunks(documentText) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const chunks = await splitter.splitText(documentText);
    return chunks;
}

export const FindMatchingResponse = async (req, res) => {
    try {
        const { question, category } = req.body;
        if (!question || typeof question !== "string" || !category || category === "") {
            return res.status(400).json({ message: "Invalid question type !" })

        }
        const FoundData = [];

        const response = await index.searchRecords({
            query: {
                topK: 2,
                inputs: { text: question },
                 filter: {
                    // Remove the "metadata" nesting level
                    "category": { "$eq": category }
                }
            },
            fields: ['text', 'metadata'],
        });


        response.result.hits.forEach((e) => {
            if (e) {
                FoundData.push(e.fields.text);
            } else {
                console.log("no results found")
            }
        })


        const AnswerToUsersQuestion = await GenerateResponse(question, FoundData);

        if (AnswerToUsersQuestion.error) {
            return res.status(200).json({ answer: "WE currently do not have information regarding this topic" })
        }
        return res.status(200).json({ answer: AnswerToUsersQuestion })


    } catch (error) {
        console.error(error);
    }
}