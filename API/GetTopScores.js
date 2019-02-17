const pool = require('./SqlConnection')

export const GetTopScores = async (event,context) =>{
  const playerID = pool.escape(event.playerID)
}