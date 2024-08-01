const { MongoClient } = require('mongodb')

// Preparamos as informacoes de acesso ao BD
const dbUrl = process.env.DATABASE_URL
const dbName = 'mongodb-arquitetura-mvc'

const client = new MongoClient(dbUrl)

async function connectToDataBase(){
	  // Realizamos a conexao ao BD
    console.log('Conectando ao banco de dados...')
    await client.connect()
    console.log('Banco de dados conectado com sucesso!')
}

function getDatabase(){
    return client.db(dbName)
}

module.exports = {
	connectToDataBase,
  getDatabase
}