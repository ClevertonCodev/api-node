const Ajv = require('ajv').default;
const apply = require('ajv-formats-draft2019');
const ajvErrors = require('ajv-errors');
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
apply(ajv); 
ajvErrors(ajv);

const usersSchema = {
    type: 'object',
    required: [ 'nome', 'email', 'password'],
    properties: {
        nome: {
            type: 'string',
            errorMessage: {
                type: 'O nome deve ser uma string',
            },
        },
        email: {
            type: 'string',
            format: 'idn-email',
            errorMessage: {
                type: 'O  deve ser uma string',
                format: 'Email invalido!'
            },
        },
        password: {
            type: 'string',
            errorMessage: {
                type: 'A senha deve ser uma string',
            },
        },

    },errorMessage: {
        required: {
            nome: 'O nome é obrigatório',
            email: 'O email é obrigatório',
            password: 'A senha é obrigatório',
        },
    },
    
};


module.exports = ajv.compile(usersSchema);
