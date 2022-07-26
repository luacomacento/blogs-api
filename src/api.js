const express = require('express');
const swaggerUi = require('swagger-ui-express');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const postRoute = require('./routes/postRoute');
const swaggerFile = require('./swagger_output.json');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
  },
}));

app.use((err, _req, res, _next) => {
  res.status(400).json({ message: err.message });
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
