import multer from "multer";

const upload = multer.memoryStorage();
export const uploadFile = multer({ storage: upload, limits: { fileSize: 10 * 1024 * 1024 } })