import { db } from '$lib/server/db';
import { brands } from '$lib/server/db/schema.js';

export async function POST({ request }) {
  try {
    const data = await request.json();
    const formattedData = {
      ...data,
      smtpPort: data.smtpPort ? parseInt(data.smtpPort) : null,
      smtpLimitHourly: data.smtpLimitHourly ? parseInt(data.smtpLimitHourly) : null,
      smtpLimitDaily: data.smtpLimitDaily ? parseInt(data.smtpLimitDaily) : null,
      smtpLimitMonthly: data.smtpLimitMonthly ? parseInt(data.smtpLimitMonthly) : null,
      maxBounce: data.maxBounce ? parseInt(data.maxBounce) : null
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

