const conn = require('../API/SqlConnection')

const doesDBExist = `
SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = 'player_data'`
const deleteDB = `DROP DATABASE player_data;`
const createDB = `CREATE DATABASE player_data;`
const createPlayerTable = `
CREATE TABLE player_data.players(
  ID varchar(32) NOT NULL,
  playerName varchar(20) NOT NULL,
  score INT NOT NULL,
  PRIMARY KEY (ID)
)`
async function restartDB(){
  const result = await conn.query(doesDBExist)
  if(result.length===1){
      await conn.query(deleteDB)
  }
  await conn.query(createDB)
  await conn.query(createPlayerTable)
  conn.end()
}

restartDB()
