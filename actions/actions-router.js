const express = require('express');

const db = require('./actionModel');

const router = express.Router();

router.use(express.json());