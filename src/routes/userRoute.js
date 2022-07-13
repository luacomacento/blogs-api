const { Router } = require('express');
const userController = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');

const user = Router();

user.post('/', userController.create);
user.get('/', validateToken, userController.getAll);

module.exports = user;