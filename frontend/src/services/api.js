import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const chatAPI = {
  // Initialize new chat session
  initChat: async () => {
    try {
      const response = await apiClient.post('/chat/init');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to initialize chat');
    }
  },

  // Send message
  sendMessage: async (sessionId, message) => {
    try {
      const response = await apiClient.post('/chat/message', {
        sessionId,
        message,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },

  // Get conversation history
  getConversation: async (sessionId) => {
    try {
      const response = await apiClient.get(`/chat/conversation/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get conversation');
    }
  },

  // Update user profile
  updateUserProfile: async (sessionId, profileData) => {
    try {
      const response = await apiClient.put(`/chat/profile/${sessionId}`, profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Get recommendations
  getRecommendations: async (sessionId) => {
    try {
      const response = await apiClient.get(`/chat/recommendations/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get recommendations');
    }
  },
};

const leadAPI = {
  // Create new lead
  createLead: async (leadData) => {
    try {
      const response = await apiClient.post('/leads', leadData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create lead');
    }
  },

  // Get lead stats
  getLeadStats: async () => {
    try {
      const response = await apiClient.get('/leads/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get lead stats');
    }
  },
};

export { chatAPI, leadAPI };
export default apiClient;
