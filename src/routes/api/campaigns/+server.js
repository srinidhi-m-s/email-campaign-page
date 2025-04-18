import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/connection.js';
import { campaigns } from '$lib/server/db/schema.js'; // You need to define this
import { and,eq } from 'drizzle-orm';

export async function GET({ url }) {
  const brandId = parseInt(url.searchParams.get('brandId'));
  if (!brandId) return json({ message: 'Brand ID required' }, { status: 400 });

  try {
    const data = await db.select().from(campaigns).where(and(eq(campaigns.brandId, brandId),eq(campaigns.isArchived,false)));
    return json(data);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return json({ message: 'Internal Error' }, { status: 500 });
  }
}

export async function POST({ request }) {
  const body = await request.json();
  const newCampaign = {
    name: body.name,
    fromName: body.fromName,
    fromEmail: body.fromEmail,
    replyToEmail: body.replyToEmail,
    mailContent: body.mailContent,
    brandId: body.brandId,
    totalRecipients: body.totalRecipients || 0,
    totalSent: body.totalSent || 0,
    totalOpened: body.totalOpened || 0,
    totalClicked: body.totalClicked || 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  try {
    const result = await db.insert(campaigns).values(newCampaign).returning();
    return json(result[0], { status: 200 });
  } catch (err) {
    console.error(err);
    return json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
