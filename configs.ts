// config.js
import dotenv from "dotenv";
dotenv.config();

const { PORT, MONGODB_URI, FILE_UPLOAD_PATH } = process.env;

export default {
  PORT: PORT || 3000,
  MONGODB_URI,
  FILE_UPLOAD_PATH,
};
