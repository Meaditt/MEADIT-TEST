'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'role',
    question: 'What best describes your role?',
    options: [
      'Founder / CEO',
      'Operations Manager',
      'Marketing / Sales',
      'Developer / Technical',
      'Other',
    ],
  },
  {
    id: 'pain',
    question: 'What is your biggest time sink right now?',
    options: [
      'Manual data entry and processing',
      'Customer support and communication',
      'Research and content creation',
      'Scheduling and coordination',
      'Multiple repetitive tasks',
    ],
  },
  {
    id: 'urgency',
    question: 'How urgent is solving this problem?',
    options: [
      'Critical - costing us money daily',
      'High priority - need solution soon',
      'Moderate - would be nice to fix',
      'Exploring options',
    ],
  },
];

interface QualifierFlowProps {
  onComplete: (answers: Record<string, string>) => void;
  onSkip: () => void;
}

export function QualifierFlow({ onComplete, onSkip }: QualifierFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      onComplete(newAnswers);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="card p-6 md:p-8 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">
            Question {currentStep + 1} of {questions.length}
          </span>
          <button
            onClick={onSkip}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Skip
          </button>
        </div>
        <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Question */}
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-lg bg-bg-tertiary border border-white/10 hover:border-accent/50 hover:bg-white/5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg">{option}</span>
                  <CheckCircle className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
