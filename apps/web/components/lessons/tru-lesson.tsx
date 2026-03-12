'use client';

import {
  Minimize2,
  Terminal,
  Zap,
  FileCode,
  BarChart3,
  Settings,
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

export function TruLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Compress source code into token-optimized notation so more context fits in each LLM request.
      </GoalBanner>

      {/* Section 1: What Is TRU */}
      <Section title="What Is TRU?" icon={<Minimize2 className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>TRU (toon_rust)</Highlight> converts source code into a compact,
          token-optimized notation that preserves semantic meaning while dramatically
          reducing token count. Feed more code context into LLMs without hitting limits.
        </Paragraph>
        <Paragraph>
          When working with large codebases, context windows fill up fast. TRU
          compresses code by 40-70% in token count while keeping it understandable
          to LLMs, letting you include more files in each request.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Minimize2 className="h-5 w-5" />}
              title="40-70% Smaller"
              description="Dramatic token reduction"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<FileCode className="h-5 w-5" />}
              title="Multi-Language"
              description="Rust, Python, TypeScript, Go"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Token Counting"
              description="Before/after comparisons"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Rust Speed"
              description="Processes large repos instantly"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Quick Start */}
      <Section title="Quick Start" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Convert a file or directory to token-optimized notation.
        </Paragraph>

        <CodeBlock
          code={`# Convert a single file
tru compress src/main.rs

# Convert an entire directory
tru compress src/

# See token savings
tru compress --stats src/main.rs
# Before: 2,847 tokens → After: 1,139 tokens (60% reduction)`}
          filename="Basic Usage"
        />

        <TipBox variant="tip">
          Use <code>--stats</code> to see exactly how many tokens you saved.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Commands */}
      <Section title="Essential Commands" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'tru compress <file>', description: 'Compress a file to token-optimized format' },
            { command: 'tru compress --stats <file>', description: 'Compress with token count comparison' },
            { command: 'tru decompress <file>', description: 'Restore from compressed notation' },
            { command: 'tru --help', description: 'Show all available options' },
          ]}
        />
      </Section>

      <Divider />

      {/* Section 4: How It Works */}
      <Section title="How It Works" icon={<Settings className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          TRU applies language-aware transformations that LLMs can still understand.
        </Paragraph>

        <CodeBlock
          code={`# Original (high token count):
pub fn calculate_fibonacci(n: u64) -> u64 {
    if n <= 1 {
        return n;
    }
    let mut a: u64 = 0;
    let mut b: u64 = 1;
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    b
}

# TRU compressed (lower token count):
fn fib(n:u64)->u64{if n<=1{ret n}
let(mut a,mut b)=(0u64,1u64);
for _ in 2..=n{let t=a+b;a=b;b=t}b}`}
          filename="Compression Example"
        />

        <TipBox variant="info">
          The compressed output is still valid, readable code. LLMs understand it
          perfectly since they process tokens, not visual formatting.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 5: Integration */}
      <Section title="Flywheel Integration" icon={<Shield className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          Combine TRU with other flywheel tools for maximum context efficiency.
        </Paragraph>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">TRU + S2P</span>
            <p className="text-white/80 text-sm mt-1">Generate prompts, then compress for more context</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">TRU + FSFS</span>
            <p className="text-white/80 text-sm mt-1">Search results compressed for LLM consumption</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">TRU + PCR</span>
            <p className="text-white/80 text-sm mt-1">Post-compaction reminders with compressed context</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">TRU + CASR</span>
            <p className="text-white/80 text-sm mt-1">Cross-agent session context stays within limits</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
