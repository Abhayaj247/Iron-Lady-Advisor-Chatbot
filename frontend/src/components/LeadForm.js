import React, { useState } from 'react';
import { X, User, Mail, Phone, Briefcase } from 'lucide-react';

const LeadForm = ({ onSubmit, onClose, sessionId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    currentRole: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        sessionId
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-5">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-t-2xl relative">
          <h2 className="font-display text-2xl font-bold mb-2">Get Started with Iron Lady</h2>
          <p className="text-sm opacity-90">Share your details and we'll help you find the perfect program</p>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User size={16} />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border-2 rounded-lg text-[15px] transition-all focus:outline-none focus:ring-3 focus:ring-primary/10 ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:border-primary'
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail size={16} />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 border-2 rounded-lg text-[15px] transition-all focus:outline-none focus:ring-3 focus:ring-primary/10 ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-primary'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone size={16} />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              className={`w-full px-4 py-3 border-2 rounded-lg text-[15px] transition-all focus:outline-none focus:ring-3 focus:ring-primary/10 ${
                errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-primary'
              }`}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1 block">{errors.phone}</span>
            )}
          </div>

          {/* Experience Field */}
          <div>
            <label htmlFor="experience" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Briefcase size={16} />
              Years of Experience
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 5 years"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[15px] transition-all focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
            />
          </div>

          {/* Current Role Field */}
          <div>
            <label htmlFor="currentRole" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Briefcase size={16} />
              Current Role
            </label>
            <input
              type="text"
              id="currentRole"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
              placeholder="e.g., Senior Manager"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-[15px] transition-all focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
            />
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Submitting...' : 'Submit & Continue'}
          </button>

          {/* Privacy Note */}
          <p className="text-center text-xs text-gray-500 leading-relaxed">
            By submitting, you agree to receive communications from Iron Lady about our programs and services.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
