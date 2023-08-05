const mySql = require('mysql2')
const pool = mySql.createPool({
    host:"localhost",
    user:"root",
    password:"rolne2006",
    database:"login_db"
})

module.exports = pool.promise()