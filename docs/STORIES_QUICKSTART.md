# Stories System - Quick Start Guide

## Adding a New Story (5 Minutes)

### Step 1: Open the Data File
```bash
open /Users/galbaumel/agency-website/src/lib/data/stories.ts
```

### Step 2: Add Your Story
Scroll to the `stories` array and add a new story object:

```typescript
{
  id: '6', // Increment the ID
  slug: 'your-story-slug', // URL-friendly slug
  title: 'Your Story Title',
  subtitle: 'One-line description of the transformation',
  hook: 'The compelling opening sentence that draws readers in',
  category: 'Your Industry', // E-Commerce, Real Estate, Healthcare, etc.
  painTypes: ['Pain Point 1', 'Pain Point 2'], // What problems did they have?
  keyStat: { value: '10x', label: 'Faster' }, // The big number
  oneLiner: 'Summary of the transformation',
  color: '#8b5cf6', // Optional: hex color for gradients
  chapters: {
    before: 'The challenge they faced before the solution. Tell the story of their pain, frustration, and the breaking point that made them seek help.',
    solution: 'How the AI agent solved their problem. What does it do? How does it integrate? What was the implementation like?',
    after: 'The results and transformation. How is their life different now? What can they do with the time saved?',
  },
  results: [
    {
      label: 'Metric Name',
      before: 'Old value',
      after: 'New value',
      improvement: 'X% increase',
    },
    // Add 3-4 results showing quantitative improvements
  ],
  quote: {
    text: 'A powerful testimonial from the customer',
    author: 'Customer Name, Title/Company',
  },
}
```

### Step 3: Save and Build
```bash
npm run build
```

The new story page will automatically generate at `/stories/your-story-slug`

## Quick Reference

### Categories
- E-Commerce
- Real Estate
- Healthcare
- Legal
- Marketing
- Finance
- (Add your own!)

### Pain Types
- Data Entry
- Customer Support
- Content Creation
- Scheduling
- Research
- Reporting
- (Add your own!)

### Writing Tips

**Hook**: Start with a specific, relatable moment
- ❌ "The company had problems with efficiency"
- ✅ "At 11:47 PM, after a 14-hour shift, Sarah was still responding to customer emails"

**Before**: Show the pain
- Focus on emotional impact, not just tasks
- Include specific time wasters
- Show the breaking point

**Solution**: Explain the AI agent
- What does it actually do?
- How does it integrate with existing systems?
- What was the implementation process?

**After**: Show transformation
- Quantitative results (time, money, efficiency)
- Qualitative improvements (happiness, work-life balance)
- New possibilities enabled

**Quote**: Make it personal
- ❌ "This tool is great"
- ✅ "I used to work weekends. Now I coach my kid's soccer team."

## Testing Your Story

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/stories`
3. Find your new story card
4. Click to open detail page
5. Check all sections load correctly
6. Test on mobile

## File Locations

- **Data**: `/src/lib/data/stories.ts`
- **Hub Page**: `/src/app/stories/page.tsx`
- **Detail Page**: `/src/app/stories/[slug]/page.tsx`
- **Components**: `/src/components/stories/`

## Common Tasks

### Change Filter Categories
Edit the `categories` array in `/src/lib/data/stories.ts`

### Change Filter Pain Types
Edit the `painTypes` array in `/src/lib/data/stories.ts`

### Customize Colors
Add `color: '#hexcode'` to any story object

### Hide a Story
Remove it from the `stories` array (don't delete, just comment out)

### Reorder Stories
Reorder items in the `stories` array (top = first displayed)

## Need Help?

- Full documentation: `/docs/STORIES_IMPLEMENTATION.md`
- Deployment guide: `/docs/STORIES_DEPLOYMENT.md`
- Existing stories: See examples in `/src/lib/data/stories.ts`

## Pro Tips

1. **Keep it Real**: Use real names (or pseudonyms), real numbers, real problems
2. **Show, Don't Tell**: Instead of "they were very busy", show them at 11 PM still working
3. **One Story, One Transformation**: Focus on a single hero's journey
4. **Numbers Matter**: Include 4 specific before/after metrics
5. **Quote is Gold**: The customer quote should be emotional, not just facts

## Story Template

Copy this template for your next story:

```typescript
{
  id: 'NEXT_ID',
  slug: 'company-problem-solution',
  title: '[Number/Result] from [Pain State] to [Gain State]',
  subtitle: 'How [company] solved [specific problem]',
  hook: 'At [specific time], [specific person] was [doing painful thing]. [Specific detail that shows the pain].',
  category: 'Industry',
  painTypes: ['Pain Type 1', 'Pain Type 2'],
  keyStat: { value: '10x', label: 'Better' },
  oneLiner: 'One sentence summary with the key numbers',
  color: '#8b5cf6',
  chapters: {
    before: '3-4 paragraphs showing: daily pain → systemic issues → breaking point',
    solution: '2-3 paragraphs explaining: the AI agent → how it works → implementation',
    after: '3-4 paragraphs showing: immediate change → long-term impact → new possibilities',
  },
  results: [
    { label: 'Time Metric', before: 'X hours', after: 'Y minutes', improvement: 'Z% reduction' },
    { label: 'Quality Metric', before: 'Baseline', after: 'New level', improvement: '+X%' },
    { label: 'Volume Metric', before: 'X per month', after: 'Y per month', improvement: 'Zx increase' },
    { label: 'Business Metric', before: 'Revenue/Cost', after: 'New number', improvement: 'Impact' },
  ],
  quote: {
    text: 'Personal, emotional testimonial about life change, not just tool quality',
    author: 'Name, Title',
  },
}
```

Ready to add your first story? Edit `/src/lib/data/stories.ts` and follow the template above!
