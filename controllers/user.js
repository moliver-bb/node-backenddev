const User = require('../models/User');
const UserController = require('express').Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     description: Returns all users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of users
 *         schema:
 *            type: array
 *            $ref: '#/definitions/User'
 */
UserController.get('/users', (req, res, next) => {
  User.getUsers()
    .then(users => {
      res.status(200);
      res.send(users);
    })
    .catch(next);
});


/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: Create new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - firstName
 *             - lastName
 *           properties:
 *             email:
 *               type: string
 *             firstName:
 *               type: String
 *             lastName:
 *               type: String
 *           example: {
 *             "email": "johndoe@email.com",
 *             "firstName": "John",
 *             "lastName": "Doe"
 *           }
 *     responses:
 *       200:
 *         description: New user created
 *         schema:
 *            type: object
 *            $ref: '#/definitions/User'
 */

UserController.post('/user', (req, res, next) => {
  User.createUser(req.body)
    .then(user => {
      res.status(200);
      res.send(user);
    })
    .catch(next);
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a single user based on id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: User object
 *         schema:
 *            type: object
 *            $ref: '#/definitions/User'
 *       404:
 *         description: userId not found
 */

UserController.get('/user/:id', (req, res, next) => {
  User.getUserById(req.params.id)
    .then(user => {
      res.status(200);
      res.send(user);
    })
    .catch(err => {
      res.status(404);
      res.send(err.message);
    });
});

module.exports = UserController;
