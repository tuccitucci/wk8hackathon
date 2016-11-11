var Users = require('./controller.users.js');

module.exports = require('mongoose').model('User', {
  name: String,
  points: Number
});
