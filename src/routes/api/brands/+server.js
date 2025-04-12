import { db } from '$lib/server/db/connection.js';
import { brands } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const data = await request.json();       
    // Format data before inserting
    const formattedData = {
      ...data,
      
    };
    await db.insert(brands).values(formattedData);
    return new Response(JSON.stringify({ message: 'Brand saved successfully' }), {
      status: 201
    });

  } catch (error) {
    console.error('Error inserting data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500
    });
  }
}
export async function GET() {
  try {
    const allBrands = await db.select().from(brands);
    return json(allBrands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500
    });
  }
}


