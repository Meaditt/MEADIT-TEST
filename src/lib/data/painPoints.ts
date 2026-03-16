// ========================
// PAIN POINTS DATA
// ========================

export interface PainPoint {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'communication' | 'operations' | 'content' | 'sales';
  defaultFrequency: number; // times per day
  defaultDuration: number;   // minutes each
}

export const painPoints: PainPoint[] = [
  {
    id: 'repetitive-emails',
    icon: '📧',
    title: 'Repetitive Emails',
    subtitle: 'Same questions, same answers',
    description: 'Responding to common customer inquiries, FAQs, and support emails that follow the same pattern every day.',
    category: 'communication',
    defaultFrequency: 15,
    defaultDuration: 5,
  },
  {
    id: 'booking-management',
    icon: '📅',
    title: 'Booking Management',
    subtitle: 'Scheduling back-and-forth',
    description: 'Coordinating appointments, managing calendars, sending reminders, and handling reschedules manually.',
    category: 'operations',
    defaultFrequency: 8,
    defaultDuration: 10,
  },
  {
    id: 'review-responses',
    icon: '⭐',
    title: 'Review Responses',
    subtitle: 'Crafting thank-you messages',
    description: 'Writing personalized responses to customer reviews across Google, Yelp, and other platforms.',
    category: 'communication',
    defaultFrequency: 5,
    defaultDuration: 8,
  },
  {
    id: 'data-entry',
    icon: '⌨️',
    title: 'Data Entry',
    subtitle: 'Copying information between systems',
    description: 'Manually transferring data between spreadsheets, databases, and different software tools.',
    category: 'operations',
    defaultFrequency: 10,
    defaultDuration: 15,
  },
  {
    id: 'social-media',
    icon: '📱',
    title: 'Social Media Posts',
    subtitle: 'Daily content creation',
    description: 'Creating, scheduling, and posting content across multiple social media platforms every day.',
    category: 'content',
    defaultFrequency: 3,
    defaultDuration: 20,
  },
  {
    id: 'follow-ups',
    icon: '🔔',
    title: 'Follow-ups',
    subtitle: 'Chasing leads and customers',
    description: 'Sending follow-up emails and messages to leads, prospects, and customers at the right time.',
    category: 'sales',
    defaultFrequency: 12,
    defaultDuration: 5,
  },
  {
    id: 'report-generation',
    icon: '📊',
    title: 'Report Generation',
    subtitle: 'Weekly data compilation',
    description: 'Pulling data from multiple sources, creating charts, and formatting reports for stakeholders.',
    category: 'operations',
    defaultFrequency: 2,
    defaultDuration: 45,
  },
  {
    id: 'support-tickets',
    icon: '🎫',
    title: 'Support Tickets',
    subtitle: 'Triaging and routing',
    description: 'Reading, categorizing, prioritizing, and routing customer support tickets to the right team.',
    category: 'communication',
    defaultFrequency: 20,
    defaultDuration: 3,
  },
  {
    id: 'invoice-processing',
    icon: '🧾',
    title: 'Invoice Processing',
    subtitle: 'Billing and payments',
    description: 'Creating invoices, sending payment reminders, tracking payments, and updating accounting records.',
    category: 'operations',
    defaultFrequency: 6,
    defaultDuration: 12,
  },
  {
    id: 'inventory-updates',
    icon: '📦',
    title: 'Inventory Updates',
    subtitle: 'Stock tracking',
    description: 'Manually updating stock levels, product availability, and synchronizing across sales channels.',
    category: 'operations',
    defaultFrequency: 4,
    defaultDuration: 20,
  },
  {
    id: 'lead-qualification',
    icon: '🎯',
    title: 'Lead Qualification',
    subtitle: 'Filtering prospects',
    description: 'Reviewing new leads, checking criteria, scoring them, and deciding which ones to pursue.',
    category: 'sales',
    defaultFrequency: 8,
    defaultDuration: 10,
  },
  {
    id: 'content-scheduling',
    icon: '🗓️',
    title: 'Content Scheduling',
    subtitle: 'Planning posts and emails',
    description: 'Organizing content calendars, scheduling blog posts, newsletters, and marketing campaigns.',
    category: 'content',
    defaultFrequency: 2,
    defaultDuration: 30,
  },
];

export const painPointCategories = {
  communication: {
    label: 'Communication',
    color: '#8b5cf6',
  },
  operations: {
    label: 'Operations',
    color: '#06b6d4',
  },
  content: {
    label: 'Content',
    color: '#22c55e',
  },
  sales: {
    label: 'Sales',
    color: '#f59e0b',
  },
} as const;
