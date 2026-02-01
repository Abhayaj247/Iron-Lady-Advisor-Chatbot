const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  messages: [messageSchema],
  userProfile: {
    name: String,
    email: String,
    phone: String,
    experience: String,
    currentRole: String,
    careerGoals: [String],
    challenges: [String]
  },
  recommendedPrograms: [{
    programId: String,
    programName: String,
    recommendedAt: Date
  }],
  leadCaptured: {
    type: Boolean,
    default: false
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
    startedAt: {
      type: Date,
      default: Date.now
    },
    lastActivity: {
      type: Date,
      default: Date.now
    },
    totalMessages: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
conversationSchema.index({ 'metadata.startedAt': -1 });
conversationSchema.index({ leadCaptured: 1 });

// Update lastActivity on each message
conversationSchema.pre('save', function(next) {
  this.metadata.lastActivity = new Date();
  this.metadata.totalMessages = this.messages.length;
  next();
});

module.exports = mongoose.model('Conversation', conversationSchema);
