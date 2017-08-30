/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const path = require('path');
const expressStatusMonitor = require('express-status-monitor');

dotenv.load({ path: 'debug.env' });

/**
 * Controllers (route handlers).
 */
const userController = require('./controllers/user');
const swaggerController = require('./controllers/swagger');


const app = express();

app.set('host', process.env.NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || 8080);

app.use(expressStatusMonitor());
app.use(compression());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat',
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * App controllers
 */
app.use(userController);
app.use(swaggerController);
/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://%s:%d in %s mode', chalk.green('✓'), app.get('host'), app.get('port'), app.get('env'));
});

module.exports = app;
