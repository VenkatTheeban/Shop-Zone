module.exports = app => {
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../docs/swaggerDef');

const router = express.Router();
app.use('/docs', router);
router.use('/docs', swaggerUi.serve);

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['app/docs/*.yml', 'app/routes/*.js'],
});



console.log("error here");

router.get(
  '/',swaggerUi.setup(specs, {
    explorer: true,
  })

);

}