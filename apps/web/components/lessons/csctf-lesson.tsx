'use client';

import {
  FileText,
  Terminal,
  Zap,
  Download,
  Globe,
  Shield,
  Settings,
  Play,
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

export function CsctfLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Convert AI chat share links into clean Markdown and HTML files for archiving and reference.
      </GoalBanner>

      {/* Section 1: What Is CSCTF */}
      <Section title="What Is CSCTF?" icon={<FileText className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>CSCTF (Chat Shared Conversation to File)</Highlight> downloads
          conversations from ChatGPT, Claude, Gemini, and Grok share links, converting
          them into clean Markdown and HTML files you can keep forever.
        </Paragraph>
        <Paragraph>
          AI providers can remove shared conversations at any time. CSCTF preserves
          your best conversations locally with proper formatting, code blocks, and
          metadata intact.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Globe className="h-5 w-5" />}
              title="Multi-Provider"
              description="ChatGPT, Claude, Gemini, Grok"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Dual Output"
              description="Markdown + HTML per conversation"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Download className="h-5 w-5" />}
              title="Offline Archive"
              description="Keep conversations forever"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Code Preserved"
              description="Syntax highlighting intact"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Quick Start */}
      <Section title="Quick Start" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Pass a share link and CSCTF handles the rest.
        </Paragraph>

        <CodeBlock
          code={`# Convert a ChatGPT share link
csctf "https://chatgpt.com/share/abc123"

# Convert a Claude share link
csctf "https://claude.ai/share/xyz789"

# Output goes to current directory:
#   conversation_title.md
#   conversation_title.html`}
          filename="Basic Usage"
        />

        <TipBox variant="tip">
          CSCTF auto-detects the provider from the URL. No flags needed.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Commands */}
      <Section title="Essential Commands" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'csctf "<share-url>"', description: 'Convert a single conversation' },
            { command: 'csctf -o ~/archive "<url>"', description: 'Save to specific directory' },
            { command: 'csctf --md-only "<url>"', description: 'Output Markdown only' },
            { command: 'csctf --html-only "<url>"', description: 'Output HTML only' },
          ]}
        />

        <TipBox variant="info">
          The generated Markdown works great as input for other tools like S2P or
          as context for new AI conversations.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: Batch Processing */}
      <Section title="Batch Processing" icon={<Zap className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          Archive multiple conversations at once by passing a file of URLs.
        </Paragraph>

        <CodeBlock
          code={`# Create a file with one URL per line
cat > urls.txt << 'EOF'
https://chatgpt.com/share/abc123
https://claude.ai/share/xyz789
https://gemini.google.com/share/def456
EOF

# Process all URLs
csctf --batch urls.txt -o ~/ai-archive/`}
          filename="Batch Mode"
        />
      </Section>

      <Divider />

      {/* Section 5: Integration */}
      <Section title="Flywheel Integration" icon={<Settings className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          CSCTF fits naturally into the agent workflow.
        </Paragraph>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">CSCTF + CASS</span>
            <p className="text-white/80 text-sm mt-1">Archive conversations, then search them with CASS</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">CSCTF + S2P</span>
            <p className="text-white/80 text-sm mt-1">Convert archived chats into LLM-ready prompts</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">CSCTF + CM</span>
            <p className="text-white/80 text-sm mt-1">Extract patterns from past conversations into memory</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">CSCTF + Beads</span>
            <p className="text-white/80 text-sm mt-1">Link archived conversations to task issues</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
