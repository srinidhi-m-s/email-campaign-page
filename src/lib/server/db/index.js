import { eq } from 'drizzle-orm';
import { db } from './connection.js'; 
import { brands } from './schema.js'; 

export async function getBrandById(id) {
    console.log('entered index.js');
    const result = await db.select().from(brands).where(eq(brands.id, id)).limit(1);
    return result[0] || null; 
}