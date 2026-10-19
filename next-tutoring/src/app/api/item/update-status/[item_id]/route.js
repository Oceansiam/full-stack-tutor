import { getClientPromise } from "@/lib/mongodb";
import { errorResponse, printExceptionLog, successResponse } from "@/lib/utils";
import { ObjectId } from "mongodb";
import corsHeaders from "@/lib/cors";


export async function OPTIONS(request) { 
  return new Response(null, { 
    status: 200, 
    headers: corsHeaders, 
  }); 

} 

export async function PUT(request, { params }) {
    const { item_id } = await params
    console.log(" => Item Soft Deleted")

    try {
        const data = await request.json();
        const client = await getClientPromise();
        const db = client.db(process.env.DB_NAME);
        const storedItem = await db.collection("item").findOne({_id: new ObjectId(item_id)})

        if (storedItem) {
            storedItem.status = "DELETED";
            
            const updatedResult = await db.collection("item")
            .updateOne({_id: new ObjectId (item_id)}, {$set: storedItem});
            console.log("==> updateResult: ", updatedResult);
            const updateOk = Number(updatedResult.modifiedCount)>0;
            if (updateOk)
                return successResponse({ message: "Item update success" }, 201);
            else
                return errorResponse({ message: "Item update failed" }, 400);
        }
        else {
            return errorResponse({ message: "Item not found" }, 400);
        }
            
    }
    catch (error) {
        printExceptionLog("PUT Item Exception", error);
        return errorResponse("PUT Item Internal Error", 500);
    }
}