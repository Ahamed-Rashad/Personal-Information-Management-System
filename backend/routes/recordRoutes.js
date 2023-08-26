const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

router.get('/get', recordController.getRecords);
router.post('/post', recordController.createRecord);
router.put('/update/:id', recordController.updateRecord);
router.delete('/delete/:id', recordController.deleteRecord);

module.exports = router;
