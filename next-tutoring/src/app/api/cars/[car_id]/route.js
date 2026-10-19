import corsHeaders from "@/lib/cors";
import { getClientPromise } from "@/lib/mongodb";
import { errorResponse, printExceptionLog, successResponse } from "@/lib/utils";
import { ST } from "next/dist/shared/lib/utils";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


// GET = find(), POST = insertOne(), PUT = updateOne(), DELETE = deleteOne
export async function GET(request) {
    try {
        const cilent = await getClientPromise();
        const db = cilent.db("tutor");
        //const color = request.nextUrl.searchParams.get('color');
        const result = await db.collection("Car").find().toArray();

        return successResponse({ result }, 201);
    }
    catch (error) {
        printExceptionLog("GET Car", error);
        return errorResponse("GET Car Internal Errror", 500);
    }
    


    return NextResponse.json(result, {
        headers: corsHeaders,
    });
}

export async function POST(request) {
// brand, model, color, price, oiltype
    try {
        const data = await request.json();
        const brand = data.brand;
        const model = data.model;
        const color = data.color;
        const oiltype = data.oiltype;
        const price = data.price;

        const client = await getClientPromise();
        const db = client.db(process.env.DB_NAME);
        
        const insertResult = await db.collection("Car").insertOne({
            brand: brand,
            model: model,
            color: color,
            oiltype: oiltype,
            price: price,
            
        });
        return successResponse(
            {
                id: insertResult.insertedId,
            },
            201,
        );
    } catch (error) {
        printExceptionLog("Post Cars", error);

        return errorResponse("POST Car Eternal Error", 500);
    }
}

export async function DELETE(request, { params }) {
    const { car_id } = await params;
    try {
        const client = await getClientPromise();
        const db = client.db(process.env.DB_NAME) 
        const deleteResult = await db.collection("Car").deleteOne(
            { _id: new ObjectId (car_id)});
            return successResponse({message: "Delete Sucess"},201);
        }
        catch (error) {
            printExceptionLog("DELETE Item Exception", error);
            return errorResponse("GET Item Internal Error", 500);
    }
}

export async function PUT(request, { params }) {
    const { car_id } = await params;
    console.log("=> car_id: ", car_id);
    try {
        const data = await request.json();
        const client = await getClientPromise();
        const db = client.db(process.env.DB_NAME);
        const StoreCars = await db.collection("Car").findOne({_id: new ObjectId(car_id)});
        // Brand,Model,Color,Oiltype,Price
        if (StoreCars) {
            StoreCars.brand = data.brand;
            StoreCars.model = data.model;
            StoreCars.color = data.color;
            StoreCars.oiltype = data.oiltype;
            StoreCars.price = data.price;

            const updatedResult = await db.collection("Car").updateOne({_id: new ObjectId(car_id)}, {$set: StoreCars});
            console.log("==>update result: ", updatedResult);
            const updatedOk = Number(updatedResult.modifiedCount)>0;
            if (updatedOk) 
                return successResponse({message: "Item update sucess"}, 201);
            else return errorResponse({message: "Item update failed"}, 400);
        }
        else {
            return errorResponse({message: "Item not Found"}, 400);
        }
    }
    catch (error) {
            printExceptionLog("PUT Car_Item Exception", error);
            return errorResponse("PUT Car_Item Internal Error", 500);
        }
}
