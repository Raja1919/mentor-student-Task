import { MongoClient } from "mongodb";
import dotenv from "dotenv"


dotenv.config();

const mongoConnectString=process.env.mongoUrl

export async function dbConnection(){
    const client=new MongoClient(mongoConnectString);
    await client.connect();
    console.log("mongodb connect successfully")
    return client
}

export const client=await dbConnection();
