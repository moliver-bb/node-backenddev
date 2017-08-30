const SwaggerController = require('express').Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var options = {
  swaggerDefinition: {
    info: {
      title: 'Relationship API',
      description: 'Swagger Documentation for Relationship API',
      version: '1.0.0'
    },
    basePath: `/`,
  },
  apis: [
    'models/*.js',
    'controllers/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiHandler = swaggerUi.setup(swaggerSpec, true);

SwaggerController.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


SwaggerController.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = SwaggerController;
