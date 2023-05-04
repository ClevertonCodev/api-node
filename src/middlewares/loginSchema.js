const Ajv = require('ajv').default;
const apply = require('ajv-formats-draft2019');
const ajvErrors = require('ajv-errors');
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
apply(ajv); 
ajvErrors(ajv);

const usersSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'idn-email',
            errorMessage: {
                type: 'O  deve ser uma string',
                format: '@ Email invalido!'
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
            email: 'O email é obrigatório',
            password: 'A senha é obrigatório',
        },
    },
    
};


module.exports = ajv.compile(usersSchema);
