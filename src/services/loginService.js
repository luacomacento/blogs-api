const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const loginService = {
  login: async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) return null;

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);
    return token;
  },
};

module.exports = loginService;