const express = require('express');

const actionRoute = require('./data/actions/actions-router');
const projectRoute = require('./data/projects/projects-router');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.use('/actions', actionRoute);
server.use('/projects', projectRoute);

module.exports = server;