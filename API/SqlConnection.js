
const mysql = require('mysql2/promise');


module.exports = mysql.createPool({
  host            : process.env.HOST || 'localhost',
  user            : process.env.USER || 'root',
  password        : process.env.PASSWORD || '123abc',
})
