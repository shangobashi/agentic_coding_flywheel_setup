'use client';

import {
  BarChart3,
  Terminal,
  DollarSign,
  PieChart,
  Clock,
  Play,
  Shield,
} from 'lucide-react';
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  CommandList,
  FeatureCard,
  FeatureGrid,
} from './lesson-components';

export function CautLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Track LLM API usage across providers and agents to understand costs and optimize spending.
      </GoalBanner>

      {/* Section 1: What Is CAUT */}
      <Section title="What Is CAUT?" icon={<BarChart3 className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>CAUT (Coding Agent Usage Tracker)</Highlight> monitors token
          consumption and API costs across all your AI coding agents. It aggregates
          usage from Claude, GPT, and Gemini into a single dashboard.
        </Paragraph>
        <Paragraph>
          When running multiple agents simultaneously, costs can escalate quickly.
          CAUT gives you visibility into which agents, sessions, and providers are
          consuming the most tokens, helping you optimize your workflow.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<DollarSign className="h-5 w-5" />}
              title="Cost Tracking"
              description="Per-provider spend analysis"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<PieChart className="h-5 w-5" />}
              title="Usage Breakdown"
              description="Input vs output tokens"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5" />}
              title="Time Series"
              description="Historical usage trends"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Multi-Agent"
              description="Track across all sessions"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Quick Start */}
      <Section title="Quick Start" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Get a quick overview of your usage.
        </Paragraph>

        <CodeBlock
          code={`# Show today's usage summary
caut summary

# Show usage for the past week
caut summary --period 7d

# Show per-provider breakdown
caut breakdown

# Show per-session token counts
caut sessions --sort tokens`}
          filename="Basic Usage"
        />

        <TipBox variant="tip">
          Run <code>caut summary</code> at the end of each day to understand your usage patterns.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Commands */}
      <Section title="Essential Commands" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'caut summary', description: 'Usage summary for current period' },
            { command: 'caut breakdown', description: 'Per-provider cost breakdown' },
            { command: 'caut sessions', description: 'Token usage by session' },
            { command: 'caut export --format csv', description: 'Export usage data' },
          ]}
        />

        <TipBox variant="info">
          CAUT reads usage data from agent log files and API response headers.
          No additional API calls are made.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: Cost Optimization */}
      <Section title="Cost Optimization" icon={<DollarSign className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          Use CAUT data to optimize your agent spending.
        </Paragraph>

        <CodeBlock
          code={`# Find your most expensive sessions
caut sessions --sort cost --limit 10

# Compare providers
caut compare --providers anthropic,openai

# Show token efficiency (output/input ratio)
caut efficiency

# Set a daily budget alert
caut alert --daily-budget 50`}
          filename="Optimization"
        />
      </Section>

      <Divider />

      {/* Section 5: Integration */}
      <Section title="Flywheel Integration" icon={<Shield className="h-5 w-5" />} delay={0.3}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">CAUT + RANO</span>
            <p className="text-white/80 text-sm mt-1">Network traffic feeds usage tracking data</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">CAUT + CAAM</span>
            <p className="text-white/80 text-sm mt-1">Track usage per account for billing insights</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">CAUT + NTM</span>
            <p className="text-white/80 text-sm mt-1">See cost per agent in multi-agent swarms</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">CAUT + TRU</span>
            <p className="text-white/80 text-sm mt-1">Measure TRU compression savings in real tokens</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
