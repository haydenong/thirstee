/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /users              ->  index
 * POST    /users              ->  create
 * GET     /users/:id          ->  show
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Get list of users
exports.index = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(users);
    });
};

// Get a single user
exports.show = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        return res.json(user);
    });
};

// Executes search
exports.search = function (req, res) {
    console.info("QUERY RERCEIVED");
    console.info("QUERY>>" + JSON.stringify(req.query));
    console.info("QUERY>>" + JSON.stringify(req.params));
    User.find().or([
        {name: req.query.name},
        {contact: req.query.contact}
    ]).exec(function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        return res.json(user);
    })
};
// query.or([{ color: 'red' }, { status: 'emergency' }])

// Creates a new user in the DB.
exports.create = function (req, res) {
    User.create(req.body, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(user);
    });
};

// Updates an existing user in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    User.findById(req.params.id, function (err, user) {

        if (err) {

            return handleError(res, err);
        }
        if (!user) {
            console.info('REACHED HERE');
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(user, req.body);
        console.info('REACHED HERE' + JSON.stringify(updated));
        console.info('REACHED HERE' + JSON.stringify(req.body));
        updated.save(function (err) {
            if (err) {

                return handleError(res, err);
            }

            return res.status(200).json(user);
        });
    });
};

// Deletes a user from the DB.
exports.destroy = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        user.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}

