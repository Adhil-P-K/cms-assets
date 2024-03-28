import express from 'express';

import { CatalogRoutes } from './catalog.routes';

const router = express.Router();
router.use('/catalog', CatalogRoutes);

export { router as V1Routes };
