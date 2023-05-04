const jwt = require('jsonwebtoken');
const { Users } = require('../db/models');

const TokenMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: 'Não Autorizado' });
    }

    const token = authorization.split(' ')[1];
    var decoded;
    
    try {
     decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'Token na lista negra' });
    }

    const user = await Users.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Não Autorizado' });
    }

    req.payload = decoded
    next();

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro inesperado' });
  }
}

module.exports = TokenMiddleware; 