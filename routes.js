var Character = require('./model.character.js');
var Task = require('./model.task.js');
module.exports = (app) => {

app.get('/api/characters', (req,res) => {
  console.log("Running get on server")
    Character.find(req.query, (err,characters) => {
      if(err){
        console.error(err);
        res.status(500).json(err);
      } else {
        // res.json(characters);
        var s = Math.floor((Math.random()* characters.length));
        console.log("hello ", s);
        res.json(characters[s]);
      }
    });
});

app.post('/api/characters', (req,res) => {
    new Character(req.body).save((err,character) => {
      if(err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json(character);
      }
    });
});

app.get('/api/tasks', (req,res) => {
  console.log("Running get on server")
    Task.find(req.query, (err,tasks) => {
      if(err){
        console.error(err);
        res.status(500).json(err);
      } else {
        var i = Math.floor((Math.random()* tasks.length));
        console.log("Random Task index ", i);
        res.json(tasks[i]);
      }
    });
});

app.post('/api/tasks', (req,res) => {
    new Task(req.body).save((err,task) => {
      if(err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json(task);
      }
    });
});

app.get('/api/users', (req,res) => {
  console.log("Running get on server")
    User.find(req.query, (err,users) => {
      if(err){
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json(users);
      }
    });
});

app.post('/api/users', (req,res) => {
    new User(req.body).save((err,user) => {
      if(err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json(user);
      }
    });
});

app.put('/api/users', (req,res) => {
    console.log("in app.put, body: ", req.body);
});

}
