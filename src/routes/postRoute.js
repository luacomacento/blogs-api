const { Router } = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');

const post = Router();

post.post('/', validateToken, postController.create);

module.exports = post;