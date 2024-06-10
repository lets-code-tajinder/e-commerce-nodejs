import { Request, Response } from "express";
import multer from "multer";
import path from "path";

import config from "../configs";

// Set storage engine
const storage = multer.diskStorage({
  destination: String(config.FILE_UPLOAD_PATH),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// Check File Type
function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|webp|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"));
  }
}

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("productImage");

export const uploadImage = (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      if (req.file == undefined) {
        res.status(400).send({ message: "No file selected!" });
      } else {
        res.send({
          message: "File uploaded!",
          filePath: `/images/${req.file.filename}`,
        });
      }
    }
  });
};
