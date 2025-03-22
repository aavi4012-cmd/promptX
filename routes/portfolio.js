const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

router.get('/', async (req, res) => {
    const data = await Portfolio.find();
    res.json(data);
});

module.exports = router;
