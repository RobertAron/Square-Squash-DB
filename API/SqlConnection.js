const mysql = require('promise-mysql')

const pool  = mysql.createPool({
  host            : process.env.HOST || 'localhost',
  user            : process.env.USER || 'root',
  password        : process.env.PASSWORD || '123abc',
})

module.exports = pool