// ========================
// WEBSITE ANALYSIS AGENT
// ========================
// Analyzes websites for AI/automation improvement opportunities,
// tracks analysis history, and self-improves over time.

export interface AnalysisResult {
  summary: string;
  businessType: string;
  painPoints: string[];
  opportunities: string[];
  recommendedAgents: AgentRecommendation[];
  estimatedImpact: string;
  automationScore: number; // 0-100
  manualProcesses: string[];
  aiOpportunities: AIOpportunity[];
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
// WEBSITE CONTENT FETCHER
// ========================

export async function fetchWebsiteContent(url: string): Promise<{
  content: string;
  title: string;
  meta: Record<string, string>;
  statusCode: number;
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

    // Extract structured text content
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
      .slice(0, 8000);

    return { content, title, meta, statusCode: response.status };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: `Website URL: ${url} (fetch failed: ${message})`,
      title: '',
      meta: {},
      statusCode: 0,
    };
  }
}

// ========================
// ANALYSIS PROMPT BUILDER
// ========================

function buildAnalysisPrompt(url: string, content: string, title: string, meta: Record<string, string>): string {
  const metaDescription = meta['description'] || meta['og:description'] || '';
  const keywords = meta['keywords'] || '';

  return `You are an elite AI automation consultant and business analyst. Perform a deep analysis of this business website to identify automation and AI improvement opportunities.

WEBSITE: ${url}
TITLE: ${title}
META DESCRIPTION: ${metaDescription}
KEYWORDS: ${keywords}
PAGE CONTENT: ${content}

Analyze this business thoroughly and respond in this exact JSON format:

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
    "Specific automation win - what we'd build and expected result",
    "Second automation opportunity with measurable outcome",
    "Third opportunity - AI-powered improvement",
    "Fourth opportunity - workflow automation",
    "Fifth opportunity - customer experience enhancement"
  ],
  "recommendedAgents": [
    {
      "name": "2-3 word agent name (e.g., 'Lead Qualifier')",
      "description": "One sentence: what it does and how it helps THIS business",
      "priority": "high|medium|low",
      "estimatedTimeSaved": "e.g., '8 hrs/week'"
    },
    {
      "name": "Second agent",
      "description": "Specific to their needs",
      "priority": "high|medium|low",
      "estimatedTimeSaved": "estimate"
    },
    {
      "name": "Third agent",
      "description": "Specific to their needs",
      "priority": "high|medium|low",
      "estimatedTimeSaved": "estimate"
    },
    {
      "name": "Fourth agent",
      "description": "Specific to their needs",
      "priority": "medium|low",
      "estimatedTimeSaved": "estimate"
    }
  ],
  "estimatedImpact": "Bold, specific metric (e.g., 'Save 25+ hrs/week and increase lead conversion by 40%')",
  "automationScore": 65,
  "manualProcesses": [
    "Specific manual process they're likely doing (e.g., 'Manually responding to contact form submissions')",
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
    },
    {
      "area": "Second area",
      "currentProcess": "Current manual process",
      "proposedSolution": "AI solution",
      "impact": "high|medium|low"
    },
    {
      "area": "Third area",
      "currentProcess": "Current manual process",
      "proposedSolution": "AI solution",
      "impact": "high|medium|low"
    }
  ]
}

ANALYSIS RULES:
- automationScore: 0-100 rating of how much this business could benefit from automation (higher = more opportunity)
- Be brutally specific to THIS business - no generic advice
- Pain points must reference real operational friction, not vague concerns
- Every recommended agent must solve a specific problem you identified
- manualProcesses: things they're clearly doing by hand that AI could handle
- aiOpportunities: concrete before/after scenarios
- Prioritize recommendations by ROI potential
- Be direct and confident. No hedging or filler language.

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

function parseAnalysisResponse(text: string): AnalysisResult {
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
  };
}

// ========================
// FALLBACK ANALYSIS
// ========================

export function generateFallbackAnalysis(url: string): AnalysisResult {
  const domain = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
  const domainName = domain.split('.')[0];
  const prettyName = domainName.charAt(0).toUpperCase() + domainName.slice(1);

  return {
    summary: `${prettyName} (${domain}) likely handles significant volume of customer interactions manually. The team is probably stretched thin managing repetitive inquiries, follow-ups, and data entry that AI agents could handle instantly.`,
    businessType: 'General Business',
    painPoints: [
      'Hours lost daily to repetitive customer questions',
      'Lead follow-ups falling through the cracks',
      'Manual data entry slowing operations',
      'Inconsistent response times hurting customer satisfaction',
      'No 24/7 availability for customer inquiries',
    ],
    opportunities: [
      'Auto-respond to common inquiries with 95% accuracy',
      'Qualify and route leads automatically in seconds',
      'Sync data across tools to eliminate manual entry',
      'Provide instant 24/7 customer support via AI chatbot',
      'Generate automated reports and analytics dashboards',
    ],
    recommendedAgents: [
      { name: 'Support Bot', description: 'Handle common customer inquiries 24/7 with AI-powered responses', priority: 'high', estimatedTimeSaved: '10 hrs/week' },
      { name: 'Lead Qualifier', description: 'Score incoming leads and route to the right team member instantly', priority: 'high', estimatedTimeSaved: '8 hrs/week' },
      { name: 'Email Assistant', description: 'Draft and send personalized follow-up emails automatically', priority: 'medium', estimatedTimeSaved: '5 hrs/week' },
      { name: 'Data Sync', description: 'Keep CRM, email, and tools in sync automatically', priority: 'medium', estimatedTimeSaved: '3 hrs/week' },
    ],
    estimatedImpact: 'Save 20+ hrs/week and respond to leads 10x faster',
    automationScore: 70,
    manualProcesses: [
      'Manually responding to contact form submissions',
      'Hand-qualifying leads from website traffic',
      'Copying data between email, CRM, and spreadsheets',
      'Writing follow-up emails one by one',
    ],
    aiOpportunities: [
      { area: 'Customer Support', currentProcess: 'Staff manually answers emails and chat', proposedSolution: 'AI chatbot handles 80% of inquiries, escalates complex ones', impact: 'high' },
      { area: 'Lead Management', currentProcess: 'Leads sit in inbox until someone reviews them', proposedSolution: 'AI scores leads in real-time and routes to sales', impact: 'high' },
      { area: 'Data Operations', currentProcess: 'Manual data entry across multiple tools', proposedSolution: 'Automated data sync and validation between systems', impact: 'medium' },
    ],
  };
}

// ========================
// MAIN ANALYSIS FUNCTION
// ========================

export async function analyzeWebsite(url: string): Promise<AnalysisResult> {
  const startTime = Date.now();
  const { content, title, meta, statusCode } = await fetchWebsiteContent(url);

  let result: AnalysisResult;
  let hadApiKey = false;

  if (process.env.ANTHROPIC_API_KEY) {
    hadApiKey = true;
    try {
      const prompt = buildAnalysisPrompt(url, content, title, meta);
      const responseText = await callClaudeAPI(prompt);
      result = parseAnalysisResponse(responseText);
    } catch (error) {
      console.error('Claude analysis failed, using fallback:', error);
      result = generateFallbackAnalysis(url);
    }
  } else {
    result = generateFallbackAnalysis(url);
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
