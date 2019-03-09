const express = require('express');

const db = require('./projectModel');

const router = express.Router();

router.use(express.json());

// router.get('/', (req, res) => {
//     res.send('Hello From Projects')
// })

//get all
router.get('/', async (req, res) => {
    try {
        const projects = await db.get();
        res.status(200).json(projects)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the projects"
        });
    }
});

//get by id
router.get('/:id', async (req, res) => {
    try {
        const projects = await db.get(req.params.id);
        res.status(200).json(projects)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the projects"
        });
    }
});

//get project actions
router.get('/actions/:id', async (req, res) => {
    try {
        const projects = await db.getProjectActions(req.params.id);
        res.status(200).json(projects)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the projects"
        });
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const projects = await db.remove(req.params.id);
        res.status(200).json(projects)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the projects"
        });
    }
});

//post
router.post('/', async (req, res) => {
    try{
        const projects = await db.insert(req.body);

        if(req.body.name && req.body.description) {
            res.status(200).json(projects)
        } else {
            res.status(500).json({
                message: "Name and Description missing, please try again"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "failed to add"
        })
    }
})

//put
router.put('/:id', async (req, res) => {
    try {
        const projects = await db.update(req.params.id, req.body);
        res.status(200).json(projects)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the action"
        });
    }
});

module.exports = router