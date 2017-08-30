const _ = require('lodash');
const UUID = require('uuid');

let _users = [];

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: string
 *       email:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 */
const User = {
  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
        const user = _.find(_users, { id: userId });
        if (user) resolve(user);
        else reject(new Error(`userId not found for: ${userId}`));
    })
  },
  getUsers: (id) => {
    return new Promise((resolve, reject) => {
        if(_users) resolve(_users.concat([]));
        else reject(new Error('invalid users array'))
    })
  },
  createUser: (user) => {
    return new Promise((resolve, reject) => {
        if(user.firstName && user.lastName && user.email) {
          const newUser = _.merge({}, user, { id: UUID.v4() })
          _users = _users.concat([newUser]);
          resolve(newUser);
        }
        else reject(new Error('firstName, lastName and email required for new user'));
    })
  }
}

module.exports = User;
