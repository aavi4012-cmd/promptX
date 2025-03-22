const mongoose = require('mongoose');

const aiSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AI', aiSchema);
