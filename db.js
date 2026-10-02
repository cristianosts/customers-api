const mysql = require('mysql2/promise')

const client = mysql.createPool(process.env.CONNECTION_STRING)

async function selectCustomers(){
    const results = await client.query('SELECT * FROM customersdata')
    return results[0];
}

async function selectCustomer(id){
    const results = await client.query('SELECT * FROM customersdata WHERE id=?;', [id])
    return results[0]
}

async function insertCustomer(customer){
    const values = [customer.name, customer.age, customer.status]
    await client.query('INSERT INTO customersdata(name, age, status) VALUES (?,?,?)', values)
}

async function updateCustomer(id, customer){
    const values = [customer.name, customer.age, customer.status, id]
    await client.query('UPDATE customersdata SET name=?, age=?, status=? WHERE id=?', values)    
}

async function deleteCustomer(id){
    const values = [id]
    await client.query('DELETE FROM customersdata WHERE id=?', values) 
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}