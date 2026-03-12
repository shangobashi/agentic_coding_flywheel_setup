'use client';

import {
  AlignLeft,
  Terminal,
  Wand2,
  Eye,
  Copy,
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

export function AadcLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Fix malformed ASCII art diagrams that AI agents produce with misaligned boxes and broken lines.
      </GoalBanner>

      {/* Section 1: What Is AADC */}
      <Section title="What Is AADC?" icon={<AlignLeft className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>AADC (ASCII Art Diagram Corrector)</Highlight> automatically
          fixes alignment issues, broken box edges, and misconnected lines in ASCII
          diagrams. AI models frequently generate diagrams with subtle rendering
          errors that AADC corrects.
        </Paragraph>
        <Paragraph>
          When agents produce architecture diagrams, flowcharts, or tables in ASCII,
          the output often has columns that don&apos;t align, boxes with gaps, or
          connectors that miss their targets. AADC detects and repairs these issues.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Wand2 className="h-5 w-5" />}
              title="Auto-Repair"
              description="Fix alignment and spacing"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<AlignLeft className="h-5 w-5" />}
              title="Box Detection"
              description="Repair broken box edges"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Eye className="h-5 w-5" />}
              title="Preview"
              description="See before/after diff"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Copy className="h-5 w-5" />}
              title="Clipboard"
              description="Copy fixed output directly"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Quick Start */}
      <Section title="Quick Start" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Fix a diagram from a file or stdin.
        </Paragraph>

        <CodeBlock
          code={`# Fix a diagram file
aadc fix diagram.txt

# Pipe from clipboard
pbpaste | aadc fix

# Fix and copy result
aadc fix diagram.txt | pbcopy

# Show what changed
aadc fix --diff diagram.txt`}
          filename="Basic Usage"
        />

        <TipBox variant="tip">
          Use <code>--diff</code> to see exactly what AADC changed before accepting the output.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Commands */}
      <Section title="Essential Commands" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'aadc fix <file>', description: 'Fix alignment issues in a diagram' },
            { command: 'aadc fix --diff <file>', description: 'Show changes as a diff' },
            { command: 'aadc check <file>', description: 'Check for issues without fixing' },
            { command: 'aadc --help', description: 'Show all available options' },
          ]}
        />
      </Section>

      <Divider />

      {/* Section 4: Example */}
      <Section title="Before and After" icon={<Settings className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          AADC fixes common AI-generated diagram issues.
        </Paragraph>

        <CodeBlock
          code={`# Before (broken):
+--------+    +-------+
| Client  |-->| Server|
+--------+    +-------+
                  |
              +-------+
              |  DB   |
              +------+

# After (fixed):
+----------+    +--------+
|  Client  |--->| Server |
+----------+    +--------+
                    |
                +--------+
                |   DB   |
                +--------+`}
          filename="Correction Example"
        />

        <TipBox variant="info">
          AADC handles box edges, connector lines, padding, and column alignment
          in a single pass.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 5: Integration */}
      <Section title="Flywheel Integration" icon={<Shield className="h-5 w-5" />} delay={0.3}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">AADC + Agents</span>
            <p className="text-white/80 text-sm mt-1">Post-process agent diagram output</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">AADC + S2P</span>
            <p className="text-white/80 text-sm mt-1">Clean diagrams before including in prompts</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">AADC + CSCTF</span>
            <p className="text-white/80 text-sm mt-1">Fix diagrams in archived conversations</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">AADC + CM</span>
            <p className="text-white/80 text-sm mt-1">Clean architecture diagrams in memory files</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
