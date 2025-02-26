const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project API',
    description: 'Moto API'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./route/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

//cse341-winter2025.onrender.com / https
//localhost:8080 / http