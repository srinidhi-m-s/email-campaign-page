import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/connection.js';
import { campaigns } from '$lib/server/db/schema.js'; // You need to define this
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
  const brandId = parseInt(url.searchParams.get('brandId'));
  if (!brandId) return json({ message: 'Brand ID required' }, { status: 400 });

  try {
    const data = await db.select().from(campaigns).where(eq(campaigns.brandId, brandId));
    return json(data);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return json({ message: 'Internal Error' }, { status: 500 });
  }
}

export async function POST({ request }) {
  const body = await request.json();
  try {
    const result = await db.insert(campaigns).values(body).returning();
    return json(result[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
