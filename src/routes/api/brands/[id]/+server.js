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

    let updatedData = await request.json();
    
    // Ensure createdAt is a Date object
    if (updatedData.createdAt && typeof updatedData.createdAt === "string") {
        updatedData.createdAt = new Date(updatedData.createdAt);
    }
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
