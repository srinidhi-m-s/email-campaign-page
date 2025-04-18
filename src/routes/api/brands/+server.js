import { db } from '$lib/server/db/connection.js';
import { brands } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const data = await request.json();    
    const newBrand = {
      name: data.name,
      description: data.description,
      fromName: data.fromName,
      fromEmail: data.fromEmail,
      toEmail: data.toEmail,
      smtpProvider: data.smtpProvider,
      smtpRegion: data.smtpRegion,
      smtpAccessKey: data.smtpAccessKey,
      smtpSecretKey: data.smtpSecretKey,
      smtpHost: data.smtpHost,
      smtpPort: data.smtpPort ? parseInt(data.smtpPort) : null,
      smtpSSL: data.smtpSSL,
      smtpUsername: data.smtpUsername,
      smtpPassword: data.smtpPassword,
      smtpType: data.smtpType,
      smtpLimitHourly: data.smtpLimitHourly ? parseInt(data.smtpLimitHourly) : 0,
      smtpLimitDaily: data.smtpLimitDaily ? parseInt(data.smtpLimitDaily) : 0,
      smtpLimitMonthly: data.smtpLimitMonthly ? parseInt(data.smtpLimitMonthly) : 0,
      trackOpening: data.trackOpening,
      trackClicks: data.trackClicks,
      maxBounce: data.maxBounce ? parseInt(data.maxBounce) : 0,
      gdpr: data.gdpr ?? 'no',
      trackLinkClicks: data.trackLinkClicks,
      createdAt: new Date()
    };   
    const formattedData = {
      ...newBrand,
      
    };
    await db.insert(brands).values(formattedData);
    return new Response(JSON.stringify({ message: 'Brand saved successfully' }), {
      status: 200
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


