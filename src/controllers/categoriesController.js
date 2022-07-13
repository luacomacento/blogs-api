const categoriesService = require('../services/categoriesService');

const categoriesController = {
  create: async (req, res) => {
    const categoryData = await categoriesService.validateBody(req.body);
    const category = await categoriesService.create(categoryData);
    res.status(201).json(category);
  },

  getAll: async (req, res) => {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  },
};

module.exports = categoriesController;