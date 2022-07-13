const { Router } = require('express');
const userController = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');

const user = Router();

user.post('/', userController.create);
user.get('/', validateToken, userController.getAll);
user.get('/:id', validateToken, userController.getById);
user.delete('/me', validateToken, userController.delete);

module.exports = user;