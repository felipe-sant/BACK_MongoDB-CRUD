import { MongoClient, Db } from "mongodb"

const url = "mongodb+srv://root:root@fatec.e8bszzd.mongodb.net/?retryWrites=true&w=majority&appName=fatec"
const dbName = "empresa"

let db: Db

async function connectToDatabase(): Promise<Db> {
    if (!db) {
        try {
            const client = new MongoClient(url)
            await client.connect()
            db = client.db(dbName)
        } catch (error) {
            console.log("Erro ao conectar ao MongoDB: ", error)
            throw error
        }
    }
    return db
}

export default connectToDatabase

// Path: src/connection/mongoDB.ts