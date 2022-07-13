const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
    const userData = await userService.validateBody(req.body);
    const userExists = await userService.checkIfExists(userData.email);
    if (userExists) return res.status(409).json({ message: 'User already registered' });
    const { password, ...userWithoutPassword } = await userService.create(userData);
    const token = await userService.getNewToken(userWithoutPassword);
    res.status(201).json({ token });
  },
};

module.exports = userController;