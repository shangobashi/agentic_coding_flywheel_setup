import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Sparkles, Rocket } from "lucide-react";

import {
  GuideSection,
  SubSection,
  P,
  BlockQuote,
  PromptBlock,
  Hl,
  Divider,
  TipBox,
  BulletList,
  NumberedList,
  DataTable,
} from "@/components/complete-guide/guide-components";
import { PlanToBeadsViz } from "@/components/complete-guide/plan-to-beads-viz";
import { AgentMailViz } from "@/components/complete-guide/agent-mail-viz";
import { SwarmExecutionViz } from "@/components/complete-guide/swarm-execution-comparison";
import { RepresentationLadder } from "@/components/complete-guide/representation-ladder";
import { ContextHorizonViz } from "@/components/complete-guide/context-horizon-viz";
import { CoordinationTrioViz } from "@/components/complete-guide/coordination-trio-viz";
import { ConvergenceViz } from "@/components/complete-guide/convergence-viz";
import { PlanEvolutionStudio } from "@/components/complete-guide/plan-evolution-studio";
import { FlywheelDiagram } from "@/components/complete-guide/flywheel-diagram";


export default function CompleteGuidePage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-[#020408] selection:bg-[#FF5500]/20 selection:text-white overflow-x-hidden pb-32">
        <Hero />

        <div className="mx-auto max-w-[1000px] px-6 lg:px-12 relative mt-20">

          {/* ============================================================= */}
          {/* SECTION 1: THE MENTAL MODEL                                    */}
          {/* ============================================================= */}
          <GuideSection id="mental-model" number="1" title="The Mental Model">
            <P highlight>Hold three sentences in your head. Everything else in this guide is an elaboration of these three ideas.</P>

            <NumberedList items={[
              <><strong>The markdown plan is where the big thinking happens.</strong> Before any code exists, the entire system is designed in a single document that fits inside a model&apos;s context window.</>,
              <><strong>Beads are how that thinking gets packaged for execution by many agents.</strong> Each bead is a self-contained work unit with context, dependencies, and test obligations.</>,
              <><strong>The swarm is not there to invent the system.</strong> It is there to execute, review, test, and harden a system that was mostly designed already.</>,
            ]} />

            <P>Most first-time readers get confused not because the ideas are complicated, but because three things change at once: the <Hl>artifact</Hl> you are working in, the <Hl>entity doing the thinking</Hl>, and the <Hl>source of truth</Hl> for what happens next. The representation ladder below shows how these shift through each phase.</P>

            <RepresentationLadder />

            <DataTable
              headers={["Space", "Primary Artifact", "What You Decide There"]}
              rows={[
                ["Plan space", "Large markdown plan", "Architecture, features, workflows, tradeoffs, sequencing, rationale — while the whole system still fits in context"],
                ["Bead space", "br issues + dependencies", "Task boundaries, execution order, embedded context, test obligations — distributed agents need explicit, local work units"],
                ["Code space", "Source files + tests", "Actual implementation and verification — the plan has already constrained most high-level decisions"],
              ]}
            />

            <P>Plan space is where you figure out what the system should be. Bead space is where you turn that into <Hl>executable memory</Hl>: a graph of self-contained work units detailed enough that agents do not have to keep consulting the full plan. Code space is where agents implement, review, and test locally without pretending they can continuously keep the entire product in their head.</P>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 2: WHY PLANNING DOMINATES                              */}
          {/* ============================================================= */}
          <GuideSection id="philosophy" number="2" title="Why Planning Dominates">
            <P highlight>The central thesis of this approach is that <strong>85%+ of your time, attention, and energy should go into planning</strong>, not implementation. This feels wrong the first time you do it because there is a long stretch where no code is being written. But that is precisely why it works.</P>

            <BlockQuote>The models are far smarter when reasoning about a plan that is very detailed and fleshed out but still trivially small enough to easily fit within their context window. This is really the key insight behind my obsessive focus on planning and why I spend 80%+ of my time on that part.</BlockQuote>

            <ContextHorizonViz />

            <P>A markdown plan, even a massive 6,000-line one, is still vastly smaller than the codebase it describes. When models reason about a plan instead of raw implementation, they can hold the whole system in their context window at once. Once you start turning that plan into code, the system rapidly becomes too large to understand holistically. You are doing <Hl>global reasoning while global reasoning is still possible</Hl>.</P>

            <SubSection title="The Economic Argument">
              <P>Planning tokens are far fewer and cheaper than implementation tokens. A big, complex markdown plan is shorter than a few substantive code files, let alone a whole project. That means:</P>
              <BulletList items={[
                "You can afford many more refinement rounds in planning than in implementation",
                "Each planning round evaluates system-wide consequences, not just local code edits",
                "Each improvement to the plan gets amortized across every downstream bead and code change",
              ]} />
              <P>The methodology is comfortable spending hours in planning because it is the cheapest place to buy correctness, coherence, and ambition.</P>
            </SubSection>

            <SubSection title="Human Leverage Is Front-Loaded">
              <BlockQuote>The plan creation is the most free form, creative, human part of the process.</BlockQuote>
              <P>The human is not there to hand-author every line of the plan. The human is there to inject intent, judgment, taste, product sense, and strategic direction at the point where those qualities affect the entire downstream system. Once the plan is excellent, the rest becomes much more mechanical.</P>
              <P>Without this front-loaded planning, agents are effectively improvising architecture from a narrow local window into the codebase. That is exactly when you get placeholder abstractions, missing workflow details, contradictory assumptions, and compatibility shims that nobody actually wanted.</P>
            </SubSection>

            <SubSection title="Debates Belong in Planning, Not Implementation">
              <BlockQuote>Arguably you should be doing the debates internally in the planning stages so that they can just execute the beads, but sometimes things come up during implementation that weren&apos;t anticipated.</BlockQuote>
              <P>Implementation can still surface surprises, but as many important disagreements as possible should happen before the swarm is burning expensive implementation tokens.</P>
            </SubSection>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 3: THE FLYWHEEL LOOP                                   */}
          {/* ============================================================= */}
          <GuideSection id="flywheel" number="3" title="The Flywheel: A Compounding Loop">
            <P>This is not a linear checklist — it is a <Hl>compounding loop</Hl> built around moving work through the right representation at the right time.</P>

            <FlywheelDiagram />

            <NumberedList items={[
              "The human clarifies goals, workflows, tradeoffs, and constraints.",
              "Frontier models help turn that into a large but coherent markdown plan.",
              "That plan is converted into a dependency-structured bead graph rich enough to stand on its own.",
              "A fungible swarm executes those beads in a shared workspace using Agent Mail for coordination and bv for routing.",
              "Reviews, tests, UBS, CASS, and memory tooling feed lessons back into the next plan.",
            ]} />

            <P>It behaves like a flywheel rather than a checklist because each cycle makes the next one faster:</P>

            <BulletList items={[
              <><strong>Planning quality compounds</strong> because you keep reusing prompts, patterns, and reasoning structures that CASS proves actually worked.</>,
              <><strong>Execution quality compounds</strong> because better beads make swarm behavior more deterministic and less dependent on improvisation.</>,
              <><strong>Tool quality compounds</strong> because agents use the tools, complain about them, and then help improve them.</>,
              <><strong>Memory compounds</strong> because the results of one swarm become training data, rituals, and infrastructure for the next one.</>,
            ]} />

            <BlockQuote>More agents, more sessions, better memory, better coordination, safer speed, better output, more sessions.</BlockQuote>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 4: CREATING & REFINING THE PLAN                        */}
          {/* ============================================================= */}
          <GuideSection id="planning" number="4" title="Phase 1: Creating & Refining the Markdown Plan">
            <SubSection title="Pre-Planning: The Foundation Bundle">
              <P>Before writing the plan itself, assemble a <Hl>foundation bundle</Hl>. Weak foundations leak uncertainty into every later stage.</P>
              <BulletList items={[
                "A coherent tech stack (e.g., TypeScript + Next.js 16 + Tailwind + Supabase for web apps; Rust or Go for CLI tools)",
                "An initial architectural direction",
                "A strong AGENTS.md (bootstrap from a known-good template)",
                "Up-to-date best-practices guides for your stack",
                "Enough product and workflow explanation for the models to understand what \"good\" looks like",
              ]} />
              <TipBox variant="warning">
                If any of these are missing, the plan will silently absorb ambiguity that later shows up as bad beads, confused agents, and sloppy implementation.
              </TipBox>
            </SubSection>

            <SubSection title="Writing the Initial Plan">
              <P>You don&apos;t need to write the initial markdown plan yourself line by line. You can simply explain what you want to make to a frontier model — your concept, goals, user workflows, and success criteria. GPT Pro with Extended Reasoning is the recommended tool for creating the initial draft because the all-you-can-eat subscription means you can iterate extensively without cost concerns.</P>
              <P>What remains manual is the <Hl>highest-leverage direction-setting</Hl>: what the product should feel like, which tradeoffs are acceptable, which workflows matter most, and which ideas from model output are actually good versus merely plausible.</P>
            </SubSection>

            <SubSection title="Multi-Model Synthesis">
              <P>For the best results, ask multiple frontier models to independently create plans for the same project: GPT Pro, Claude Opus, Gemini with Deep Think, and Grok Heavy. Each model brings different strengths and blind spots. Then show their plans to GPT Pro with this prompt:</P>

              <PromptBlock
                title="Best-of-All-Worlds Synthesis"
                prompt={`I asked 3 competing LLMs to do the exact same thing and they came up with pretty different plans which you can read below. I want you to REALLY carefully analyze their plans with an open mind and be intellectually honest about what they did that's better than your plan. Then I want you to come up with the best possible revisions to your plan (you should simply update your existing document for your original plan with the revisions) that artfully and skillfully blends the "best of all worlds" to create a true, ultimate, superior hybrid version of the plan that best achieves our stated goals and will work the best in real-world practice to solve the problems we are facing and our overarching goals while ensuring the extreme success of the enterprise as best as possible; you should provide me with a complete series of git-diff style changes to your original plan to turn it into the new, enhanced, much longer and detailed plan that integrates the best of all the plans with every good idea included (you don't need to mention which ideas came from which models in the final revised enhanced plan):`}
                where="GPT Pro web app with Extended Reasoning"
                whyItWorks="Different frontier models have different 'tastes' and blind spots. Passing a plan through a gauntlet of different models is the cheapest way to buy architectural robustness."
              />

              <P>Take GPT Pro&apos;s output and paste it into Claude Code or Codex to integrate the revisions in-place:</P>

              <PromptBlock
                title="Integrate Synthesis Revisions"
                prompt={`OK, now integrate these revisions to the markdown plan in-place; use ultrathink and be meticulous. At the end, you can tell me which changes you wholeheartedly agree with, which you somewhat agree with, and which you disagree with:

[Pasted synthesis output]`}
                where="Claude Code or Codex"
                whyItWorks="Having Claude critically assess GPT's suggestions creates a second layer of quality filtering."
              />

              <PlanEvolutionStudio />
            </SubSection>

            <SubSection title="Iterative Refinement">
              <P>Now paste the current plan into a <strong>fresh</strong> GPT Pro conversation with this prompt. Repeat 4-5 rounds, each time in a fresh conversation:</P>

              <PromptBlock
                title="Plan Refinement Prompt"
                prompt={`Carefully review this entire plan for me and come up with your best revisions in terms of better architecture, new features, changed features, etc. to make it better, more robust/reliable, more performant, more compelling/useful, etc.

For each proposed change, give me your detailed analysis and rationale/justification for why it would make the project better along with the git-diff style changes relative to the original markdown plan shown below:

<PASTE YOUR EXISTING COMPLETE PLAN HERE>`}
                where="GPT Pro web app — fresh conversation each round"
                whyItWorks="This has never failed to improve a plan significantly. Fresh conversations prevent the model from anchoring on its own prior output."
              />

              <P>After four or five rounds, the suggestions become very incremental and you reach a steady state. This is when the plan is ready for conversion to beads.</P>

              <TipBox>
                <strong>The &quot;Lie to Them&quot; technique:</strong> Models tend to stop looking for problems after finding ~20-25 issues. If you tell them to find &quot;all&quot; problems, they stop early. The solution: tell them you&apos;re positive they missed at least 80 elements. They keep searching exhaustively rather than satisfying themselves with a partial list.
              </TipBox>

              <P>Plans created this way routinely reach 3,000-6,000+ lines. They are the result of countless iterations and blending of ideas and feedback from many models. It feels slow because no code is being written, but if you do it correctly and then start up enough agents, the code will be written so ridiculously quickly that it more than makes up for this slow part. And what&apos;s more, the code will be really good.</P>
            </SubSection>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 5: CONVERTING TO BEADS                                 */}
          {/* ============================================================= */}
          <GuideSection id="beads-conversion" number="5" title="Phase 2: Converting the Plan into Beads">
            <P>Beads (from Steve Yegge&apos;s project) are like Jira or Linear, but optimized for use by coding agents. They represent epics, tasks, and subtasks with an explicit dependency structure, stored locally in <code>.beads/</code> files that commit with your code.</P>

            <P highlight>There is a critical distinction between plan-level and bead-level work. The plan document and the beads are different representations with different affordances. Plans are for holistic reasoning; beads are for distributed execution. The conversion is a <strong>translation</strong>, not a copy.</P>

            <PromptBlock
              title="Plan to Beads Conversion"
              prompt={`OK so please take ALL of that and elaborate on it and use it to create a comprehensive and granular set of beads for all this with tasks, subtasks, and dependency structure overlaid, with detailed comments so that the whole thing is totally self-contained and self-documenting (including relevant background, reasoning/justification, considerations, etc.-- anything we'd want our "future self" to know about the goals and intentions and thought process and how it serves the over-arching goals of the project.). The beads should be so detailed that we never need to consult back to the original markdown plan document. Remember to ONLY use the \`br\` tool to create and modify the beads and add the dependencies. Use ultrathink.`}
              where="Claude Code with Opus"
              whyItWorks="Beads become the active source of truth for execution. Once they're strong enough, you never look back at the markdown plan."
            />

            <PlanToBeadsViz />

            <SubSection title="What Makes a Good Bead">
              <P>The beads are the plan after it has been transformed into a format optimized for distributed execution. For that reason, most important decisions get made ahead of time and then embedded directly into the beads.</P>
              <BulletList items={[
                <><strong>Self-contained:</strong> Beads must be so detailed that you never need to refer back to the original markdown plan. Every piece of context, reasoning, and intent should be embedded in the beads themselves.</>,
                <><strong>Rich content:</strong> Beads can and should contain long descriptions with embedded markdown. Design decisions, rationale, and background should live inside the beads — they don&apos;t need to be short bullet-point entries.</>,
                <><strong>Complete coverage:</strong> Everything from the markdown plan must be embedded into the beads. You should lose nothing in the conversion.</>,
                <><strong>Explicit dependencies:</strong> The dependency graph between beads must be correct. This is what enables agents to use bv to determine the optimal order of work.</>,
                <><strong>Include testing:</strong> Beads should include comprehensive unit tests and e2e test scripts with great, detailed logging.</>,
              ]} />

              <TipBox variant="info">
                The models are the primary consumer of beads, not humans. Conceptually, the beads are more for them than for you. You can always have agents interpret beads back into markdown if needed.
              </TipBox>
            </SubSection>

            <SubSection title="Scale">
              <P>For the CASS Memory System (5,500-line plan), the conversion produced 347 beads with complete dependency structure. For complex projects, expect 200-500 initial beads. The beads are richer and more structured than the plan — that is the point.</P>
            </SubSection>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 6: POLISHING BEADS                                     */}
          {/* ============================================================= */}
          <GuideSection id="bead-polishing" number="6" title="Phase 3: Check Your Beads N Times, Implement Once">
            <P highlight>Before you burn up a lot of tokens with a big agent swarm on a new project, the old woodworking maxim of &quot;Measure twice, cut once!&quot; is worth revising as <strong>&quot;Check your beads N times, implement once,&quot;</strong> where N is basically as many as you can stomach.</P>

            <PromptBlock
              title="Bead Polishing Prompt"
              prompt={`Reread AGENTS.md so it's still fresh in your mind. Check over each bead super carefully-- are you sure it makes sense? Is it optimal? Could we change anything to make the system work better for users? If so, revise the beads. It's a lot easier and faster to operate in "plan space" before we start implementing these things!

DO NOT OVERSIMPLIFY THINGS! DO NOT LOSE ANY FEATURES OR FUNCTIONALITY!

Also, make sure that as part of these beads, we include comprehensive unit tests and e2e test scripts with great, detailed logging so we can be sure that everything is working perfectly after implementation. Remember to ONLY use the \`br\` tool to create and modify the beads and to add the dependencies to beads. Use ultrathink.`}
              where="Claude Code with Opus — run 4-6+ times"
              whyItWorks="Each round catches things the previous round missed. The improvements are subtle but real, even past round 6."
            />

            <ConvergenceViz />

            <SubSection title="How Many Rounds?">
              <P>The practical synthesis across many sessions is:</P>
              <BulletList items={[
                <><strong>Minimum:</strong> 3 passes for small projects</>,
                <><strong>Normal:</strong> 4-6 passes for real projects</>,
                <><strong>Heavyweight / high-stakes:</strong> Keep going past 6 if fresh passes are still finding meaningful issues</>,
              ]} />
              <P>Do not stop because you hit an arbitrary pass count; stop when the improvements have become genuinely marginal. If improvements start to flatline, start a brand new Claude Code session for fresh eyes — different initialization can catch different things.</P>
            </SubSection>

            <SubSection title="What Polishing Actually Does">
              <P>From real sessions, bead polishing involves:</P>
              <BulletList items={[
                <><strong>Duplicate detection and merging:</strong> Identifying exact duplicate pairs and closing them, choosing survivors based on richer testing specs and better dependency chains</>,
                <><strong>Quality scoring:</strong> Assessing beads on WHAT/WHY/HOW criteria, rating each as &quot;Excellent&quot; or identifying gaps</>,
                <><strong>Description filling:</strong> Empty bead descriptions get filled with context from the relevant spec section</>,
                <><strong>Dependency correction:</strong> Fixing missing or incorrect dependency links</>,
                <><strong>Coverage verification:</strong> Cross-referencing beads against the markdown plan to ensure nothing was lost</>,
              ]} />
            </SubSection>

            <SubSection title="Cross-Reference Against the Plan">
              <P>Additionally, tell agents to go through each bead and explicitly check it against the markdown plan. Then go through the markdown plan and cross-reference every single thing against the beads to ensure complete coverage. After this audit phase, the beads become the active source of truth for execution.</P>
              <TipBox>
                <strong>Final cross-model check:</strong> As a last step, have Codex with GPT (high reasoning effort) do one final round using the same polishing prompt. Different models catch different things.
              </TipBox>
            </SubSection>

            <P>Just remember: planning tokens are a lot fewer and cheaper than implementation tokens. Even a very big, complex markdown plan is shorter than a few substantive code files, let alone a whole project.</P>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 7: AGENTS.MD & SWARM LAUNCH                            */}
          {/* ============================================================= */}
          <GuideSection id="agents-md" number="7" title="Phase 4: AGENTS.md & Swarm Launch">
            <SubSection title="AGENTS.md: The Operating Manual">
              <P>The AGENTS.md file is the single most critical piece of infrastructure for agent coordination. Without a good one, nothing works well. It is the swarm&apos;s durable operating manual — telling a fresh or partially-amnesic agent how to behave, what tools exist, what safety constraints matter, and what &quot;doing a good job&quot; means in this repo.</P>

              <P>Every AGENTS.md should explain:</P>
              <BulletList items={[
                "All tools available to agents (br, bv, Agent Mail, ubs, cass, cm, etc.) with prepared blurbs",
                "How to use each tool — this is the modern equivalent of a man page",
                "Project-specific rules and conventions",
                "Safety rules (no file deletion, no destructive git commands)",
                "What the project is and how it works",
              ]} />

              <TipBox variant="warning">
                <strong>Agents must constantly re-read AGENTS.md.</strong> After every context compaction, agents lose the nuances and start making mistakes. The pragmatic approach: don&apos;t fight compaction, just re-read AGENTS.md and roll with it. If the agent starts doing dumb things even after re-reading, start a fresh session.
              </TipBox>

              <BlockQuote>After compaction they become like drug-addled children and all bets are off. They need to be forced to read it again or they start acting insane.</BlockQuote>
            </SubSection>

            <SubSection title="Launching the Swarm">
              <P>Once beads are polished and AGENTS.md is solid, start up a swarm of agents. Create sessions using Claude Code, Codex, and Gemini-CLI in different tmux panes (or use the ntm project to automate this). A typical composition:</P>

              <DataTable
                headers={["Open Beads", "Claude (cc)", "Codex (cod)", "Gemini (gmi)"]}
                rows={[
                  ["400+", "4", "4", "2"],
                  ["100-399", "3", "3", "2"],
                  ["<100", "1", "1", "1"],
                ]}
              />

              <P>Give each agent these marching orders:</P>

              <PromptBlock
                title="Swarm Marching Orders"
                prompt={`First read ALL of the AGENTS.md file and README.md file super carefully and understand ALL of both! Then use your code investigation agent mode to fully understand the code, and technical architecture and purpose of the project. Then register with MCP Agent Mail and introduce yourself to the other agents.

Be sure to check your agent mail and to promptly respond if needed to any messages; then proceed meticulously with your next assigned beads, working on the tasks systematically and meticulously and tracking your progress via beads and agent mail messages.

Don't get stuck in "communication purgatory" where nothing is getting done; be proactive about starting tasks that need to be done, but inform your fellow agents via messages when you do so and mark beads appropriately.

When you're not sure what to do next, use the bv tool mentioned in AGENTS.md to prioritize the best beads to work on next; pick the next one that you can usefully work on and get started. Make sure to acknowledge all communication requests from other agents and that you are aware of all active agents and their names. Use ultrathink.`}
                where="Every agent in the swarm gets this as their initial prompt"
                whyItWorks="Every agent is fungible and a generalist. Simply telling one that it's a frontend agent doesn't make it better at frontend — the specifics come from AGENTS.md and the beads."
              />

              <CoordinationTrioViz />
              <AgentMailViz />
            </SubSection>

            <SubSection title="The First 10 Minutes">
              <P>In practice, the first 10 minutes after launch look like this:</P>
              <NumberedList items={[
                "Your session manager creates the agent terminals (ntm spawn, WezTerm mux, or similar).",
                "You send the marching-orders prompt.",
                "Each agent reads AGENTS.md and the repo docs, inspects the codebase, and joins Agent Mail.",
                "Each agent checks who else is active, acknowledges waiting messages, and learns the bead-thread naming conventions.",
                "Each agent uses bv --robot-triage and br ready --json to choose a bead.",
                "Before editing, the agent reserves the relevant file surface and announces the claim.",
                "Only then does the agent start coding, reviewing, or testing.",
              ]} />
              <P>That sequence turns a pile of terminals into a coordinated swarm. Skipping the join-up steps gets you duplicate work, silent conflicts, and &quot;communication purgatory.&quot; Skipping the routing steps means agents choose work randomly instead of unlocking the dependency graph intelligently.</P>
            </SubSection>

            <SubSection title="The Thundering Herd">
              <P>When you start up multiple agents and have them all collaborate in the same shared workspace, you can hit the classic &quot;thundering herd&quot; problem — everyone grabs the same bead. The fix: stagger agent starts and make sure agents mark beads as in-progress quickly.</P>

              <SwarmExecutionViz />
            </SubSection>

            <SubSection title="What the Human Does During an Active Swarm">
              <P>The human tends the swarm the way an operator tends a machine that mostly runs on its own. On roughly a 10-30 minute cadence:</P>
              <BulletList items={[
                "Check br or bv to see whether progress is flowing or work has jammed up behind a blocker",
                "Look for beads that have been in_progress for too long or keep bouncing between agents",
                "Check Agent Mail for unanswered requests, reservation conflicts, or silent agents",
                "Send a fresh-eyes review prompt to one agent while the others keep implementing",
                "Rescue agents after compaction by forcing a re-read of AGENTS.md",
                "Periodically designate one agent to handle organized commits and pushes",
              ]} />
              <BlockQuote>YOU are the bottleneck. Be the clockwork deity to your agent swarms: design a beautiful and intricate machine, set it running, and then move on to the next project.</BlockQuote>
            </SubSection>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 8: REVIEW & HARDENING                                  */}
          {/* ============================================================= */}
          <GuideSection id="review" number="8" title="Phase 5: Review, Testing & Hardening">
            <P>If you&apos;ve done a good job creating your beads, the agents will be able to get a decent sized chunk of work done in that first pass. Before they move to the next bead, have them review all their work.</P>

            <SubSection title="Self-Review: Fresh Eyes">
              <PromptBlock
                title="Fresh Eyes Review"
                prompt={`Great, now I want you to carefully read over all of the new code you just wrote and other existing code you just modified with "fresh eyes" looking super carefully for any obvious bugs, errors, problems, issues, confusion, etc. Carefully fix anything you uncover. Use ultrathink.`}
                where="After each bead is implemented — run until no more bugs are found"
              />
              <P>Keep running rounds of that until they stop finding bugs. When reviews come back clean, have them move on to the next bead using bv to find the most impactful one.</P>
            </SubSection>

            <SubSection title="Advancing to the Next Bead">
              <PromptBlock
                title="Next Bead Prompt"
                prompt={`Reread AGENTS.md so it's still fresh in your mind. Use ultrathink. Use bv with the robot flags (see AGENTS.md for info on this) to find the most impactful bead(s) to work on next and then start on it. Remember to mark the beads appropriately and communicate with your fellow agents. Pick the next bead you can actually do usefully now and start coding on it immediately; communicate what you're working on to your fellow agents and mark beads appropriately as you work. And respond to any agent mail messages you've received.`}
                where="After self-review comes back clean"
              />
            </SubSection>

            <SubSection title="Testing">
              <P>When all your beads are completed, make sure you have solid coverage:</P>
              <PromptBlock
                title="Test Coverage Prompt"
                prompt={`Do we have full unit test coverage without using mocks/fake stuff? What about complete e2e integration test scripts with great, detailed logging? If not, then create a comprehensive and granular set of beads for all this with tasks, subtasks, and dependency structure overlaid with detailed comments. Use ultrathink.`}
                where="After initial implementation pass is complete"
              />
            </SubSection>

            <SubSection title="UI/UX Polish">
              <PromptBlock
                title="UI/UX Polish Prompt"
                prompt={`I still think there are strong opportunities to enhance the UI/UX look and feel and to make everything work better and be more intuitive, user-friendly, visually appealing, polished, slick, and world class in terms of following UI/UX best practices like those used by Stripe, don't you agree? And I want you to carefully consider desktop UI/UX and mobile UI/UX separately while doing this and hyper-optimize for both separately to play to the specifics of each modality. I'm looking for true world-class visual appeal, polish, slickness, etc. that makes people gasp at how stunning and perfect it is in every way. Use ultrathink.`}
                where="After core functionality is working and tested"
              />
            </SubSection>

            <SubSection title="Deep Cross-Agent Review">
              <P>Keep doing rounds of these two prompts until they consistently come back clean with no changes made:</P>

              <PromptBlock
                title="Random Code Exploration Review"
                prompt={`I want you to sort of randomly explore the code files in this project, choosing code files to deeply investigate and understand and trace their functionality and execution flows through the related code files which they import or which they are imported by.

Once you understand the purpose of the code in the larger context of the workflows, I want you to do a super careful, methodical, and critical check with "fresh eyes" to find any obvious bugs, problems, errors, issues, silly mistakes, etc. and then systematically and meticulously and intelligently correct them.

Be sure to comply with ALL rules in AGENTS.md and ensure that any code you write or revise conforms to the best practice guides referenced in the AGENTS.md file. Use ultrathink.`}
                where="Alternate with the cross-agent review below"
                whyItWorks="Random exploration catches bugs that structured reviews miss — you find problems in the corners nobody thought to check."
              />

              <PromptBlock
                title="Cross-Agent Review"
                prompt={`Ok can you now turn your attention to reviewing the code written by your fellow agents and checking for any issues, bugs, errors, problems, inefficiencies, security problems, reliability issues, etc. and carefully diagnose their underlying root causes using first-principle analysis and then fix or revise them if necessary? Don't restrict yourself to the latest commits, cast a wider net and go super deep! Use ultrathink.`}
                where="Alternate with the random exploration above"
                whyItWorks="Cross-agent review catches the bugs that the original author's mental model blinds them to."
              />
            </SubSection>

            <SubSection title="Organized Commits">
              <P>Periodically have one of the agents commit work in logical groupings:</P>
              <PromptBlock
                title="Organized Commit Prompt"
                prompt={`Now, based on your knowledge of the project, commit all changed files now in a series of logically connected groupings with super detailed commit messages for each and then push. Take your time to do it right. Don't edit the code at all. Don't commit obviously ephemeral files. Use ultrathink.`}
              />
            </SubSection>
          </GuideSection>

          <Divider />

          {/* ============================================================= */}
          {/* SECTION 9: THE RECURSIVE FLYWHEEL                              */}
          {/* ============================================================= */}
          <GuideSection id="recursive" number="9" title="The Recursive Flywheel">
            <P highlight>If you simply use these tools, workflows, and prompts in the way described above, you can create really incredible software in just a couple days, sometimes in just one day. The frontier models and coding agent harnesses really are that good already — they just need this extra level of tooling, prompting, and workflows to reach their full potential.</P>

            <SubSection title="V1 Is Not Everything">
              <P>A common misconception is that you have to do everything in one shot. In this approach, that&apos;s true only for version 1. Once you have a functioning v1, adding new features follows the same process: create a super detailed markdown plan for the new feature, turn it into beads, and implement. The same process that creates the initial version also handles all subsequent iterations.</P>
            </SubSection>

            <SubSection title="Skills Improving Skills">
              <P>The truly powerful thing is that the flywheel improves <em>itself</em>. Using skills to improve skills, skills to improve tool use, and then feeding the actual experience in the form of session logs (surfaced and searched by CASS) back into the design skill for improving the tool interface. Then taking that revised tool and improving the skill for using that tool. Rinse and repeat.</P>
              <P>Every tool in the stack was built using the same methodology it now supports. That is the flywheel effect in its purest form.</P>
            </SubSection>

            <SubSection title="The Knowledge Is Just Sitting There">
              <BlockQuote>The knowledge is just sitting there and the models have it. But you need to know how to coax it out of them.</BlockQuote>
              <P>The Flywheel methodology is ultimately about creating the right structure — the right plans, the right beads, the right operating manuals, the right review loops — so that frontier models can give you their best work consistently rather than occasionally. The difference between mediocre AI-assisted development and extraordinary output is not the model. It is the methodology.</P>
            </SubSection>
          </GuideSection>

          <Divider />
          <FooterCTA />

        </div>
      </main>
    </ErrorBoundary>
  );
}


// =============================================================================
// HERO SECTION
// =============================================================================
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-[#020408] border-b border-white/[0.04]">
      {/* High-end ambient effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,85,0,0.08),transparent_70%)]" />

      <div className="relative mx-auto text-center px-6 z-10 max-w-5xl">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#FF5500]/20 bg-[#FF5500]/5 px-6 py-2 text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#FF5500] mb-10 shadow-[0_0_20px_rgba(255,85,0,0.15)] backdrop-blur-xl">
          <Sparkles className="h-4 w-4" />
          The Official Methodology
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl leading-[1.05]">
          The Agentic Coding <br/><span className="text-[#FF5500]">Flywheel</span>
        </h1>

        <p className="mx-auto mt-10 max-w-3xl text-xl sm:text-2xl text-zinc-400 leading-relaxed font-light">
          A comprehensive guide to creating extraordinary software by orchestrating swarms of AI agents using <Hl>exhaustive markdown plans</Hl>, <Hl>polished beads</Hl>, and the <Hl>Dicklesworthstone stack</Hl>. Based on the methodology of Jeffrey Emanuel.
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER CTA
// =============================================================================
function FooterCTA() {
  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-[#FF5500]/20 bg-[#0A0D14] py-24 md:py-32 my-32 shadow-[0_50px_100px_-20px_rgba(255,85,0,0.15)] group">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative mx-auto text-center px-6 z-10">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#FF5500]/30 bg-[#FF5500]/10 px-6 py-2 text-[0.7rem] font-black uppercase tracking-[0.3em] text-[#FF5500] mb-10 shadow-inner">
          <Rocket className="h-4 w-4" />
          Ready to Start?
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
          Get the Flywheel <span className="text-[#FF5500]">Stack</span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 leading-relaxed font-light">
          One command installs all the tools, three AI coding agents, and the complete environment.
          <br/><strong>30 minutes to fully configured.</strong>
        </p>

        <div className="mt-12 flex justify-center">
          <a
            href="/wizard/os-selection"
            className="inline-flex items-center justify-center rounded-2xl bg-[#FF5500] px-8 py-4 text-sm font-black text-black uppercase tracking-widest transition-all hover:bg-[#FFBD2E] hover:shadow-[0_0_40px_rgba(255,189,46,0.4)] hover:-translate-y-1 active:scale-95"
          >
            Launch the Setup Wizard
          </a>
        </div>
      </div>
    </section>
  );
}
