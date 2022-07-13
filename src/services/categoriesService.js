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

  getAll: async () => {
    const categories = await Category.findAll();
    return categories;
  },

  getManyByIds: async (ids) => {
    const result = await Promise.all(
      ids.map((categoryId) => Category.findOne({ where: { id: categoryId } })),
    );
    const foundCategories = result.filter((category) => category !== null);
    return foundCategories;
  },
};

module.exports = categoriesService;