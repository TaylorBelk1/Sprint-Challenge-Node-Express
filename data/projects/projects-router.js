const express = require('express');

const db = require('./projectModel');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello From Projects')
})

module.exports = router