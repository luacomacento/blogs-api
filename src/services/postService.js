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
};

module.exports = postService;