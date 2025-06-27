import express from 'express';
import {FileUploadHandle,FindMatchingResponse} from '../controllers/fileControllers.js';
import { uploadFile } from '../multerconfig.js';
export const Router = express.Router();


Router.post("/upload-pdf",uploadFile.single("file"),FileUploadHandle)
.post("/ask-pdf",FindMatchingResponse)