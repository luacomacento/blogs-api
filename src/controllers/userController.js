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

  getAll: async (_req, res) => {
    const users = await userService.getAll();
    res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    res.status(200).json(user);
  },
};

module.exports = userController;