const pool = require('../API/SqlConnection')

const doesDBExist = `
SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = 'player_data'`
const createDB = `CREATE DATABASE player_data;`
const createPlayerTable = `
CREATE TABLE player_data.players(
  ID varchar(100) NOT NULL,
  playerName varchar(20) NOT NULL,
  score INT NOT NULL,
  PRIMARY KEY (ID)
)`

export const makeDb = async (event,context) => {
  console.log("called to create db")
  const result = await pool.query(doesDBExist)
  if (result[0].length > 0) {
    await pool.query(createDB)
    await pool.query(createPlayerTable)
  }
  else{
    console.log("db had already been created")
  }
}