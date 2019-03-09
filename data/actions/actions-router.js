const express = require('express');

const db = require('./actionModel');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).send('Hello from Actions')
})



module.exports = router