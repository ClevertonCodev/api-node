const Ajv = require('ajv').default;
const ajvErrors = require('ajv-errors');
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
ajvErrors(ajv);


const produtoSchema = {
    type: 'object',
    required: ['nome', 'preco'],
    properties: {
        nome: {
            type: 'string',
            errorMessage: {
                type: 'O nome deve ser uma string', 
            },
        },
        descricao: {
            type: 'string',
            errorMessage: {
                type: 'A descrição deve ser uma string',
            },
        },
        preco: {
            type: 'number',
            errorMessage: {
                type: 'O preço deve ser um número',
            },
        },
        tags: {
            type: 'array',
            errorMessage: {
                type: 'O campo tags deve ser um array de strings',
            },
        },
        em_promocao: {
            type: 'boolean',
            errorMessage: {
                type: 'A propriedade promocao deve ser um booleano',
            },
        },
        preco_promocional: {
            type: 'number',
            errorMessage: {
                type: 'A propriedade preco promocional deve ser um número',
            },
        },


    },errorMessage: {
        required: {
            preco: 'O preço é obrigatório',
            nome: 'O nome é obrigatório',
        },
    },
    
};


module.exports = ajv.compile(produtoSchema);
