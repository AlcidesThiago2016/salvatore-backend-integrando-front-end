require('dotenv').config()
const express = require('express')
const { connectToDataBase } = require('./db/database-connection')
const cors = require('cors')
require('express-async-errors')

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
    app.use(cors())

    // Endpoint de Hello World
    app.get("/", function (req, res) {
        res.send("Hello World!!")
    })

    // Routers
    app.use('/personagem', personagemRouter)

    // Error Handling
    app.use(function (err, req, res, next){
        console.error(err.stack)
        res.status(500).send({ error: 'Algo deu errado!'})
    })


    app.listen(3000, function() {
        console.log("Servidor rodando em http://localhost:3000")
    })
}
// Fechamos a função main()

main()