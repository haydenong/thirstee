/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /happyhours              ->  index
 * POST    /happyhours              ->  create
 * GET     /happyhours/:id          ->  show
 * PUT     /happyhours/:id          ->  update
 * DELETE  /happyhours/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var HappyHour = require('./happyhour.model');

// Get list of happyhours
exports.index = function (req, res) {
    HappyHour.find(function (err, happyhours) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(happyhours);
    });
};

// Get a single happyhour
exports.show = function (req, res) {
    HappyHour.findById(req.params.id, function (err, happyhour) {
        if (err) {
            return handleError(res, err);
        }
        if (!happyhour) {
            return res.status(404).send('Not Found');
        }
        return res.json(happyhour);
    });
};

// Executes search
exports.search = function (req, res) {
    console.info("QUERY RERCEIVED");
    console.info("QUERY>>" + JSON.stringify(req.query));
    console.info("QUERY>>" + JSON.stringify(req.params));
    HappyHour.find().or([
        {name: req.query.name},
        {contact: req.query.contact}
    ]).exec(function (err, happyhour) {
        if (err) {
            return handleError(res, err);
        }
        if (!happyhour) {
            return res.status(404).send('Not Found');
        }
        return res.json(happyhour);
    })
};
// query.or([{ color: 'red' }, { status: 'emergency' }])

// Creates a new happyhour in the DB.
exports.create = function (req, res) {
    HappyHour.create(req.body, function (err, happyhour) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(happyhour);
    });
};

// Updates an existing happyhour in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    HappyHour.findById(req.params.id, function (err, happyhour) {

        if (err) {

            return handleError(res, err);
        }
        if (!happyhour) {
            console.info('REACHED HERE');
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(happyhour, req.body);
        console.info('REACHED HERE' + JSON.stringify(updated));
        console.info('REACHED HERE' + JSON.stringify(req.body));
        updated.save(function (err) {
            if (err) {

                return handleError(res, err);
            }

            return res.status(200).json(happyhour);
        });
    });
};

// Deletes a happyhour from the DB.
exports.destroy = function (req, res) {
    HappyHour.findById(req.params.id, function (err, happyhour) {
        if (err) {
            return handleError(res, err);
        }
        if (!happyhour) {
            return res.status(404).send('Not Found');
        }
        happyhour.remove(function (err) {
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
