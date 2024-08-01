const { ObjectId } = require('mongodb')
const service = require('./personagem.service')
const personagem = require('./personagem.entity')

async function readAll(req, res){
    // Acessamos a lista de personagens na service
    const items = await service.readAll()

    // Enviamos a lista de personagens como resultado
    res.send(items)
}

async function readById(req, res){
    // Acessamos o parâmetro de rota ID
    const id = req.params.id

    // Acessamos o personagem no service atraves do ID
    const item = await service.readById(id)

    // Checamos se o item obtido e existente
    if (!item){
        return res.status(404).send('Item não encontrado.')
    }

    // Enviamos o item como resposta
    res.send(item)
}

async function create(req, res){
    // Acessamos e validamos Body da Requisição
    const { error, value } = personagem.validate(req.body)

    const newItem = value

    if (error) {
        return res.status(400).send({ error: error.details[0].message})
    }

    // Adicionamos no banco atraves do service
    await service.create(newItem)

    // Exibimos uma mensagem de sucesso
    res.status(201).send(newItem)
}

async function updateById(req, res){
    // Acessando o ID do parametros de rota
    const id = req.params.id

    // Acessamos e validamos Body da Requisição
    const { error, value: newItem } = personagem.validate(req.body)

    if (error) {
        return res.status(400).send({ error: error.details[0].message})
    }

    // Atualizando no BD o novo item pelo id
    await service.updateById(id, newItem)

    // Enviando uma mensagem de sucesso
    res.send(newItem)
}

async function deleteById(req, res){
    // Acessamos o parâmetro de rota
    const id = req.params.id

    // Remover o item do BD usando o ID, via service
    await service.deleteById(id)

    // Enviando uma mensagem de sucesso
    res.status(204).send()
}

module.exports = {
    readAll,
    readById,
    create,
    updateById,
    deleteById
}