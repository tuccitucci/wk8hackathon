var Tasks = require('./controller.tasks.js');

module.exports = require('mongoose').model('Character', {
  name: String,
  story: String
});
