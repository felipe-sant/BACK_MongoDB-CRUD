import connectToDatabase from "../connection/mongoDB"

export default async function find(filtro?: {}): Promise<{}> {
    try {
        const db = await connectToDatabase()
        const collection = db.collection("cliente")
        if (!filtro) filtro = {}
        const documentos = await collection.find(filtro).toArray()
        return documentos
    } catch {
        return {}
    }
}

// Path: src/function/find.ts