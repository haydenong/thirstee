var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VendorSchema = new Schema({
    name: String,
    email: String,
    contact: Number,
    opening_hours:
    {	mon: String,
        tue: String,
        wed: String,
        thu: String,
        fri: String,
        sat: String,
        sun: String
    },
    drinks: [String],
    closest_stn: String,
    avg_price: String,
    happy_hour: [{type: Schema.Types.ObjectId, ref: 'HappyHour'}]
});

module.exports = mongoose.model('Vendor', VendorSchema);
