import fs from 'fs';
import { ObjectId } from 'mongodb';
import slugify from 'slugify';
import { stripHtml } from 'string-strip-html';

import i18next from './i18next';

class Common {
  static mongoSanitize = (param: any) => {
    if (param instanceof Object) {
      for (const key in param) {
        if (/^\$/.test(key)) {
          delete param[key];
        }
      }
    }
    return param;
  };
  static generateSlug = (string: string) => {
    return slugify(string, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: false,
      trim: true,
    });
  };
  static getId = (id: string) => {
    return new ObjectId(id);
  };
  static newId = () => {
    return new ObjectId();
  };
  static translate = (key: string, lang = 'en', options?: any) => {
    return i18next.t(key, { lng: lang, ...options });
  };
  static sanitize(string = '') {
    return stripHtml(string).result;
  }
  static removeFile = (file: { path: string }): void => {
    if (file) {
      fs.unlink(file.path, (error: NodeJS.ErrnoException | null) => {
        if (error) {
          // logger.error('Failed to remove file from disk.', {
          //   reason: error.message,
          // });
        }
      });
    }
  };
}
export { Common };
