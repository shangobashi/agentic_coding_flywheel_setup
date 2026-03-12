'use client';

import {
  Globe,
  Terminal,
  Zap,
  FileText,
  Code,
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

export function MdwbLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Convert web pages into clean Markdown that AI agents can read and reason about.
      </GoalBanner>

      {/* Section 1: What Is MDWB */}
      <Section title="What Is MDWB?" icon={<Globe className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>MDWB (Markdown Web Browser)</Highlight> fetches web pages and
          converts them into clean Markdown, stripping out ads, navigation, and
          scripts. The result is perfect for feeding into LLMs as context.
        </Paragraph>
        <Paragraph>
          When AI agents need information from the web, raw HTML is noisy and
          token-expensive. MDWB extracts just the content, preserving headings,
          code blocks, lists, and links in a format LLMs handle efficiently.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Globe className="h-5 w-5" />}
              title="Any Web Page"
              description="Works with most websites"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Clean Output"
              description="No ads, scripts, or clutter"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Code className="h-5 w-5" />}
              title="Code Blocks"
              description="Preserves code formatting"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Fast"
              description="Built in Rust for speed"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Quick Start */}
      <Section title="Quick Start" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Convert any URL to Markdown with a single command.
        </Paragraph>

        <CodeBlock
          code={`# Convert a web page to Markdown
mdwb "https://docs.example.com/api/reference"

# Save to a file
mdwb "https://docs.example.com/guide" > guide.md

# Pipe directly to an AI agent
mdwb "https://docs.example.com/api" | claude "summarize this API"`}
          filename="Basic Usage"
        />

        <TipBox variant="tip">
          Pipe MDWB output directly into AI agents for instant web research.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Commands */}
      <Section title="Essential Commands" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'mdwb "<url>"', description: 'Convert a URL to Markdown' },
            { command: 'mdwb -o output.md "<url>"', description: 'Save output to a file' },
            { command: 'mdwb --links "<url>"', description: 'Include link URLs in output' },
            { command: 'mdwb --help', description: 'Show all available options' },
          ]}
        />

        <TipBox variant="info">
          MDWB handles JavaScript-rendered pages, documentation sites, and
          blog posts. It works best with content-focused pages.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: Use Cases */}
      <Section title="Common Use Cases" icon={<Settings className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          MDWB shines when you need web content in LLM-friendly format.
        </Paragraph>

        <CodeBlock
          code={`# Research a library's docs before using it
mdwb "https://docs.rs/tokio/latest" > tokio-docs.md

# Get error context from StackOverflow
mdwb "https://stackoverflow.com/questions/12345" > context.md

# Archive a blog post for reference
mdwb "https://blog.example.com/architecture-decisions" > arch.md

# Feed multiple pages to an agent
for url in $(cat urls.txt); do
  mdwb "$url"
done | claude "analyze these documents"`}
          filename="Use Cases"
        />
      </Section>

      <Divider />

      {/* Section 5: Integration */}
      <Section title="Flywheel Integration" icon={<Shield className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          MDWB connects web knowledge to the agent workflow.
        </Paragraph>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">MDWB + TRU</span>
            <p className="text-white/80 text-sm mt-1">Fetch docs, then compress for maximum context</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">MDWB + FSFS</span>
            <p className="text-white/80 text-sm mt-1">Index downloaded pages for local semantic search</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">MDWB + CSCTF</span>
            <p className="text-white/80 text-sm mt-1">Archive both web pages and AI conversations</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">MDWB + Brenner</span>
            <p className="text-white/80 text-sm mt-1">Feed research papers into Brenner corpus</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
