import { Injectable } from '@nestjs/common';
import { createImageURL } from 'src/common/library/multer-option';

@Injectable()
export default class ImageService {
  public uploadFiles(files: File[]): string[] {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(createImageURL(file));
    }

    return generatedFiles;
  }
}
