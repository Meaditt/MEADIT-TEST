/**
 * Pain Wall Interactive Experience - Content
 * Complete copy for the time-waste calculator
 */

export interface PainPoint {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  visceralDescription: string;
  internalMonologue: string;
  defaultFrequency: number; // times per day
  defaultDuration: number; // minutes each
  category: 'communication' | 'operations' | 'marketing' | 'data';
}

export const painPoints: PainPoint[] = [
  {
    id: 'repetitive-emails',
    icon: '📧',
    title: 'Repetitive Emails',
    subtitle: 'Same questions, different inbox',
    visceralDescription:
      "You're typing the same explanation for the third time today. Your fingers know the words before your brain does. Another 'What are your hours?' Another 'Do you offer X?' Another chunk of your day evaporated.",
    internalMonologue:
      '"I swear I just answered this yesterday. Why don\'t I have a template for this? Wait, I do have a template... where did I save it?"',
    defaultFrequency: 8,
    defaultDuration: 7,
    category: 'communication',
  },
  {
    id: 'booking-management',
    icon: '📅',
    title: 'Booking Management',
    subtitle: 'The back-and-forth calendar dance',
    visceralDescription:
      "Twelve texts to schedule one appointment. 'Does Tuesday work?' 'No, how about Thursday?' 'Morning or afternoon?' Your calendar app is open in three tabs. Someone just double-booked you because you forgot to update the spreadsheet.",
    internalMonologue:
      '"If one more person asks if I have availability without checking my calendar link... which I probably forgot to send them... again."',
    defaultFrequency: 6,
    defaultDuration: 12,
    category: 'operations',
  },
  {
    id: 'review-responses',
    icon: '⭐',
    title: 'Review Responses',
    subtitle: 'Every review needs a personal touch',
    visceralDescription:
      "Tab open to Google Reviews. Tab open to Facebook. Tab open to Yelp. Tab open to TripAdvisor. You're crafting unique responses to 'Great service!' and trying to sound genuine for the 47th 'Thank you for your review' this month.",
    internalMonologue:
      '"I appreciate their feedback, but how many ways can I say thanks? And that negative review needs a careful response... let me draft this three times."',
    defaultFrequency: 5,
    defaultDuration: 8,
    category: 'communication',
  },
  {
    id: 'data-entry',
    icon: '⌨️',
    title: 'System Data Entry',
    subtitle: 'Copy-paste between your digital filing cabinets',
    visceralDescription:
      "Customer info in your email. Manually typing it into your CRM. Then into your billing system. Then into your spreadsheet. One typo means doing it all again. Your fingers are cramping and you've lost track of where you are.",
    internalMonologue:
      '"There has to be a better way. This is literally the same information in four places. Did I already enter this one or not?"',
    defaultFrequency: 10,
    defaultDuration: 5,
    category: 'data',
  },
  {
    id: 'social-media',
    icon: '📱',
    title: 'Social Media',
    subtitle: 'Feeding the content machine',
    visceralDescription:
      "It's Tuesday morning and you haven't posted since Friday. Panic. You're scrolling your camera roll looking for something postable. Writing a caption. Copying it to three platforms. Individually. Hashtags not working on Instagram. Starting over.",
    internalMonologue:
      '"I should batch this. I should plan ahead. Why am I always doing this last minute? What\'s an engaging caption for a photo of... this?"',
    defaultFrequency: 3,
    defaultDuration: 15,
    category: 'marketing',
  },
  {
    id: 'follow-ups',
    icon: '🔄',
    title: 'Follow-up Sequences',
    subtitle: 'The reminder you forgot to send',
    visceralDescription:
      "Mental calculation: who did I email three days ago? Check sent folder. Make a note to follow up. Forget the note. Remember at 11pm. Draft follow-up. It's too late to send now. Tomorrow. Maybe. Probably lose the sale.",
    internalMonologue:
      '"If I don\'t follow up, they\'ll forget about us. But I can\'t seem to remember to follow up. There\'s definitely someone I\'m forgetting right now."',
    defaultFrequency: 4,
    defaultDuration: 10,
    category: 'communication',
  },
  {
    id: 'report-generation',
    icon: '📊',
    title: 'Report Generation',
    subtitle: 'Manual math from six sources',
    visceralDescription:
      "Export from Square. Export from Google Analytics. Export from your scheduling system. Open Excel. Start copying numbers. Make a chart. Wrong numbers. Start over. Your weekly sales report takes you four hours because nothing talks to anything else.",
    internalMonologue:
      '"Why is this so complicated? I\'m just trying to see how we did this month. The data exists, it\'s just scattered across platforms."',
    defaultFrequency: 2,
    defaultDuration: 45,
    category: 'data',
  },
  {
    id: 'support-tickets',
    icon: '🎫',
    title: 'Support Tickets',
    subtitle: 'Every question feels urgent',
    visceralDescription:
      "Notification. Customer question. Stop what you're doing. Answer it. Five minutes later: another question, same customer. Twenty minutes later: different customer, same question as the first customer. Your actual work isn't getting done.",
    internalMonologue:
      '"I need to help them, but I also need to run my business. Why is the same question coming up over and over? I should write an FAQ. When would I have time for that?"',
    defaultFrequency: 7,
    defaultDuration: 9,
    category: 'communication',
  },
  {
    id: 'invoice-processing',
    icon: '💰',
    title: 'Invoice Processing',
    subtitle: 'Money admin that makes no money',
    visceralDescription:
      "Create invoice in system. Download PDF. Email to customer. Customer asks for modification. Edit invoice. Re-send. Track who paid. Send payment reminders. Follow up on late payments. Reconcile in your accounting software. Your bookkeeper asks for clarification on three invoices from last month.",
    internalMonologue:
      '"I just want to get paid for the work I did. Why does the paperwork take longer than the actual service?"',
    defaultFrequency: 4,
    defaultDuration: 12,
    category: 'operations',
  },
  {
    id: 'inventory-updates',
    icon: '📦',
    title: 'Inventory Updates',
    subtitle: 'Stock tracking across platforms',
    visceralDescription:
      "Sold three units online. Update website. Update accounting system. Update spreadsheet. Customer in store buys the last one. Rush to update everything. Get message: someone just ordered it online. Now you're out of stock but your website says available.",
    internalMonologue:
      '"How do big companies do this? There has to be one system that updates everywhere. I just told someone we have it and we don\'t."',
    defaultFrequency: 5,
    defaultDuration: 8,
    category: 'operations',
  },
  {
    id: 'lead-qualification',
    icon: '🎯',
    title: 'Lead Qualification',
    subtitle: 'Sorting tire-kickers from buyers',
    visceralDescription:
      "New inquiry. Check their message. Google their name. Check their business. Assess if they're serious. Draft careful questions to qualify budget. Wait for response. They ghost. Start over with the next one. 80% of your leads go nowhere but take 100% of your initial time.",
    internalMonologue:
      '"Are they ready to buy or just browsing? I don\'t want to be pushy but I also can\'t waste time on people who aren\'t serious."',
    defaultFrequency: 6,
    defaultDuration: 11,
    category: 'communication',
  },
  {
    id: 'content-scheduling',
    icon: '🗓️',
    title: 'Content Scheduling',
    subtitle: 'Planning posts you could automate',
    visceralDescription:
      "Batch create content. Open Buffer. Schedule one. Wrong image size. Resize. Upload again. Copy to Facebook scheduler. Different character limit. Edit caption. Copy to LinkedIn. Re-format. Realize you missed optimal posting time. Reschedule everything.",
    internalMonologue:
      '"I spent two hours creating content and another hour just getting it scheduled. The scheduling feels like it takes longer than the creation."',
    defaultFrequency: 3,
    defaultDuration: 20,
    category: 'marketing',
  },
];

export interface DamageReveal {
  hoursPerWeek: {
    headline: string; // use {hours} variable
    subheadline: string;
    emotionalPunch: string;
  };
  hoursPerYear: {
    headline: string; // use {hours} variable
    comparison: string;
  };
  daysOfLife: {
    headline: string; // use {days} variable
    gutPunch: string;
  };
}

export const damageReveal: DamageReveal = {
  hoursPerWeek: {
    headline: 'You lose {hours} hours every week to repetitive tasks',
    subheadline: 'Not sometimes. Not occasionally. Every. Single. Week.',
    emotionalPunch:
      "That's time you'll never get back. Time you could spend growing your business, serving customers better, or actually leaving work on time.",
  },
  hoursPerYear: {
    headline: '{hours} hours per year',
    comparison:
      "That's more than a month of full-time work. Imagine what you could build, launch, or accomplish with an extra month.",
  },
  daysOfLife: {
    headline: '{days} full days of your life',
    gutPunch:
      'Not work days. Days of your actual life. Spent copy-pasting, retyping the same emails, and clicking between tabs. Days you could spend anywhere else.',
  },
};

export interface DaySimulation {
  before: {
    title: string;
    description: string;
    timeBlocks: Array<{
      time: string;
      label: string;
      type: 'waste' | 'work' | 'life';
    }>;
  };
  after: {
    title: string;
    description: string;
    timeBlocks: Array<{
      time: string;
      label: string;
      type: 'work' | 'life' | 'growth';
    }>;
  };
}

export const daySimulation: DaySimulation = {
  before: {
    title: 'Your Day Now',
    description: 'Red blocks are time lost to repetitive tasks',
    timeBlocks: [
      { time: '8:00 AM', label: 'Check and respond to overnight emails', type: 'waste' },
      { time: '8:30 AM', label: 'Update inventory across systems', type: 'waste' },
      { time: '9:00 AM', label: 'Actual client work', type: 'work' },
      { time: '10:00 AM', label: 'Answer customer questions', type: 'waste' },
      { time: '10:30 AM', label: 'Process bookings and scheduling conflicts', type: 'waste' },
      { time: '11:30 AM', label: 'Actual client work', type: 'work' },
      { time: '12:30 PM', label: 'Respond to reviews', type: 'waste' },
      { time: '1:00 PM', label: 'Lunch (checking phone)', type: 'life' },
      { time: '2:00 PM', label: 'Data entry from morning', type: 'waste' },
      { time: '2:30 PM', label: 'Actual client work', type: 'work' },
      { time: '4:00 PM', label: 'Follow-up emails to leads', type: 'waste' },
      { time: '4:30 PM', label: 'Create and schedule social post', type: 'waste' },
      { time: '5:00 PM', label: 'Generate invoice and send', type: 'waste' },
      { time: '5:30 PM', label: 'Finish incomplete work from earlier', type: 'work' },
      { time: '7:00 PM', label: 'Home (still thinking about tasks)', type: 'life' },
    ],
  },
  after: {
    title: 'Your Day Automated',
    description: 'Same work done. Hours reclaimed. Life in green.',
    timeBlocks: [
      { time: '8:00 AM', label: 'Review automated overnight responses', type: 'work' },
      { time: '8:15 AM', label: 'Actual client work', type: 'work' },
      { time: '10:30 AM', label: 'Strategy and growth planning', type: 'growth' },
      { time: '11:30 AM', label: 'Actual client work', type: 'work' },
      { time: '1:00 PM', label: 'Real lunch break', type: 'life' },
      { time: '2:00 PM', label: 'Actual client work', type: 'work' },
      { time: '4:00 PM', label: 'Creative projects or new initiative', type: 'growth' },
      { time: '5:00 PM', label: 'Done. Actually done.', type: 'life' },
      { time: '5:30 PM', label: 'Dinner with family', type: 'life' },
      { time: '7:00 PM', label: 'Your life. Your time. Your choice.', type: 'life' },
    ],
  },
};

export interface LifeBackScenario {
  hoursReclaimed: string;
  activities: Array<{
    activity: string;
    emotionalHook: string;
  }>;
}

export const lifeBackScenarios: LifeBackScenario[] = [
  {
    hoursReclaimed: '5 hours/week',
    activities: [
      {
        activity: 'Launch that side project',
        emotionalHook:
          "The one you've been thinking about for months. Five hours is enough to build, test, and iterate.",
      },
      {
        activity: 'Actually learn a new skill',
        emotionalHook:
          'Not just watch videos about it. Practice. Improve. Five hours of focused learning every week compounds fast.',
      },
      {
        activity: 'Leave work at 5pm',
        emotionalHook:
          "Every day. Not 'catch up later.' Not 'just one more thing.' Actually done when you say you're done.",
      },
    ],
  },
  {
    hoursReclaimed: '10 hours/week',
    activities: [
      {
        activity: 'Take Fridays off',
        emotionalHook:
          '52 extra days per year. Plan trips. Long weekends. The four-day work week people talk about.',
      },
      {
        activity: 'Build a real marketing strategy',
        emotionalHook:
          "Not reactive posts. Actual campaigns. Content that converts. SEO that works. Finally do marketing right.",
      },
      {
        activity: 'Spend time with people you love',
        emotionalHook:
          "Ten hours is dinner every night. Weekends that aren't about catching up. Being present instead of distracted.",
      },
    ],
  },
  {
    hoursReclaimed: '20+ hours/week',
    activities: [
      {
        activity: 'Scale your business',
        emotionalHook:
          "Twenty hours is enough to build systems, hire properly, and grow revenue. You've been stuck because you've been busy. Not anymore.",
      },
      {
        activity: 'Start a second revenue stream',
        emotionalHook:
          'Consult. Create a product. Launch a course. Twenty hours is a part-time business on top of your full-time one.',
      },
      {
        activity: 'Reclaim your life',
        emotionalHook:
          "This isn't about productivity. It's about getting your time back. Your mornings. Your evenings. Your weekends. Your life.",
      },
    ],
  },
];

export interface PersonalizedCTA {
  timeWaste: 'low' | 'medium' | 'high';
  categoryFocus?: 'communication' | 'operations' | 'marketing' | 'data';
  headline: string;
  subheadline: string;
  buttonText: string;
  urgencyLine: string;
}

export const personalizedCTAs: PersonalizedCTA[] = [
  // Low time waste (< 5 hours)
  {
    timeWaste: 'low',
    headline: 'Five hours might not sound like much',
    subheadline:
      "But it's 250 hours per year. That's six full work weeks you're giving away to repetitive tasks.",
    buttonText: 'See What We Can Automate',
    urgencyLine:
      "Small leaks sink ships. Let's plug yours before they get bigger.",
  },
  {
    timeWaste: 'low',
    categoryFocus: 'communication',
    headline: 'Your inbox is stealing time you could use elsewhere',
    subheadline:
      'Even a few hours per week adds up. Automated responses, smart routing, and intelligent follow-ups can give you that time back.',
    buttonText: 'Automate My Communication',
    urgencyLine:
      'Every email you manually respond to is time you could spend growing.',
  },

  // Medium time waste (5-15 hours)
  {
    timeWaste: 'medium',
    headline: 'Ten hours per week is half a workweek',
    subheadline:
      "You're working six days to accomplish five days of work. Automation can give you that day back. Every week.",
    buttonText: 'Show Me How to Get 10 Hours Back',
    urgencyLine:
      "You've been doing this for how long? Multiply your weekly hours by 52. That's how much life you've lost.",
  },
  {
    timeWaste: 'medium',
    categoryFocus: 'operations',
    headline: 'Your operations are running you',
    subheadline:
      "Bookings, inventory, invoices: these should be automatic. You're spending 500+ hours per year on admin work that could run itself.",
    buttonText: 'Automate My Operations',
    urgencyLine:
      "Every week you wait is another 10 hours you won't get back.",
  },
  {
    timeWaste: 'medium',
    categoryFocus: 'marketing',
    headline: 'Your marketing is eating your day',
    subheadline:
      "Posting, scheduling, responding. You're spending more time managing content than creating strategy. Automation fixes this.",
    buttonText: 'Automate My Marketing',
    urgencyLine:
      'Marketing should grow your business, not consume it.',
  },

  // High time waste (15+ hours)
  {
    timeWaste: 'high',
    headline: 'Twenty hours per week is a crisis',
    subheadline:
      "You're working two full-time jobs. One is running your business. The other is copy-pasting, rescheduling, and clicking between tabs. Fire the second job.",
    buttonText: 'Get My Time Back Now',
    urgencyLine:
      "This isn't sustainable. You know it. Let's fix it this week.",
  },
  {
    timeWaste: 'high',
    categoryFocus: 'data',
    headline: 'Your data work is drowning you',
    subheadline:
      "Manual entry, system updates, report generation. You're spending 1,000+ hours per year moving information around. This is exactly what computers are for.",
    buttonText: 'Automate My Data Flow',
    urgencyLine:
      'Every day you wait is another 3+ hours lost to tasks that should be automatic.',
  },
  {
    timeWaste: 'high',
    categoryFocus: 'communication',
    headline: 'Your communication load is unsustainable',
    subheadline:
      "Emails, follow-ups, support, reviews. You're running a customer service department by yourself. AI agents can handle 80% of this while you sleep.",
    buttonText: 'Deploy AI Communication Agents',
    urgencyLine:
      "You can't scale if you're personally responding to everything. Automate now.",
  },
  {
    timeWaste: 'high',
    categoryFocus: 'operations',
    headline: 'Your business is running you into the ground',
    subheadline:
      "Twenty hours of operational tasks per week means you're an employee of your own business. Automation makes you the owner again.",
    buttonText: 'Transform My Operations',
    urgencyLine:
      'This is the bottleneck. Remove it and everything else becomes possible.',
  },
];

export interface IntroContent {
  headline: string;
  subheadline: string;
  instructions: string;
}

export const introContent: IntroContent = {
  headline: 'How much time are you really losing?',
  subheadline:
    "You know you're busy. But busy doing what? Select the repetitive tasks eating your day. We'll show you exactly how much time you're wasting.",
  instructions:
    'Select all the tasks you do regularly. Be honest. This is for you.',
};

export interface ConfigurationContent {
  headline: string;
  subheadline: string;
  instructions: string;
  frequencyLabel: string;
  durationLabel: string;
}

export const configurationContent: ConfigurationContent = {
  headline: 'Now tell us how often',
  subheadline:
    "We've pre-filled typical amounts, but your business is different. Adjust the frequency and duration to match your reality.",
  instructions:
    'The more accurate you are, the more shocking the results will be.',
  frequencyLabel: 'times per day',
  durationLabel: 'minutes each',
};

export interface TransitionCopy {
  calculating: string[];
  beforeResults: string;
}

export const transitionCopy: TransitionCopy = {
  calculating: [
    'Calculating your time waste...',
    'Aggregating across all selected tasks...',
    'Converting to yearly hours...',
    'Preparing to show you the damage...',
  ],
  beforeResults: 'Brace yourself. This is going to hurt.',
};
