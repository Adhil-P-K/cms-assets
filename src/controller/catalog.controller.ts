import { NextFunction, Request, Response } from 'express';

import { fileUpload, isValidFile } from '../middlewares';
import { CatalogService } from '../services';
import { Common, CustomError } from '../utils';

class CatalogController {
  static async uploadImageHandler(req: Request, res: Response, next: NextFunction) {
    const destination = 'sgmb/files/images';
    const upload = fileUpload(destination).array('files', 5);
    return upload(req, res, function (error) {
      if (error) {
        return next(error);
      }
      const { files, query } = req;
      try {
        // Checking if files is defined and not null
        if (files !== undefined && files !== null) {
          // If files is an array, check each file
          if (Array.isArray(files)) {
            console.log('Array');
            const isValid = files.every((file: Express.Multer.File) =>
              isValidFile(file, ['image/jpg', 'image/jpeg', 'image/png'], 10000000),
            );
            if (!isValid) {
              return next(new CustomError(400, Common.translate('entitylogoerror', query?.lang as string)));
            }
          }
          // If files is an object with string keys
          else {
            console.log('Object');
            const fileArrays = Object.values(files); // Extracting arrays of files
            // Flattening the array of arrays into a single array of files
            const allFiles = fileArrays.reduce((acc, val) => acc.concat(val), []);
            const isValid = allFiles.every((file: Express.Multer.File) =>
              isValidFile(file, ['image/jpg', 'image/jpeg', 'image/png'], 10000000),
            );
            if (!isValid) {
              return next(new CustomError(400, Common.translate('entitylogoerror', query?.lang as string)));
            }
          }
        }

        return next();
      } catch (error) {
        return next(error);
      }
    });
  }
  static async SaveImage(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const response = await CatalogService.saveImage(req);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export { CatalogController };
