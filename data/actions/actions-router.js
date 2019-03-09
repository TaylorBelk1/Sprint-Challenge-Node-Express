const express = require('express');

const db = require('./actionModel');

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
    try {
        const action = await db.insert(req.body);
        //test that the input sent includes an id, description and a note
        if(action.project_id && action.description && action.notes) {
            //if so, test that the description length is less than or equal to 128 characters
            if(action.description.length <= 128) {
        //if so complete the res
                res.status(200).json(action)
            } else {
            //if not, throw error with error message
            res.status(500).json({
                message: 'Description is too long try again. limit is 128 characters. You ain\'t writing a book man'
            })
        }
        //if the id, description or notes are missing throw error message
        } else {
            res.status(500).json({
            message: 'project_id, description and notes are required, verify you included these and try again'
       })
     }
    } catch (e) {
        res.status(500).json({
            message: "failed to add the new item"
        });
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