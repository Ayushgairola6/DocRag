import express from 'express';
import dotenv from 'dotenv';
import { Router } from './routers/filerouter.js';
dotenv.config();
const app = express();
import cors from 'cors';


app.use(cors({
    origin:"*"
}))
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/",Router)



app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server has started on port ${process.env.PORT}`);
});