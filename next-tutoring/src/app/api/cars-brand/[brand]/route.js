import corsHeaders from "@/lib/cors";
import { getClientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request, {params} ) {
    const client = await getClientPromise();
    const resolvedParams = await params;
    const brand = resolvedParams.brand;
    console.log(brand)


    const db = client.db("tutor");
    const result = await db.collection("Car").find({brand: brand}).toArray();

    return NextResponse.json(result, {
        readers: corsHeaders,
    })
}