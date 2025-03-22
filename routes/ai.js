const express = require('express');
const router = express.Router();
const AI = require('../models/AI');

router.get('/', async (req, res) => {
    const data = await AI.find();
    res.json(data);
});

module.exports = router;
