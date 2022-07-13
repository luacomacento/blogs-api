const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const validateToken = require('../middlewares/validateToken');

const categories = Router();

categories.post('/', validateToken, categoriesController.create);

module.exports = categories;