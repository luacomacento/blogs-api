const { Router } = require('express');
const loginController = require('../controllers/loginController');

const login = Router();

login.post('/', loginController.login);

module.exports = login;
