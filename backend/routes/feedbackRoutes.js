const express = require('express');
const { giveFeedback, getAllFeedback } = require('../controllers/feedbackContoller');
const router = express.Router();
router.post('/giveFeedback',giveFeedback);
router.get('/getAllFeedback',getAllFeedback);
module.exports = router;