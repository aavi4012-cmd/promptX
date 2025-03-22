const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    cashFlow: Number,
    expenses: Number,
    forecast: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);
