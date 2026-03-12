'use client';

import {
  Shield,
  Terminal,
  Zap,
  Activity,
  Lock,
  Settings,
  Play,
  Eye,
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

export function RustProxyLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Route and inspect network traffic through a transparent proxy for debugging API issues.
      </GoalBanner>

      {/* Section 1: What Is Rust Proxy */}
      <Section title="What Is Rust Proxy?" icon={<Shield className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>Rust Proxy</Highlight> is a high-performance transparent proxy
          for inspecting HTTP/HTTPS traffic between your tools and external services.
          It sits between clients and servers, logging requests and responses without
          modifying them.
        </Paragraph>
        <Paragraph>
          When debugging network issues with AI APIs or other services, Rust Proxy
          lets you see exactly what&apos;s going over the wire without changing your
          application configuration.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Transparent"
              description="No app changes needed"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              title="HTTPS Support"
              description="TLS interception capable"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Activity className="h-5 w-5" />}
              title="Low Latency"
              description="Minimal overhead in Rust"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Eye className="h-5 w-5" />}
              title="Full Logging"
              description="Headers, bodies, timing"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Quick Start */}
      <Section title="Quick Start" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Start the proxy and route traffic through it.
        </Paragraph>

        <CodeBlock
          code={`# Start the proxy on default port
rust_proxy start

# Start on a specific port
rust_proxy start --port 8080

# Route curl traffic through the proxy
HTTPS_PROXY=http://localhost:8080 curl https://api.example.com

# View captured traffic
rust_proxy logs`}
          filename="Basic Usage"
        />

        <TipBox variant="tip">
          Set <code>HTTPS_PROXY</code> environment variable to route any tool&apos;s
          traffic through the proxy.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Commands */}
      <Section title="Essential Commands" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'rust_proxy start', description: 'Start the proxy server' },
            { command: 'rust_proxy start --port 8080', description: 'Start on a specific port' },
            { command: 'rust_proxy logs', description: 'View captured traffic' },
            { command: 'rust_proxy stop', description: 'Stop the proxy' },
          ]}
        />
      </Section>

      <Divider />

      {/* Section 4: Use Cases */}
      <Section title="Debugging Scenarios" icon={<Settings className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          Common situations where Rust Proxy helps.
        </Paragraph>

        <CodeBlock
          code={`# Debug API authentication issues
HTTPS_PROXY=http://localhost:8080 \
  claude "hello" 2>/dev/null
rust_proxy logs --last 1 --headers

# Measure API latency
rust_proxy logs --timing

# Filter by domain
rust_proxy logs --domain api.anthropic.com`}
          filename="Debug Scenarios"
        />

        <TipBox variant="warning">
          Rust Proxy can log sensitive data including API keys in headers.
          Use it only for debugging and stop it when done.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 5: Integration */}
      <Section title="Flywheel Integration" icon={<Zap className="h-5 w-5" />} delay={0.3}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">RP + RANO</span>
            <p className="text-white/80 text-sm mt-1">Low-level proxy complements RANO&apos;s AI-specific observer</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">RP + CAUT</span>
            <p className="text-white/80 text-sm mt-1">Traffic data feeds usage tracking</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">RP + CAAM</span>
            <p className="text-white/80 text-sm mt-1">Verify which API keys are being used</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">RP + Beads</span>
            <p className="text-white/80 text-sm mt-1">Track network issues as beads</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
