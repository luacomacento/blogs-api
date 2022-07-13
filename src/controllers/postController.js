const categoriesService = require('../services/categoriesService');
const postService = require('../services/postService');
const userService = require('../services/userService');

const postController = {
  create: async (req, res) => {
    const email = req.user;
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const { id: userId } = await userService.getByEmail(email);
    const foundCategories = await categoriesService.getManyByIds(categoryIds);

    if (!foundCategories.length) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    const blogPost = await postService.create({ title, content, userId }, foundCategories);

    res.status(201).json(blogPost);
  },

  getAll: async (req, res) => {
    const posts = await postService.getAll();
    res.status(200).json(posts);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const post = await postService.getById(id);
    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    res.status(200).json(post);
  },
};

module.exports = postController;