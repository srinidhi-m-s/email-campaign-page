import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/connection.js';
import { campaigns } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

// GET /api/campaigns/:id
export async function GET({ params }) {
  const id = parseInt(params.id);
  try {
    const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
    if (!result.length) return json({ error: 'Campaign not found' }, { status: 404 });
    return json(result[0]);
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT({ params, request }) {
    const id = parseInt(params.id);
    console.log("Updating campaign with ID:", id);
  
    let body = {};
    try {
      body = await request.json();
    } catch (err) {
      console.warn('No JSON body provided or invalid JSON:', err);
    }

    if ('isArchived' in body) {
      try {
        const result = await db
          .update(campaigns)
          .set({
            isArchived: body.isArchived,
            updatedAt: new Date()
          })
          .where(eq(campaigns.id, id))
          .returning();
  
        return json({ message: 'Campaign archived successfully', campaign: result[0] }, { status: 200 });
      } catch (err) {
        console.error("Error archiving campaign:", err);
        return json({ error: 'Failed to archive campaign' }, { status: 500 });
      }
    }

    const updatedData = {
      name: body.name,
      fromName: body.fromName,
      fromEmail: body.fromEmail,
      replyToEmail: body.replyToEmail,
      mailContent: body.mailContent,
      totalRecipients: body.totalRecipients,
      totalSent: body.totalSent,
      totalOpened: body.totalOpened,
      totalClicked: body.totalClicked,
      updatedAt: new Date()
    };
    
  
    try {
      const updatedCampaign = await db
        .update(campaigns)
        .set(updatedData)
        .where(eq(campaigns.id, id))
        .returning();
  
      if (!updatedCampaign.length) {
        return json({ error: 'Campaign not found' }, { status: 404 });
      }
  
      return json({ message: 'Campaign updated successfully' }, { status: 200 });
  
    } catch (error) {
      console.error("Error updating campaign:", error);
      return json({ error: "Internal Server Error" }, { status: 500 });
    }
  }