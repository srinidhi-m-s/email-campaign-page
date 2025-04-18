import { db } from '$lib/server/db/connection.js';
import { brands } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm'; 
import { getBrandById } from '$lib/server/db/index.js';

export async function DELETE({ params }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
        }  
        await db.delete(brands).where(eq(brands.id, id));  
        return new Response(JSON.stringify({ message: 'Brand deleted successfully' }), {
            status: 200
        });
    } catch (error) {
        console.error('Error deleting brand:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
export async function PUT({ params, request }) {
    const id = parseInt(params.id);
    console.log("Updating brand with ID:", id);

    let data = await request.json();
    
    const updatedData = {
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
        smtpLimitHourly: data.smtpLimitHourly ? parseInt(data.smtpLimitHourly) : null,
        smtpLimitDaily: data.smtpLimitDaily ? parseInt(data.smtpLimitDaily) : null,
        smtpLimitMonthly: data.smtpLimitMonthly ? parseInt(data.smtpLimitMonthly) : null,
        trackOpening: data.trackOpening,
        trackClicks: data.trackClicks,
        maxBounce: data.maxBounce ? parseInt(data.maxBounce) : null,
        gdpr: data.gdpr,
        trackLinkClicks: data.trackLinkClicks,
        updatedAt: new Date() 
    };
    
    try {
        const updatedBrand = await db.update(brands)
            .set(updatedData)
            .where(eq(brands.id, id))
            .returning();

        if (!updatedBrand.length) {
            return json({ error: 'Brand not found' }, { status: 404 });
        }

        return json({ message: 'Brand updated successfully' }, { status: 200 });

    } catch (error) {
        console.error("Error updating brand:", error);
        return json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET({ params }) {
    const { id } = params;
    try{
        console.log("entered get with id:"+id);
        const brand = await db.select().from(brands).where(eq(brands.id, id)).limit(1);

        if (!brand) {
            return new Response(JSON.stringify({ error: 'Brand not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(brand), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch brand' }), { status: 500 });
    }
}
