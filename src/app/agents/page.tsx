import type { Metadata } from 'next';
import { AgentDashboard } from '@/components/agents/AgentDashboard';

export const metadata: Metadata = {
  title: 'Agent Dashboard',
  description: 'Monitor and manage the website analysis agent. View automation insights, analysis history, and scheduled runs.',
};

export default function AgentsPage() {
  return (
    <section className="min-h-screen bg-[#0a0a0f] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#c9a96e] rounded-full" />
            <span className="text-xs font-medium text-[#c9a96e] tracking-wide">Agent System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Website Analysis Agent
          </h1>
          <p className="text-base text-[#a1a1aa] max-w-2xl">
            Automated website analysis that identifies automation opportunities, tracks improvements over time, and self-refines its recommendations.
          </p>
        </div>

        <AgentDashboard />
      </div>
    </section>
  );
}
