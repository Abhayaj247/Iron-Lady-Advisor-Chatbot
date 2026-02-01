const Lead = require('../models/Lead');
const Conversation = require('../models/Conversation');

/**
 * Create a new lead
 */
exports.createLead = async (req, res) => {
  try {
    const { sessionId, name, email, phone, experience, currentRole, careerGoals, challenges, interestedPrograms } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    // Check if lead already exists with this email
    const existingLead = await Lead.findOne({ email: email.toLowerCase() });
    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: 'A lead with this email already exists'
      });
    }

    // Find conversation
    let conversation = null;
    let conversationId = null;

    if (sessionId) {
      conversation = await Conversation.findOne({ sessionId });
      if (conversation) {
        conversationId = conversation._id;
        
        // Update conversation with lead captured flag
        conversation.leadCaptured = true;
        conversation.userProfile = {
          ...conversation.userProfile,
          name,
          email,
          phone,
          experience,
          currentRole,
          careerGoals,
          challenges
        };
        await conversation.save();
      }
    }

    // Create new lead
    const lead = new Lead({
      name,
      email: email.toLowerCase(),
      phone,
      experience,
      currentRole,
      careerGoals: careerGoals || [],
      challenges: challenges || [],
      interestedPrograms: interestedPrograms || [],
      conversationId,
      sessionId: sessionId || null,
      status: 'new',
      source: 'chatbot'
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: {
        leadId: lead._id,
        name: lead.name,
        email: lead.email
      }
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create lead'
    });
  }
};

/**
 * Get all leads (for internal use)
 */
exports.getAllLeads = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: {
        leads,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve leads'
    });
  }
};

/**
 * Get a single lead by ID
 */
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id)
      .populate('conversationId')
      .select('-__v');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve lead'
    });
  }
};

/**
 * Update lead status
 */
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['new', 'contacted', 'enrolled', 'not_interested'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    if (status) lead.status = status;
    if (notes) lead.notes = notes;

    await lead.save();

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lead'
    });
  }
};

/**
 * Delete a lead
 */
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete lead'
    });
  }
};

/**
 * Get lead statistics
 */
exports.getLeadStats = async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const contacted = await Lead.countDocuments({ status: 'contacted' });
    const enrolled = await Lead.countDocuments({ status: 'enrolled' });
    const notInterested = await Lead.countDocuments({ status: 'not_interested' });

    // Get leads by date (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentLeads = await Lead.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      success: true,
      data: {
        total,
        byStatus: {
          new: newLeads,
          contacted,
          enrolled,
          notInterested
        },
        recentLeads: {
          last7Days: recentLeads
        }
      }
    });
  } catch (error) {
    console.error('Get lead stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve lead statistics'
    });
  }
};
