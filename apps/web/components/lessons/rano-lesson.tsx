'use client';

import {
  Network,
  Terminal,
  Eye,
  BarChart3,
  Bug,
  Filter,
  Settings,
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

export function RanoLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Monitor and debug AI CLI network traffic to understand what your agents send and receive.
      </GoalBanner>

      {/* Section 1: What Is RANO */}
      <Section title="What Is RANO?" icon={<Network className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>RANO</Highlight> is a network observer purpose-built for AI coding CLIs.
          It intercepts HTTP requests between your local agents (Claude Code, Codex, Gemini CLI)
          and their APIs, logging requests and responses for analysis.
        </Paragraph>
        <Paragraph>
          When agents behave unexpectedly, RANO helps you see exactly what&apos;s being sent
          and received, making it invaluable for debugging prompt issues, token usage tracking,
          and understanding agent behavior.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Eye className="h-5 w-5" />}
              title="Transparent Proxy"
              description="Zero-config interception"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Usage Stats"
              description="Token and cost tracking"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Filter className="h-5 w-5" />}
              title="Smart Filtering"
              description="Provider-aware log parsing"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Bug className="h-5 w-5" />}
              title="Debug Mode"
              description="Full request/response logging"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Quick Start */}
      <Section title="Quick Start" icon={<Terminal className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Start observing AI CLI traffic.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'rano start', description: 'Start the observer proxy' },
            { command: 'rano status', description: 'Check if observer is running' },
            { command: 'rano logs', description: 'View captured traffic' },
            { command: 'rano stop', description: 'Stop the observer' },
          ]}
        />

        <TipBox variant="tip">
          RANO automatically detects which AI CLIs are installed and configures interception
          for each one.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Analyzing Traffic */}
      <Section title="Analyzing Traffic" icon={<BarChart3 className="h-5 w-5" />} delay={0.2}>
        <Paragraph>
          RANO provides structured views of captured API traffic.
        </Paragraph>

        <CodeBlock
          code={`# View recent requests with token counts
rano logs --tokens

# Filter by provider
rano logs --provider anthropic
rano logs --provider openai

# Show full request/response bodies
rano logs --verbose --last 5

# Export logs for analysis
rano export --format json -o traffic.json`}
          filename="Log Analysis"
        />

        <TipBox variant="info">
          Token counts help you understand which agents are consuming the most context
          and optimize your prompting strategy accordingly.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: Debug Mode */}
      <Section title="Debug Mode" icon={<Bug className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          When an agent behaves unexpectedly, debug mode captures everything.
        </Paragraph>

        <CodeBlock
          code={`# Start with full debug logging
rano start --debug

# Watch traffic in real-time
rano watch

# Filter for errors only
rano logs --errors

# Show request timing
rano logs --timing`}
          filename="Debug Commands"
        />

        <TipBox variant="warning">
          Debug mode logs full request and response bodies, which may include sensitive data.
          Use it for troubleshooting, then stop it when done.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 5: Integration */}
      <Section title="Integration" icon={<Settings className="h-5 w-5" />} delay={0.3}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">RANO + CAUT</span>
            <p className="text-white/80 text-sm mt-1">Detailed traffic feeds into usage tracking</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">RANO + CAAM</span>
            <p className="text-white/80 text-sm mt-1">See which account each request uses</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">RANO + NTM</span>
            <p className="text-white/80 text-sm mt-1">Monitor traffic across all spawned agents</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">RANO + Beads</span>
            <p className="text-white/80 text-sm mt-1">Track API issues as beads for follow-up</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Section 6: Best Practices */}
      <Section title="Best Practices" icon={<Shield className="h-5 w-5" />} delay={0.35}>
        <TipBox variant="tip">
          Run RANO during development to build intuition about what your agents are actually
          sending. You&apos;ll often discover wasted tokens or redundant API calls.
        </TipBox>

        <TipBox variant="warning">
          RANO is a debugging tool, not a permanent fixture. Running it continuously adds
          latency and disk usage. Enable it when investigating issues, disable it otherwise.
        </TipBox>
      </Section>
    </div>
  );
}
