const express = require('express');
const { giveRatings, getRating, getAllRatings, totalRatings } = require('../controllers/ratingsController');
const router = express.Router();
router.post('/giveRating',giveRatings);
router.get('/getRating',getRating);
router.get('/getAllRatings',getAllRatings);
router.get('/totalRatings',totalRatings);
module.exports = router;