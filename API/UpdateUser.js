const pool = require('./SqlConnection')

function doesPlayerExist(uuid){
  return `
  SELECT EXISTS(
    SELECT *
    FROM player_data.players
    WHERE id=${uuid}
  ) as isPresent;`
}
function addPlayer(uuid){
  return `
  INSERT INTO player_data.players (ID,playerName,score)
  VALUES (${uuid},'Anonymous',0);`
}

function updatePlayer(uuid,score,name){
  return `
  UPDATE player_data.players 
  SET playerName = ${name}, score = ${score} 
  WHERE id = ${uuid};`
}

export const updateUser = async (event,context) =>{
  console.log(event.body)
  const newData = JSON.parse(event.body)
  const playerID = pool.escape(newData.playerID)
  const playerName = pool.escape(newData.playerName) 
  const playerScore = pool.escape(newData.playerScore)
  console.log(playerID,playerName,playerScore)
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try{
    const playerExist = await conn.query(doesPlayerExist(playerID))
    if(playerExist[0][0].isPresent===0){
      console.log(`Adding player to Db ${playerID}`)
      await conn.query(addPlayer(playerID))
    }
    await conn.query(updatePlayer(playerID,playerScore,playerName))
    await conn.commit()
    await conn.release()
    console.log(`${event.playerID} updated`)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `User Updated`,
      }),
    };
  }
  catch(err){
    console.error(`An error occurred. ${err}`)
    await conn.rollback()
    await conn.release()
    return {
      statusCode: 501,
      body: JSON.stringify({
        message: `Something went wrong`
      }),
    }
  }
}