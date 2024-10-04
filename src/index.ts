import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Cliente from './model/cliente'
import cors from 'cors'
import Livro from './model/livro'

console.clear()

const app = express()
app.use(bodyParser.json())

const PORT = 4444
const MONGODB_URI = "mongodb+srv://root:root@fatec.typea.mongodb.net/?retryWrites=true&w=majority&appName=fatec"

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch(err => console.log("Erro ao conectar ao MongoDB", err))

app.use(cors())

// Clientes

app.post('/clientes', async (req, res) => {
    const { nome, email } = req.body
    try {
        const novoCliente = new Cliente({ nome, email })
        await novoCliente.save()
        res.status(201).json(novoCliente)
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar cliente" })
    }
})

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.json(clientes)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' })
    }
})

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params
    const { nome, email } = req.body
    try {
        const clienteAtualizado = await Cliente.findByIdAndUpdate(id, { nome, email }, { new: true })
        res.json(clienteAtualizado)
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar cliente' })
    }
})

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Cliente.findByIdAndDelete(id)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar cliente' })
    }
})

// Livros

app.post('/livros', async (req, res) => {
    try {
        const novoLivro = new Livro({
            titulo: req.body.titulo,
            autor: req.body.autor,
            ano: req.body.ano
        })
        const livroSalvo = await novoLivro.save()
        res.status(201).json(livroSalvo)
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar livro" })
    }
})

app.get("/livros", async (req, res) => {
    try {
        const livros = await Livro.find()
        res.json(livros)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar livros" })
    }
})

app.put("/livros/:id", async (req, res) => {
    const { id } = req.params
    const { titulo, autor, anoPublicado } = req.body
    try {
        const livroAtualizado = await Livro.findByIdAndUpdate(id, { titulo, autor, anoPublicado }, { new: true })
        if (!livroAtualizado) {
            return res.status(404).json({ error: "Livro não encontrado" })
        }
        res.json(livroAtualizado)
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar livro" })
    }
})

app.delete("/livros/:id", async (req, res) => {
    const { id } = req.params
    try {
        const livroDeletado = await Livro.findByIdAndDelete(id)
        if (!livroDeletado) {
            return res.status(404).json({ error: "Livro não encontrado" })
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar livro" })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
