import { Request } from 'express';
import path from 'path';

import { CatalogRepository } from '../repository';

class CatalogService {
  static async saveImage(req: Request): Promise<any> {
    const { files } = req;
    let imageFiles: any[] = [];
    try {
      if (!files) {
        return imageFiles;
      }
      if (Array.isArray(files)) {
        imageFiles = files.map((file: Express.Multer.File) => ({
          name: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          url: path.join('public', file.path).replace(/\\/g, '/'),
          path: file.path.replace(/\\/g, '/'),
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      }
      const imageDoc = await CatalogRepository.saveImage({ payload: imageFiles });
      console.log(imageDoc, imageFiles, 'docs');

      if (!imageDoc) {
        return imageFiles;
      }
      return imageFiles;
    } catch (error) {
      throw error;
    }
  }
}
export { CatalogService };
