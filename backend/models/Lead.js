const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  currentRole: {
    type: String,
    trim: true
  },
  careerGoals: [String],
  challenges: [String],
  interestedPrograms: [{
    programId: String,
    programName: String
  }],
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  sessionId: {
    type: String,
    index: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'enrolled', 'not_interested'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'chatbot'
  },
  notes: String
}, {
  timestamps: true
});

// Index for efficient queries
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });

module.exports = mongoose.model('Lead', leadSchema);
