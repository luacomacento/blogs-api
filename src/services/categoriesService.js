const Joi = require('joi');
require('express-async-errors');
const { Category } = require('../database/models');

const categoriesService = {
  validateBody: async (unknown) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },

  create: async (categoryData) => {
    const category = await Category.create(categoryData);
    return category;
  },
};

module.exports = categoriesService;