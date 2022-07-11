// BUILD YOUR SERVER HERE
//IMPORTS
const User = require('./users/model')

//INSTANCE OF EXPRESS APP
const express = require('express');

const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

//ENDPOINTS

//([GET] returns array of user objecst)
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                err: err.message
            })
        })
})

//([GET] returns user object by id)
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id).then(result => {
        if(result == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist"  })
            return;
        }

        res.json(result);
    })
})

// [POST] (/api/users)     (C of CRUD, create new user from JSON payload)
server.post('/api/users', (req, res) => {
    User.insert(req.body)
    .then(result => {
        if (!req.body.name || !req.body.bio) { // "if there isn't a required body name or bio"
            res.status(400).json({ message: 'Please provide name and bio for the user' })
            return;
        }
        //if all is well
        res.status(201).json(result)
    })
    .catch(() => {
        res.status(500).json({ message: 'There was an error while saving the user to the database'})
    })
})

//[PUT]    /api/users/:id (U of CRUD, update user with :id using JSON payload)\
server.put('/api/users/:id', async (req, res) => {
    User.update(req.params.id, req.body).then(result => {
        if(result == null) {
            res.status(404).json({ message: 'The user with the specified ID does not exist' });
            return;
        } else {
            if (!req.body.name || !req.body.bio) { // "if there isn't a required body name or bio"
                res.status(400).json({ message: 'Please provide name and bio for the user' })
                return;
            }
        }
        //if all is well
        res.json(result);
    });
});

// [DELETE] (/api/users/:id) (D of CRUD, remove dog with :id)
server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id).then(result => {
        if(result == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist"  })
            return;
        }

        res.json(result);
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
