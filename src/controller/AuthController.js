const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');

module.exports = {

    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ where: { email } });

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ error: 'Email ou senha incorretos.' });
            }
            
            const randomNum = Math.random();
            const payload = {
                id: user.id,
                nome: user.nome,
                randomNum,
              };
              
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
              
            return res.status(200).json({ token: token });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: ' Erro inesperado!' });
        }
    },

    async me(req, res) {
        try {
            return res.status(200).json({playload: req.payload} );
        } catch (error) {
            return res.status(400).json({ error: ' Erro inesperado!' });
        }
    },
}
