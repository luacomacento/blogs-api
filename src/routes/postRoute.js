const { Router } = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');

const post = Router();

post.post('/', validateToken, postController.create);
post.get('/', validateToken, postController.getAll);
post.get('/:id', validateToken, postController.getById);
post.put('/:id', validateToken, postController.update);
post.delete('/:id', validateToken, postController.delete);

module.exports = post;