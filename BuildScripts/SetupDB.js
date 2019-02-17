const pool = require('../API/SqlConnection')

const doesDBExist = `
SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = 'player_data'`
const deleteDB = `DROP DATABASE player_data;`
const createDB = `CREATE DATABASE player_data;`
const createPlayerTable = `
CREATE TABLE player_data.players(
  ID varchar(100) NOT NULL,
  playerName varchar(20) NOT NULL,
  score INT NOT NULL,
  PRIMARY KEY (ID)
)`
export async function restartDB() {
  const result = await pool.query(doesDBExist)
  if (result[0].length === 1) {
    await pool.query(deleteDB)
  }
  await pool.query(createDB)
  await pool.query(createPlayerTable)
}
