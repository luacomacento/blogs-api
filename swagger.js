const swaggerAutogen = require('swagger-autogen')();

const output = 'src/swagger_output.json';
const endpoints = ['./src/api.js'];

swaggerAutogen(output, endpoints);