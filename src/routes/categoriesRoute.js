const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const validateToken = require('../middlewares/validateToken');

const categories = Router();

categories.post('/', validateToken, categoriesController.create);
categories.get('/', validateToken, categoriesController.getAll);

module.exports = categories;