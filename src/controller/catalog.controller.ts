import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { uploadRequest } from '../interfaces';
import {
  fileUpload,
  isValidFile,
} from '../middlewares';
import { CatalogService } from '../services';
import {
  Common,
  CustomError,
} from '../utils';

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
        if (files) {
          const isValid = files.every((file: any) => isValidFile(file));
          if (!isValid) {
            return next(new CustomError(400, Common.translate('entitylogoerror', query?.lang as string)));
          }
        }
        return next();
      } catch (error) {
        return next(error);
      }
    });
  }
  static async SaveImage(req: uploadRequest, res: Response, next: NextFunction): Promise<any> {
    try {
      const response = await CatalogService.saveImage(req);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export { CatalogController };
