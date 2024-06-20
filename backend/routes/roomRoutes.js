const express = require('express');
const { roomCreation, getAllRooms, updateRoomDetails} = require('../controllers/roomController');
const router = express.Router();
router.post('/create',roomCreation);
router.get('/getAll',getAllRooms);
router.put('/update',updateRoomDetails);

module.exports = router;
