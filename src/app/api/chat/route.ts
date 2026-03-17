import { NextResponse } from 'next/server';

// Site pages the bot can navigate to
const SITE_PAGES = {
  book: { path: '/book', label: 'Book a Call' },
  start: { path: '/start', label: 'Get Started' },
  stories: { path: '/stories', label: 'See Our Work' },
  about: { path: '/about', label: 'About Us' },
  blog: { path: '/blog', label: 'Read Our Blog' },
  agents: { path: '/agents', label: 'AI Agents' },
};

const COMPANY_KNOWLEDGE = `
You are MeadITT's AI assistant embedded on the company website. You help visitors understand MeadITT's services and guide them to the right page.

## About MeadITT
- Boutique AI automation agency helping small businesses (under 50 employees) reclaim their time
- Founded by Gal Baumel — left corporate to help real businesses with practical AI
- Team: Gal (founder), Maya, Tom
- Based in Tel Aviv, work with clients worldwide
- Tagline: "AI that actually works"

## Services
- Smart Review Response: AI that responds to Google/Yelp reviews in your brand voice, 24/7
- Data Processing: Converting messy PDFs, emails, documents into organized data
- Customer Support Automation: AI chatbots and email responders for routine inquiries
- Workflow Automation: Connecting CRM, email, scheduling tools to work together
- Custom AI Solutions: Bespoke automation for unique business needs

## Process
1. Discovery Call (30 min, free) — Listen to pain points, identify opportunities
2. Proposal — Clear scope, timeline, pricing
3. Build — Weekly demos, constant feedback
4. Launch & Support — Monitoring and optimization

## Pricing
- Every project is different, typical range $2K–$25K
- Payment plans available for larger projects
- Most clients see ROI in 2–6 months

## Ideal Clients
- Restaurant owners (reviews, reservations)
- E-commerce businesses (order processing)
- Healthcare practices (appointment no-shows)
- Professional services (paperwork automation)
- Any small business doing repetitive tasks

## Website Pages (use these for navigation actions)
- /book — Book a free 30-min discovery call (calendar booking)
- /start — Get started page with quick assessment + booking options
- /stories — Case studies and client success stories
- /blog — Blog with AI automation tips and insights
- /about — Team story, philosophy, honest numbers
- /agents — AI agent solutions dashboard

## IMPORTANT: Navigation Actions
When your response relates to a specific page, you MUST include a navigation action using this exact format at the END of your message:
[[ACTION:path|label]]

Examples:
- If someone wants to book a call: add [[ACTION:/book|Book a Free Call]]
- If someone asks about your work/portfolio: add [[ACTION:/stories|See Our Work]]
- If someone wants to get started: add [[ACTION:/start|Get Started Now]]
- If someone asks about the team: add [[ACTION:/about|Meet the Team]]
- If someone asks about blog/tips: add [[ACTION:/blog|Read Our Blog]]
- If someone asks about AI agents: add [[ACTION:/agents|Explore AI Agents]]

You can include multiple actions. Always include at least one action when it makes sense.

## Your Behavior — Conversational & Human
- ALWAYS acknowledge what the user said first before giving your answer. Show you actually read their message.
  Example: User says "I run a bakery and reviews are killing me" → "Ugh, review management can be a real time drain — especially when you're busy running a bakery!"
- Be warm, casual, and human. Talk like a helpful friend, not a sales bot.
- Keep responses to 2-3 sentences. Don't dump walls of text.
- Ask follow-up questions to keep the conversation flowing naturally. Don't just answer and stop.
- Mirror the user's energy — if they're casual, be casual. If they're formal, match it.
- Use contractions (we're, you'll, that's) and casual language.
- Never make up pricing — direct to booking a call.
- Be honest — if something isn't a good fit, say so.
- When someone asks about booking, pricing, or getting started, ALWAYS include the navigation action.
- Don't be pushy. Guide naturally, don't hard-sell.
`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, leadInfo } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const response = generateFallbackResponse(messages, leadInfo);
      return NextResponse.json(response);
    }

    if (process.env.ANTHROPIC_API_KEY) {
      return await handleClaudeChat(messages, leadInfo);
    } else {
      return await handleOpenAIChat(messages, leadInfo);
    }
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      {
        message: "I'm having a moment! You can reach our team directly or book a call.",
        actions: [{ type: 'navigate', path: '/book', label: 'Book a Call' }],
        collectLead: false,
      },
      { status: 200 }
    );
  }
}

function parseActions(text: string): { cleanText: string; actions: Array<{ type: string; path: string; label: string }> } {
  const actionRegex = /\[\[ACTION:(\/[a-z-]+)\|([^\]]+)\]\]/g;
  const actions: Array<{ type: string; path: string; label: string }> = [];
  let match;

  while ((match = actionRegex.exec(text)) !== null) {
    actions.push({
      type: 'navigate',
      path: match[1],
      label: match[2],
    });
  }

  const cleanText = text.replace(actionRegex, '').trim();
  return { cleanText, actions };
}

async function handleClaudeChat(messages: ChatMessage[], leadInfo: Record<string, unknown>) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2024-10-22',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: COMPANY_KNOWLEDGE,
      messages: messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Claude API error:', response.status, errorBody);
    const fallback = generateFallbackResponse(messages, leadInfo);
    return NextResponse.json(fallback);
  }

  const data = await response.json();
  const messageText = data.content?.[0]?.text;

  if (!messageText) {
    console.error('Claude API returned unexpected shape:', JSON.stringify(data));
    const fallback = generateFallbackResponse(messages, leadInfo);
    return NextResponse.json(fallback);
  }

  const { cleanText, actions } = parseActions(messageText);
  const shouldCollectLead = messages.length >= 4 && !leadInfo?.email;

  return NextResponse.json({
    message: cleanText,
    actions,
    collectLead: shouldCollectLead,
  });
}

async function handleOpenAIChat(messages: ChatMessage[], leadInfo: Record<string, unknown>) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 500,
      messages: [
        { role: 'system', content: COMPANY_KNOWLEDGE },
        ...messages
          .filter((m) => m.role !== 'system')
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('OpenAI API error:', response.status, errorBody);
    const fallback = generateFallbackResponse(messages, leadInfo);
    return NextResponse.json(fallback);
  }

  const data = await response.json();
  const messageText = data.choices?.[0]?.message?.content;

  if (!messageText) {
    console.error('OpenAI API returned unexpected shape:', JSON.stringify(data));
    const fallback = generateFallbackResponse(messages, leadInfo);
    return NextResponse.json(fallback);
  }

  const { cleanText, actions } = parseActions(messageText);
  const shouldCollectLead = messages.length >= 4 && !leadInfo?.email;

  return NextResponse.json({
    message: cleanText,
    actions,
    collectLead: shouldCollectLead,
  });
}

function generateFallbackResponse(messages: ChatMessage[], leadInfo: Record<string, unknown>) {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content.toLowerCase() || '';
  const messageCount = messages.filter(m => m.role === 'user').length;

  if (lastUserMessage.includes('price') || lastUserMessage.includes('cost') || lastUserMessage.includes('how much')) {
    return {
      message: "Totally fair question — pricing is usually the first thing on everyone's mind! It depends on what you need, but most projects land between $2K and $25K. The best way to get a real number is a quick free call where we can learn about your situation. No strings attached!",
      actions: [
        { type: 'navigate', path: '/book', label: 'Book a Free Call' },
        { type: 'navigate', path: '/stories', label: 'See Our Work' },
      ],
      collectLead: true,
    };
  }

  if (lastUserMessage.includes('how long') || lastUserMessage.includes('timeline') || lastUserMessage.includes('time')) {
    return {
      message: "Good question! Most projects take 2-6 weeks, but honestly some simple automations can go live in just a few days. It really comes down to what you're building. What kind of tasks are eating up your time right now?",
      actions: [{ type: 'navigate', path: '/start', label: 'Get Started' }],
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('review') || lastUserMessage.includes('google') || lastUserMessage.includes('yelp')) {
    return {
      message: "Oh yeah, keeping up with reviews is exhausting — especially when you've got a business to run! That's actually one of our most popular services. We build AI that responds in YOUR voice, so customers get timely replies and you save hours every week. Want to see how it works in practice?",
      actions: [
        { type: 'navigate', path: '/stories', label: 'See Case Studies' },
        { type: 'navigate', path: '/book', label: 'Book a Call' },
      ],
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('email') || lastUserMessage.includes('inbox') || lastUserMessage.includes('customer service') || lastUserMessage.includes('support')) {
    return {
      message: "I hear you — inbox overload is one of the most common frustrations we hear from business owners! We can help automate the repetitive replies, sort incoming messages, and make sure nothing slips through the cracks. What kind of business are you running? That'll help me give better advice.",
      actions: [{ type: 'navigate', path: '/agents', label: 'See AI Agents' }],
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('restaurant') || lastUserMessage.includes('food') || lastUserMessage.includes('reservation')) {
    return {
      message: "Nice — we love working with restaurants! You guys are usually juggling so many things at once. We've helped with review responses, reservation reminders, inventory alerts, and more. What's the one thing that takes up way too much of your day?",
      actions: [{ type: 'navigate', path: '/stories', label: 'See Restaurant Stories' }],
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('ecommerce') || lastUserMessage.includes('shop') || lastUserMessage.includes('store') || lastUserMessage.includes('orders')) {
    return {
      message: "E-commerce — awesome! There's usually a ton of stuff we can take off your plate. Order processing, inventory tracking, customer follow-ups, even returns handling. Roughly how many orders are you doing per month? That helps me figure out where the biggest wins would be.",
      actions: [{ type: 'navigate', path: '/stories', label: 'See E-commerce Cases' }],
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('book') || lastUserMessage.includes('call') || lastUserMessage.includes('talk') || lastUserMessage.includes('schedule') || lastUserMessage.includes('meet')) {
    return {
      message: "For sure! Let's get you on the calendar. It's a chill 30-minute chat — no sales pitch, just a real conversation about what you're dealing with and whether we can actually help.",
      actions: [{ type: 'navigate', path: '/book', label: 'Book a Free Call' }],
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('about') || lastUserMessage.includes('team') || lastUserMessage.includes('who') || lastUserMessage.includes('founder')) {
    return {
      message: "Glad you asked! We're a small team led by Gal — he left corporate because he was tired of seeing small businesses get left behind on AI. The whole team's been in your shoes, which is why we build things that actually work, not just look cool in demos.",
      actions: [{ type: 'navigate', path: '/about', label: 'Meet the Team' }],
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('work') || lastUserMessage.includes('portfolio') || lastUserMessage.includes('case') || lastUserMessage.includes('example') || lastUserMessage.includes('client')) {
    return {
      message: "Yeah! We've got a bunch of real stories from founders we've worked with — no fluff, just actual results. Take a look and see if anything resonates with your situation!",
      actions: [{ type: 'navigate', path: '/stories', label: 'See Our Work' }],
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('blog') || lastUserMessage.includes('tips') || lastUserMessage.includes('learn') || lastUserMessage.includes('article')) {
    return {
      message: "Love that you want to dig deeper! Our blog has practical tips on AI automation — no buzzword soup, just stuff you can actually use. Check it out!",
      actions: [{ type: 'navigate', path: '/blog', label: 'Read Our Blog' }],
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('start') || lastUserMessage.includes('begin') || lastUserMessage.includes('get started') || lastUserMessage.includes('interested')) {
    return {
      message: "Love the energy! You've got two easy options — a quick 30-second assessment to see where AI can help, or you can jump straight to booking a call if you'd rather just talk it through. Either way, totally free.",
      actions: [
        { type: 'navigate', path: '/start', label: 'Get Started' },
        { type: 'navigate', path: '/book', label: 'Book a Call' },
      ],
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('thank') || lastUserMessage.includes('helpful') || lastUserMessage.includes('great')) {
    return {
      message: "Happy to help! If you want to take the next step, a free call with our team is the best way — they can give you advice specific to your business. No pressure at all though!",
      actions: [{ type: 'navigate', path: '/book', label: 'Book a Free Call' }],
      collectLead: true,
    };
  }

  if (lastUserMessage.includes('hi') || lastUserMessage.includes('hello') || lastUserMessage.includes('hey') || lastUserMessage.includes('sup')) {
    return {
      message: "Hey there! Welcome to MeadITT. I'm here to help you figure out if AI automation could save you some time. What's on your mind?",
      actions: [],
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('help') || lastUserMessage.includes('need') || lastUserMessage.includes('looking for')) {
    return {
      message: "Of course, that's what I'm here for! Tell me a bit about what's going on — what's eating up your time or driving you crazy right now? I'll see if we can help.",
      actions: [],
      collectLead: false,
    };
  }

  // Default responses based on conversation progress
  if (messageCount <= 1) {
    return {
      message: "Thanks for sharing that! To point you in the right direction, could you tell me a bit more? Like what kind of business you're running and what tasks feel like they take up way too much of your day?",
      actions: [],
      collectLead: false,
    };
  }

  if (messageCount === 2) {
    return {
      message: "That makes a lot of sense — I can see why that would be frustrating! It sounds like there are some real opportunities to automate things. If you had to pick just ONE thing that wastes the most time, what would it be?",
      actions: [],
      collectLead: false,
    };
  }

  if (messageCount >= 3 && !leadInfo?.email) {
    return {
      message: "You know what, this is exactly the kind of thing we help with every day. We've seen similar businesses save 10-20 hours a week once the right automation is in place. Want to explore what that could look like for you?",
      actions: [
        { type: 'navigate', path: '/book', label: 'Book a Free Call' },
        { type: 'navigate', path: '/start', label: 'Quick Assessment' },
      ],
      collectLead: true,
    };
  }

  return {
    message: "Honestly, every business is a bit different — which is exactly why a free call works so well. It's just a 30-min conversation about what's possible. No commitment, no pitch deck!",
    actions: [{ type: 'navigate', path: '/book', label: 'Book a Call' }],
    collectLead: true,
  };
}
