import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    email: { type: String, required: true, unique: true }
})

const Cliente = mongoose.model("cliente", ClienteSchema)

export default Cliente