import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Cliente from './model/cliente'
import cors from 'cors'

console.clear()

const app = express()
app.use(bodyParser.json())

const PORT = 4444
const MONGODB_URI = "mongodb+srv://root:root@fatec.e8bszzd.mongodb.net/?retryWrites=true&w=majority&appName=fatec"

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch(err => console.log("Erro ao conectar ao MongoDB", err))

app.use(cors())

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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
