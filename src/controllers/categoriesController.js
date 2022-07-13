const categoriesService = require('../services/categoriesService');

const categoriesController = {
  create: async (req, res) => {
    const categoryData = await categoriesService.validateBody(req.body);
    const category = await categoriesService.create(categoryData);
    res.status(201).json(category);
  },
};

module.exports = categoriesController;