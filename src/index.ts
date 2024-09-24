import connectToDatabase from "./connection/mongoDB";

async function main() {
    try {
        const db = await connectToDatabase()
        const collection = db.collection("cliente")

        const result = await collection.insertOne({ nome: "Pedro Augusto" })
        console.log("Documento inserido com sucesso!", result)

        const documentos = await collection.find({}).toArray()
        console.log("Documentos encontrados:", documentos)
    } catch (error) {
        console.error("Erro:", error)
    }
}

main()