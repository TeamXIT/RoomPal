const express = require('express');
const { roomCreation, getAllRooms, updateRoomDetails, giveFeedback,getAllFeedback} = require('../controllers/roomController');
const router = express.Router();
router.post('/create',roomCreation);
router.get('/getAll',getAllRooms);
router.put('/update',updateRoomDetails);
router.post('/feedback',giveFeedback);
router.get('/getAllFeedback',getAllFeedback);

module.exports = router;
