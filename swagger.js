const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Simple API',
    description: 'Contacts API'
  },
  host: 'https://cse341-winter2025.onrender.com/',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./route/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);