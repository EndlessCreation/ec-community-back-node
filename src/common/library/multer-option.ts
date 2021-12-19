import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(gif|jpe?g|bmp|png|heic)$/)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('지원하지 않는 이미지 형식입니다.'));
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public';

      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      callback(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
};

export const createImageURL = (file): string => {
  return `/public/${file.filename}`;
};
