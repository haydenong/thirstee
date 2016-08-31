var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HappyHourSchema = new Schema({
    name: [{type: Schema.Types.ObjectId, ref: 'Vendor'}],
    happy_hour: {
        mon: {duration: String,
        one_for_one: String},
        tue: {duration: String,
            one_for_one: String},
        wed: {duration: String,
            one_for_one: String},
        thu: {duration: String,
            one_for_one: String},
        fri: {duration: String,
            one_for_one: String},
        sat: {duration: String,
            one_for_one: String},
        sun: {duration: String,
            one_for_one: String}
    }
});

module.exports = mongoose.model('HappyHour', HappyHourSchema);


