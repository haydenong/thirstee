'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        first: String
        , last: String
    },
    email: {type: String, lowercase: true},
    gender: String,
    date_of_birth: Date,
    profile_pic_url: String,
    facebook: {id: String, token: String},
    google: {id: String, token: String},
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('User', UserSchema);
