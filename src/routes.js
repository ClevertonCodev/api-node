const express = require('express');
const routes = express.Router();
const ProdutoController = require('./controller/ProdutosController');
const ValidateProduto = require('./middlewares/ProdutoMiddleware');
const TagsController = require('./controller/TagsController');
const multer = require('multer');
const { storage, fileFilter } = require('./middlewares/imgMiddleware');
var upload = multer({ storage: storage, fileFilter: fileFilter});
var ViewsProdutosController = require('./controller/ViewsProdutosController');
let UsersController = require('./controller/UserController');
const ValidadeUsers = require('./middlewares/UsersMiddleware');
let AuthController = require('./controller/AuthController');
const ValidadeLogin= require('./middlewares/LoginMiddleware');
const ValiddeToken = require('./middlewares/TokenAuthorizationMiddleware');

routes.get('/api/produtos',  ProdutoController.getAll);
routes.post('/api/produtos', ValidateProduto, ProdutoController.create);
routes.put('/api/produtos/:id', ValidateProduto, ProdutoController.update);
routes.get('/api/produtos/:id', ProdutoController.getOne);
routes.delete('/api/produtos/:id', ProdutoController.delete);
routes.post('/api/produtos/:id/upload', upload.single('foto'), ProdutoController.upload);
routes.use('/static', express.static('public'));

routes.post('/tags', TagsController.create);
routes.get('/tags', TagsController.getAll);
routes.get('/tags/:id', TagsController.getOne);
routes.put('/tags/:id', TagsController.update);
routes.delete('/tags/:id', TagsController.delete);

routes.get('/produtos-views', ViewsProdutosController.getAll);

routes.post('/users', ValidadeUsers, UsersController.create);
routes.post('/token', ValidadeLogin, AuthController.login);
routes.post('/validar', ValiddeToken, AuthController.me);

module.exports = routes;
