// Core and Third-Party Libraries
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Utils and Helpers
import { randomString } from '@Utils/function';
import { constants } from '@Utils/constant';


const uploadFiles = (key: string) => {
  let storage;

  storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const destinationDir = path.join(constants.UPLOAD_DIR, key, key);
      const isExists = await fs.existsSync(destinationDir);
      if (isExists === false) {
        await fs.mkdirSync(destinationDir, { recursive: true });
      }

      cb(null, 'uploads/');
    },
    filename: async (req, file, cb) => {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const fileName = `${key}/${Date.now()}${await randomString(8)}${fileExtension}`;
      cb(null, fileName);
    },
  });
  return multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback)
    }
  });
}

const sanitizeFile = async (file: any, cb: any) => {
  const mimeTypeExtension = file.mimetype.split("/")[1].toLowerCase();

  const isAllowedExt = constants.FILE_EXTS.includes(
    mimeTypeExtension === 'svg+xml' ? '.svg' : "." + mimeTypeExtension
  );

  const isAllowedMimeType = constants.ALLOWED_MIME_TYPES.some(mimeType =>
    file.mimetype.toLowerCase().startsWith(mimeType)
  );

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb(new Error("Error: File type not allowed!"));
  }
};


const deleteFile = (filePath: any) => {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("error:::deleteFile::", error);
    }
  }
};

export const uploadFile = {
  uploadFiles,
  deleteFile
}