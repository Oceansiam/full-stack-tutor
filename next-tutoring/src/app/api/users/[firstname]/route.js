import corsHeaders from "@/lib/cors";
import { getClientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const client = await getClientPromise();
    const resolvedParams = await params; 
    const firstname = resolvedParams.firstname; 
    console.log(firstname);
    
    const db = client.db("tutor");
    const result = await db.collection("users").find({firstname: firstname}).toArray();



    return NextResponse.json(result, {
        headers: corsHeaders,
    });
}