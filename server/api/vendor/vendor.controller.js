/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /vendors              ->  index
 * POST    /vendors              ->  create
 * GET     /vendors/:id          ->  show
 * PUT     /vendors/:id          ->  update
 * DELETE  /vendors/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Vendor = require('./vendor.model');

// Get list of vendors
exports.index = function (req, res) {
    Vendor.find(function (err, vendors) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(vendors);
    });
};

// Get a single vendor
exports.show = function (req, res) {
    Vendor.findById(req.params.id, function (err, vendor) {
        if (err) {
            return handleError(res, err);
        }
        if (!vendor) {
            return res.status(404).send('Not Found');
        }
        return res.json(vendor);
    });
};

// Executes search
exports.search = function (req, res) {
    Vendor.find().or([
        {name: req.query.name},
        {contact: req.query.contact}
    ]).exec(function (err, vendor) {
        if (err) {
            return handleError(res, err);
        }
        if (!vendor) {
            return res.status(404).send('Not Found');
        }
        return res.json(vendor);
    })
};

// Creates a new vendor in the DB.
exports.create = function (req, res) {
    Vendor.create(req.body, function (err, vendor) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(vendor);
    });
};

// Updates an existing vendor in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Vendor.findById(req.params.id, function (err, vendor) {
        if (err) {
            return handleError(res, err);
        }
        if (!vendor) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(vendor, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(vendor);
        });
    });
};

// Deletes a vendor from the DB.
exports.destroy = function (req, res) {
    Vendor.findById(req.params.id, function (err, vendor) {
        if (err) {
            return handleError(res, err);
        }
        if (!vendor) {
            return res.status(404).send('Not Found');
        }
        vendor.remove(function (err) {
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
