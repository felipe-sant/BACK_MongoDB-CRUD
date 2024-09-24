import connectToDatabase from "../connection/mongoDB"

export default async function insertOne(dado: {}) {
    try {
        const db = await connectToDatabase()
        const collection = db.collection("cliente")
        await collection.insertOne(dado)
        return "Documento inserido com sucesso!"
    } catch (error) {
        console.error("Erro:", error)
        return
    }
}

// Path: src/function/insertOne.ts