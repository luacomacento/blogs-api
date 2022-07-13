const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('express-async-errors');

const userService = {
  validateBody: async (unknown) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },

  checkIfExists: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) return true;
    return false;
  },

  create: async (userData) => {
    const user = await User.create(userData);
    return user.toJSON();
  },

  getNewToken: async (userData) => {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: userData }, process.env.JWT_SECRET, jwtConfig);
    return token;
  },

  getAll: async () => {
    const users = await User.findAll();
    const result = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
    return result;
  },

  getById: async (id) => {
    const user = await User.findOne({ where: { id } });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  },

  getByEmail: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  },
};

module.exports = userService;