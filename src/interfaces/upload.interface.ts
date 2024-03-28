import { Request } from 'express';

export interface uploadRequest extends Request {
  files?: Express.Multer.File[]; // Use Express.Multer.File as the type for uploaded files
}
