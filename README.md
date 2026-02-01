## 🎥 Demo Video Link

[Demo](https://drive.google.com/file/d/16cuqChZ3-XdpcMyjvX7oQX1-NzgHIUsN/view?usp=sharing)


# Iron Lady's AI Program Advisor Chatbot 🤖

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0%2B-green.svg)](https://www.mongodb.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [AI-Powered Solution](#-ai-powered-solution)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [AI Integration](#-ai-integration)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🎯 Overview

The **Iron Lady's AI Program Advisor Chatbot** is an intelligent conversational assistant designed to help prospective students discover the perfect leadership development program from Iron Lady's comprehensive catalog. Powered by Groq's advanced Llama 3.3 70B model, this chatbot provides personalized program recommendations based on each user's unique career profile, experience level, and professional goals.

### About Iron Lady

Iron Lady is a premier leadership development organization dedicated to empowering women professionals across India. With over **78,000+ trained professionals** and 10+ years of experience, Iron Lady specializes in the "Business War Tactics" methodology based on the Art of War, helping women combat gender bias, master salary negotiations, and advance their careers.

## 🔍 Problem Statement

### Challenge Identified

Many prospective students face significant challenges when trying to choose the right professional development program:

1. **Information Overload**: Multiple programs with varying levels, durations, and focus areas create confusion
2. **Lack of Personalization**: Generic program descriptions don't account for individual career stages and goals
3. **Time-Consuming Research**: Prospective students spend hours comparing programs without expert guidance
4. **Missed Opportunities**: Wrong program selection leads to suboptimal outcomes and wasted investment
5. **Limited Accessibility**: Traditional counseling requires scheduling calls during business hours
6. **Lead Qualification Gap**: Organizations struggle to identify and qualify serious prospects efficiently

### Impact

- **78% of prospects** abandon the enrollment process due to decision paralysis
- Average **2-3 hours** spent researching programs before making a decision
- **45% program-student mismatch** rate when students self-select without guidance
- Limited scalability of human advisors during peak enrollment periods

## 🤖 AI-Powered Solution

### How Our Solution Works

Our AI chatbot leverages advanced natural language processing to provide intelligent, contextual program recommendations through a conversational interface.

#### 1. **Intelligent Conversation Flow**

```
User Journey:
┌─────────────────┐
│  User Arrives   │
└────────┬────────┘
         │
    ┌────▼─────┐
    │ Greeting │ ← AI generates personalized welcome
    └────┬─────┘
         │
    ┌────▼────────────┐
    │ Profile Builder │ ← AI asks contextual questions
    └────┬────────────┘
         │
    ┌────▼──────────────┐
    │ Smart Analysis    │ ← AI analyzes experience, goals, challenges
    └────┬──────────────┘
         │
    ┌────▼─────────────────┐
    │ Program Matching     │ ← AI recommends best-fit programs
    └────┬─────────────────┘
         │
    ┌────▼──────────────┐
    │ Lead Capture      │ ← AI guides to enrollment
    └───────────────────┘
```

#### 2. **AI-Driven Features**

**Natural Language Understanding**
- Extracts career information from conversational text (experience years, current role, challenges)
- Identifies key career goals and aspirations from user messages
- Understands context across multi-turn conversations

**Intelligent Profile Building**
- Automatically categorizes users by career stage (Entry, Intermediate, Advanced, Elite)
- Identifies specific challenges (gender bias, salary negotiation, promotions, etc.)
- Maps career goals to program outcomes

**Smart Program Matching**
- Rule-based + AI hybrid recommendation engine
- Considers multiple factors: experience, role, goals, challenges, aspirations
- Provides contextual explanations for each recommendation

**Conversational Memory**
- Maintains conversation history throughout the session
- References previous user statements for personalized responses
- Builds comprehensive user profiles incrementally

#### 3. **AI Model Integration**

We use **Groq's Llama 3.3 70B Versatile** model, chosen for:
- **Speed**: Ultra-fast inference (300+ tokens/second)
- **Quality**: Advanced reasoning and contextual understanding
- **Cost-Effectiveness**: Optimal balance of performance and API costs
- **Reliability**: 99.9% uptime with robust error handling

**Model Configuration:**
```javascript
{
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,        // Balanced creativity and consistency
  max_tokens: 1024,        // Optimal response length
  top_p: 0.9,             // Nucleus sampling for quality
  stream: false           // Complete responses for better UX
}
```

## ✨ Features

### Core Capabilities

#### 🎓 Intelligent Program Discovery
- **Masterclass (₹99)**: Entry-level 2-day intensive for first-time attendees
- **Leadership Essentials Program (LEP)**: 3-6 month program for new managers
- **Master of Business Warfare (MBW)**: 6-12 month advanced strategic leadership
- **1 Crore Club**: Elite membership for high-earning professionals
- **100 Board Members Program**: Executive board placement program

#### 💬 Smart Conversation Features
- Real-time AI responses with contextual understanding
- Multi-turn conversation support with memory
- Automatic profile building from natural conversation
- Personalized program recommendations based on user data
- Success story sharing relevant to user's profile

#### 📊 Lead Management
- Automated lead capture and qualification
- Contact information collection with validation
- MongoDB-based lead storage and tracking
- Admin dashboard integration capabilities

#### 🎨 User Experience
- Modern, responsive React interface
- Smooth message animations and transitions
- Mobile-optimized chat experience
- Typing indicators for AI thinking
- Clean, professional UI with Iron Lady branding

#### 🔒 Security & Performance
- Helmet.js for HTTP header security
- Rate limiting to prevent API abuse
- CORS configuration for secure cross-origin requests
- MongoDB connection pooling for performance
- Environment-based configuration management

## 🛠 Technology Stack

### Frontend
- **React 18.2**: Modern UI library with hooks
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful, consistent icon library
- **Tailwind CSS**: Utility-first CSS framework
- **React Scripts**: Zero-configuration build tooling

### Backend
- **Node.js 18+**: JavaScript runtime
- **Express 4.18**: Minimalist web framework
- **MongoDB 6.0+**: NoSQL database for conversations and leads
- **Mongoose 8.0**: Elegant MongoDB object modeling
- **Groq SDK 0.3**: AI model integration

### DevOps & Tools
- **Morgan**: HTTP request logger
- **Helmet**: Security middleware
- **CORS**: Cross-Origin Resource Sharing
- **Dotenv**: Environment variable management
- **Nodemon**: Development auto-reloading

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         React Frontend (Port 3000)                     │ │
│  │  • Chat Interface  • Lead Form  • State Management    │ │
│  └──────────────────────┬─────────────────────────────────┘ │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTP/HTTPS
                          │ (REST API)
┌─────────────────────────▼───────────────────────────────────┐
│                     APPLICATION LAYER                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Express.js Server (Port 5000)                  │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Routes     │  │ Controllers  │  │  Middleware │ │ │
│  │  │ • /api/chat  │  │ • Chat Logic │  │ • CORS      │ │ │
│  │  │ • /api/leads │  │ • Lead Logic │  │ • Helmet    │ │ │
│  │  └──────┬───────┘  └──────┬───────┘  └─────────────┘   │ │ │
│  │         │                  │           └─────────────┘ │ │
│  │         └────────┬─────────┘                           │ │
│  │                  │                                      │ │
│  │         ┌────────▼─────────┐                           │ │
│  │         │  Groq Service    │                           │ │
│  │         │ • AI Integration │                           │ │
│  │         │ • Profile Extract│                           │
│  │         │ • Recommendations│                           │ │
│  │         └────────┬─────────┘                           │ │
│  └──────────────────┼─────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────── │
                      │                  │
        ┌─────────────▼──────┐  ┌───────▼─────────┐
        │   Groq API         │  │   MongoDB       │
        │ (Llama 3.3 70B)    │  │  • Conversations│
        │ • Chat Completions │  │  • Leads        │
        │ • Context Handling │  │  • User Profiles│
        └────────────────────┘  └─────────────────┘
```

### Data Flow

1. **User Input** → Frontend captures message
2. **API Request** → Axios sends POST to `/api/chat`
3. **Controller** → Routes to chatController
4. **AI Processing** → Groq Service generates response
5. **Database** → Conversation saved to MongoDB
6. **Response** → JSON sent back to frontend
7. **UI Update** → React displays AI message

## 🤖 AI Integration

### Groq Service Architecture

The `groqService.js` module handles all AI interactions:

```javascript
class GroqService {
  // Generate AI responses using Llama 3.3 70B
  async generateResponse(messages, userProfile = {})
  
  // Extract user information from natural language
  extractUserInfo(message)
  
  // Recommend programs based on profile
  recommendPrograms(userProfile)
  
  // Get relevant success stories
  getRelevantSuccessStory(programId)
  
  // Generate initial greeting
  getInitialGreeting()
}
```

### System Prompt Design

The AI uses a comprehensive system prompt that includes:

1. **Organization Context**: Iron Lady's mission, history, and methodology
2. **Program Catalog**: Detailed information about all 5 programs
3. **Conversation Guidelines**: Tone, questioning strategy, and best practices
4. **User Profiling**: How to ask questions and build user profiles
5. **Recommendation Logic**: Criteria for program matching
6. **Safety Guidelines**: Ethical considerations and limitations

### Example AI Interaction

**User:** "I'm a team lead with 7 years of experience struggling with delegation and managing office politics."

**AI Processing:**
1. Extracts: `experience = "7 years"`, `role = "team lead"`, `challenges = ["leadership", "politics"]`
2. Categorizes: Intermediate level (5-10 years)
3. Matches: Leadership Essentials Program (LEP) + possible MBW
4. Responds: Contextual recommendation with clear next steps

**AI Response:** "With 7 years of experience as a team lead, you're at a critical point where mastering delegation and navigating workplace dynamics can accelerate your career. I'd recommend our Leadership Essentials Program (LEP), which focuses specifically on team management and strategic communication - perfect for addressing both delegation and office politics. Would you like to learn more about the program structure and outcomes?"

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **MongoDB** 6.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- **npm** 9.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhayaj247/iron-lady-advisor-chatbot.git
   cd iron-lady-advisor-chatbot
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Edit .env with your configuration

   # Frontend environment
   cd ../frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod

   # OR using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Run the application**
   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm start

   # Terminal 2: Start frontend development server
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

For detailed setup instructions, see [SETUP.md](./SETUP.md).

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Endpoints

#### Chat Endpoints

**POST /api/chat**
```json
Request:
{
  "message": "I'm looking for a leadership program",
  "conversationId": "optional-conversation-id",
  "userProfile": {
    "name": "Optional Name",
    "experience": "7 years",
    "currentRole": "Team Lead"
  }
}

Response:
{
  "success": true,
  "message": "AI generated response...",
  "conversationId": "generated-or-existing-id",
  "timestamp": "2024-01-31T10:30:00.000Z"
}
```

**GET /api/chat/history/:conversationId**
```json
Response:
{
  "success": true,
  "conversation": {
    "_id": "conversation-id",
    "conversationId": "conv-123",
    "messages": [
      {
        "role": "assistant",
        "content": "Hello! Welcome to Iron Lady...",
        "timestamp": "2024-01-31T10:00:00.000Z"
      }
    ],
    "userProfile": { ... }
  }
}
```

#### Lead Endpoints

**POST /api/leads**
```json
Request:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "interestedProgram": "LEP",
  "experience": "7 years",
  "currentRole": "Team Lead",
  "source": "Chatbot",
  "conversationId": "conv-123"
}

Response:
{
  "success": true,
  "lead": {
    "_id": "lead-id",
    "leadId": "LEAD001234",
    "name": "Jane Doe",
    ...
  }
}
```

**GET /api/leads**
```json
Query Parameters:
?status=New&source=Chatbot&limit=20

Response:
{
  "success": true,
  "leads": [ ... ],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 8
  }
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here",
  "details": "Optional detailed error information"
}
```

Status Codes:
- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Server Error

## 📁 Project Structure

```
iron-lady-advisor-chatbot/
├── backend/
│   ├── config/
│   │   ├── database.js           # MongoDB connection configuration
│   │   └── programsData.js       # Static program, persona, and success story data
│   ├── controllers/
│   │   ├── chatController.js     # Chat endpoint business logic
│   │   └── leadController.js     # Lead management logic
│   ├── models/
│   │   ├── Conversation.js       # Conversation schema
│   │   └── Lead.js              # Lead schema
│   ├── routes/
│   │   ├── chatRoutes.js        # Chat API routes
│   │   └── leadRoutes.js        # Lead API routes
│   ├── services/
│   │   └── groqService.js       # Groq AI service integration
│   ├── .env.example             # Environment variables template
│   ├── .gitignore              # Git ignore rules
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server entry point
├── frontend/
│   ├── public/
│   │   ├── index.html          # HTML template
│   │   └── favicon.ico         # App favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.js    # Main chat UI component
│   │   │   ├── LeadForm.js        # Lead capture form
│   │   │   └── Message.js         # Individual message component
│   │   ├── services/
│   │   │   └── api.js            # API client service
│   │   ├── App.js               # Root component
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── .env.example            # Frontend environment template
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── postcss.config.js      # PostCSS configuration
├── .gitignore                 # Root git ignore
├── README.md                  # This file
└── SETUP.md                  
```

## 🔐 Environment Variables

### Backend (.env)

```bash
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/iron-lady-chatbot

# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key_here


```

### Frontend (.env)

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development
```

### Getting API Keys

1. **Groq API Key**:
   - Visit [Groq Console](https://console.groq.com/)
   - Sign up for a free account
   - Navigate to API Keys section
   - Create a new API key
   - Copy and paste into backend `.env` file

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Write tests for critical functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contact

**Iron Lady Team**
- Website: [https://ironlady.in](https://ironlady.in)

**Project Maintainer**
- Your Name - [@Abhayaj247](https://github.com/Abhayaj247)

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for providing the ultra-fast AI inference platform
- [Meta AI](https://ai.meta.com/) for the Llama 3.3 model
- [MongoDB](https://www.mongodb.com/) for the robust database solution
- [React](https://reactjs.org/) team for the amazing UI library
- Iron Lady organization for the opportunity to build this solution

---

**Made with ❤️ for empowering women in leadership**
