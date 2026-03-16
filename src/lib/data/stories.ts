// ========================
// STORY DATA STRUCTURE
// ========================

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hook: string;
  category: string;
  painTypes: string[];
  keyStat: { value: string; label: string };
  chapters: {
    before: string;
    solution: string;
    after: string;
  };
  results: Array<{
    label: string;
    before: string;
    after: string;
    improvement: string;
  }>;
  quote?: { text: string; author: string };
  oneLiner: string;
  image?: string; // Optional featured image URL
  color?: string; // Optional gradient color override
}

// ========================
// CATEGORY DEFINITIONS
// ========================

export const categories = [
  'E-Commerce',
  'Real Estate',
  'Healthcare',
  'Legal',
  'Marketing',
  'Finance',
] as const;

export type Category = (typeof categories)[number];

// ========================
// PAIN TYPE DEFINITIONS
// ========================

export const painTypes = [
  'Data Entry',
  'Customer Support',
  'Content Creation',
  'Scheduling',
  'Research',
  'Reporting',
] as const;

export type PainType = (typeof painTypes)[number];

// ========================
// SAMPLE STORIES DATA
// ========================

export const stories: Story[] = [
  {
    id: '1',
    slug: 'real-estate-listing-automation',
    title: 'She Got Her Weekends Back',
    subtitle: 'A real estate agent stopped working Saturdays and sold more homes',
    hook: 'It was 11 PM on a Tuesday. Sarah was still at her desk, typing the same property description for the fourth platform that day. Her daughter had stopped asking when mom was coming home.',
    category: 'Real Estate',
    painTypes: ['Data Entry', 'Content Creation'],
    keyStat: { value: '15x', label: 'Faster Listings' },
    oneLiner: 'What used to steal her evenings now happens while she sleeps',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    color: '#06b6d4',
    chapters: {
      before:
        'Sarah\'s agency had a dirty secret: success was killing them. Every new listing meant 8 hours of grunt work: photographing, writing descriptions, reformatting for Zillow, then Realtor.com, then Facebook, then Instagram. Her top agents were burning out. One quit last month. "I became a realtor to help people find homes," she said on her way out. "Not to be a copy-paste machine."',
      solution:
        'We built an AI that thinks like a realtor. Feed it the MLS data and photos, and it writes descriptions that actually sell: highlighting the chef\'s kitchen for foodies, the home office for remote workers, the backyard for young families. Different angle for each platform. Different length. Same authentic voice Sarah spent years developing.',
      after:
        'Last Saturday, Sarah went to her daughter\'s soccer game. The AI had created 12 listings overnight, each one ready to publish. Her agents now spend their time where it matters: face-to-face with clients, negotiating deals, building relationships. Revenue is up 145%. Burnout is down to zero. And Sarah? She finally took that vacation she\'d been postponing for three years.',
    },
    results: [
      {
        label: 'Time per Listing',
        before: '8 hours',
        after: '30 minutes',
        improvement: '94% reduction',
      },
      {
        label: 'Listings per Week',
        before: '12 listings',
        after: '60 listings',
        improvement: '5x increase',
      },
      {
        label: 'Client Meetings',
        before: '2-3 daily',
        after: '8-10 daily',
        improvement: '3x increase',
      },
      {
        label: 'Revenue Impact',
        before: 'Baseline',
        after: '+145%',
        improvement: '$280K more',
      },
    ],
    quote: {
      text: 'My daughter asked why I was home for dinner. I almost cried. That used to be a special occasion. Now it\'s just... Tuesday.',
      author: 'Sarah Chen, Agency Owner',
    },
  },
  {
    id: '2',
    slug: 'ecommerce-customer-support',
    title: 'The 3 AM Customer Who Changed Everything',
    subtitle: 'How a furniture store stopped losing sleep and started making sales around the clock',
    hook: 'Marcus woke up to 47 unread messages. A customer in Tokyo had questions about a $2,000 sofa. By the time Marcus replied at 9 AM, she\'d already bought from a competitor.',
    category: 'E-Commerce',
    painTypes: ['Customer Support', 'Scheduling'],
    keyStat: { value: '24/7', label: 'Instant Responses' },
    oneLiner: 'They stopped losing customers to time zones',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    color: '#8b5cf6',
    chapters: {
      before:
        'Marcus had a problem money couldn\'t solve. His furniture store was getting customers from London, Sydney, Dubai, but his support team worked 9-to-5 in Austin. Every morning started the same: a graveyard of abandoned carts and frustrated emails. "Do you even have customer service?" one review read. He did. They just weren\'t awake at 3 AM.',
      solution:
        'The AI agent we built doesn\'t just answer questions. It sells. It knows every product dimension, every fabric option, every delivery timeline. When a customer in Berlin asks "Will this couch fit through a 32-inch door?" at 2 AM, they get an answer in 8 seconds. With measurements. And a suggestion for a similar model that\'s currently 20% off.',
      after:
        'Last month, 34% of Marcus\'s sales came from customers who asked questions outside business hours. His human team now handles the complex stuff: custom orders, complaints, VIP clients. The AI handles everything else. His support satisfaction score went from 3.2 to 4.8 stars. And Marcus? He finally turned off his phone at night.',
    },
    results: [
      {
        label: 'Response Time',
        before: '12 hours',
        after: '30 seconds',
        improvement: '99.9% faster',
      },
      {
        label: 'Support Coverage',
        before: '9am-5pm',
        after: '24/7/365',
        improvement: '3x coverage',
      },
      {
        label: 'Conversion Rate',
        before: '2.1%',
        after: '2.8%',
        improvement: '+34% increase',
      },
      {
        label: 'Team Stress Level',
        before: 'Critical',
        after: 'Manageable',
        improvement: 'Much happier',
      },
    ],
    quote: {
      text: 'I used to wake up anxious, checking my phone before my feet hit the floor. Now I check it out of curiosity, not panic. That\'s worth more than money.',
      author: 'Marcus Rodriguez, Store Owner',
    },
  },
  {
    id: '3',
    slug: 'legal-document-review',
    title: 'The Associate Who Stopped Crying in the Parking Lot',
    subtitle: 'A law firm saved their talent by eliminating soul-crushing busywork',
    hook: 'Jessica had graduated top of her class at Columbia Law. Three years later, she was highlighting clauses at midnight, wondering if this was really what she\'d signed up for.',
    category: 'Legal',
    painTypes: ['Research', 'Data Entry'],
    keyStat: { value: '85%', label: 'Time Saved' },
    oneLiner: 'Junior associates finally do the work they went to law school for',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    color: '#f59e0b',
    chapters: {
      before:
        'Thompson & Associates had a retention crisis. Three junior associates quit in six months. "I didn\'t go $200,000 into debt to be a human Ctrl+F," one said in her exit interview. The work that drove them away? Reviewing contracts for missing clauses. Twenty hours a week of mind-numbing, error-prone, but absolutely critical work. Partners knew it was a problem. They just didn\'t have a solution.',
      solution:
        'Our AI reads contracts the way a senior partner would, but in 3 minutes instead of 3 hours. It flags missing indemnification clauses. Catches inconsistent defined terms. Spots liability caps that don\'t match firm standards. And it explains why, so associates actually learn instead of just checking boxes.',
      after:
        'Jessica is still at the firm. Last month, she argued her first motion in court. The week before, she helped close a $50M acquisition. The robot handles the highlighting now. Her billable hours are up. Her stress is down. And when partners ask how the firm\'s retention problem disappeared, the managing partner just smiles. "We stopped wasting talent on tasks that don\'t need talent."',
    },
    results: [
      {
        label: 'Review Time per Contract',
        before: '20 hours',
        after: '3 hours',
        improvement: '85% reduction',
      },
      {
        label: 'Contracts per Week',
        before: '8 contracts',
        after: '35 contracts',
        improvement: '4x increase',
      },
      {
        label: 'Associate Work Week',
        before: '60 hours',
        after: '45 hours',
        improvement: '25% reduction',
      },
      {
        label: 'Firm Capacity',
        before: 'At limit',
        after: '+320%',
        improvement: 'No hiring needed',
      },
    ],
    quote: {
      text: 'I called my mom last week and told her I finally feel like a lawyer. Not a paralegal. Not a machine. A lawyer. She cried.',
      author: 'Jessica Park, Associate Attorney',
    },
  },
  {
    id: '4',
    slug: 'healthcare-appointment-scheduling',
    title: 'The Clinic That Patients Actually Love to Call',
    subtitle: 'How one doctor stopped losing patients to voicemail hell',
    hook: 'The phone rang. And rang. And rang. By the time Maria got through to schedule her mom\'s cardiology appointment, she\'d already called three other clinics. Two of them answered.',
    category: 'Healthcare',
    painTypes: ['Scheduling', 'Customer Support'],
    keyStat: { value: '92%', label: 'Self-Scheduled' },
    oneLiner: 'Patients book appointments at midnight. The clinic sleeps fine.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    color: '#22c55e',
    chapters: {
      before:
        'Dr. Patel\'s cardiology practice had a 4.9-star rating for care and a 2-star rating for "ease of scheduling." His two receptionists were drowning: 400+ calls a week, most going to voicemail. Patients waited 15 minutes on hold. Some gave up. Some went to competitors. And 18% just didn\'t show up because they forgot.',
      solution:
        'Now patients text "BOOK" and get a conversation. "What time works for you?" "Is Tuesday at 2 PM open?" "Done. See you then." The AI checks insurance in real-time, sends reminders 48 hours and 2 hours before, and even reschedules if someone needs to change. All in plain English. All while Dr. Patel\'s staff handles the patients actually in the office.',
      after:
        'No-shows dropped from 18% to 6%. That\'s 47 extra patients seen per month. Revenue up $89,000 annually from the same schedule. But here\'s what Dr. Patel cares about more: patient satisfaction hit 4.8 stars. His receptionists stopped threatening to quit. And Maria\'s mom? She\'s been a loyal patient for two years now. "They actually answer," she tells her friends.',
    },
    results: [
      {
        label: 'Phone Wait Time',
        before: '15 minutes',
        after: '< 1 minute',
        improvement: '93% reduction',
      },
      {
        label: 'No-Show Rate',
        before: '18%',
        after: '6%',
        improvement: '67% reduction',
      },
      {
        label: 'After-Hours Scheduling',
        before: '0%',
        after: '35%',
        improvement: 'New revenue',
      },
      {
        label: 'Patient Satisfaction',
        before: '3.2/5',
        after: '4.7/5',
        improvement: '+47% increase',
      },
    ],
    quote: {
      text: 'A patient told me she chose us because we were the only clinic that didn\'t make her wait on hold. That\'s not a medical reason. But it matters.',
      author: 'Dr. Amit Patel, Practice Owner',
    },
  },
  {
    id: '5',
    slug: 'marketing-content-creation',
    title: 'The Agency That Stopped Saying No',
    subtitle: 'Three people now do the work of thirty, and they\'re happier than ever',
    hook: 'Emma stared at her inbox: three new client inquiries. A year ago, she would have celebrated. Now she just felt exhausted. Her agency was full. Saying yes meant someone would burn out.',
    category: 'Marketing',
    painTypes: ['Content Creation', 'Research', 'Reporting'],
    keyStat: { value: '10x', label: 'More Content' },
    oneLiner: 'They went from turning down clients to cherry-picking the best ones',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: '#ec4899',
    chapters: {
      before:
        'Bright Ideas Marketing had a ceiling. Five clients. That\'s all Emma\'s 3-person team could handle without the quality tanking or someone quitting. Every blog post started with a blank page and a curse word. Every social calendar took days to fill. They were turning away $30K/month in potential revenue because they literally couldn\'t make more hours in the day.',
      solution:
        'The AI we built doesn\'t replace Emma\'s team. It removes their writer\'s block. Feed it a topic and a client\'s brand guidelines, and it produces a draft that sounds exactly like that client. Emma\'s writers went from creating content to curating it. Edit, polish, publish. Repeat. What used to take 4 hours now takes 30 minutes.',
      after:
        'Same team. Twenty-five clients. Emma had to buy a new spreadsheet just to track them all. Revenue went from $180K to $420K without a single new hire. But here\'s the real win: her team is happier. They do strategy now, not stenography. They actually think about what they\'re creating instead of just racing to create it. Last month, Emma said yes to three new clients. Then she took a vacation.',
    },
    results: [
      {
        label: 'Client Capacity',
        before: '5 clients',
        after: '25 clients',
        improvement: '5x increase',
      },
      {
        label: 'Content Output',
        before: '40 pieces/month',
        after: '400 pieces/month',
        improvement: '10x increase',
      },
      {
        label: 'Time per Piece',
        before: '4 hours',
        after: '30 minutes',
        improvement: '87% reduction',
      },
      {
        label: 'Agency Revenue',
        before: '$180K/year',
        after: '$420K/year',
        improvement: '+133% growth',
      },
    ],
    quote: {
      text: 'I built this agency because I loved creating. Somewhere along the way, I just became an assignment machine. Now I\'m creating again. Actual ideas. Actual strategy. It feels like falling in love with my job all over.',
      author: 'Emma Wilson, Agency Founder',
    },
  },
];

// ========================
// UTILITY FUNCTIONS
// ========================

/**
 * Get all stories
 */
export function getAllStories(): Story[] {
  return stories;
}

/**
 * Get story by slug
 */
export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

/**
 * Get stories by category
 */
export function getStoriesByCategory(category: string): Story[] {
  return stories.filter((story) => story.category === category);
}

/**
 * Get stories by pain type
 */
export function getStoriesByPainType(painType: string): Story[] {
  return stories.filter((story) => story.painTypes.includes(painType));
}

/**
 * Get featured stories for homepage
 */
export function getFeaturedStories(limit = 3): Story[] {
  return stories.slice(0, limit);
}

/**
 * Get related stories (same category, excluding current)
 */
export function getRelatedStories(currentStoryId: string, limit = 3): Story[] {
  const currentStory = stories.find((story) => story.id === currentStoryId);
  if (!currentStory) return [];

  return stories
    .filter(
      (story) =>
        story.id !== currentStoryId && story.category === currentStory.category
    )
    .slice(0, limit);
}

/**
 * Filter stories by category and/or pain type
 */
export function filterStories(
  category?: string,
  painType?: string
): Story[] {
  return stories.filter((story) => {
    const matchesCategory = !category || story.category === category;
    const matchesPainType = !painType || story.painTypes.includes(painType);
    return matchesCategory && matchesPainType;
  });
}

/**
 * Get unique categories from all stories
 */
export function getCategories(): string[] {
  return Array.from(new Set(stories.map((story) => story.category)));
}

/**
 * Get unique pain types from all stories
 */
export function getPainTypes(): string[] {
  return Array.from(
    new Set(stories.flatMap((story) => story.painTypes))
  ).sort();
}

// ========================
// DETAILED CASE STUDY NARRATIVES
// ========================

/**
 * Extended case study interface with full narrative chapters
 * Use this for in-depth storytelling on dedicated case study pages
 */
export interface DetailedCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  chapter1: {
    title: string;
    content: string;
  };
  chapter2: {
    title: string;
    content: string;
  };
  chapter3: {
    title: string;
    content: string;
  };
  chapter4: {
    title: string;
    content: string;
  };
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  oneLiner: string;
}

/**
 * Real AI automation project case studies with full narrative arcs
 * Each story follows: Hook → The Before → Breaking Point → The Solution → The After
 */
export const detailedCaseStudies: DetailedCaseStudy[] = [
  {
    id: "google-reviews-agent",
    title: "The Restaurant That Never Slept",
    subtitle: "How one chef stopped choosing between cooking and customer care",
    hook: "At 11:47 PM, after a 14-hour shift, Chef David was still at his phone. Three new five-star reviews had come in during dinner service. He knew he should respond (Google's algorithm favored engagement), but his hands were cramping and tomorrow's prep started at 6 AM.",
    chapter1: {
      title: "The Before",
      content: "Every morning started the same way. Before checking inventory, before tasting yesterday's stock, David opened Google Reviews. Fifty-three reviews this month alone. Each five-star review deserved a personal thank you. Each criticism needed acknowledgment, empathy, a promise to improve.\n\nHe'd tried delegating to his sous chef, but the responses felt robotic. Generic. Not his voice. Customers who'd praised his attention to detail got copy-paste replies that read like they came from a corporate chain.\n\nThe restaurant had a 4.8-star rating, but David was drowning. He was spending 90 minutes daily on reviews: time stolen from recipe development, from staff training, from the actual cooking that made people want to write reviews in the first place. His wife stopped asking when he'd come to bed.\n\nThen came the one-star review at 2 AM. A customer upset about wait times. By the time David saw it at 6 AM and crafted a response, twelve people had already read it. No response. No context. Just a complaint, hanging in the digital void."
    },
    chapter2: {
      title: "The Breaking Point",
      content: "It was his daughter's birthday dinner. David had promised: no phones. But halfway through the meal, his watch buzzed. Another negative review. Three stars. Wrong dish delivered.\n\nHe reached for his phone. His daughter's face fell. His wife put down her fork. 'Choose,' she said quietly. 'Right now.'\n\nDavid looked at his phone. Then at his family. He put it down. But he couldn't stop thinking: someone's reading that review right now, deciding whether to book their anniversary dinner."
    },
    chapter3: {
      title: "The Solution",
      content: "The AI agent learned his voice first. Not generic hospitality-speak, but David's actual voice: the way he mentioned seasonal ingredients, referenced specific dishes, added personal touches about his team.\n\nNow, when a five-star review arrives, the system waits 24 hours (to seem natural, not robotic), then responds in David's authentic voice. When it detects negativity (wrong order, long wait, cold food), it doesn't respond. It sends an immediate Slack alert to David's phone.\n\nThe magic moment came on a Tuesday morning. David opened Google Reviews and saw three new responses he didn't write. But they sounded exactly like him. One mentioned the new spring menu. Another thanked a regular by name. The third referenced a dish the reviewer had praised.\n\nHe had to check twice to confirm he hadn't written them in his sleep."
    },
    chapter4: {
      title: "The After",
      content: "David's morning routine changed. Instead of 90 minutes responding to reviews, he spends 5 minutes scanning Slack alerts for issues that need personal attention. Last month: only two negative reviews that required his touch.\n\nThe restaurant now responds to every five-star review within 24-36 hours. Response rate jumped from 64% to 100%. The AI handles responses in English, Hebrew, and Russian. David's sous chef is Russian, and the agent learned her name, her style, her signature dishes.\n\nDavid spent the reclaimed time developing a new tasting menu. It launched last week. Already, it's generating reviews. Good ones.\n\n'I'm cooking again,' David told his wife. 'Not just managing. Actually cooking.' His daughter added: 'And he came to my soccer game.'\n\nGoogle bumped the restaurant's ranking. More visibility. More bookings. More reviews. But now, the reviews feed the business instead of consuming it."
    },
    results: [
      {
        metric: "Review response rate",
        before: "64%",
        after: "100%",
        improvement: "+56%"
      },
      {
        metric: "Time spent daily on reviews",
        before: "90 minutes",
        after: "5 minutes",
        improvement: "94% reduction"
      },
      {
        metric: "Negative reviews without response",
        before: "23% went unanswered",
        after: "0% missed",
        improvement: "100% capture"
      },
      {
        metric: "Languages supported",
        before: "1 (English only)",
        after: "3 (EN, HE, RU)",
        improvement: "3x coverage"
      }
    ],
    oneLiner: "A restaurant chef reclaimed 85 minutes daily by teaching AI to respond to reviews in his authentic voice"
  },
  {
    id: "gift-voucher-automation",
    title: "The Spa Owner's Daily Treasure Hunt",
    subtitle: "When $47,000 in gift cards became impossible to track",
    hook: "Rachel kept a notebook next to her computer. Twelve pages of handwritten voucher codes, crossed out when redeemed, question-marked when customers claimed they'd purchased one she couldn't find. She'd sold $47,000 in gift vouchers last year. She had no idea how many were still valid.",
    chapter1: {
      title: "The Before",
      content: "The phone call always started the same way: 'Hi, I have a gift voucher...'\n\nRachel would put the customer on hold, open Squarespace, navigate to Commerce → Orders, and start scrolling. January orders. February. Back to December if they said it was a holiday gift. Each order had to be clicked individually. Each order showed a voucher code buried in the notes section.\n\nSeven minutes per call. Sometimes fifteen if the customer misread their code or if it was an older voucher. The line of waiting customers grew longer while Rachel hunted through digital archives.\n\nShe'd tried keeping a spreadsheet once. Manually copied voucher codes from Squarespace every morning. But orders came in overnight. Weekend sales weren't logged until Monday. By Tuesday, her spreadsheet was already outdated, and she'd wasted three hours maintaining a system that was still incomplete.\n\nThe breaking point wasn't the time. It was the embarrassment. A regular customer, spending $300 on a massage package, waiting eighteen minutes while Rachel searched for their $50 voucher. The customer left. Rachel found the voucher code ten minutes later."
    },
    chapter2: {
      title: "The Breaking Point",
      content: "The email arrived on a Friday afternoon. A corporate client wanted to purchase 50 gift vouchers for employee appreciation. Fifty. Rachel did the math: if each voucher took 7 minutes to look up, that's 350 minutes of customer hold time spread across the next few months.\n\nShe stared at her notebook. Twelve pages of scribbled codes. Some crossed out. Some with notes like 'maybe used?' or 'customer said they have it but can't find.'\n\nThere was $47,000 somewhere in this chaos. Rachel had no systematic way to track it. She almost turned down the corporate order."
    },
    chapter3: {
      title: "The Solution",
      content: "The automation runs invisibly in the background. Every six hours, a browser automation agent logs into Squarespace, navigates through every order, and extracts voucher codes automatically. It logs them to a Google Sheet with purchase date, amount, customer email, and redemption status.\n\nWhen a customer calls now, Rachel opens one Google Sheet. Types three letters of the voucher code. Finds it instantly.\n\nThe magic moment came with the corporate order. All 50 vouchers were logged automatically overnight. The next morning, Rachel had a complete spreadsheet: voucher code, employee name, purchase date, value. She printed it and handed it to the corporate client. They ordered 30 more.\n\nThe agent also revealed something Rachel hadn't known: $8,400 in vouchers from 2024 that had never been redeemed. Money the spa had already earned, services that would never be claimed. Pure profit she'd been too disorganized to recognize."
    },
    chapter4: {
      title: "The After",
      content: "Rachel's voucher lookup time dropped from 7 minutes to 11 seconds. She keeps one browser tab open with the Google Sheet. Customers give their code. She searches. Confirms. Books their appointment. Done.\n\nThe spa now promotes gift vouchers actively. Rachel used to dread selling them: each sale meant future administrative burden. Now she sees them as pure revenue. Last quarter: $63,000 in voucher sales, up from $47,000 the previous year.\n\nShe also started a reminder system. Vouchers expiring in 30 days get a gentle email: 'Don't forget to book your massage.' Redemption rate increased. Customer satisfaction improved. No more expired vouchers that leave customers frustrated.\n\n'I used to hide vouchers on our website,' Rachel admitted to her business partner. 'Buried them in a submenu because I couldn't handle the admin work. Now they're front page. Featured. Our second-biggest revenue stream.'\n\nThe notebook is gone. The Google Sheet has 847 rows. Every voucher, every dollar, tracked automatically."
    },
    results: [
      {
        metric: "Voucher lookup time",
        before: "7 minutes average",
        after: "11 seconds",
        improvement: "97% faster"
      },
      {
        metric: "Annual voucher sales",
        before: "$47,000",
        after: "$63,000",
        improvement: "+34%"
      },
      {
        metric: "Unredeemed voucher tracking",
        before: "$8,400 unknown",
        after: "100% visibility",
        improvement: "Full accountability"
      },
      {
        metric: "Manual spreadsheet maintenance",
        before: "3 hours weekly",
        after: "0 hours",
        improvement: "100% eliminated"
      }
    ],
    oneLiner: "A spa owner turned gift vouchers from an administrative nightmare into a $63K revenue stream with automated tracking"
  },
  {
    id: "newsletter-bot",
    title: "The Marketing Director Who Hated Wednesdays",
    subtitle: "How newsletter creation went from 6-hour hell to 8-minute magic",
    hook: "Every Wednesday, Emma blocked her calendar from 9 AM to 3 PM. 'Newsletter Day,' she called it. Her team called it 'Emma's Mood Day.' By noon, she'd be snapping at colleagues. By 2 PM, she'd have rewritten the opening paragraph four times and still hated it.",
    chapter1: {
      title: "The Before",
      content: "The newsletter was supposed to be monthly. It came out every six weeks, sometimes eight, whenever Emma could face the process again.\n\nFirst, she'd hunt for photos. The company's library had 4,000+ images spread across Google Drive folders with names like 'Event_Final_v3' and 'Photos_Sept_USE_THESE.' She'd spend 90 minutes finding three usable photos, only to realize two of them had already been used in previous newsletters.\n\nThen came the writing. Emma stared at blank documents, cursor blinking. What should the tone be? Professional but friendly. Informative but entertaining. Short but comprehensive. She'd draft three paragraphs, delete them, start over. By hour four, she'd have 200 words and a headache.\n\nHTML formatting was its own special nightmare. Mailchimp's editor broke her layouts. Images didn't align. Text wrapped weird. She'd preview on desktop, then mobile, then tablet, fixing spacing issues that seemed to multiply.\n\nAt 2:47 PM, she'd hit send. Then immediately spot a typo in the subject line. Too late. The newsletter was out. Emma would close her laptop and go home early, exhausted from a task that touched zero strategic goals.\n\nThe newsletter had 3,400 subscribers. Open rate: 18%. Emma knew it could be better if she just had the energy to make it better."
    },
    chapter2: {
      title: "The Breaking Point",
      content: "The CEO stopped by Emma's desk on a Wednesday at 11 AM. 'How's the newsletter coming?' he asked.\n\nEmma gestured at her screen. Two paragraphs. Three open browser tabs with photo libraries. A half-eaten protein bar.\n\n'It takes all day,' she said. 'Every time. I hate it.'\n\nThe CEO nodded. 'What if we just... stopped doing it?'\n\nEmma considered it. But the newsletter was their main customer touchpoint. The only regular communication. Stopping meant losing connection with 3,400 people who'd opted in. She couldn't let that go.\n\nShe just needed it to not consume her entire Wednesday."
    },
    chapter3: {
      title: "The Solution",
      content: "Now, Emma opens Slack on Wednesday mornings. Types: 'Newsletter about last month's product launch and the upcoming webinar.'\n\nThe agent asks: 'Tone: professional or casual?' Emma types: 'Casual.' The agent asks: 'Length: short or detailed?' Emma types: 'Short.'\n\nEight minutes later, a draft appears in the Slack thread. Opening hook. Three sections. Call-to-action. Formatted in HTML, ready for Mailchimp. The agent pulled photos automatically from the company library: images that haven't been used in recent newsletters, properly licensed, relevant to the content.\n\nThe magic moment came with the first draft. Emma read it and laughed out loud. It sounded like her. Natural, friendly, on-brand. She made two small edits (changed a word, adjusted a photo), copied the HTML, pasted it into Mailchimp, and hit send.\n\nTotal time: 8 minutes. It was 9:17 AM. Emma's entire Wednesday was still ahead of her."
    },
    chapter4: {
      title: "The After",
      content: "The newsletter is monthly now. Actually monthly. Emma sends it the first Wednesday of every month at 9:30 AM. Sometimes she adds custom sections: a team spotlight, a customer story. The agent adapts, learns, matches her style.\n\nOpen rates climbed from 18% to 31%. Emma thinks it's because the newsletters are consistent now. People expect them. And because she has energy to make them actually good: adding personal touches, optimizing subject lines, A/B testing send times.\n\nShe repurposed her Wednesday blocks for strategy work. Last month, she launched a customer referral program that brought in 47 new leads. This month, she's redesigning the website's landing pages. Work that moves business metrics, not just maintains them.\n\n'I used to dread newsletters,' Emma told the CEO in their quarterly review. 'Now I actually enjoy them. I focus on what to say. The agent handles how to say it.'\n\nThe CEO smiled. 'So we're not stopping it?'\n\n'Are you kidding? I'm adding a bi-weekly version.'"
    },
    results: [
      {
        metric: "Newsletter creation time",
        before: "6 hours",
        after: "8 minutes",
        improvement: "98% reduction"
      },
      {
        metric: "Publishing frequency",
        before: "Every 6-8 weeks",
        after: "Monthly, on schedule",
        improvement: "100% consistency"
      },
      {
        metric: "Open rate",
        before: "18%",
        after: "31%",
        improvement: "+72%"
      },
      {
        metric: "Photo library search time",
        before: "90 minutes",
        after: "0 minutes (automated)",
        improvement: "100% eliminated"
      }
    ],
    oneLiner: "A marketing director transformed newsletter creation from a 6-hour Wednesday ordeal into an 8-minute Slack conversation"
  },
  {
    id: "ai-video-agent",
    title: "The Content Team That Couldn't Keep Up",
    subtitle: "When one video per month wasn't enough to compete",
    hook: "The content calendar mocked them from the wall. Twelve videos planned for the year. By July, they'd published three. Each one took 40+ hours of work. Meanwhile, their competitors were posting twice weekly and dominating the algorithm.",
    chapter1: {
      title: "The Before",
      content: "Video production looked like this: Sarah researched trending topics for three hours. Wrote a script over two days. Sent it to Mark for voiceover recording. Mark found quiet space (never easy in a busy office), recorded, re-recorded, sent back the audio. Four days passed.\n\nThen came editing. Stock footage searches. Animation. Text overlays. Color grading. Sound mixing. The editor, working part-time, could handle one video per week if nothing else was on his plate. Something else was always on his plate.\n\nApproval rounds added another week. The CEO wanted changes to the script (now already recorded). Marketing wanted different footage. Sales wanted a harder call-to-action. Version 6, version 7, version 8.\n\nBy the time a video went live, the trend Sarah had spotted was over. The moment had passed. The video got 340 views. Forty hours of work for engagement that lasted less than a day.\n\nSarah watched competitors pump out videos. Their production quality wasn't even that good. But they were consistent. Three videos weekly. The algorithm loved them. They were getting 50,000+ views. Sarah's team was getting buried.\n\n'We need to produce more,' the CEO said. Sarah wanted to scream. 'With what resources? We're already underwater.'"
    },
    chapter2: {
      title: "The Breaking Point",
      content: "The competitor's video dropped on a Tuesday morning. Same topic Sarah had pitched three weeks ago. Same angle. Same target audience.\n\nExcept they'd published it first. And it was going viral. 89,000 views in 18 hours.\n\nSarah's video on the same topic was still in editing. Draft 4. Expected publish date: nine days from now. By then, the trend would be dead and the competitor would own the conversation.\n\nShe opened the content calendar. Five videos in various stages of production hell. Twelve more planned. Twenty-three weeks left in the year. The math didn't work. It would never work."
    },
    chapter3: {
      title: "The Solution",
      content: "The CrewAI system runs 13 specialized agents, each handling one piece of the production pipeline. Agent 1 researches trending topics in their industry. Agent 2 analyzes what's working for competitors. Agent 3 generates script concepts. Agents 4-6 write, refine, and optimize the script.\n\nAgent 7 generates AI voiceover. Agent 8 selects stock footage. Agents 9-11 handle animation, text overlays, and transitions. Agent 12 assembles everything. Agent 13 exports in multiple formats.\n\nBut here's the crucial part: humans stay in control. At three key checkpoints (script approval, footage selection, and final cut), the system pauses and sends a Slack message to Sarah. She reviews, approves, or requests changes. The agents iterate based on her feedback.\n\nThe magic moment came on Week 1. The system presented Sarah with three complete video concepts on Monday morning. She reviewed them over coffee, approved one with minor script changes. By Wednesday, the video was ready. By Thursday, it was live.\n\nFriday morning: 12,000 views. Sarah hadn't touched the editing software once."
    },
    chapter4: {
      title: "The After",
      content: "The content team now publishes three videos weekly. Monday, Wednesday, Friday. Every week. Without fail. Sarah spends 20 minutes per video on approvals instead of 40 hours on production.\n\nAverage view count jumped from 340 to 8,700 per video. The algorithm noticed the consistency. Started recommending their content. Subscriber count tripled in four months.\n\nMark, the voiceover guy, focuses on high-value content now: client testimonials, executive interviews, premium productions where human nuance matters. The routine educational videos run on AI voiceover, trained on Mark's voice, indistinguishable to viewers.\n\nThe CEO's question changed from 'Why aren't we producing more?' to 'How are we producing so much?'\n\n'We stopped being bottlenecked by production capacity,' Sarah explained in a team meeting. 'Now we're bottlenecked by strategy. Which is exactly where we should be.'\n\nLast month, a video hit 127,000 views. The competitor who'd beaten them in July? They're now watching Sarah's videos for trend ideas."
    },
    results: [
      {
        metric: "Videos published per month",
        before: "1 video",
        after: "12 videos",
        improvement: "12x increase"
      },
      {
        metric: "Production time per video",
        before: "40 hours",
        after: "20 minutes (review)",
        improvement: "99% reduction"
      },
      {
        metric: "Average views per video",
        before: "340",
        after: "8,700",
        improvement: "25.6x growth"
      },
      {
        metric: "Subscriber growth (4 months)",
        before: "Stagnant",
        after: "3x increase",
        improvement: "200% growth"
      }
    ],
    oneLiner: "A content team went from 1 video monthly to 12 using a 13-agent AI system that handles production while humans guide strategy"
  },
  {
    id: "booking-system",
    title: "The Reservation Coordinator's Impossible Job",
    subtitle: "Managing three restaurant calendars became a game of musical chairs",
    hook: "Lisa answered the phone: 'I'd like a table for four on Saturday at 7 PM.' She put the caller on hold, opened three browser tabs (one for each restaurant location) and started the mental math. Downtown was fully booked. Midtown had a 6:30 slot. Uptown showed availability at 7, but that calendar was two hours out of date.",
    chapter1: {
      title: "The Before",
      content: "The restaurant group operated three locations. Same ownership, same menu concept, different neighborhoods. Customers didn't care which location. They just wanted a table.\n\nLisa's job was to make it work. But the booking systems didn't talk to each other. Downtown used OpenTable. Midtown used a different version of OpenTable with a separate login. Uptown was still on a Google Sheets calendar because their OpenTable integration had broken six months ago and nobody had fixed it.\n\nEvery phone call became a scavenger hunt. Check location one. Check location two. Check location three. 'Can you hold for just one moment?' became Lisa's most-used phrase. Average hold time: 4 minutes, 18 seconds.\n\nSome customers hung up before she got back to them. Others agreed to a location, then called back to cancel because they'd forgotten which neighborhood they'd been booked into. Double bookings happened weekly: the Uptown sheet didn't update in real-time, so two staff members would book the same table 30 minutes apart.\n\nLisa kept a notebook with a hand-drawn grid. Three locations, seven days, lunch and dinner services. She'd cross-reference the digital systems with her paper system, which somehow felt more reliable than the actual booking platforms.\n\nThe ownership group wanted to expand to a fourth location. Lisa privately hoped they wouldn't."
    },
    chapter2: {
      title: "The Breaking Point",
      content: "The wedding party called on a Thursday. Sixteen people, Saturday night, celebrating an anniversary.\n\nLisa checked all three locations. Downtown: no tables for parties larger than six. Midtown: fully booked. Uptown: the Google Sheet showed availability, but when Lisa called the Uptown manager, they said they'd already promised that table to a regular customer; they just hadn't updated the sheet yet.\n\n'I'm so sorry,' Lisa told the caller. 'We're completely booked.'\n\nShe hung up. Then realized: Midtown had two separate six-tops available at 7 PM. If they'd pushed the tables together, they could've accommodated sixteen people. But she hadn't seen it because she was looking at each location's system individually, not holistically.\n\nThe reservation went to a competitor. Lisa stared at her screens. Three systems. Zero coordination. Money left on the table."
    },
    chapter3: {
      title: "The Solution",
      content: "The unified booking system integrates all three locations into one real-time calendar. When a customer calls, Lisa opens a single interface. Sees availability across all locations simultaneously. Color-coded. Live updates.\n\nThe system syncs with OpenTable at all locations (yes, even Uptown: the integration got fixed). Google Sheets acts as the central source of truth, updated automatically every 15 minutes. When a booking is made at Downtown, it appears in the master sheet within seconds. When Uptown's manager marks a table as reserved for a VIP, the system reflects it immediately.\n\nThe magic moment came with a party of twelve on a busy Friday night. Lisa glanced at the unified calendar. Midtown had a large table at 6:45 PM. She booked it in under 30 seconds. The customer was thrilled. No hold time. No juggling tabs. Just: 'Yes, we have availability. Can I book you at our Midtown location?'\n\nThe system also revealed a pattern Lisa hadn't noticed: Downtown was overbooked on weekends while Uptown had empty tables. The group started directing customers strategically, balancing capacity across all three locations."
    },
    chapter4: {
      title: "The After",
      content: "Lisa's average call time dropped from 4 minutes, 18 seconds to 47 seconds. She books reservations faster. Customers spend less time on hold. Hang-up rate during hold dropped by 68%.\n\nDouble bookings disappeared entirely. The real-time sync means every staff member sees the same availability. No more conflicting information. No more angry customers showing up to find their table given away.\n\nThe restaurant group noticed something else: overall bookings increased by 23%. Tables that would've been declined at one location got filled at another. Customers who would've hung up after a 4-minute hold stayed on the line for 47 seconds.\n\nLisa helped open the fourth location last month. When the ownership group asked if she could handle it, she didn't panic. She just said: 'Add it to the system.'\n\n'I used to dread Saturday shifts,' Lisa told the general manager. 'Phones ringing nonstop, three screens open, trying to remember which location had what available. Now I just look at one calendar. It's almost... boring. In the best way.'\n\nBoring, efficient, and generating 23% more revenue."
    },
    results: [
      {
        metric: "Average reservation call time",
        before: "4 min 18 sec",
        after: "47 seconds",
        improvement: "82% faster"
      },
      {
        metric: "Customer hang-up rate during hold",
        before: "28%",
        after: "9%",
        improvement: "68% reduction"
      },
      {
        metric: "Double bookings per week",
        before: "3-5 incidents",
        after: "0 incidents",
        improvement: "100% eliminated"
      },
      {
        metric: "Overall bookings (cross-location)",
        before: "Baseline",
        after: "23% increase",
        improvement: "+23%"
      }
    ],
    oneLiner: "A multi-location restaurant coordinator unified three booking systems into one real-time calendar and cut reservation time by 82%"
  }
];

/**
 * Get detailed case study by ID
 */
export function getDetailedCaseStudy(id: string): DetailedCaseStudy | undefined {
  return detailedCaseStudies.find((study) => study.id === id);
}

/**
 * Get all detailed case studies
 */
export function getAllDetailedCaseStudies(): DetailedCaseStudy[] {
  return detailedCaseStudies;
}
