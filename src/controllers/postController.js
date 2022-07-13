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
};

module.exports = postController;