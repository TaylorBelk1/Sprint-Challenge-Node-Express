const express = require('express');

const db = require('./actionModel');
const db2 = require('../projects/projectModel');

const router = express.Router();

router.use(express.json());

// router.get('/', (req, res) => {
//     res.status(200).send('Hello from Actions')
// })

//get all
router.get('/', async (req, res) => {
    try {
        const actions = await db.get();
        res.status(200).json(actions)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the actions"
        });
    }
});

//get by id
router.get('/:id', async (req, res) => {
    try {
        const actions = await db.get(req.params.id);
        res.status(200).json(actions)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the action"
        });
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const actions = await db.remove(req.params.id);
        res.status(200).json(actions)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the action"
        });
    }
});

//post
router.post('/', async (req, res) => {
    const newAction = req.body;

    //1. if the req includes project id, description and notes then commence the try statement, if not move to bottom else statement
    if (newAction.project_id && newAction.description && newAction.notes) {
        //only executes if proj id, desc, and notes are in req body
        try {
            //waits for the response and sets actionId to the id assigned to newAction
            const actionId = await db2.get(newAction.project_id);
            console.log(actionId)
            //if actionId exists, then execute this block if not move to next else statement
            if(actionId) {
                //if actionID exists then make sure the length of newAction's description is less than or equal to 128,if so proceed with post request, if not, throw error message
                if(newAction.description.length <= 128) {
                    res.status(200).json(newAction)
                } else {
                    res.status(500).json({
                        message: 'Description is too long try again. limit is 128 characters. You ain\'t writing a book man'
                    })
                }
            } else {
                res.status(500).json({
                    message: "Project ID does not exist, please create that project first or use an existing project ID"
                })
            }
        } catch (e) {
            res.status(500).json({
                message: "failed to add the new item"
            });
        }
    } else {
        res.status(400).json({
            message: 'project_id, description and notes are required, verify you included these and try again'
        })
    }
});

//put
router.put('/:id', async (req, res) => {
    try {
        const actions = await db.update(req.params.id, req.body);
        res.status(200).json(actions)
    } catch (e) {
        res.status(500).json({
            message: "Failed to retreive the action"
        });
    }
});


module.exports = router