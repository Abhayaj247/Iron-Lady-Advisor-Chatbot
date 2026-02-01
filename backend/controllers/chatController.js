const Conversation = require('../models/Conversation');
const groqService = require('../services/groqService');
const { v4: uuidv4 } = require('crypto');

// Generate unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Initialize a new chat session
 * NOTE: We DON'T create a conversation in the database yet
 * Conversation is only created when user sends their first message
 */
exports.initChat = async (req, res) => {
  try {
    const sessionId = generateSessionId();
    const initialMessage = groqService.getInitialGreeting();

    // Just return the session ID and welcome message
    // Don't create conversation in database yet
    res.json({
      success: true,
      data: {
        sessionId,
        message: initialMessage
      }
    });
  } catch (error) {
    console.error('Init chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize chat session'
    });
  }
};

/**
 * Send message and get AI response
 */
exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and message are required'
      });
    }

    // Find conversation or create new one (if this is first message)
    let conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      // First message from user - create conversation now
      conversation = new Conversation({
        sessionId,
        messages: [],
        metadata: {
          userAgent: req.headers['user-agent'],
          ipAddress: req.ip
        }
      });
    }

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Extract user information from message
    const extractedInfo = groqService.extractUserInfo(message);
    if (extractedInfo.experience || extractedInfo.challenges.length > 0) {
      if (!conversation.userProfile) {
        conversation.userProfile = {};
      }
      if (extractedInfo.experience) {
        conversation.userProfile.experience = extractedInfo.experience;
      }
      if (extractedInfo.challenges.length > 0) {
        conversation.userProfile.challenges = [
          ...(conversation.userProfile.challenges || []),
          ...extractedInfo.challenges
        ];
      }
    }

    // Generate AI response
    const aiResponse = await groqService.generateResponse(
      conversation.messages,
      conversation.userProfile
    );

    // Add assistant response
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });

    await conversation.save();

    res.json({
      success: true,
      data: {
        message: aiResponse,
        conversation: {
          totalMessages: conversation.messages.length,
          userProfile: conversation.userProfile
        }
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process message'
    });
  }
};

/**
 * Get conversation history
 */
exports.getConversation = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    res.json({
      success: true,
      data: {
        messages: conversation.messages,
        userProfile: conversation.userProfile,
        recommendedPrograms: conversation.recommendedPrograms,
        metadata: conversation.metadata
      }
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve conversation'
    });
  }
};

/**
 * Update user profile in conversation
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const profileData = req.body;

    const conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Update user profile
    conversation.userProfile = {
      ...conversation.userProfile,
      ...profileData
    };

    await conversation.save();

    res.json({
      success: true,
      data: {
        userProfile: conversation.userProfile
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user profile'
    });
  }
};

/**
 * Delete conversation (called when user leaves/refreshes page)
 */
exports.deleteConversation = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Delete the conversation from database
    await Conversation.deleteOne({ sessionId });

    console.log(`🗑️  Deleted conversation: ${sessionId}`);

    // Return 204 No Content (for sendBeacon)
    res.status(204).send();
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(204).send(); // Still return 204 even on error (for sendBeacon)
  }
};
exports.getRecommendations = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Generate recommendations based on user profile
    const recommendations = groqService.recommendPrograms(
      conversation.userProfile || {}
    );

    // Save recommendations
    conversation.recommendedPrograms = recommendations.map(prog => ({
      programId: prog.id,
      programName: prog.name,
      recommendedAt: new Date()
    }));

    await conversation.save();

    res.json({
      success: true,
      data: {
        recommendations: recommendations.map(prog => ({
          id: prog.id,
          name: prog.name,
          tagline: prog.tagline,
          price: prog.price,
          level: prog.level,
          duration: prog.duration,
          outcomes: prog.outcomes,
          bestFor: prog.bestFor
        }))
      }
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations'
    });
  }
};
