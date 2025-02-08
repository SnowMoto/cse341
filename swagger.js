const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project API',
    description: 'Moto API'
  },
  host: 'cse341-winter2025.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./route/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
