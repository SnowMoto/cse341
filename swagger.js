const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Simple API',
    description: 'Contacts API'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./route/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
