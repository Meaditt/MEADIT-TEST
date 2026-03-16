import { NextResponse } from 'next/server';

// Company knowledge base - this is what the AI knows about your company
const COMPANY_KNOWLEDGE = `
You are a helpful AI assistant for an AI automation agency. Here's what you know about the company:

## About Us
- We are a boutique AI automation agency that helps small business owners reclaim their time
- Founded by Gal Baumel and team members who left corporate jobs to help real businesses
- We focus on practical automation that delivers ROI, not flashy tech demos
- We only work with small businesses (under 50 employees) because we believe they deserve the same AI tools as big corporations

## Our Services
- Smart Review Response: AI that responds to Google/Yelp reviews in your voice, 24/7
- Data Processing: Converting messy PDFs, emails, and documents into organized data
- Customer Support Automation: AI chatbots and email responders that handle routine inquiries
- Workflow Automation: Connecting your tools (CRM, email, scheduling) to work together automatically
- Custom AI Solutions: Building bespoke automation for unique business needs

## Our Process
1. Discovery Call (30 min, free): We listen to your pain points and identify opportunities
2. Proposal: Clear scope, timeline, and pricing - no surprises
3. Build: Weekly demos, constant feedback, you're part of the team
4. Launch & Support: We don't disappear after launch, we monitor and optimize

## Pricing
- We don't publish prices because every project is different
- Typical projects range from $2,000 to $25,000 depending on complexity
- We offer payment plans for larger projects
- ROI focus: Most clients see payback within 2-6 months

## What Makes Us Different
- We speak human, not tech jargon
- We're honest - if we can't help, we'll tell you and point you to someone who can
- We build for your specific needs, not one-size-fits-all solutions
- We focus on results: hours saved, errors eliminated, revenue increased

## Ideal Clients
- Restaurant owners drowning in reviews and reservations
- E-commerce businesses spending hours on order processing
- Healthcare practices dealing with appointment no-shows
- Professional services firms buried in paperwork
- Any small business doing the same tasks over and over

## Common Questions
Q: How long does a project take?
A: Typically 2-6 weeks depending on complexity. Simple automations can be live in days.

Q: Do I need technical skills?
A: No! We build everything to be user-friendly. If you can use a smartphone, you can use our solutions.

Q: What if it doesn't work?
A: We offer a satisfaction guarantee. If the automation doesn't meet agreed metrics, we fix it at no extra cost.

Q: Can you integrate with my existing tools?
A: We work with most popular tools: Google Workspace, Microsoft 365, Shopify, WooCommerce, HubSpot, Salesforce, and hundreds more.

## Contact
- Book a free call: /start page
- Email: hello@youraiagency.com
- Based in Tel Aviv, work with clients worldwide
`;

const SYSTEM_PROMPT = `${COMPANY_KNOWLEDGE}

## Your Behavior
- Be friendly, helpful, and conversational
- Keep responses concise (2-3 sentences usually)
- Focus on understanding their pain points and showing how we can help
- Ask clarifying questions to understand their specific situation
- Never make up pricing - direct them to book a call for specific quotes
- If they seem interested, gently encourage them to share their email or book a call
- Use simple language, avoid jargon
- Be honest - if something isn't a good fit for us, say so

## Lead Qualification
After 2-3 exchanges where they show genuine interest, you should:
1. Acknowledge their specific pain point
2. Briefly explain how we could help
3. Suggest they book a free discovery call or leave their email for follow-up

## Important
- Never provide made-up statistics or guarantees
- Always recommend booking a call for specific pricing or timeline questions
- Be empathetic to their frustrations with manual work
- Remember: your goal is to be genuinely helpful AND generate qualified leads
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

    // Check if we have an API key configured
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback to rule-based responses if no API key
      const response = generateFallbackResponse(messages, leadInfo);
      return NextResponse.json(response);
    }

    // Use Claude if available, otherwise OpenAI
    if (process.env.ANTHROPIC_API_KEY) {
      return await handleClaudeChat(messages, leadInfo);
    } else {
      return await handleOpenAIChat(messages, leadInfo);
    }
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      {
        message: "I'm having a moment! You can reach our team directly at hello@youraiagency.com or book a call on our Start page.",
        collectLead: false
      },
      { status: 200 }
    );
  }
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
      system: SYSTEM_PROMPT,
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
    // Fall back to rule-based responses on API error
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

  const shouldCollectLead = messages.length >= 4 && !leadInfo?.email;

  return NextResponse.json({
    message: messageText,
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
        { role: 'system', content: SYSTEM_PROMPT },
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
    // Fall back to rule-based responses on API error
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

  const shouldCollectLead = messages.length >= 4 && !leadInfo?.email;

  return NextResponse.json({
    message: messageText,
    collectLead: shouldCollectLead,
  });
}

// Fallback responses when no API key is configured
function generateFallbackResponse(messages: ChatMessage[], leadInfo: Record<string, unknown>) {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content.toLowerCase() || '';
  const messageCount = messages.filter(m => m.role === 'user').length;

  // Pattern matching for common questions
  if (lastUserMessage.includes('price') || lastUserMessage.includes('cost') || lastUserMessage.includes('how much')) {
    return {
      message: "Great question! Our pricing depends on the complexity of your needs - projects typically range from $2K to $25K. The best way to get an accurate quote is to book a free 30-minute discovery call where we can understand your specific situation. Would you like me to help you schedule one?",
      collectLead: true,
    };
  }

  if (lastUserMessage.includes('how long') || lastUserMessage.includes('timeline') || lastUserMessage.includes('time')) {
    return {
      message: "Most projects take 2-6 weeks from start to finish. Simple automations can be live in just a few days! It really depends on what you need. What kind of tasks are you looking to automate?",
      collectLead: false,
    };
  }

  if (lastUserMessage.includes('review') || lastUserMessage.includes('google') || lastUserMessage.includes('yelp')) {
    return {
      message: "Ah, review management! That's one of our specialties. We build AI that responds to reviews in YOUR voice - so customers get timely responses and you don't spend hours crafting replies. On average, our clients save 5-10 hours per week on this alone. Is this something you're struggling with?",
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('email') || lastUserMessage.includes('inbox') || lastUserMessage.includes('customer service')) {
    return {
      message: "Email overload is so common! We can help automate responses to routine inquiries, categorize incoming messages, and make sure nothing falls through the cracks. What industry is your business in? That helps me understand what kind of emails you're dealing with.",
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('restaurant') || lastUserMessage.includes('food') || lastUserMessage.includes('reservation')) {
    return {
      message: "We love working with restaurants! Common automations include: review responses, reservation confirmations and reminders, inventory alerts, and even menu updates. What's the biggest time-sink in your daily operations?",
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('ecommerce') || lastUserMessage.includes('shop') || lastUserMessage.includes('store') || lastUserMessage.includes('orders')) {
    return {
      message: "E-commerce automation is huge! We help with order processing, inventory management, customer follow-ups, and refund handling. The goal is to free you up to focus on growth instead of operations. How many orders are you processing monthly?",
      collectLead: messageCount >= 2,
    };
  }

  if (lastUserMessage.includes('book') || lastUserMessage.includes('call') || lastUserMessage.includes('talk') || lastUserMessage.includes('schedule')) {
    return {
      message: "Absolutely! You can book a free 30-minute discovery call on our Start page. No pressure, no sales pitch - just an honest conversation about whether we can help. Would you like me to share your email so our team can also send you some relevant case studies beforehand?",
      collectLead: true,
    };
  }

  if (lastUserMessage.includes('thank') || lastUserMessage.includes('helpful') || lastUserMessage.includes('great')) {
    return {
      message: "You're welcome! If you'd like to explore this further, I'd recommend booking a free call with our team - they can give you specific advice for your situation. Or if you share your email, we can send you some relevant case studies. What would work better for you?",
      collectLead: true,
    };
  }

  // Default responses based on conversation progress
  if (messageCount <= 1) {
    return {
      message: "I'd love to help you figure that out! To give you the best advice, could you tell me a bit more about your business? What industry are you in, and roughly how big is your team?",
      collectLead: false,
    };
  }

  if (messageCount === 2) {
    return {
      message: "That's really helpful context! Based on what you've shared, it sounds like there could be some good automation opportunities. What would you say is the ONE task that eats up most of your time or causes the most headaches?",
      collectLead: false,
    };
  }

  if (messageCount >= 3 && !leadInfo?.email) {
    return {
      message: "This is exactly the kind of challenge we help businesses solve! We've helped similar companies save 10-20 hours per week with the right automation. Would you like to book a free discovery call to explore specific solutions? Or I can have our team send you some relevant case studies if you share your email.",
      collectLead: true,
    };
  }

  return {
    message: "That's a great point! Every business is unique, which is why we always start with a free discovery call to understand your specific needs. No commitment, just a conversation about what's possible. Would you like to schedule one?",
    collectLead: true,
  };
}
