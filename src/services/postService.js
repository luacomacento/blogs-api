const { BlogPost, PostCategory } = require('../database/models');

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
};

module.exports = postService;