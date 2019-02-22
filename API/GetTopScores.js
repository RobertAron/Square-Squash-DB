const pool = require('./SqlConnection')


function getPlayer(uuid) {
  return `
  SELECT playerName,score, (SELECT count(*) FROM player_data.players WHERE score>=p.score) AS position 
  FROM player_data.players p
  WHERE ID=${uuid};`
}

function getTopTen() {
  return `
  SELECT ID,playerName,score,
    (SELECT count(*) FROM player_data.players WHERE score>p.score) + 1 AS position
  FROM player_data.players p
  HAVING position<10
  ORDER BY score DESC
  LIMIT 10;`
}


export const getTopScores = async (event, context) => {
  const playerID = pool.escape(event.playerID)
  const playerData = []
  const conn = await pool.getConnection()

  await conn.beginTransaction()
  try {
    const topTenData = await conn.query(getTopTen())
    playerData.push(...topTenData[0])
    if(playerData.length>=10){
      if(playerData.findIndex(ele=>ele.ID===event.playerID)===-1){
        const player = await conn.query(getPlayer(playerID))
        playerData.push(...player[0])
      }
    }
    await conn.commit()
    await conn.release()
    const returnScores = playerData.map((player)=>{
      return {
        playerName: player.playerName,
        score: player.score,
        position: player.position
      }
    })
    return {
      statusCode: 200,
      body: {
        scores: returnScores
      }
    }
  }
  catch (err) {
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