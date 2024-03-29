import { getDb } from './';

class CatalogRepository {
  static async saveImage(payload: object) {
    const db = getDb();
    try {
      return await db.images.insertOne(payload);
    } catch (error) {
      throw error;
    }
  }
}
export { CatalogRepository };
