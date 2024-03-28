import express, {
  Request,
  Response,
} from 'express';

import { CatalogController } from '../../controller';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send({ hai: 'hello' });
});
router.post('/image', CatalogController.uploadImageHandler, CatalogController.SaveImage);

export { router as CatalogRoutes };
