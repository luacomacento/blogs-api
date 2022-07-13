const { User, Category, BlogPost, PostCategory } = require('../database/models');

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
      include: [
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
      ],   
    });
    return blogPosts;
  },

  getById: async (id) => {
    const blogPost = await BlogPost.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    return blogPost;
  },

  update: async (id, postData) => {
    const [success] = await BlogPost.update(postData, { where: { id } });
    return !!success;
  },

  delete: async (id) => {
    await PostCategory.destroy({ where: { postId: id } });
    const success = await BlogPost.destroy({ where: { id } });
    return !!success;
  },
};

module.exports = postService;