require('dotenv').config()
const express = require('express')
const { connectToDataBase } = require('./db/database-connection')

const personagemRouter = require('./personagem/personagem.router')

// Declaramos a função main()
async function main() {
    //  Conectamos no DB
    await connectToDataBase()

    // Inicializa no express
    const app = express()

    // Middlewares
    // Sinalizando para o express que utilizaremos JSON no Body
    app.use(express.json())

    // Endpoint de Hello World
    app.get("/", function (req, res) {
        res.send("Hello World!!")
    })

    // Routers
    app.use('/personagem', personagemRouter)


    app.listen(3000, function() {
        console.log("Servidor rodando em http://localhost:3000")
    })
}
// Fechamos a função main()

main()