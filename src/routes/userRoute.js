const { Router } = require('express');
const userController = require('../controllers/userController');

const user = Router();

user.post('/', userController.create);

module.exports = user;