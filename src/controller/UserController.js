const express = require('express');
const { Users } = require('../db/models');
const bcrypt = require('bcrypt');


module.exports = {

    async create(req, res) {
        try {
            const { nome, email, password } = req.body;

            const existingUser = await Users.findOne({ where: { email } });

            if (existingUser) {
              return res.status(400).json({ Error: 'O email já está sendo usado' });
            }
        //     }
            const hasPassword = await bcrypt.hash(password, 10);
            const user = await Users.create({

                nome,
                email,
                password: hasPassword,

            });

            return res.status(201).json({ msg: 'Usuário cadastrado com sucesso! ' });


        } catch (error) {
            return res.status(500).json({ error: ' Erro inesperado!' });
        }
    },

}






