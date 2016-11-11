var Character = require('./model.character.js');
var Task = require('./model.task.js');
var User = require('./model.user.js');

module.exports = (app) => {


    app.post('/api/login', function loginRoute(req, res) {
        console.info('LOGIN::POST::PAYLOAD::', req.body);

        User.findOne({ name: req.body.name }, (err, user) => {
            if (err) { // this will trigger the error .then callback on the frontend
                console.error('MongoDB error:', err);
                res.status(500).json(err);
            }

            if (!user) {
                console.warn("Inside user not found, creating one");
                var newUser = new User(req.body);
                newUser.save((err, user) => {
                    if (err) {
                        return res.send(err);
                    }
                    req.session.userId = user._id;
                    res.send({message: 'Login success!'});
                });


            } else {
                console.info('User found, name: ', user);

                req.session.userId = user._id;
                res.send({message: 'Login success!'});
            }
        });
    });

    app.get('/api/characters', (req, res) => {
        console.log("Running get on server")
        Character.find(req.query, (err, characters) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
            } else {
                // res.json(characters);
                var s = Math.floor((Math.random() * characters.length));
                console.log("hello ", s);
                res.json(characters[s]);
            }
        });
    });

    app.post('/api/characters', (req, res) => {
        new Character(req.body).save((err, character) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
            } else {
                res.json(character);
            }
        });
    });

    app.get('/api/tasks', (req, res) => {
        console.log("Running get on server")
        Task.find(req.query, (err, tasks) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
            } else {
                var i = Math.floor((Math.random() * tasks.length));
                console.log("Random Task index ", i);
                res.json(tasks[i]);
            }
        });
    });

    app.post('/api/tasks', (req, res) => {
        new Task(req.body).save((err, task) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
            } else {
                res.json(task);
            }
        });
    });

    app.get('/api/users', (req, res) => {
        console.log("Running get on server")
        User.find(req.query, (err, users) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
            } else {
                res.json(users);
            }
        });
    });

    app.post('/api/users', (req, res) => {
        new User(req.body).save((err, user) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
            } else {
                res.json(user);
            }
        });
    });

    app.put('/api/users', (req, res) => {
        console.log("in app.put, body: ", req.body);
    });

}
