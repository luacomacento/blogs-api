const { Op } = require('sequelize');
const { User, Category, BlogPost, PostCategory } = require('../database/models');

const includeUserAndCategories = [
  {
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  // Descobri que o exclude não funciona com nested inner joins (ou seja, não retiraria o campo PostCategory) e para isso precisaria usar um "through: {attributes: []}"
  // Referência: https://stackoverflow.com/a/57774538
  {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  },
];

const postService = {
  create: async (postData, categories) => {
    const { title, content, userId } = postData;
    const blogPost = await BlogPost.create({ title, content, userId });
    const { id: postId } = blogPost.toJSON();
    await PostCategory.bulkCreate(
      categories.map((category) => ({
        postId,
        categoryId: category.dataValues.id,
      })),
    );
    return blogPost;
  },

  getAll: async () => {
    const blogPosts = await BlogPost.findAll({
      include: includeUserAndCategories,   
    });
    return blogPosts;
  },

  getById: async (id) => {
    const blogPost = await BlogPost.findOne({
      where: { id },
      include: includeUserAndCategories,
    });
    return blogPost;
  },

  update: async (id, postData) => {
    const [success] = await BlogPost.update(postData, { where: { id } });
    return !!success;
  },

  delete: async (id) => {
    const success = await BlogPost.destroy({ where: { id } });
    return !!success;
  },

  search: async (query) => {
    const result = await BlogPost.findAll(
      {
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { content: { [Op.like]: `%${query}%` } },
          ],
        },
        include: includeUserAndCategories,
      },
    );
    return result;
  },
};

module.exports = postService;