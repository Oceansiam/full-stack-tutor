import corsHeaders from "@/lib/cors";
import { NextResponse } from "next/server";

// Handle preflight OPTIONS requests
export async function OPTIONS(req) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET() {
    const message = {
        firstname: "Krisdipas",
        lastname: "Kongsakul",
        age: 21,
    };
// Not necessary needed if Option Exist
    return NextResponse.json(message, {
        headers: corsHeaders,
    });
}

// Create Utilities 