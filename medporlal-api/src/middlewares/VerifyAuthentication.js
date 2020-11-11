require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = String(req.headers['x-access-token'])
    if (!token || token === 'null' || token === 'undefined') {
      throw new Error('Você não tem autorização.')
    }

    const decoded = await jwt.verify(token, process.env.SECRET)

    if (!decoded) {
      throw new Error('Você não tem autorização.')
    }

    req.userId = decoded.id

    next()
  } catch (err) {
    // console.log(err)
    return res.status(401).send('Você não tem autorização.')
  }
}