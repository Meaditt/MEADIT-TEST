'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { usePainWallStore } from '@/lib/store/painWallStore';
import { staggerContainer, staggerItem } from '@/lib/design-system/animations';

// ========================
// LIFE ACTIVITY DATA
// ========================

interface LifeActivity {
  icon: string;
  title: string;
  description: string;
  hoursNeeded: number;
  gradient: string;
}

const lifeActivities: LifeActivity[] = [
  {
    icon: '🏖️',
    title: 'Beach Days',
    description: 'Relax by the ocean',
    hoursNeeded: 8,
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: '💪',
    title: 'Gym Sessions',
    description: 'Get in shape',
    hoursNeeded: 1.5,
    gradient: 'from-red-500/20 to-orange-500/20',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Time',
    description: 'Quality moments together',
    hoursNeeded: 4,
    gradient: 'from-pink-500/20 to-purple-500/20',
  },
  {
    icon: '🚀',
    title: 'Side Projects',
    description: 'Build something new',
    hoursNeeded: 10,
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    icon: '📚',
    title: 'Learning',
    description: 'Master new skills',
    hoursNeeded: 5,
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: '✈️',
    title: 'Travel',
    description: 'Explore the world',
    hoursNeeded: 24,
    gradient: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    icon: '🎨',
    title: 'Creative Hobbies',
    description: 'Paint, write, create',
    hoursNeeded: 3,
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
  },
  {
    icon: '😴',
    title: 'Rest',
    description: 'Actually sleep well',
    hoursNeeded: 8,
    gradient: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    icon: '🎮',
    title: 'Gaming',
    description: 'Just have fun',
    hoursNeeded: 2,
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: '🧘',
    title: 'Mindfulness',
    description: 'Meditation & yoga',
    hoursNeeded: 1,
    gradient: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    icon: '👥',
    title: 'Social Life',
    description: 'Meet friends, network',
    hoursNeeded: 4,
    gradient: 'from-rose-500/20 to-red-500/20',
  },
  {
    icon: '💼',
    title: 'Strategic Thinking',
    description: 'Plan, do not execute',
    hoursNeeded: 6,
    gradient: 'from-gray-500/20 to-slate-500/20',
  },
];

// ========================
// ACTIVITY CARD COMPONENT
// ========================

interface ActivityCardProps {
  activity: LifeActivity;
  count: number;
  index: number;
}

function ActivityCard({ activity, count, index }: ActivityCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={`p-6 rounded-xl bg-gradient-to-br ${activity.gradient} border border-white/10 relative overflow-hidden group`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="text-5xl mb-4">{activity.icon}</div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-text-primary mb-2">{activity.title}</h3>
        <p className="text-sm text-text-secondary mb-4">{activity.description}</p>

        {/* Count */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1 + 0.5,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30"
        >
          <span className="text-2xl font-bold text-accent">{count}</span>
          <span className="text-sm text-text-secondary">per year</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ========================
// COMPONENT
// ========================

export function LifeBack() {
  const { results, nextStep, prevStep } = usePainWallStore();

  if (!results) {
    return (
      <div className="text-center text-text-secondary">
        No results available. Please go back and configure your pain points.
      </div>
    );
  }

  const savedHoursPerYear = results.hoursPerYear;

  // Calculate how many times they could do each activity
  const activitiesWithCount = lifeActivities.map((activity) => ({
    ...activity,
    count: Math.floor(savedHoursPerYear / activity.hoursNeeded),
  }));

  // Only show activities they could do at least once
  const achievableActivities = activitiesWithCount.filter((a) => a.count > 0);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Get Your Life Back
        </h2>
        <p className="text-lg text-text-secondary mb-6">
          With {savedHoursPerYear} hours saved per year, you could...
        </p>
        <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 to-accent-secondary/20 border border-accent/30">
          <span className="text-3xl font-bold text-accent">{results.daysOfLife} days</span>
          <span className="text-text-secondary ml-2">of pure freedom</span>
        </div>
      </motion.div>

      {/* Activities Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {achievableActivities.map((activity, index) => (
          <ActivityCard key={activity.title} activity={activity} count={activity.count} index={index} />
        ))}
      </motion.div>

      {/* Reality Check */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border-2 border-accent/30 text-center mb-12"
      >
        <p className="text-2xl text-text-primary font-semibold mb-3">
          Right now, you're trading all of this for repetitive busywork.
        </p>
        <p className="text-lg text-text-secondary mb-4">
          AI can handle those tasks while you focus on what actually matters.
        </p>
        <p className="text-accent font-bold text-xl">
          The question is: How much longer will you wait?
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={prevStep}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Button>

        <Button size="lg" onClick={nextStep}>
          I'm Ready to Take Action
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Button>
      </motion.div>
    </div>
  );
}
