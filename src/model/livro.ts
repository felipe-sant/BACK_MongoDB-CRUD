import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
    titulo: { type: String, require: true },
    autor: { type: String, required: true },
    ano: { type: String, required: true }
})

const Livro = mongoose.model("livro", LivroSchema)

export default Livro