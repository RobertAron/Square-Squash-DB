const restartDB = require('../BuildScripts/SetupDB').restartDB
const uuidv1 = require('uuid/v1');
const editPlayer = require('../API/UpdateUser')
const sql = require("../API/SqlConnection")

beforeEach(async ()=>{
  await restartDB()
})

it('adds a new player in',async () =>{
  const event = {
    playerID : uuidv1(),
    playerName : "rige",
    playerScore : 0
  }
  const context = {} 
  await editPlayer.UpdateUser(event,context)
  const player = await sql.query(`SELECT * FROM player_data.players WHERE ID="${event.playerID}"`)
  expect(player[0][0].ID===event.playerID)
  expect(player[0][0].playerName===event.playerName)
  expect(player[0][0].playerScore===0)
})

it('avoids errors when bad data is sent',async () =>{
  const event = {
    playerID : uuidv1(),
    playerName : '";',
    playerScore : 0
  }
  const context = {} 
  await editPlayer.UpdateUser(event,context)
  const player = await sql.query(`SELECT * FROM player_data.players WHERE ID="${event.playerID}"`)
  expect(player[0][0].ID===event.playerID)
  expect(player[0][0].playerName===event.playerName)
  expect(player[0][0].playerScore===0)
})

afterAll(async () => {
  sql.end()
})