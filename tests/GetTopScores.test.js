const restartDB = require('../BuildScripts/SetupDB').restartDB
const uuidv4 = require('uuid/v4');
const updateUser = require('../API/UpdateUser')
const sql = require("../API/SqlConnection")

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
  
})

it('Shows 10 players if player in top 10', async ()=>{

})

it('Shows 11 players on player not in top 10',async () =>{
  const highScores = new Array(20).fill(0).map((ele)=>makeRandomPlayer(1000))
  const specialPlayer = makeRandomPlayer(0)
  const context = {} 
  const initialPlayerPromises = highScores.map(playerData => updateUser.UpdateUser(playerData,context))
  await Promise.all(initialPlayerPromises)
  await updateUser.UpdateUser(specialPlayer,context)
})


afterAll(async () => {
  sql.end()
})
