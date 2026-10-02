require('dotenv').config()

const db = require('./db')

const express = require('express')

const app = express()

app.use(express.json())

app.get('/customers', async (request, response) => {
    const results = await db.selectCustomers()
    response.json(results) 
})

app.get('/customers/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const results = await db.selectCustomer(id)
    response.json(results)
})

app.post('/customers', async (request, response) => {
    const customer = request.body
    await db.insertCustomer(customer)
    response.sendStatus(201)
})

app.patch('/customers/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const customer = request.body
    await db.updateCustomer(id, customer)
    response.sendStatus(200)
})

app.delete('/customers/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    await db.deleteCustomer(id)
    response.sendStatus(204)
})

app.listen(process.env.PORT, () => {
    console.log('its running')
})