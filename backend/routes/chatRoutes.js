const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Initialize new chat session
router.post('/init', chatController.initChat);

// Send message and get response
router.post('/message', chatController.sendMessage);

// Get conversation history
router.get('/conversation/:sessionId', chatController.getConversation);

// Delete conversation (on refresh/leave)
router.post('/delete/:sessionId', chatController.deleteConversation);

// Update user profile
router.put('/profile/:sessionId', chatController.updateUserProfile);

// Get program recommendations
router.get('/recommendations/:sessionId', chatController.getRecommendations);

module.exports = router;
