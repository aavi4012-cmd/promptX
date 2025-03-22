const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
