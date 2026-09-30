import { MongoClient, Db ,Collection } from 'mongodb'

const uri = process.env.MONGODB_URI;
if(!uri){
    throw new Error('MONGODB_URI is not defined');
}

let client: MongoClient;
let db: Db;

export const connectToDatabase = async () => {

    if(!client){
        client = new MongoClient(uri as string);
        await client.connect()
        db = client.db('nextjs_tasks')
    }
    return { client, db }
}
export const getTodoCollection = async ():Promise<Collection> => {
    if(!db) {
        const { db: database } = await connectToDatabase()
        return database.collection('todos')
    }
    return db.collection('todos')
};