var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activity = new Schema ({
    message: { type: String, required: [true,'message is required!!!']},
},
{
    timestamps: true
});

module.exports = mongoose.model('activity', activity);