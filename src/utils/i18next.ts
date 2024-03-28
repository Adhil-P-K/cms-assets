import * as fs from 'fs';
import i18next from 'i18next';
import path from 'path';

const translationOptions = {
  resources: {
    en: JSON.parse(fs.readFileSync(path.join(__dirname, '../../sgmb/files', 'en.json'), 'utf-8')),
    ar: JSON.parse(fs.readFileSync(path.join(__dirname, '../../sgmb/files', 'en.json'), 'utf-8')),
  },
};

i18next.init(translationOptions);
export default i18next;
