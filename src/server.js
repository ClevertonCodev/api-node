const app = require('./app');
require('dotenv').config();
app.listen(8080, () => {
   console.log(`Varivel de ambiente ${process.env.NODE_ENV}`)
    console.log('Servidor iniciado na porta 8080');
  });