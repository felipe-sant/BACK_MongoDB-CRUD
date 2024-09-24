import find from "./function/find";

async function main() {
    const documentos = await find({nome: "luiz"})
    console.log(documentos)
}

main()