// ========================
// WEBSITE ANALYSIS AGENT
// ========================
// Analyzes websites for AI/automation improvement opportunities,
// tracks analysis history, and self-improves over time.

export interface SiteDetection {
  hasChatbot: boolean;
  hasForms: boolean;
  hasBooking: boolean;
  hasAnalytics: boolean;
  hasStructuredData: boolean;
  hasSSL: boolean;
  hasCRM: boolean;
  hasSocialProof: boolean;
  detectedFeatures: string[];
  missingFeatures: string[];
}

export interface CategoryScore {
  name: string;
  score: number; // 0-100
  label: string;
}

export interface AnalysisResult {
  summary: string;
  businessType: string;
  painPoints: string[];
  opportunities: string[];
  recommendedAgents: AgentRecommendation[];
  estimatedImpact: string;
  automationScore: number; // 0-100
  categoryScores: CategoryScore[];
  manualProcesses: string[];
  aiOpportunities: AIOpportunity[];
  siteDetection: SiteDetection;
}

export interface AgentRecommendation {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTimeSaved: string;
}

export interface AIOpportunity {
  area: string;
  currentProcess: string;
  proposedSolution: string;
  impact: 'high' | 'medium' | 'low';
}

export interface AnalysisRecord {
  id: string;
  url: string;
  timestamp: string;
  result: AnalysisResult;
  metadata: {
    responseTimeMs: number;
    contentLength: number;
    hadApiKey: boolean;
  };
}

export interface AnalysisComparison {
  url: string;
  previousDate: string;
  currentDate: string;
  changes: string[];
  improvements: string[];
  newIssues: string[];
  scoreChange: number;
}

// In-memory store (in production, use a database)
const analysisHistory: Map<string, AnalysisRecord[]> = new Map();
const agentMetrics = {
  totalAnalyses: 0,
  averageScore: 0,
  mostCommonBusinessTypes: new Map<string, number>(),
  mostRecommendedAgents: new Map<string, number>(),
  lastRefinedAt: '',
};

// ========================
// HTML FEATURE DETECTION
// ========================

function detectSiteFeatures(html: string, url: string): SiteDetection {
  const lower = html.toLowerCase();

  // Chatbot detection
  const chatbotSignals = [
    'intercom', 'drift', 'crisp', 'tidio', 'zendesk', 'livechat', 'tawk',
    'hubspot-messages', 'freshchat', 'olark', 'chatbot', 'chat-widget',
    'chat-bubble', 'live-chat', 'messenger-widget',
  ];
  const hasChatbot = chatbotSignals.some(s => lower.includes(s));

  // Forms detection
  const formCount = (lower.match(/<form[\s>]/g) || []).length;
  const hasInputs = /<input[^>]+type=["'](text|email|tel|number)/i.test(html);
  const hasForms = formCount > 0 || hasInputs;

  // Booking/scheduling detection
  const bookingSignals = [
    'calendly', 'acuity', 'bookings', 'schedule', 'appointment',
    'book-a-call', 'book-now', 'booking-widget', 'cal.com',
  ];
  const hasBooking = bookingSignals.some(s => lower.includes(s));

  // Analytics detection
  const analyticsSignals = [
    'google-analytics', 'gtag', 'ga4', 'googletagmanager', 'gtm.js',
    'analytics.js', 'fbevents', 'facebook pixel', 'hotjar', 'mixpanel',
    'segment', 'plausible', 'fathom', 'umami',
  ];
  const hasAnalytics = analyticsSignals.some(s => lower.includes(s));

  // Structured data / schema.org
  const hasStructuredData = lower.includes('schema.org') ||
    lower.includes('application/ld+json') ||
    lower.includes('itemtype=') ||
    lower.includes('itemprop=');

  // SSL (from URL)
  const hasSSL = url.startsWith('https');

  // CRM / marketing tools
  const crmSignals = [
    'hubspot', 'salesforce', 'mailchimp', 'activecampaign', 'convertkit',
    'klaviyo', 'pipedrive', 'zoho', 'marketo', 'pardot',
  ];
  const hasCRM = crmSignals.some(s => lower.includes(s));

  // Social proof
  const socialProofSignals = [
    'testimonial', 'review', 'rating', 'stars', 'trust', 'case-study',
    'case study', 'client-logo', 'as seen', 'featured in', 'trusted by',
  ];
  const hasSocialProof = socialProofSignals.some(s => lower.includes(s));

  // Build feature lists
  const detectedFeatures: string[] = [];
  const missingFeatures: string[] = [];

  if (hasChatbot) detectedFeatures.push('Live chat / chatbot');
  else missingFeatures.push('No chatbot or live chat detected');

  if (hasForms) detectedFeatures.push(`Contact forms (${formCount} found)`);
  else missingFeatures.push('No lead capture forms detected');

  if (hasBooking) detectedFeatures.push('Online booking / scheduling');
  else missingFeatures.push('No automated booking system');

  if (hasAnalytics) detectedFeatures.push('Web analytics tracking');
  else missingFeatures.push('No analytics tracking detected');

  if (hasStructuredData) detectedFeatures.push('Schema.org structured data');
  else missingFeatures.push('No structured data for AI readability');

  if (hasSSL) detectedFeatures.push('SSL/HTTPS secured');
  else missingFeatures.push('Not using HTTPS');

  if (hasCRM) detectedFeatures.push('CRM / marketing automation');
  else missingFeatures.push('No CRM or marketing automation detected');

  if (hasSocialProof) detectedFeatures.push('Social proof / testimonials');
  else missingFeatures.push('No visible social proof or testimonials');

  return {
    hasChatbot, hasForms, hasBooking, hasAnalytics,
    hasStructuredData, hasSSL, hasCRM, hasSocialProof,
    detectedFeatures, missingFeatures,
  };
}

// ========================
// WEBSITE CONTENT FETCHER
// ========================

export async function fetchWebsiteContent(url: string): Promise<{
  content: string;
  title: string;
  meta: Record<string, string>;
  statusCode: number;
  rawHtml: string;
}> {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

  try {
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AIAgentAnalyzer/2.0; +https://example.com/bot)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return {
        content: `Website URL: ${url} (HTTP ${response.status})`,
        title: '',
        meta: {},
        statusCode: response.status,
        rawHtml: '',
      };
    }

    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract meta descriptions and keywords
    const meta: Record<string, string> = {};
    const metaRegex = /<meta\s+(?:name|property)=["']([^"']+)["']\s+content=["']([^"']+)["']/gi;
    let metaMatch;
    while ((metaMatch = metaRegex.exec(html)) !== null) {
      meta[metaMatch[1].toLowerCase()] = metaMatch[2];
    }

    // Extract structured text content (increased to 12K chars)
    const content = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 12000);

    return { content, title, meta, statusCode: response.status, rawHtml: html };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: `Website URL: ${url} (fetch failed: ${message})`,
      title: '',
      meta: {},
      statusCode: 0,
      rawHtml: '',
    };
  }
}

// ========================
// ANALYSIS PROMPT BUILDER
// ========================

function buildAnalysisPrompt(url: string, content: string, title: string, meta: Record<string, string>, detection: SiteDetection): string {
  const metaDescription = meta['description'] || meta['og:description'] || '';
  const keywords = meta['keywords'] || '';

  const detectionSummary = `
DETECTED FEATURES: ${detection.detectedFeatures.length > 0 ? detection.detectedFeatures.join(', ') : 'None detected'}
MISSING FEATURES: ${detection.missingFeatures.length > 0 ? detection.missingFeatures.join(', ') : 'All key features present'}
Has chatbot: ${detection.hasChatbot} | Has forms: ${detection.hasForms} | Has booking: ${detection.hasBooking}
Has analytics: ${detection.hasAnalytics} | Has structured data: ${detection.hasStructuredData}
Has CRM: ${detection.hasCRM} | Has social proof: ${detection.hasSocialProof} | Has SSL: ${detection.hasSSL}`;

  return `You are an elite AI automation consultant who analyzes business websites to identify where AI agents can transform their operations. You have already scanned the site's HTML and detected what tools and features are present or missing.

WEBSITE: ${url}
TITLE: ${title}
META DESCRIPTION: ${metaDescription}
KEYWORDS: ${keywords}
${detectionSummary}

PAGE CONTENT: ${content}

Analyze this business thoroughly using BOTH the page content AND the detection results. The missing features are high-priority opportunities. Respond in this exact JSON format:

{
  "summary": "2-3 sentences: What the business does, their target market, and their biggest operational bottleneck. Be specific to THIS business.",
  "businessType": "The industry/type (e.g., 'E-commerce', 'SaaS', 'Professional Services', 'Healthcare', 'Real Estate', 'Restaurant', 'Agency', etc.)",
  "painPoints": [
    "Specific operational friction point with estimated time waste (e.g., 'Manual invoice follow-ups eating 5+ hrs/week')",
    "Second specific issue tied to their business type",
    "Third issue - focus on repetitive manual work",
    "Fourth issue - focus on customer experience gaps",
    "Fifth issue - focus on data/reporting inefficiencies"
  ],
  "opportunities": [
    "Specific automation win — what we'd build and expected result",
    "Second automation opportunity with measurable outcome",
    "Third opportunity — AI-powered improvement",
    "Fourth opportunity — workflow automation",
    "Fifth opportunity — customer experience enhancement"
  ],
  "recommendedAgents": [
    {
      "name": "2-3 word agent name (e.g., 'Lead Qualifier')",
      "description": "One sentence: what it does and how it helps THIS business specifically",
      "priority": "high|medium|low",
      "estimatedTimeSaved": "e.g., '8 hrs/week'"
    }
  ],
  "estimatedImpact": "Bold, specific metric (e.g., 'Save 25+ hrs/week and increase lead conversion by 40%')",
  "automationScore": 65,
  "categoryScores": [
    { "name": "Customer Engagement", "score": 0, "label": "How well the site captures and engages visitors" },
    { "name": "Lead Generation", "score": 0, "label": "Ability to capture and qualify leads automatically" },
    { "name": "Operations", "score": 0, "label": "How streamlined internal workflows are" },
    { "name": "AI Readiness", "score": 0, "label": "How prepared the site is for AI agent integration" }
  ],
  "manualProcesses": [
    "Specific manual process they're likely doing",
    "Second manual process",
    "Third manual process",
    "Fourth manual process"
  ],
  "aiOpportunities": [
    {
      "area": "Area name (e.g., 'Customer Support')",
      "currentProcess": "What they likely do now manually",
      "proposedSolution": "What AI agent would do instead",
      "impact": "high|medium|low"
    }
  ]
}

ANALYSIS RULES:
- Provide exactly 4 recommendedAgents and exactly 3 aiOpportunities
- categoryScores: score each 0-100 where LOW = more room for improvement (more opportunity for us)
- Reference the DETECTED/MISSING features in your analysis — e.g., if no chatbot is detected, recommend a Support Agent as high priority
- automationScore: 0-100 overall (higher = more opportunity to automate)
- Be brutally specific to THIS business — no generic advice
- Pain points must reference real operational friction, not vague concerns
- Every recommended agent must solve a specific problem you identified
- aiOpportunities: concrete before/after scenarios
- Prioritize recommendations by ROI potential
- Be direct and confident. No hedging.

JSON only, no markdown wrapping:`;
}

// ========================
// CLAUDE API CALLER
// ========================

async function callClaudeAPI(prompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'unknown');
    throw new Error(`Claude API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text;

  if (!text) {
    throw new Error('Empty response from Claude API');
  }

  return text;
}

// ========================
// RESPONSE PARSER
// ========================

function parseAnalysisResponse(text: string, detection: SiteDetection): AnalysisResult {
  // Try to extract JSON from the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in Claude response');
  }

  const parsed = JSON.parse(jsonMatch[0]);

  // Normalize recommendedAgents: handle both string[] and object[] formats
  let recommendedAgents: AgentRecommendation[] = [];
  if (Array.isArray(parsed.recommendedAgents)) {
    recommendedAgents = parsed.recommendedAgents.map((agent: string | AgentRecommendation) => {
      if (typeof agent === 'string') {
        return {
          name: agent,
          description: `AI agent for ${agent.toLowerCase()}`,
          priority: 'medium' as const,
          estimatedTimeSaved: '5 hrs/week',
        };
      }
      return {
        name: agent.name || 'Unnamed Agent',
        description: agent.description || '',
        priority: agent.priority || 'medium',
        estimatedTimeSaved: agent.estimatedTimeSaved || '5 hrs/week',
      };
    });
  }

  // Normalize aiOpportunities
  let aiOpportunities: AIOpportunity[] = [];
  if (Array.isArray(parsed.aiOpportunities)) {
    aiOpportunities = parsed.aiOpportunities.map((opp: AIOpportunity) => ({
      area: opp.area || 'General',
      currentProcess: opp.currentProcess || '',
      proposedSolution: opp.proposedSolution || '',
      impact: opp.impact || 'medium',
    }));
  }

  // Normalize categoryScores
  const defaultCategoryScores: CategoryScore[] = [
    { name: 'Customer Engagement', score: 45, label: 'Room for AI-powered engagement' },
    { name: 'Lead Generation', score: 35, label: 'Manual lead handling detected' },
    { name: 'Operations', score: 50, label: 'Workflow automation opportunities' },
    { name: 'AI Readiness', score: 30, label: 'Needs infrastructure for AI agents' },
  ];

  let categoryScores: CategoryScore[] = defaultCategoryScores;
  if (Array.isArray(parsed.categoryScores) && parsed.categoryScores.length >= 4) {
    categoryScores = parsed.categoryScores.map((cs: CategoryScore) => ({
      name: cs.name || 'Unknown',
      score: typeof cs.score === 'number' ? Math.min(100, Math.max(0, cs.score)) : 50,
      label: cs.label || '',
    }));
  }

  return {
    summary: parsed.summary || 'Analysis complete. Multiple automation opportunities identified.',
    businessType: parsed.businessType || 'General Business',
    painPoints: Array.isArray(parsed.painPoints)
      ? parsed.painPoints
      : ['Manual inquiry handling', 'Slow lead follow-up', 'Repetitive data work'],
    opportunities: Array.isArray(parsed.opportunities)
      ? parsed.opportunities
      : ['Auto-respond to inquiries', 'Qualify leads instantly', 'Sync data automatically'],
    recommendedAgents: recommendedAgents.length > 0
      ? recommendedAgents
      : [
          { name: 'Support Bot', description: 'Handle customer inquiries 24/7', priority: 'high', estimatedTimeSaved: '10 hrs/week' },
          { name: 'Lead Qualifier', description: 'Score and route leads automatically', priority: 'high', estimatedTimeSaved: '8 hrs/week' },
          { name: 'Email Assistant', description: 'Draft and send follow-up emails', priority: 'medium', estimatedTimeSaved: '5 hrs/week' },
          { name: 'Data Sync', description: 'Keep all systems in sync', priority: 'medium', estimatedTimeSaved: '3 hrs/week' },
        ],
    estimatedImpact: parsed.estimatedImpact || 'Save 15+ hrs/week on manual tasks',
    automationScore: typeof parsed.automationScore === 'number'
      ? Math.min(100, Math.max(0, parsed.automationScore))
      : 65,
    categoryScores,
    manualProcesses: Array.isArray(parsed.manualProcesses)
      ? parsed.manualProcesses
      : ['Manual email responses', 'Hand-entered data', 'Manual scheduling', 'Manual reporting'],
    aiOpportunities: aiOpportunities.length > 0
      ? aiOpportunities
      : [
          { area: 'Customer Support', currentProcess: 'Manual email responses', proposedSolution: 'AI chatbot with knowledge base', impact: 'high' },
          { area: 'Lead Management', currentProcess: 'Manual lead tracking', proposedSolution: 'Automated lead scoring and routing', impact: 'high' },
          { area: 'Reporting', currentProcess: 'Manual report generation', proposedSolution: 'Automated analytics dashboard', impact: 'medium' },
        ],
    siteDetection: detection,
  };
}

// ========================
// FALLBACK ANALYSIS
// ========================

export function generateFallbackAnalysis(
  url: string,
  detection?: SiteDetection,
  siteInfo?: { title: string; meta: Record<string, string>; content: string },
): AnalysisResult {
  const domain = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
  const domainName = domain.split('.')[0];
  const prettyName = siteInfo?.title || (domainName.charAt(0).toUpperCase() + domainName.slice(1));
  const metaDesc = siteInfo?.meta?.['description'] || siteInfo?.meta?.['og:description'] || '';

  const det: SiteDetection = detection || {
    hasChatbot: false, hasForms: false, hasBooking: false,
    hasAnalytics: false, hasStructuredData: false, hasSSL: true,
    hasCRM: false, hasSocialProof: false,
    detectedFeatures: [], missingFeatures: ['Unable to scan — using general analysis'],
  };

  // Build pain points based on what's actually missing
  const painPoints: string[] = [];
  if (!det.hasChatbot) painPoints.push('No AI chatbot — every customer inquiry requires manual response, costing 8-10 hrs/week');
  if (!det.hasForms || !det.hasCRM) painPoints.push('Lead capture gaps — visitors leave without a way to follow up automatically');
  if (!det.hasBooking) painPoints.push('No automated booking — scheduling calls/meetings requires back-and-forth emails');
  if (!det.hasAnalytics) painPoints.push('No analytics tracking detected — no visibility into visitor behavior or conversion rates');
  if (!det.hasStructuredData) painPoints.push('No structured data — AI search engines and assistants can\'t easily parse your site');
  if (!det.hasSocialProof) painPoints.push('Limited social proof — no visible testimonials or reviews to build trust');
  if (!det.hasCRM) painPoints.push('No CRM integration detected — customer data likely lives in spreadsheets or inboxes');
  // Ensure at least 5
  const genericPains = [
    'Manual follow-up emails eating into productive hours',
    'Inconsistent response times hurting customer satisfaction',
    'No 24/7 availability for customer inquiries',
    'Content creation and social media managed entirely by hand',
    'Reporting and data aggregation done manually',
  ];
  while (painPoints.length < 5) {
    painPoints.push(genericPains[painPoints.length % genericPains.length]);
  }

  // Build opportunities based on what's missing
  const opportunities: string[] = [];
  if (!det.hasChatbot) opportunities.push('Deploy AI chatbot to handle 80% of visitor questions instantly, 24/7');
  if (!det.hasBooking) opportunities.push('Add automated scheduling — let prospects book calls without email tag');
  if (!det.hasCRM) opportunities.push('Connect a CRM to automatically capture, score, and route leads');
  if (!det.hasStructuredData) opportunities.push('Add schema.org markup so AI assistants recommend your business');
  if (!det.hasAnalytics) opportunities.push('Install analytics to track which pages convert and optimize automatically');
  if (!det.hasSocialProof) opportunities.push('Add automated review collection and testimonial display');
  const genericOpps = [
    'Automate email follow-ups — respond to leads in seconds, not hours',
    'AI content agent to draft blog posts, social updates, and newsletters',
    'Automated reporting dashboard — real-time metrics without manual work',
    'Smart form routing — AI qualifies leads and sends them to the right person',
    'Workflow automation — connect tools so data flows without manual entry',
  ];
  while (opportunities.length < 5) {
    opportunities.push(genericOpps[opportunities.length % genericOpps.length]);
  }

  // Build agent recommendations based on gaps
  const agents: AgentRecommendation[] = [];
  if (!det.hasChatbot) agents.push({ name: 'Support Bot', description: `Answer questions about ${prettyName} 24/7 — handle FAQs, route complex issues to your team`, priority: 'high', estimatedTimeSaved: '10 hrs/week' });
  if (!det.hasForms || !det.hasCRM) agents.push({ name: 'Lead Qualifier', description: `Capture visitor info, score leads by intent, and send hot prospects straight to your inbox`, priority: 'high', estimatedTimeSaved: '8 hrs/week' });
  if (!det.hasBooking) agents.push({ name: 'Booking Agent', description: `Let prospects self-schedule calls — syncs with your calendar, sends reminders automatically`, priority: 'high', estimatedTimeSaved: '5 hrs/week' });
  agents.push({ name: 'Email Assistant', description: `Draft and send personalized follow-up sequences based on visitor behavior on ${domain}`, priority: 'medium', estimatedTimeSaved: '6 hrs/week' });
  if (!det.hasStructuredData) agents.push({ name: 'SEO Agent', description: `Add structured data, optimize meta tags, and monitor search rankings automatically`, priority: 'medium', estimatedTimeSaved: '4 hrs/week' });
  agents.push({ name: 'Content Agent', description: `Generate blog posts, social media updates, and newsletters tailored to your audience`, priority: 'medium', estimatedTimeSaved: '7 hrs/week' });
  if (!det.hasCRM) agents.push({ name: 'Data Sync', description: `Keep contacts, deals, and communications in sync across all your tools`, priority: 'medium', estimatedTimeSaved: '3 hrs/week' });

  // Calculate scores based on actual detection
  const engagementScore = (det.hasChatbot ? 30 : 0) + (det.hasSocialProof ? 20 : 0) + (det.hasForms ? 25 : 0) + (det.hasBooking ? 25 : 0);
  const leadGenScore = (det.hasForms ? 30 : 0) + (det.hasCRM ? 35 : 0) + (det.hasAnalytics ? 20 : 0) + (det.hasChatbot ? 15 : 0);
  const opsScore = (det.hasCRM ? 30 : 0) + (det.hasAnalytics ? 25 : 0) + (det.hasBooking ? 25 : 0) + (det.hasSSL ? 20 : 0);
  const aiReadinessScore = (det.hasStructuredData ? 35 : 0) + (det.hasChatbot ? 25 : 0) + (det.hasCRM ? 20 : 0) + (det.hasSSL ? 20 : 0);
  const automationScore = Math.round((engagementScore + leadGenScore + opsScore + aiReadinessScore) / 4);

  // Total hours saved
  const totalHours = agents.slice(0, 4).reduce((sum, a) => {
    const match = a.estimatedTimeSaved.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 5);
  }, 0);

  // Build before/after opportunities
  const aiOpportunities: AIOpportunity[] = [];
  if (!det.hasChatbot) aiOpportunities.push({ area: 'Customer Support', currentProcess: 'Staff manually answers every email, DM, and contact form submission', proposedSolution: `AI chatbot on ${domain} handles 80% of inquiries instantly, escalates the rest`, impact: 'high' });
  if (!det.hasBooking) aiOpportunities.push({ area: 'Scheduling', currentProcess: 'Prospects email to book a meeting — takes 3-5 back-and-forth messages', proposedSolution: 'One-click booking page with AI that picks optimal time slots', impact: 'high' });
  if (!det.hasCRM) aiOpportunities.push({ area: 'Lead Management', currentProcess: 'Leads tracked in email threads or spreadsheets — easy to lose', proposedSolution: 'AI captures every lead, scores by intent, and auto-assigns follow-ups', impact: 'high' });
  if (aiOpportunities.length < 3) aiOpportunities.push({ area: 'Content & Outreach', currentProcess: 'Blog posts, emails, and social content written manually from scratch', proposedSolution: 'AI content agent drafts posts in your voice, schedules across channels', impact: 'medium' });
  if (aiOpportunities.length < 3) aiOpportunities.push({ area: 'Data & Reporting', currentProcess: 'Monthly reports compiled by hand from multiple tools', proposedSolution: 'Automated dashboard pulls live data and generates weekly summaries', impact: 'medium' });

  const summaryParts = [prettyName];
  if (metaDesc) summaryParts.push(metaDesc.slice(0, 120));
  const summaryIntro = metaDesc
    ? `${prettyName} — ${metaDesc.slice(0, 100)}. `
    : `${prettyName} (${domain}) `;

  return {
    summary: `${summaryIntro}Based on our scan, ${det.missingFeatures.length} automation gaps were identified. ${!det.hasChatbot ? 'No chatbot means every inquiry needs manual attention. ' : ''}The biggest wins are in ${!det.hasChatbot ? 'customer support' : !det.hasBooking ? 'scheduling automation' : 'lead management'} and workflow automation.`,
    businessType: guessBusinessType(siteInfo?.content || '', domain),
    painPoints: painPoints.slice(0, 5),
    opportunities: opportunities.slice(0, 5),
    recommendedAgents: agents.slice(0, 4),
    estimatedImpact: `Save ${totalHours}+ hrs/week and respond to leads 10x faster`,
    automationScore: Math.max(15, Math.min(85, 100 - automationScore)), // Invert: low current score = high opportunity
    categoryScores: [
      { name: 'Customer Engagement', score: engagementScore, label: engagementScore < 50 ? 'Major opportunity for AI engagement' : 'Some engagement tools in place' },
      { name: 'Lead Generation', score: leadGenScore, label: leadGenScore < 50 ? 'Leads likely falling through the cracks' : 'Basic lead capture in place' },
      { name: 'Operations', score: opsScore, label: opsScore < 50 ? 'Significant manual work detected' : 'Some automation already running' },
      { name: 'AI Readiness', score: aiReadinessScore, label: aiReadinessScore < 50 ? 'Site not optimized for AI agents' : 'Good foundation for AI integration' },
    ],
    manualProcesses: painPoints.slice(0, 4).map(p => p.split('—')[0].trim()),
    aiOpportunities: aiOpportunities.slice(0, 3),
    siteDetection: det,
  };
}

// Guess business type from content keywords
function guessBusinessType(content: string, domain: string): string {
  const text = (content + ' ' + domain).toLowerCase();
  const types: [string, string[]][] = [
    ['E-commerce', ['shop', 'store', 'cart', 'product', 'buy', 'price', 'shipping', 'order']],
    ['SaaS', ['saas', 'platform', 'software', 'dashboard', 'api', 'subscription', 'sign up', 'free trial']],
    ['Agency', ['agency', 'marketing', 'design', 'creative', 'portfolio', 'clients', 'campaign']],
    ['Restaurant', ['menu', 'restaurant', 'dining', 'reservation', 'food', 'chef', 'cuisine']],
    ['Healthcare', ['health', 'medical', 'patient', 'clinic', 'doctor', 'wellness', 'therapy']],
    ['Real Estate', ['property', 'real estate', 'listing', 'rent', 'mortgage', 'broker', 'realty']],
    ['Professional Services', ['consulting', 'lawyer', 'attorney', 'accounting', 'firm', 'advisory']],
    ['Education', ['course', 'learn', 'student', 'training', 'education', 'tutorial', 'academy']],
    ['Fitness', ['gym', 'fitness', 'workout', 'training', 'personal trainer', 'membership']],
    ['Non-profit', ['donate', 'nonprofit', 'charity', 'volunteer', 'mission', 'foundation']],
  ];

  let bestMatch = 'General Business';
  let bestScore = 0;
  for (const [type, keywords] of types) {
    const score = keywords.filter(k => text.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = type;
    }
  }
  return bestScore >= 2 ? bestMatch : 'General Business';
}

// ========================
// MAIN ANALYSIS FUNCTION
// ========================

export async function analyzeWebsite(url: string): Promise<AnalysisResult> {
  const startTime = Date.now();
  const { content, title, meta, rawHtml, statusCode } = await fetchWebsiteContent(url);

  // If the website couldn't be reached, throw so the API route can return an error
  if (statusCode === 0 || (!rawHtml && statusCode !== 200)) {
    throw new Error('SITE_UNREACHABLE');
  }

  // If the server returned an error status
  if (statusCode >= 400) {
    throw new Error(`SITE_ERROR_${statusCode}`);
  }

  // Run HTML feature detection
  const detection = detectSiteFeatures(rawHtml, url.startsWith('http') ? url : `https://${url}`);

  let result: AnalysisResult;
  let hadApiKey = false;

  if (process.env.ANTHROPIC_API_KEY) {
    hadApiKey = true;
    const siteInfo = { title, meta, content };
    try {
      const prompt = buildAnalysisPrompt(url, content, title, meta, detection);
      const responseText = await callClaudeAPI(prompt);
      result = parseAnalysisResponse(responseText, detection);
    } catch (error) {
      console.error('Claude analysis failed, using fallback:', error);
      result = generateFallbackAnalysis(url, detection, siteInfo);
    }
  } else {
    const siteInfo = { title, meta, content };
    result = generateFallbackAnalysis(url, detection, siteInfo);
  }

  // Record this analysis
  const record: AnalysisRecord = {
    id: `analysis_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    url: normalizeUrl(url),
    timestamp: new Date().toISOString(),
    result,
    metadata: {
      responseTimeMs: Date.now() - startTime,
      contentLength: content.length,
      hadApiKey,
    },
  };

  recordAnalysis(record);
  updateMetrics(result);

  return result;
}

// ========================
// HISTORY & COMPARISON
// ========================

function normalizeUrl(url: string): string {
  return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '').toLowerCase();
}

function recordAnalysis(record: AnalysisRecord): void {
  const key = record.url;
  const history = analysisHistory.get(key) || [];
  history.push(record);
  // Keep last 50 analyses per URL
  if (history.length > 50) {
    history.splice(0, history.length - 50);
  }
  analysisHistory.set(key, history);
}

function updateMetrics(result: AnalysisResult): void {
  agentMetrics.totalAnalyses++;

  // Update average score
  const prevTotal = agentMetrics.averageScore * (agentMetrics.totalAnalyses - 1);
  agentMetrics.averageScore = (prevTotal + result.automationScore) / agentMetrics.totalAnalyses;

  // Track business types
  const typeCount = agentMetrics.mostCommonBusinessTypes.get(result.businessType) || 0;
  agentMetrics.mostCommonBusinessTypes.set(result.businessType, typeCount + 1);

  // Track recommended agents
  for (const agent of result.recommendedAgents) {
    const count = agentMetrics.mostRecommendedAgents.get(agent.name) || 0;
    agentMetrics.mostRecommendedAgents.set(agent.name, count + 1);
  }
}

export function getAnalysisHistory(url: string): AnalysisRecord[] {
  return analysisHistory.get(normalizeUrl(url)) || [];
}

export function getAllAnalysisHistory(): AnalysisRecord[] {
  const all: AnalysisRecord[] = [];
  for (const records of analysisHistory.values()) {
    all.push(...records);
  }
  return all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function compareAnalyses(url: string): AnalysisComparison | null {
  const history = getAnalysisHistory(url);
  if (history.length < 2) return null;

  const current = history[history.length - 1];
  const previous = history[history.length - 2];

  const changes: string[] = [];
  const improvements: string[] = [];
  const newIssues: string[] = [];

  // Compare automation scores
  const scoreChange = current.result.automationScore - previous.result.automationScore;
  if (scoreChange !== 0) {
    changes.push(`Automation score ${scoreChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(scoreChange)} points`);
  }

  // Find new pain points
  for (const point of current.result.painPoints) {
    if (!previous.result.painPoints.includes(point)) {
      newIssues.push(point);
    }
  }

  // Find resolved pain points
  for (const point of previous.result.painPoints) {
    if (!current.result.painPoints.includes(point)) {
      improvements.push(`Resolved: ${point}`);
    }
  }

  // Compare business type changes
  if (current.result.businessType !== previous.result.businessType) {
    changes.push(`Business type reclassified: ${previous.result.businessType} -> ${current.result.businessType}`);
  }

  return {
    url: normalizeUrl(url),
    previousDate: previous.timestamp,
    currentDate: current.timestamp,
    changes,
    improvements,
    newIssues,
    scoreChange,
  };
}

// ========================
// SELF-IMPROVEMENT
// ========================

export function getAgentMetrics() {
  return {
    totalAnalyses: agentMetrics.totalAnalyses,
    averageScore: Math.round(agentMetrics.averageScore * 10) / 10,
    topBusinessTypes: Array.from(agentMetrics.mostCommonBusinessTypes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type, count]) => ({ type, count })),
    topRecommendedAgents: Array.from(agentMetrics.mostRecommendedAgents.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count })),
    lastRefinedAt: agentMetrics.lastRefinedAt || 'never',
  };
}

export function getInsights(): string[] {
  const insights: string[] = [];
  const metrics = getAgentMetrics();

  if (metrics.totalAnalyses > 0) {
    insights.push(`Analyzed ${metrics.totalAnalyses} website${metrics.totalAnalyses > 1 ? 's' : ''} with average automation score of ${metrics.averageScore}/100`);
  }

  if (metrics.topBusinessTypes.length > 0) {
    const topType = metrics.topBusinessTypes[0];
    insights.push(`Most analyzed business type: ${topType.type} (${topType.count} analyses)`);
  }

  if (metrics.topRecommendedAgents.length > 0) {
    const topAgent = metrics.topRecommendedAgents[0];
    insights.push(`Most recommended agent: ${topAgent.name} (suggested ${topAgent.count} times)`);
  }

  if (metrics.averageScore > 70) {
    insights.push('High automation potential detected across analyzed sites - most businesses have significant room for AI improvement');
  }

  return insights;
}
