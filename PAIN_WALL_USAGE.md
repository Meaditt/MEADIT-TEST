# Pain Wall Usage Examples

## Quick Start

### Option 1: Add to Homepage

Replace or add to your homepage at `src/app/page.tsx`:

```tsx
import { PainWall } from '@/components/home/PainWall';

export default function Home() {
  return (
    <div className="bg-bg-primary">
      {/* Your Hero Section */}
      <section className="...">
        {/* ... */}
      </section>

      {/* Pain Wall Section */}
      <PainWall />

      {/* Your Other Sections */}
      <section className="...">
        {/* ... */}
      </section>
    </div>
  );
}
```

### Option 2: Create Dedicated Page

Create a new page at `src/app/calculator/page.tsx`:

```tsx
import { PainWall } from '@/components/home/PainWall';

export const metadata = {
  title: 'Time Savings Calculator | Your Agency',
  description: 'Calculate how much time you could save with AI automation',
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <PainWall />
    </div>
  );
}
```

Then link to it from your homepage:

```tsx
<Button asChild>
  <Link href="/calculator">Calculate Your Time Savings</Link>
</Button>
```

### Option 3: Modal/Overlay

Create a modal version:

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PainWall } from '@/components/home/PainWall';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [showPainWall, setShowPainWall] = useState(false);

  return (
    <>
      {/* Your homepage content */}
      <Button onClick={() => setShowPainWall(true)}>
        See How Much Time You're Losing
      </Button>

      {/* Pain Wall Modal */}
      <AnimatePresence>
        {showPainWall && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setShowPainWall(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-8 bg-bg-primary rounded-2xl z-50 overflow-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPainWall(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg-tertiary border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Pain Wall */}
              <PainWall />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

## Customization Examples

### 1. Change Pain Points

Edit `src/lib/data/painPoints.ts`:

```typescript
export const painPoints: PainPoint[] = [
  {
    id: 'custom-task',
    icon: '🎯',
    title: 'Your Custom Task',
    subtitle: 'Your subtitle',
    description: 'Your description',
    category: 'operations',
    defaultFrequency: 10,
    defaultDuration: 15,
  },
  // ... add more
];
```

### 2. Adjust Calculation Logic

Edit `calculateResults()` in `src/lib/store/painWallStore.ts`:

```typescript
calculateResults: () => {
  const { selectedPains, painConfigs } = get();

  // Custom calculation for 7-day week instead of 5-day
  const hoursPerWeek = (totalMinutesPerDay / 60) * 7; // Changed from 5 to 7

  // Custom conversion to days (assume 16-hour workday instead of 24)
  const daysOfLife = hoursPerYear / 16; // Changed from 24 to 16

  set({ results: { /* ... */ } });
}
```

### 3. Add Custom Life Activities

Edit `lifeActivities` in `src/components/home/PainWall/LifeBack.tsx`:

```typescript
const lifeActivities: LifeActivity[] = [
  {
    icon: '🎸',
    title: 'Music Practice',
    description: 'Finally learn that song',
    hoursNeeded: 2,
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  // ... add more
];
```

### 4. Change CTA Destination

Edit `src/components/home/PainWall/PersonalizedCTA.tsx`:

```typescript
<Button
  onClick={() => {
    // Custom navigation or action
    window.location.href = '/your-custom-page';
    // OR
    window.open('https://calendly.com/your-link', '_blank');
    // OR
    // Trigger modal, analytics, etc.
  }}
>
  Your Custom CTA Text
</Button>
```

### 5. Add Analytics Tracking

Wrap actions with analytics:

```typescript
import { analytics } from '@/lib/analytics'; // Your analytics setup

// In PainSelector.tsx
const handleContinue = () => {
  analytics.track('pain_wall_step_1_completed', {
    selected_pains: selectedPains,
    count: selectedPains.length,
  });
  nextStep();
};

// In DamageReveal.tsx
useEffect(() => {
  if (results) {
    analytics.track('pain_wall_damage_revealed', {
      hours_per_week: results.hoursPerWeek,
      hours_per_year: results.hoursPerYear,
      days_of_life: results.daysOfLife,
    });
  }
}, [results]);

// In PersonalizedCTA.tsx
<Button
  onClick={() => {
    analytics.track('pain_wall_cta_clicked', {
      hours_saved: results.hoursPerYear,
    });
    window.location.href = '/start';
  }}
>
  Book Free Strategy Call
</Button>
```

### 6. Email Capture Before Final Step

Create a new step between 5 and 6:

```tsx
// src/components/home/PainWall/EmailCapture.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send to your email service
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    // Continue to next step
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center"
    >
      <h2 className="text-4xl font-bold text-text-primary mb-4">
        Want to see your personalized results?
      </h2>
      <p className="text-text-secondary mb-8">
        Enter your email to continue and get a detailed report.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
          Continue to Results
        </Button>
      </form>
    </motion.div>
  );
}
```

Then add it to the main container:

```tsx
// In src/components/home/PainWall/index.tsx
{step === 5 && <LifeBack />}
{step === 6 && <EmailCapture />}
{step === 7 && <PersonalizedCTA />}
```

### 7. Share Results Feature

Add share buttons to PersonalizedCTA:

```tsx
const shareUrl = `https://yoursite.com/calculator?hours=${results.hoursPerYear}`;
const shareText = `I could save ${results.daysOfLife} days per year with AI automation! Calculate yours:`;

<div className="flex gap-4 justify-center mt-8">
  <Button
    variant="ghost"
    onClick={() => {
      navigator.clipboard.writeText(shareUrl);
      // Show toast: "Link copied!"
    }}
  >
    📋 Copy Link
  </Button>

  <Button
    variant="ghost"
    onClick={() => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    }}
  >
    🐦 Share on Twitter
  </Button>

  <Button
    variant="ghost"
    onClick={() => {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    }}
  >
    💼 Share on LinkedIn
  </Button>
</div>
```

## Pro Tips

### 1. A/B Testing Different Pain Points
Create multiple pain point sets and randomly show one:

```typescript
const painPointSets = {
  set_a: painPointsOperational,
  set_b: painPointsCreative,
  set_c: painPointsSales,
};

const selectedSet = Math.random() > 0.5 ? 'set_a' : 'set_b';
```

### 2. Persist User Data for Retargeting
Store email + results for follow-up campaigns:

```typescript
// After user completes the flow
await fetch('/api/leads', {
  method: 'POST',
  body: JSON.stringify({
    email: userEmail,
    selected_pains: selectedPains,
    hours_saved: results.hoursPerYear,
    timestamp: new Date().toISOString(),
  }),
});
```

### 3. Pre-fill from URL Parameters
Allow sharing with pre-selected pains:

```typescript
// In PainSelector.tsx
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const preSelected = params.get('pains')?.split(',') || [];
  preSelected.forEach(selectPain);
}, []);
```

### 4. Add Exit Intent Popup
Show special offer when user tries to leave:

```typescript
useEffect(() => {
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0) {
      // Show "Wait! Get your personalized report" modal
    }
  };

  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
}, []);
```

## Testing Checklist

Before deploying:

- [ ] Test all 6 steps flow
- [ ] Test back navigation
- [ ] Test mobile responsiveness
- [ ] Test with 1 pain point selected
- [ ] Test with all 12 pain points selected
- [ ] Test slider interactions
- [ ] Test animations on slower devices
- [ ] Test localStorage persistence
- [ ] Test reset functionality
- [ ] Test CTA button links
- [ ] Check console for errors
- [ ] Verify analytics events fire
- [ ] Test with ad blockers enabled
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

## Performance Optimization

If you notice any performance issues:

```tsx
// 1. Lazy load the Pain Wall
import dynamic from 'next/dynamic';

const PainWall = dynamic(() => import('@/components/home/PainWall'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>,
});

// 2. Reduce animation complexity on mobile
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 3. Debounce slider updates
import { useDebouncedCallback } from 'use-debounce';

const debouncedUpdate = useDebouncedCallback(
  (painId, config) => updatePainConfig(painId, config),
  100
);
```

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all imports are correct
3. Ensure Framer Motion version is compatible
4. Clear localStorage and try again
5. Test in incognito/private mode
6. Check that CSS is being generated correctly

## Next Steps

Once deployed:
1. Monitor conversion rates per step (funnel analysis)
2. A/B test different headlines and copy
3. Experiment with different pain points
4. Add social proof ("10,000+ hours saved this month")
5. Create retargeting campaigns for drop-offs
6. Send follow-up emails with results
7. Offer downloadable PDF reports
8. Create video testimonials from users

Happy building! 🚀
