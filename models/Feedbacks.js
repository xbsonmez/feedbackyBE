const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    feedbacks: {type : String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedbacks', feedbackSchema);