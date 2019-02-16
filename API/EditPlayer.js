const conn = require('./SqlConnection')

function doesPlayerExist(uuid){
  return `
  SELECT EXISTS(
    SELECT *
    FROM player_data.players
    WHERE id='${uuid}'
  );`
}
function addPlayer(uuid){
  return `
  INSERT INTO player_data.players (ID,playerName,score)
  VALUES('${uuid}','Anonymous',0);`
}

function getPlayer(uuid){
  return `
  SELECT playerName,score, (SELECT count(*) FROM player_data.players WHERE score>=p.score) AS position 
  FROM player_data.players p
  WHERE ID='${uuid}';`
}

function updatePlayerScore(uuid,score){
  return `
  UPDATE player_data.players
  SET score = ${score}
  WHERE id='${uuid}'`
}

export const UpdateUser = async (event,context) =>{
  const UserName = "test"
  const UserID = "someUUID"
  const score = 1000

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless v1.0! ${(await message({ time: 1, copy: 'Your function executed successfully!'}))}`,
    }),
  };
}