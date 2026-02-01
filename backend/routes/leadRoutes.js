const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// Create new lead
router.post('/', leadController.createLead);

// Get all leads
router.get('/', leadController.getAllLeads);

// Get lead statistics
router.get('/stats', leadController.getLeadStats);

// Get single lead by ID
router.get('/:id', leadController.getLeadById);

// Update lead status
router.put('/:id', leadController.updateLeadStatus);

// Delete lead
router.delete('/:id', leadController.deleteLead);

module.exports = router;
