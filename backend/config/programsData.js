// Iron Lady Programs Database
const programs = {
  masterclass: {
    id: 'masterclass',
    name: 'Iron Lady Masterclass',
    tagline: '2-Day Transformational Workshop',
    price: 99,
    originalPrice: 499,
    duration: '2 Days',
    format: 'Live Virtual',
    level: 'Entry Level',
    targetAudience: [
      'Women professionals with 5+ years experience',
      'First-time attendees to Iron Lady programs',
      'Those seeking introduction to Business War Tactics',
      'Women facing gender bias or career stagnation'
    ],
    outcomes: [
      'Learn Business War Tactics methodology',
      'Set your BHAG (Big Hairy Audacious Goal)',
      'Master powerful negotiation techniques',
      'Access to exclusive WhatsApp community',
      'Connect with 78,000+ Iron Lady alumni'
    ],
    topics: [
      'BHAG Goal Setting Framework',
      'Powerful Requests & Negotiation',
      'Business War Tactics Introduction',
      'Gender Bias Combat Strategies',
      'Career Advancement Blueprint'
    ],
    includes: [
      '2-day live interactive sessions',
      'WhatsApp community access',
      'Recorded sessions',
      'Certificate of completion',
      'Money-back guarantee (24 hours)'
    ],
    bestFor: [
      'career_exploration',
      'salary_negotiation',
      'confidence_building',
      'networking'
    ]
  },
  lep: {
    id: 'lep',
    name: 'Leadership Essentials Program (LEP)',
    tagline: 'For First-Time Managers & Supervisors',
    price: null,
    duration: '3-6 Months',
    format: 'Blended (Online + Classroom)',
    level: 'Intermediate',
    targetAudience: [
      'First-time managers and supervisors',
      'Team leads transitioning to management',
      'Women promoted to leadership roles',
      'Those managing teams for the first time'
    ],
    outcomes: [
      'Master essential leadership skills',
      'Learn to manage and motivate teams',
      'Develop strategic thinking abilities',
      'Build confidence in leadership role',
      'Navigate organizational politics effectively'
    ],
    topics: [
      'Transition from Individual Contributor to Leader',
      'Team Management & Motivation',
      'Delegation & Performance Management',
      'Strategic Communication',
      'Conflict Resolution',
      'Building High-Performance Teams'
    ],
    includes: [
      'Comprehensive curriculum',
      'Individual mentoring sessions',
      'App-based learning modules',
      'Peer networking opportunities',
      'Leadership toolkit and resources'
    ],
    bestFor: [
      'new_manager',
      'team_leadership',
      'management_skills',
      'first_promotion'
    ]
  },
  mbw: {
    id: 'mbw',
    name: 'Master of Business Warfare (MBW)',
    tagline: 'Advanced Strategic Leadership Program',
    price: null,
    duration: '6-12 Months',
    format: 'Blended (Online + Classroom + Mentoring)',
    level: 'Advanced',
    targetAudience: [
      'Senior managers and directors',
      'Women targeting C-suite positions',
      'Experienced leaders seeking strategic edge',
      'Those managing multiple teams/departments'
    ],
    outcomes: [
      'Master advanced Business War Tactics',
      'Develop C-suite level strategic thinking',
      'Navigate complex organizational dynamics',
      'Build executive presence and influence',
      'Prepare for board-level leadership'
    ],
    topics: [
      'Advanced Strategic Planning',
      'Organizational Politics Mastery',
      'Executive Communication',
      'Change Management',
      'Building Strategic Alliances',
      'Crisis Management',
      'Board-Level Thinking'
    ],
    includes: [
      'Intensive training modules',
      'One-on-one executive mentoring',
      'Peer advisory groups',
      'Exclusive masterclasses with CEOs',
      'Lifetime alumni network access',
      'Career advancement support'
    ],
    bestFor: [
      'senior_leadership',
      'c_suite_preparation',
      'strategic_thinking',
      'executive_presence'
    ]
  },
  oneCroreClub: {
    id: 'oneCroreClub',
    name: '1 Crore Club',
    tagline: 'Elite Program for High Earners',
    price: null,
    duration: 'Ongoing Membership',
    format: 'Exclusive Events + Mentoring + Network',
    level: 'Elite',
    targetAudience: [
      'Women earning or targeting ₹1 crore+ annually',
      'Senior executives and entrepreneurs',
      'C-suite leaders',
      'High-achieving professionals'
    ],
    outcomes: [
      'Join elite network of top earners',
      'Access exclusive business opportunities',
      'Premium mentoring from industry leaders',
      'Strategic career and wealth planning',
      'Unparalleled networking opportunities'
    ],
    topics: [
      'Wealth Creation Strategies',
      'Executive Career Acceleration',
      'Board Memberships & Advisory Roles',
      'Investment & Financial Planning',
      'Personal Branding at Executive Level',
      'Global Leadership Opportunities'
    ],
    includes: [
      'Exclusive 1CR Club events',
      'Premium networking opportunities',
      'One-on-one sessions with CEOs',
      'Luxury venue celebrations (Hyatt, etc.)',
      'Lifetime membership benefits',
      'Business partnership opportunities'
    ],
    bestFor: [
      'high_earner',
      'c_suite',
      'entrepreneur',
      'wealth_creation'
    ]
  },
  boardMembers: {
    id: 'boardMembers',
    name: '100 Board Members Program',
    tagline: 'Pathway to Board Leadership',
    price: null,
    duration: '12 Months',
    format: 'Blended (Intensive Training + Placements)',
    level: 'Elite',
    targetAudience: [
      'Senior executives targeting board positions',
      'C-suite leaders seeking board memberships',
      'Experienced professionals ready for governance roles',
      'Women wanting to join corporate boards'
    ],
    outcomes: [
      'Prepare for board-level governance',
      'Understand fiduciary responsibilities',
      'Build board-ready profile',
      'Access board placement opportunities',
      'Join elite board members network'
    ],
    topics: [
      'Corporate Governance',
      'Board Dynamics & Effectiveness',
      'Financial Oversight & Risk Management',
      'Legal & Ethical Responsibilities',
      'Strategic Board Contribution',
      'Building Board Profile',
      'Board Interview Preparation'
    ],
    includes: [
      'Comprehensive board training',
      'Profile building support',
      'Board placement assistance',
      'Mentoring from existing board members',
      'Exclusive board networking events',
      'Ongoing board member support'
    ],
    bestFor: [
      'board_member',
      'corporate_governance',
      'c_suite',
      'strategic_leadership'
    ]
  }
};

// User personas and their ideal programs
const userPersonas = {
  entry_level: {
    experience: '5-8 years',
    challenges: ['gender_bias', 'confidence', 'salary_low', 'career_stagnation'],
    recommendedPrograms: ['masterclass', 'lep']
  },
  mid_career: {
    experience: '8-15 years',
    challenges: ['first_management_role', 'team_leadership', 'work_life_balance', 'politics'],
    recommendedPrograms: ['lep', 'mbw']
  },
  senior_level: {
    experience: '15+ years',
    challenges: ['c_suite_preparation', 'executive_presence', 'strategic_thinking', 'board_ambitions'],
    recommendedPrograms: ['mbw', 'oneCroreClub', 'boardMembers']
  },
  entrepreneur: {
    experience: 'varies',
    challenges: ['business_growth', 'leadership', 'scaling', 'strategic_partnerships'],
    recommendedPrograms: ['mbw', 'oneCroreClub']
  }
};

// Success stories
const successStories = [
  {
    name: 'Priya Sharma',
    program: 'masterclass',
    achievement: '40% salary increase within 6 months',
    testimonial: 'The masterclass gave me the confidence to negotiate fearlessly. I went from accepting whatever was offered to commanding my worth.'
  },
  {
    name: 'Anita Desai',
    program: 'lep',
    achievement: 'Promoted to Senior Manager',
    testimonial: 'LEP transformed how I lead my team. The Business War Tactics helped me navigate complex organizational politics.'
  },
  {
    name: 'Meera Krishnan',
    program: 'mbw',
    achievement: 'Became VP of Operations',
    testimonial: 'MBW prepared me for C-suite thinking. Within a year, I was leading a 200-person department.'
  },
  {
    name: 'Sunita Reddy',
    program: 'oneCroreClub',
    achievement: 'Crossed ₹1.5 crore annual package',
    testimonial: 'The 1CR Club network opened doors I didn\'t know existed. The mentorship was invaluable.'
  }
];

module.exports = {
  programs,
  userPersonas,
  successStories
};
