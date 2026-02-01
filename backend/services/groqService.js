const Groq = require('groq-sdk');
const { programs, userPersonas, successStories } = require('../config/programsData');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are an AI assistant for Iron Lady, a premier leadership development organization for women professionals in India. Your role is to help prospective students find the right program and guide them through their journey.

ABOUT IRON LADY:
- Mission: Leadership development and empowerment for women professionals
- Founded: 10+ years ago
- Alumni: 78,000+ women trained
- Approach: "Business War Tactics" methodology based on Art of War
- Focus: Combat gender bias, salary negotiation, career advancement

AVAILABLE PROGRAMS:

1. MASTERCLASS (₹99, Entry Level, 2 Days)
   - For: Women with 5+ years experience, first-time attendees
   - Focus: Introduction to Business War Tactics, BHAG goal setting, negotiation
   - Outcomes: Confidence building, networking, community access

2. LEADERSHIP ESSENTIALS PROGRAM (LEP) (Intermediate, 3-6 Months)
   - For: First-time managers, team leads, new supervisors
   - Focus: Team management, delegation, strategic communication
   - Outcomes: Master essential leadership skills, build high-performance teams

3. MASTER OF BUSINESS WARFARE (MBW) (Advanced, 6-12 Months)
   - For: Senior managers, directors, those targeting C-suite
   - Focus: Advanced strategic planning, executive presence, organizational politics
   - Outcomes: C-suite preparation, strategic leadership mastery

4. 1 CRORE CLUB (Elite, Ongoing Membership)
   - For: Women earning or targeting ₹1 crore+ annually
   - Focus: Wealth creation, exclusive networking, business opportunities
   - Outcomes: Elite network access, premium mentoring, strategic partnerships

5. 100 BOARD MEMBERS PROGRAM (Elite, 12 Months)
   - For: C-suite leaders targeting board positions
   - Focus: Corporate governance, board dynamics, placement assistance
   - Outcomes: Board-ready profile, board placement opportunities

YOUR APPROACH:
1. Be warm, professional, and empowering
2. Ask relevant questions to understand user's:
   - Current career stage and role
   - Years of experience
   - Career goals and aspirations
   - Challenges they're facing
3. Recommend programs based on their profile
4. Share relevant success stories when appropriate
5. Guide them toward enrollment (starting with Masterclass for most users)
6. Capture their contact information when they show interest

CONVERSATION GUIDELINES:
- Keep responses concise and conversational (2-4 sentences typically)
- Ask one question at a time
- Be encouraging and supportive
- Use inclusive language
- Focus on their goals, not just program features
- For pricing beyond Masterclass, say "Contact us for detailed pricing"
- Emphasize the money-back guarantee for Masterclass
- Share that Iron Lady has trained 78,000+ women professionals

IMPORTANT:
- Never make false claims about outcomes
- Don't pressure users
- Respect their career journey
- Be honest if unsure about something
- Always end with a clear next step or question

Remember: You're helping women professionals take control of their careers and achieve their leadership goals.`;

class GroqService {
  /**
   * Generate AI response using Groq's Llama model
   */
  async generateResponse(messages, userProfile = {}) {
    try {
      // Prepare conversation history for Groq
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));

      // Add user context if available
      let contextPrompt = '';
      if (userProfile && Object.keys(userProfile).length > 0) {
        contextPrompt = `\n\nUSER CONTEXT:\n`;
        if (userProfile.name) contextPrompt += `Name: ${userProfile.name}\n`;
        if (userProfile.experience) contextPrompt += `Experience: ${userProfile.experience}\n`;
        if (userProfile.currentRole) contextPrompt += `Role: ${userProfile.currentRole}\n`;
        if (userProfile.careerGoals?.length) contextPrompt += `Goals: ${userProfile.careerGoals.join(', ')}\n`;
        if (userProfile.challenges?.length) contextPrompt += `Challenges: ${userProfile.challenges.join(', ')}\n`;
      }

      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT + contextPrompt
          },
          ...conversationHistory
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9,
        stream: false
      });

      return completion.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again.';
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error('Failed to generate AI response. Please check your API key and try again.');
    }
  }

  /**
   * Analyze user message to extract profile information
   */
  extractUserInfo(message) {
    const info = {};

    // Extract experience years
    const expMatch = message.match(/(\d+)\s*(?:\+)?\s*years?/i);
    if (expMatch) {
      info.experience = `${expMatch[1]} years`;
    }

    // Extract common challenges keywords
    const challengeKeywords = {
      'gender bias': ['bias', 'discrimination', 'sexism'],
      'salary': ['salary', 'pay', 'compensation', 'underpaid'],
      'promotion': ['promotion', 'career growth', 'advancement'],
      'confidence': ['confidence', 'imposter', 'self-doubt'],
      'work-life balance': ['work life', 'balance', 'burnout'],
      'leadership': ['leadership', 'management', 'team lead'],
      'politics': ['politics', 'office politics', 'workplace dynamics']
    };

    info.challenges = [];
    const lowerMessage = message.toLowerCase();
    for (const [challenge, keywords] of Object.entries(challengeKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        info.challenges.push(challenge);
      }
    }

    return info;
  }

  /**
   * Recommend programs based on user profile
   */
  recommendPrograms(userProfile) {
    const recommendations = [];

    // Extract years of experience
    let experienceYears = 0;
    if (userProfile.experience) {
      const match = userProfile.experience.match(/(\d+)/);
      if (match) experienceYears = parseInt(match[1]);
    }

    // Recommend based on experience level
    if (experienceYears <= 8) {
      recommendations.push(programs.masterclass);
      recommendations.push(programs.lep);
    } else if (experienceYears <= 15) {
      recommendations.push(programs.lep);
      recommendations.push(programs.mbw);
    } else {
      recommendations.push(programs.mbw);
      if (userProfile.challenges?.includes('salary') || 
          userProfile.careerGoals?.some(goal => goal.toLowerCase().includes('crore'))) {
        recommendations.push(programs.oneCroreClub);
      }
      if (userProfile.challenges?.includes('board') || 
          userProfile.careerGoals?.some(goal => goal.toLowerCase().includes('board'))) {
        recommendations.push(programs.boardMembers);
      }
    }

    // If no specific recommendation, default to masterclass
    if (recommendations.length === 0) {
      recommendations.push(programs.masterclass);
    }

    return recommendations;
  }

  /**
   * Get relevant success story
   */
  getRelevantSuccessStory(programId) {
    return successStories.find(story => story.program === programId) || successStories[0];
  }

  /**
   * Generate initial greeting
   */
  getInitialGreeting() {
    return `Hello! 👋 Welcome to Iron Lady, where we empower women professionals to break through barriers and achieve their leadership goals.

I'm here to help you discover the right program for your career journey. We've already transformed the careers of 78,000+ women professionals across India!

To get started, could you tell me a bit about yourself? What's your current role and how many years of experience do you have?`;
  }
}

module.exports = new GroqService();
