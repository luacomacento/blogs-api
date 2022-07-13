const { Router } = require('express');
const loginController = require('../controllers/loginController');

const login = Router();

// login.post('/', async (req, res) => {
//   const { email, password } = req.body;
//   const jwtConfig = {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   };

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Some required fields are missing' });
//   }

//   const user = await User.findOne({ where: { email, password } });

//   if (!user) return res.status(400).json({ message: 'Invalid fields' });

//   const token = jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);

//   res.status(200).json({ token });
// });

login.post('/', loginController.login);

module.exports = login;
