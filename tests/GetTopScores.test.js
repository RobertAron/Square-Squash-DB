const restartDB = require('../BuildScripts/SetupDB').restartDB
const uuidv4 = require('uuid/v4');
const updateUser = require('../API/UpdateUser')
const sql = require("../API/SqlConnection")
const getTopScores = require("../API/GetTopScores")

beforeEach(async ()=>{
  await restartDB()
})

function makeRandomPlayer(score){
  const id = uuidv4()
  return {
    playerID : id,
    playerName : "rige",
    playerScore : score
  }
}
it('Shows number of players inserted if less than 10', async ()=>{
  const highScores = new Array(5).fill(0).map((ele)=>makeRandomPlayer(1000))
  const specialPlayer = makeRandomPlayer(0)
  const context = {} 
  const initialPlayerPromises = highScores.map(playerData => updateUser.updateUser(playerData,context))
  await Promise.all(initialPlayerPromises)
  await updateUser.updateUser(specialPlayer,context)
  const event = {
    playerID : specialPlayer.playerID
  }
  const topScores = await getTopScores.getTopScores(event,context)
  expect(topScores.body.scores.length).toBe(6)
})

it('Shows 10 players if player in top 10', async ()=>{
  const highScores = new Array(20).fill(0).map((ele)=>makeRandomPlayer(1000))
  const specialPlayer = makeRandomPlayer(10000)
  const context = {} 
  const initialPlayerPromises = highScores.map(playerData => updateUser.updateUser(playerData,context))
  await Promise.all(initialPlayerPromises)
  await updateUser.updateUser(specialPlayer,context)
  const event = {
    playerID : specialPlayer.playerID
  }
  const topScores = await getTopScores.getTopScores(event,context)
  expect(topScores.body.scores.length).toBe(10)
  expect(topScores.body.scores[0].score).toBe(10000)
})

it('Shows 11 players on player not in top 10',async () =>{
  const highScores = new Array(20).fill(0).map((ele)=>makeRandomPlayer(1000))
  const specialPlayer = makeRandomPlayer(0)
  const context = {} 
  const initialPlayerPromises = highScores.map(playerData => updateUser.updateUser(playerData,context))
  await Promise.all(initialPlayerPromises)
  await updateUser.updateUser(specialPlayer,context)
  const event = {
    pathParameters: {
      specialPlayer: playerID
    }
  }
  const topScores = await getTopScores.getTopScores(event,context)
  expect(topScores.body.scores.length).toBe(11)
  expect(topScores.body.scores[0].score).toBe(1000)
})


afterAll(async () => {
  sql.end()
})
