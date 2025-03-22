const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

router.get('/', async (req, res) => {
    const data = await Business.find();
    res.json(data);
});

module.exports = router;
