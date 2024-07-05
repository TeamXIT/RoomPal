const express = require('express');
const { roomCreation, getAllRooms, updateRoomDetails, getRoomById, getRoomByName} = require('../controllers/roomController');
const router = express.Router();
router.post('/create',roomCreation);
router.get('/getAll',getAllRooms);
router.put('/update',updateRoomDetails);
router.get('/getById',getRoomById);
router.get('/getByName',getRoomByName);
module.exports = router;
