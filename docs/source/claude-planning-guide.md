# Thunderforge Doctrine Atlas: A Build Spec

**Design document for an interactive learning artifact teaching Joint Publication 5-0 alongside Scale AI's agentic warfare approach to the Joint Planning Process. Optimized for a Thunderforge TPM's first 60 days.**

This is the brief you build from. The artifact pairs Andy Matuschak's stacked notes (information architecture) with Jay Alammar's illustrated explainers (note interior), Distill-style inline interactives (where they earn it), and Nicky Case's pedagogy moves (predict-then-reveal, sandbox endings). It is opinionated: every section below names one choice and defends it. Where the white paper is silent (Steps 1, 2, 5, 6, 7 of JPP), the artifact constructs and labels the bridge from Anthropic's *Building Effective Agents* pattern vocabulary plus public Scale/DIU descriptions, marked as inference. Codename for the artifact: **Thunderforge Doctrine Atlas** (referred to below as "the Atlas").

---

## 1. First-principles design philosophy

The Atlas exists because **transmissionism** — Andy Matuschak's diagnosis that "the author writes, the reader reads, therefore the reader understands" — would be catastrophic for this material. JP 5-0 is a 200-page doctrinal graph, not a story. Scale's agentic overlay is a vocabulary of patterns, not a narrative. A new Thunderforge TPM on day 30 does not need to have *read* the doctrine; they need to be able to **hold five concepts in working memory simultaneously** — say, *commander's intent → CCIR → orchestrator agent → human-on-the-loop gate → red-team specialist agent* — and reason about how they compose. That is a non-linear, comparative reading task. Stacked notes are the only existing UI primitive that physically supports it.

Five principles govern every decision below.

**Doctrine is a graph, not a book.** Concepts cross-reference promiscuously (mission analysis depends on commander's intent, which depends on end state, which depends on objectives, which feed back into COA evaluation criteria). Linear scrollytelling cannot do this. The Atlas's spine is therefore Matuschak's atomic-evergreen-notes model with stacked horizontal columns and deep-linkable URL state. **Every doctrinal concept becomes one note titled as a claim** ("Mission analysis is the most consequential step because errors cascade through the remaining six"), not as a topic ("Mission Analysis").

**Inside each note, show before you formalize.** Alammar's signature move — one diagram, then a refinement of the same diagram, then the equation that the diagram already explained — applies directly. A note titled *"The Center of Gravity is the source of strength a commander must defend or attack"* opens with a whiteboard-style sketch of an adversary force with one labeled node glowing, then progressively layers critical capabilities → requirements → vulnerabilities, then names Eikmeier's ends-ways-means method, then offers the canonical Clausewitz/joint-doctrine definition as the last beat — not the first.

**Interactivity must be on the critical-path concept, never decorative.** Decoration adds load without learning. Generative interaction — *predict before reveal, manipulate then explain, drag-and-place under constraint* — is where the evidence lives. The Atlas earns every widget against the test: would prose alone teach this in under 90 seconds? If yes, write the prose.

**Two audiences, one path, dynamic fade.** The artifact serves both a new TPM with no military background and a major learning the AI overlay. The expertise-reversal effect says worked examples that help one will bore and harm the other. Solution: a self-placement quiz at entry sets a *prior-knowledge flag*; cards render with scaffolds expanded or collapsed accordingly, and successful retrieval prompts auto-fade scaffolds within a session. One artifact, two reading temperatures.

**The Scale overlay is a lens, not a parallel artifact.** Tempting to build two tracks (doctrine and agentic) side by side. Reject this. The whole pedagogical point is the *delta* — how agents change what an officer does. Build doctrine first as ground truth, then expose a global **"Agentic Lens" toggle** that, when on, reveals an inline "↯ Agentic" sidebar on every relevant note showing how Scale's framework recasts the concept. See §7 for the full lens recommendation.

**Patterns to use:** stacked columns with URL state, atomic claim-titled notes, hover-to-define glossary, click-to-expand worked examples, sliders that change the model, predict-before-reveal prompts, retrieval prompts with spaced re-surfacing, animated agent message-passing on a scrubbable timeline, one capstone sandbox per major section.

**Patterns to avoid:** scrolljacking, parallax for its own sake, mystery-meat navigation, hover-only interactions, single-direction animations with no replay, decorative sliders that don't change the model, raw JSON agent traces dumped on the reader, "interactive" buttons that just toggle paragraphs, network-graph spaghetti for multi-agent systems, walls of doctrinal acronyms without inline expansion.

---

## 2. Content architecture: the atomic note registry

The Atlas is organized into **eight content clusters** containing **~85 atomic notes** plus a glossary of **~60 terms**. Each note has a claim-style title, a one-sentence summary, frontmatter tags, an optional embedded interactive, and forward/back-links computed at build time. The clusters below are *informational*, not visual — there is no required reading order; the suggested learning path in §5 is one of many curated trails through the same graph.

### Cluster A — Foundations and frame *(8 notes; ~Day 1 reading)*

These notes establish the why before the how. They define the planning enterprise, the levels of warfare, and Scale's thesis as twin opening moves so the reader sees both halves of the bridge before crossing it.

- **A1. Joint planning is the deliberate translation of ends, ways, and means into options for civilian decision-makers.** *Interactive: an ends-ways-means-risk slider that scales each lever and shows the trade space.*
- **A2. Strategic, operational, and tactical levels are not a hierarchy of importance but of horizon.** *Interactive: hover-to-zoom from NSS down to a battalion OPORD with the same operation depicted at each level.*
- **A3. Adaptive Planning and Execution (APEX) is the enterprise; the JPP is the engine.** *Visual only: nested-system diagram.*
- **A4. Plans are worthless; planning is everything** — Eisenhower's claim explains why the artifact teaches the process, not how to produce documents. *Visual + one-paragraph reflection prompt.*
- **A5. The JPP is the same in deliberate and crisis planning; only time available differs** — the 2020 doctrinal merger and what it means. *Visual: side-by-side timeline showing the same seven steps at two-year vs. two-day pace.*
- **A6. Scale's thesis: there is a fundamental mismatch between modern warfare's speed and a Napoleonic staff system.** *Quote-card from the white paper plus one statistic: theater OPLANs can take two years; near-peer crises may give two days.*
- **A7. Agentic warfare ≠ chatbot-augmented planning; it is deterrence by decision advantage.** *Side-by-side comparison: LLM-as-junior-staffer vs. constellation of specialized agents.*
- **A8. The agentic delta is not in paperwork; it is in COA development and wargaming** — the white paper is explicit about this. *Visual: the JPP seven-step ring with steps 3 and 4 highlighted as the agentic high-leverage zone.*

### Cluster B — The seven steps of the Joint Planning Process *(14 notes; ~Days 2–4 reading)*

The procedural spine. Each step gets one **overview note** (claim title, IPO list, common pitfalls) plus, where doctrinally rich enough, one **deep-dive note**. Steps 2 and 4 get a deep-dive; the rest do not.

- **B1. Planning initiation begins with someone forming the planning team and allocating time using the 1/3–2/3 rule.**
- **B2. Mission analysis is doctrinally the most consequential step because errors cascade through every step after it.** *Interactive: the seventeen sub-tasks of mission analysis as a checklist with hover-reveals for each.*
- **B3. Specified, implied, and essential tasks are not synonyms** — the canonical novice confusion. *Interactive: drag-and-drop classifier — given excerpts from a higher-HQ OPORD, sort tasks into the three buckets.*
- **B4. CCIRs split into PIRs (about the adversary) and FFIRs (about ourselves); EEFI sits adjacent.** *Interactive: a CCIR composer — pick an objective, then pick which information requirements support it.*
- **B5. COA development produces 2–3 distinguishable broad approaches, screened against the five criteria** (suitable, feasible, acceptable, distinguishable, complete). *Interactive: a screening-criteria checklist applied to three candidate COAs from a vignette.*
- **B6. COA analysis through wargaming tests each COA against most-likely and most-dangerous enemy COAs via action-reaction-counteraction.** *Interactive: a turn-based mini-wargame with a red cell agent — pick a box, belt, or avenue-in-depth method and watch the cycle play out.*
- **B7. Box, belt, and avenue-in-depth are wargaming methods with different costs and coverage.** *Visual: three rendered overlays on the same map vignette.*
- **B8. COA comparison applies pre-committed evaluation criteria via a decision matrix** — committing criteria before scoring is the bias-defeating discipline. *Interactive: weighted decision matrix with sliders; show how shifting weights flips the recommendation.*
- **B9. COA approval is the commander's decision, not the staff's vote.** *Visual: the decision brief flow with the four commander options (approve / modify / combine / reject and reiterate).*
- **B10. Plan or order development converts the approved COA into an OPLAN, CONPLAN, or OPORD with annexes A–Z.** *Visual: the annex tree.*
- **B11. The JPP is iterative, not waterfall** — reframing is normal. *Visual: the seven-step ring with feedback edges drawn explicitly.*
- **B12. Mission analysis brief and decision brief are the two doctrinal commander-engagement moments.** *Visual: anatomy of a slide deck.*
- **B13. The Commander's Estimate is the bridge document from concept development to plan development.** *Definition card.*
- **B14. WARNORD, PLANORD, ALERTORD, EXORD, OPORD, FRAGORD — the order family and when each fires.** *Interactive: timeline scrubber showing order issuance against the JPP timeline.*

### Cluster C — Operational art and operational design *(15 notes; the conceptual core)*

These are the high-confusion, high-leverage concepts where novices fail. Each gets a single atomic note and most get an interactive.

- **C1. Operational design is the iterative cognitive framework that produces an operational approach.** *Visual: the nine activities as a cycle, not a sequence.*
- **C2. Problem framing distinguishes symptoms from root causes** — and minor reframings drive substantially different plans. *Interactive: a vignette with three candidate problem statements; pick one and watch the resulting operational approach diverge.*
- **C3. The operational environment is analyzed through PMESII-PT and ASCOPE lenses.** *Interactive: an OE canvas — drag the PMESII-PT cards onto a notional theater map and add notes per dimension.*
- **C4. Termination criteria, military end state, objective, effect, and task form a strict hierarchy of abstraction.** *Visual: the abstraction ladder with worked examples at each rung.*
- **C5. The Center of Gravity is the source of strength that, if defeated, causes the adversary's plan to collapse.** *Interactive: the CG analysis canvas — see C6.*
- **C6. Critical capabilities, critical requirements, and critical vulnerabilities decompose a CG into where to attack.** *Interactive: the canonical CG/CC/CR/CV builder — type a CG, generate candidate CCs (verbs), then CRs (nouns), then mark CRs as CVs; reveals a sample answer for comparison.*
- **C7. Lines of operation are geographic; lines of effort are logical** — and plans usually use both. *Interactive: drag decisive points onto either LOO or LOE tracks and watch the operational approach update.*
- **C8. Decisive points are the nodes that, when acted upon, accumulate into objectives.** *Visual: an LOE with decisive points marked and the cumulative objective at the terminus.*
- **C9. Direct approach attacks the CG; indirect approach exploits its critical vulnerabilities.** *Visual: two paths on the same diagram.*
- **C10. Operational reach and culmination are the planner's logistics-and-time guardrails.** *Interactive: a notional offensive with a sustainment-burn slider showing the culmination point shifting.*
- **C11. Phasing arranges operations in time: shape, deter, seize initiative, dominate, stabilize, enable civil authority.** *Visual: a six-phase timeline with starting/ending conditions.*
- **C12. Branches are "what if?"; sequels are "what next?" — both are written before execution, not after.** *Interactive: a branching tree where the reader picks reactions and reveals the doctrinal label.*
- **C13. Tempo, simultaneity, and depth are the three operational-art levers for outpacing the adversary.** *Visual: triangle with sliders.*
- **C14. Risk-to-mission and risk-to-force trade off inversely with resources.** *Interactive: the risk-resource frontier slider.*
- **C15. Assessment lives inside the plan, not after — MOEs measure objectives, MOPs measure tasks.** *Interactive: classify a list of metrics as MOE, MOP, or neither.*

### Cluster D — Plans, orders, and the global integration framework *(8 notes)*

The documentary outputs, the strategic guidance hierarchy, and global force management. These are reference-heavy and benefit most from interactive lookups rather than long prose.

- **D1. Campaign plans are in execution; OPLANs are detailed and shelved; CONPLANs are abbreviated.** *Visual: the plan-level ladder (Level 1 BPLAN to Level 4 OPLAN).*
- **D2. The OPORD's five paragraphs are situation, mission, execution, sustainment, command and signal.** *Interactive: hover-anatomized OPORD with sample text in each paragraph.*
- **D3. NSS → NDS → NMS → UCP → JSCP is the strategic-guidance cascade.** *Visual: top-down org chart.*
- **D4. The GEF and JSCP are the two documents that translate national strategy into CCDR planning tasks.** *Definition card.*
- **D5. GFMAP is the annual deployment order — the "who goes where" document.** *Definition card.*
- **D6. APEX governs the entire planning enterprise; JPEC is the community.** *Definition card.*
- **D7. The supported, supporting, and coordinating relationships govern command authority, not just coordination.** *Visual: three-way relationship diagram.*
- **D8. The seven joint functions (C2, information, intelligence, fires, movement and maneuver, protection, sustainment) are the lens through which plans are checked for completeness.** *Interactive: drop a draft COA into a checker that flags missing joint functions.*

### Cluster E — Scale's agentic architecture *(12 notes)*

The technical and conceptual substrate of Thunderforge, written so a TPM with an ML background can place it inside the Anthropic *Building Effective Agents* pattern vocabulary they may already know.

- **E1. An agent is an augmented LLM with tools, memory, and a planning loop.** *Visual: the canonical augmented-LLM box (see §3, component I-1).*
- **E2. Scale's five-layer agent architecture: data, reasoning, tools, memory and orchestration, test and evaluation.** *Visual: concentric layers diagram.*
- **E3. Workflows are deterministic agent compositions; autonomous agents are dynamic and self-directed.** *Visual: side-by-side from Anthropic's essay.*
- **E4. The five workflow patterns are prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer.** *Interactive: pattern gallery — five mini-diagrams with one-paragraph explainers each.*
- **E5. Thunderforge's canonical topology is orchestrator-workers with parallel red-team fan-out and an evaluator synthesizer.** *Interactive: the Thunderforge architecture diagram (see §3, component I-7) — based on publicly described architecture.*
- **E6. Agentic Alerting is the observe/orient solution; Agentic Planning is the decide solution.** *Visual: OODA loop with the two products mapped onto its halves.*
- **E7. Scale's three-layer planning stack is natural-language UI on top, agent layer in the middle, simulation layer below.** *Visual: layered stack.*
- **E8. SAFE-SiM and similar simulators are the tools agents call to wargame at machine speed.** *Visual: tool inspector showing input/output of a notional SAFE-SiM call.*
- **E9. Defense Llama, Azure-hosted frontier models, and many smaller models are mixed under one orchestrator** — the "right model for the right purpose" pattern. *Visual: model-router diagram.*
- **E10. Long-horizon planning requires memory management to prevent instruction drift** — XML tagging, recursive reasoning, standardized memory routines. *Definition card.*
- **E11. The four-layer T&E framework evaluates knowledge base, model, agent harness, and monitoring system.** *Interactive: a checklist applied to a notional agent.*
- **E12. Scale's adversarial threat model has four categories: data and context manipulation, model and supply-chain compromise, cyber exploitation of agents, physical deception of perception.** *Interactive: classify five attack vignettes into the four categories.*

### Cluster F — The agentic JPP overlay *(10 notes; the artifact's centerpiece)*

The bridge cluster — one note per JPP step plus three on operational design — that lives entirely inside the Agentic Lens and answers *"what changes?"* These are the most-linked notes in the Atlas; many readers will read only these.

- **F1. In agentic planning initiation, agents ingest higher-HQ orders, strategic guidance, and indicators automatically and propose initial commander's planning guidance.** *(Inferred; white paper is silent. Marked.)*
- **F2. In agentic mission analysis, intelligence agents fuse multi-source signals and propose specified/implied/essential tasks; the human approves CCIRs.** *(Partly inferred.)*
- **F3. In agentic COA development, the agent layer auto-calls simulators to generate confidence-bound, validated COAs — the headline use case.* *(White paper explicit.)*
- **F4. In agentic wargaming, hundreds of thousands of physics-based permutations are run overnight, producing a planning multiverse for the commander.** *(White paper explicit; the marquee claim.)*
- **F5. In agentic COA comparison, agents match adversary moves against pre-validated outcomes to surface highest-likelihood-of-success options.** *(White paper explicit.)*
- **F6. In agentic COA approval, the commander still decides — but with far greater clarity and confidence; humans remain on the loop.** *(White paper explicit.)*
- **F7. In agentic plan or order development, plans become living documents that self-heal as battlefield conditions change.** *(White paper explicit.)*
- **F8. Agentic operational-environment analysis cross-correlates ISR, SIGINT, political signals, and economic indicators continuously.** *(White paper explicit.)*
- **F9. Agentic operational design re-democratizes ORSA-grade simulation by moving niche experts to higher-level problem solving.** *(White paper explicit.)*
- **F10. The J-staff (J1–J8) maps loosely onto agent roles; J2, J3, and J5 are the most disrupted.** *(White paper explicit on which J-codes; agent mappings inferred.)*

### Cluster G — Trust, governance, and human-on-the-loop *(8 notes)*

The values layer. For a TPM joining a defense AI project, these are the questions civilian leadership and uniformed officers will ask first.

- **G1. The three loop positions are human-in-the-loop, human-on-the-loop, and human-off-the-loop — graded by tempo and reversibility.** *Interactive: a 2x2 of tempo vs. reversibility with example tasks placed.*
- **G2. Meaningful human control is the doctrinal standard — citing Santoni de Sio & van den Hoven.** *Definition card.*
- **G3. Justifiable confidence — not trust — is what commanders require from agentic systems.** *Quote-card from the white paper.*
- **G4. Chain-of-thought is not explainability** — narrative rationale can mask error; assurance rests on testable behavior. *Definition card with Barez et al. 2025 citation.*
- **G5. Individual targeting, urban operations, and escalatory strategic effects demand direct human decision, even at a cost in tempo.** *Quote-card.*
- **G6. Responsible AI compliance under CDAO and DIU is a gating requirement, not a stretch goal.** *Reference card.*
- **G7. Multi-classification operation is a defining Thunderforge constraint** — agents must operate across security domains. *Definition card.*
- **G8. Approval gates are first-class architectural objects, not afterthoughts.** *Interactive: drop a gate into a Thunderforge pipeline and observe which messages it blocks.*

### Cluster H — Capstone sandboxes *(4–6 notes; the highest-difficulty endgame)*

Each is one bigger interactive that integrates multiple prior notes — the exploratory-practice apex of cognitive apprenticeship, the artifact's "Sandbox Mode" à la Nicky Case.

- **H1. The mini-JPP run** — pick a vignette, walk through all seven steps with scaffolding, get an end-of-run scorecard.
- **H2. The agentic JPP run** — same vignette, with the Agentic Lens engaged throughout; watch the agent traces.
- **H3. The CG/CV stress test** — present an adversary; produce the analysis; AI grader scores against a doctrinally-defensible answer.
- **H4. The trust-calibration scenario** — a Thunderforge-style red-team output arrives; decide whether to approve, modify, or send back; see the consequences.

### Glossary *(~60 terms, every note's terms hyperlink to them)*

CCIR, PIR, FFIR, EEFI, COG, CC, CR, CV, LOO, LOE, MOE, MOP, OPLAN, CONPLAN, OPORD, FRAGORD, WARNORD, PLANORD, ALERTORD, EXORD, DEPORD, TPFDD, IPOE, PMESII-PT, ASCOPE, DIME, JPP, APEX, JSCP, GEF, GFMAP, GFMIG, UCP, NSS, NDS, NMS, JPEC, NAI, DST, DSM, end state, objective, effect, task, mission, operational approach, CONOPS, decisive point, branch, sequel, culmination, operational reach, tempo, simultaneity, depth, assumption, constraint, restraint, agent, orchestrator, tool, memory, span, trace, handoff, human-on-the-loop.

---

## 3. The interactive component catalog

Eleven flagship components plus a reusable primitive library. Each is described as: **what it teaches, JP 5-0 mapping, Scale mapping, interaction design, why it beats prose.** Built in this order — earlier ones are reused inside later ones.

**I-1. Augmented-LLM agent card.** *Teaches:* the canonical structure of a single agent. *JP mapping:* none — this is a Cluster E primitive. *Scale mapping:* E1, E2. *Interaction:* a rounded SVG box with a role label, a row of tool icon chips, a memory cylinder, and a planning-loop arrow; hovering a tool chip reveals its name, purpose, and a sample input/output. Click any element to open a stacked note. *Why better than prose:* visual consistency across the artifact — every agent depicted anywhere uses this primitive, so the reader internalizes the vocabulary by the third use. Borrowed from Anthropic's *Building Effective Agents* visual idiom.

**I-2. JPP seven-step ring with current-step indicator.** *Teaches:* the procedural spine and where any given concept lives within it. *JP mapping:* B1–B11 collectively. *Scale mapping:* F1–F7 when Agentic Lens is on. *Interaction:* a persistent footer component on every doctrinal note showing the seven-step ring; the current step (inferred from the note's frontmatter) pulses; clicking any step jumps to its overview note. With Agentic Lens on, each step is tinted by Scale-coverage depth (steps 3 and 4 most saturated; step 7 muted per the white paper's "AI already does this with ease"). *Why better than prose:* dual coding plus persistent spatial reinforcement; the reader's procedural map gets refreshed on every page without re-reading prose.

**I-3. Specified / implied / essential task sorter.** *Teaches:* the most-confused mission-analysis distinction. *JP mapping:* B3. *Scale mapping:* F2 (agent proposes; human classifies). *Interaction:* the reader receives excerpts from a notional higher-HQ OPORD; drags each into specified, implied, or essential buckets; gets immediate feedback with doctrinal rationale; can hit "show the agent's classification" to see how a Scale-style intel agent would propose, with a confidence band. *Why better than prose:* discrimination learning beats definition memorization; the contrast set forces the reader to articulate the boundary.

**I-4. Center-of-Gravity analysis canvas.** *Teaches:* the CG → CC → CR → CV decomposition that JP 5-0 names as the only officially recognized COG method. *JP mapping:* C5, C6. *Scale mapping:* F8 (agents propose candidate CGs from PMESII-PT signals). *Interaction:* four columns; reader types a CG in column 1, drags candidate verbs into the CC column, candidate nouns into the CR column, marks vulnerable CRs as CVs in column 4. A "compare to a doctrinally-defensible answer" button reveals an instructor-authored solution side-by-side. With Agentic Lens on, an Intelligence Agent in I-1 form proposes candidate CGs and the reader accepts/rejects each, with audit log. *Why better than prose:* CG analysis is canonically taught at war colleges through practice, not reading; this is a war-college tablet exercise in a single component.

**I-5. Lines of operation / lines of effort builder.** *Teaches:* the distinction between geographic and logical lines, and how decisive points accumulate into objectives. *JP mapping:* C7, C8. *Scale mapping:* F9. *Interaction:* two parallel tracks (LOO and LOE); the reader is given a vignette and a set of candidate decisive points and drags each onto the appropriate track at the appropriate distance. As decisive points cluster, the operational approach text auto-updates beneath. *Why better than prose:* makes the abstract geographic-vs.-logical distinction concrete in a way text cannot.

**I-6. Weighted-decision-matrix COA comparator.** *Teaches:* why committing evaluation criteria *before* scoring is the bias-defeating discipline. *JP mapping:* B8. *Scale mapping:* F5. *Interaction:* three COAs scored on five evaluation criteria; the reader moves weight sliders; the ranked recommendation flips visibly as weights move; a "lock the criteria" button before scoring is the doctrinally correct workflow. *Why better than prose:* the central pedagogical claim is *bias enters when criteria are tuned to favor a preferred answer* — feeling that happen with sliders teaches it permanently.

**I-7. Thunderforge architecture diagram, with watch-it-run mode.** *Teaches:* the canonical Thunderforge topology and its messaging behavior. *JP mapping:* B5, B6, B8 (COA dev → wargaming → comparison). *Scale mapping:* E5, F3–F5 — the artifact's centerpiece. *Interaction:* in static view, a left-to-right diagram — Human Planner → Orchestrator Agent → fan-out to four named Specialist Agents (Intelligence, Logistics, Cyber/IO, Red Team) → Synthesizer Agent → Human Approver — with each agent rendered in I-1 form, human gates as diamond nodes. In dynamic mode, a timeline scrubber underneath plays a notional vignette; color-coded message packets travel along edges, parallel branches animate simultaneously, the active agent's border pulses. Pause, rewind, step. A "show me the trace" toggle expands a three-layer trace viewer (see I-8). A persistent caption labels the topology as orchestrator-workers + parallelization + evaluator-optimizer from Anthropic's pattern vocabulary, and notes it is based on publicly described architecture. *Why better than prose:* there is no good prose-only way to show parallel agent fan-out with human gates; the simultaneity is the pedagogical point.

**I-8. Three-layer agent trace viewer.** *Teaches:* how to read an agent trace without drowning. *Scale mapping:* E2, E11. *Interaction:* three tiers, top-down disclosure. Top: the agent graph view from I-7 with the active node highlighted as the trace plays. Middle: a human-readable span list — verbs only, no IDs ("Orchestrator → asked Logistics Agent: what is throughput of Subic if port damaged?"). Bottom (collapsed by default): the raw JSON span. *Why better than prose:* mirrors Arize Phoenix's Agent Graph tab innovation — abstracting spans into the conceptual graph is the field's recognition that raw traces overwhelm.

**I-9. Operational design canvas.** *Teaches:* the joint cognitive artifact a planner actually produces. *JP mapping:* C1–C4, C7, C11. *Scale mapping:* F8, F9. *Interaction:* a single canvas with regions for current state, desired end state, operational approach narrative, LOOs, LOEs, decisive points, phasing strip, branches/sequels list. The reader fills it in for a vignette; an "agentic assist" button populates first-draft candidates that the reader edits. Print-to-PDF affordance for actual planning use. *Why better than prose:* this *is* the operational design artifact in joint doctrine; reading about it is not learning it.

**I-10. The wargame mini-engine.** *Teaches:* action-reaction-counteraction; box vs. belt vs. avenue-in-depth methods; the red-cell role. *JP mapping:* B6, B7. *Scale mapping:* F4 (the planning multiverse). *Interaction:* the reader picks a method, then walks one critical event through three turns of action → reaction (from a Red Cell Agent rendered in I-1 form) → counteraction. After the manual round, a "run 1,000 permutations" button shows a fan of outcomes — making the multiverse claim concrete. *Why better than prose:* the multiverse claim is wholly abstract in text; here it is a fan of paths the reader generates with one click.

**I-11. Human-on-the-loop gate placer.** *Teaches:* approval gates as first-class architectural objects. *Scale mapping:* G1, G8. *JP mapping:* commander's role in B9 (COA approval). *Interaction:* a Thunderforge-style pipeline appears with three candidate gate positions; the reader places gates and runs the pipeline; messages stop appropriately. A "tempo cost vs. control" readout updates as gates are added or removed, making the speed/control tradeoff visible. *Why better than prose:* the in-loop / on-loop / off-loop trichotomy stays academic until the reader feels the tempo cost.

**Plus a small library of reusable primitives that are not "components" so much as authoring conveniences:**
**P-1. Callout** (doctrine | agentic | warning | inference) — colored sidebar for doctrinal quotes, agentic-lens annotations, or "inferred from public sources" flags. **P-2. Sidenote** — Tufte-style margin note for citations, asides, doctrine paragraph references. **P-3. AcronymTooltip** — every doctrinal acronym is wrapped so hover reveals the expansion plus a recall prompt. **P-4. PredictThenReveal** — Nicky Case's pattern: a multiple-choice question with a "reveal" gate, used before introducing any doctrinal answer. **P-5. RetrievalCard** — at the end of every note, one or two prompts that re-surface at expanding intervals (1 day, 3 days, 1 week, 1 month) via a localStorage-backed Orbit-style scheduler.

---

## 4. Technical architecture

**The stack: Next.js 15 (App Router) with `output: 'export'`, MDX via `@next/mdx`, Tailwind v4, shadcn/ui, Pagefind for search, KaTeX for math, Visx for data visualization, Framer Motion for animation, and a custom React-based stacked-notes shell (~200 lines).** Deploy via one GitHub Actions workflow to GitHub Pages with `basePath` set to the repo name. No Astro, no Docusaurus, no Nextra. React is the right substrate because every flagship component above is a stateful, often cross-component interactive — exactly what React does well and exactly where Astro's islands model introduces unnecessary friction.

### Why this stack wins

React is the lingua franca of Distill-level interactives. Astro's "ship zero JS" advantage evaporates when most pages hydrate multiple React islands, and shared state across islands becomes awkward; Docusaurus's docs theme fights the stacked-notes layout; Nextra is structurally a left-sidebar docs site you'd have to dismantle. Next.js gives you file-based routing, App Router conventions, mature static export, and `next/font` integration — all things you'd otherwise build by hand on Vite. Tailwind plus shadcn/ui (vendored, you own the source) gives the defense-modern aesthetic without a design system project. Pagefind is the right search choice: it runs *after* `next build` against your static HTML, knows nothing about your stack, never breaks, splits the index into bandwidth-friendly chunks, and exposes a JS API you can wire into a shadcn Command palette.

### Repository structure

```
thunderforge-doctrine-atlas/
├── .github/workflows/deploy.yml            # Build → Pagefind → Pages
├── app/
│   ├── layout.tsx                          # Root: fonts, ThemeProvider
│   ├── page.tsx                            # Landing + trail picker
│   ├── globals.css                         # Tailwind + CSS vars
│   ├── n/[slug]/page.tsx                   # Canonical note URL (SSG)
│   └── search/page.tsx                     # Pagefind search
├── content/
│   ├── foundations/        (Cluster A — 8 .mdx)
│   ├── jpp/                (Cluster B — 14 .mdx)
│   ├── design/             (Cluster C — 15 .mdx)
│   ├── plans/              (Cluster D — 8 .mdx)
│   ├── agents/             (Cluster E — 12 .mdx)
│   ├── agentic-jpp/        (Cluster F — 10 .mdx)
│   ├── governance/         (Cluster G — 8 .mdx)
│   ├── capstones/          (Cluster H — 4–6 .mdx)
│   ├── glossary/           (~60 .mdx, one per term)
│   └── trails/             (curated reading paths — see §5)
├── components/
│   ├── ui/                                 # shadcn/ui vendored primitives
│   ├── mdx/                                # P-1 to P-5 + Figure, Math
│   ├── interactive/                        # I-1 through I-11
│   ├── stack/                              # StackLayout, NoteColumn, useStack
│   ├── lens/                               # AgenticLensProvider, lens toggle
│   └── chrome/                             # TopBar, Cmd-K, ThemeToggle
├── lib/
│   ├── notes.ts                            # Read /content → note registry
│   ├── linkGraph.ts                        # MDX AST → forward/backlinks
│   ├── trails.ts                           # Curated reading paths
│   └── retrieval.ts                        # Spaced-repetition scheduler
├── public/
│   ├── .nojekyll                           # GitHub Pages — required
│   ├── fonts/                              # Self-hosted woff2
│   ├── images/                             # Pre-optimized .webp
│   └── pagefind/                           # Generated; gitignored
├── scripts/
│   └── build-link-graph.ts                 # Prebuild step
├── mdx-components.tsx                      # Global MDX component registry
├── next.config.mjs
├── tailwind.config.ts
├── components.json
└── README.md
```

`/content` is the only folder the author touches 95% of the time. `/components/interactive/` is the second-most-touched. Everything else is plumbing.

### MDX + React integration pattern

`mdx-components.tsx` at the project root globally registers every authoring primitive (P-1 to P-5) and every flagship interactive (I-1 to I-11). The author never imports them in MDX files; they are just available. Adding a new component is three steps: write the component file, export from the index, register once in `mdx-components.tsx` — then it works in every note forever. Sample note:

```mdx
---
title: Mission analysis is the most consequential step
slug: mission-analysis-most-consequential
cluster: jpp
jppStep: 2
tags: [jpp, mission-analysis, foundational]
agenticOverlay: agentic-jpp/mission-analysis-agentic
summary: Errors in mission analysis cascade through every step after it.
---

<Callout type="doctrine">
JP 5-0 §V identifies mission analysis as the step that produces the
mission statement, commander's intent, and CCIRs.
</Callout>

A planner walking out of mission analysis with the wrong mission
statement has...

<PredictThenReveal question="Which of these is an essential task?">
  ...
</PredictThenReveal>

<TaskSorter vignette="indopacom-typhoon-subic" />

<RetrievalCard prompt="Without scrolling, name the 5 Ws in a mission statement." />
```

### Stacked notes implementation

URL state schema mirrors Andy Matuschak exactly:

```
/n/mission-analysis-most-consequential?stack=ccir-pirs-ffirs,agentic-jpp/mission-analysis-agentic
```

The first path segment is the *root* note — deep-linkable, SEO-indexable, statically generated. The `stack` query parameter is a comma-separated list of slugs appended in click order. Clicking a `NoteLink` inside any column appends to `stack`; clicking a link in column N truncates everything past N before appending; closing a column removes its slug and all to the right. Implementation is ~40 lines in `useStack.ts` using `useSearchParams`, `useRouter`, `usePathname`. Layout is a horizontally scrolling flex container; each `NoteColumn` is `min-w-[42rem]` on desktop, `100vw` on mobile. Below `md` breakpoint, only the rightmost column renders with a back chevron — single responsive special-case, everything else is normal Tailwind responsive prose.

Two existing reference implementations to study (do not fork wholesale): `vicentematus/stacked-tabs-andy-matuschak` (closest URL scheme) and `semanticdata/evergreen` (React + Vite, simpler).

### Backlinks and the link graph

`lib/linkGraph.ts` runs as a `prebuild` npm script. It walks every `/content/**/*.mdx` with `@mdx-js/mdx`'s remark pipeline, extracts every link whose target is a local slug, inverts the edges, emits `lib/generated/linkGraph.json` as `{ [slug]: { outgoing: string[], incoming: string[] } }`. `NoteColumn` renders the `incoming` array as a Distill-style "Referenced by" footer panel.

### GitHub Pages deployment

`next.config.mjs` must set `output: 'export'`, `basePath: '/<repo-name>'` in production (empty in dev so `localhost:3000` works), `images: { unoptimized: true }`, and `trailingSlash: true` (smooths GitHub Pages path math). Drop an empty `public/.nojekyll` or Jekyll will eat the `_next/` folder and you'll ship with no CSS. Every dynamic route (`[slug]`) needs `generateStaticParams` — forgetting this is the #1 build failure with `output: 'export'`. The GitHub Actions workflow is conventional: checkout → setup-node → `npm ci` → `npm run build` → `npx pagefind --site out` → `upload-pages-artifact` → `deploy-pages`. Set repo Settings → Pages → Source to "GitHub Actions" — done.

### Performance gotchas

Mark every interactive component with `'use client'`. Render KaTeX and Mermaid *at build time* via rehype plugins — zero runtime weight. Dynamically import heavy interactives with `next/dynamic({ ssr: false })` so notes that don't use I-7 (the heaviest) don't pay for it. Pre-optimize images to `.webp` before commit (since `next/image` does no resizing under static export). Use the inline `<script>` dark-mode bootstrapper in `<head>` before any CSS to prevent FOUC. Watch out for `basePath` leaking into hardcoded URLs — always use `<Link>`, `next/image`, or `process.env.NEXT_PUBLIC_BASE_PATH`. Target initial JS ≤ 200KB gzipped per route; heavy interactives can add 50–150KB each and that's fine.

### Starter command sequence

```bash
npx create-next-app@latest thunderforge-doctrine-atlas \
  --ts --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd thunderforge-doctrine-atlas && npx shadcn@latest init -d && \
  npx shadcn@latest add button card dialog dropdown-menu tooltip tabs sheet command separator scroll-area
npm i @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm remark-math \
  rehype-katex rehype-slug katex next-themes framer-motion @visx/visx \
  unified remark-parse remark-mdx unist-util-visit gray-matter
npm i -D @tailwindcss/typography pagefind
echo "" > public/.nojekyll && mkdir -p content/{foundations,jpp,design,plans,agents,agentic-jpp,governance,capstones,glossary,trails} components/{mdx,interactive,stack,lens,chrome} lib/generated
```

---

## 5. Suggested learning paths

The Atlas exposes the same graph in three curated **trails** (themselves notes, in `/content/trails/`), each linking to its sequence in `frontmatter.sequence`. The trails are explicit because Matuschak-style graphs without entry points strand newcomers.

**Trail 1 — The minimum-viable doctrine (≈20 notes, 4–6 hours, the recommended first week).** Targeted at a brand-new TPM who needs to be able to follow a planning conversation by end of week one. Sequencing rationale: foundations first to frame why planning exists; then the JPP spine end-to-end so the procedural skeleton is in working memory before any conceptual detail; then the four highest-leverage operational design concepts (problem framing, CG analysis, LOO/LOE, end state) because these are the words the conversation will actually use; then a single capstone run. Sequence: A1 → A2 → A4 → A6 → A7 → B1 → B2 → B5 → B6 → B8 → B9 → B10 → B11 → C1 → C2 → C4 → C5 → C6 → C7 → H1.

**Trail 2 — The agentic overlay (≈25 notes, the recommended second week).** Assumes Trail 1 complete. Sequencing rationale: establish the agent vocabulary first (Anthropic's pattern bestiary) so that when the JPP overlay is named, the reader recognizes the pattern; then the Thunderforge architecture so the canonical topology is in mind before any specific step; then the agentic JPP overlay step-by-step; then governance because trust questions come *after* you've seen the system, not before; then the agentic capstone. Sequence: E1 → E2 → E3 → E4 → A8 → E5 → E7 → E6 → F3 → F4 → F5 → F6 → F2 → F8 → F9 → F1 → F7 → F10 → G1 → G3 → G4 → G5 → G8 → H2 → H4.

**Trail 3 — Operational art deep dive (≈15 notes, weeks three through four, optional).** For TPMs who want to be able to argue with senior planners on substance, not just process. Sequence: C1 → C2 → C3 → C4 → C5 → C6 → C9 → C7 → C8 → C10 → C11 → C12 → C13 → C14 → H3.

The landing page (`app/page.tsx`) presents these three trails as cards; below them, a smaller "Browse the full graph" link drops into the alphabetical note registry plus the graph view. **Don't put the graph view above the trails.** Power users will find it; newcomers need shepherding.

---

## 6. Visual design language

**Typography.** Inter Variable for body (Google Fonts, self-hosted via `next/font/google` for offline use), Space Grotesk for headings (gives a subtle techno-modern edge without going twee), JetBrains Mono for code and doctrinal identifiers ("JP 5-0," "OPORD 25-08," "CCIR"), and Newsreader as an optional serif accent for Tufte-style sidenotes and pull-quotes. Body size 18px, line-height 1.65, measure 65ch — built for sustained reading. Headings use weight contrast (h1 700, h2 600, h3 500) rather than size escalation; size escalation looks corporate-deck.

**Color palette.** A restrained four-color system in light and dark. Light mode: bg `hsl(220 15% 98%)` (warm off-white, not stark), fg `hsl(220 25% 12%)`, fg-muted `hsl(220 10% 40%)`, border `hsl(220 15% 88%)`. Dark mode: bg `hsl(220 25% 7%)` (deep navy-black, not pure black — pure black is harsher on OLED but feels cheap; this reads "command-center monitor at 2am"), fg `hsl(220 15% 92%)`. One single signal accent: amber `hsl(28 95% 50%)` — used for the Agentic Lens overlay tint, current-step indicator in I-2, active gate diamonds, and hover states. One doctrine accent: deep navy `hsl(220 60% 35%)` — used only for doctrine Callouts and JP 5-0 quote blocks. One inference accent: muted purple `hsl(265 30% 55%)` — used to mark Cluster F notes and any claim inferred from public sources rather than the white paper. One danger: `hsl(0 70% 45%)` — used sparingly for adversary depictions, threat callouts, and human-decision-required gates.

The discipline is that **color is information**. Every hue in the palette has a single semantic role. If a reader sees amber, the Agentic Lens is engaged. If a reader sees purple, an inference flag is in effect. This is the opposite of decorative color schemes.

**Iconography.** Lucide React (already installed by shadcn). Use sparingly; never decoratively. Specific assignments: a small chip with a tool icon (database, simulator, search, doctrine RAG) on every agent in I-1 form; a diamond + person icon for human gates; a stack icon in the top bar that previews the current stack; a lens icon for the Agentic Lens toggle.

**Defense-feel without crossing into bad taste.** Three rules.

First, no chevrons, no skull stencils, no camouflage textures, no all-caps headings, no military-vehicle silhouettes, no "operator-aesthetic" tropes. These signal larping, not seriousness. The reference is not a recruiting brochure — it is a Pentagon staff brief crossed with Stripe docs. Restrained, dense, typographically careful.

Second, the canonical reference image: a SOCOM commander's brief in a dark JOC at 0235Z — but rendered as a website, not a Photoshop overlay. Deep navy backgrounds, white-amber text accents, monospace identifiers, sparse use of red for adversary depictions, generous whitespace. Make it look like a system the warfighters actually want to use.

Third, no fake classification banners and no fake CUI markings. They cross from "feel" into "wrong" — and a Thunderforge TPM seeing them on an unclassified GitHub Pages site would (rightly) flag them. The closest acceptable nod: a subtle top-bar tag reading "UNCLASSIFIED // FOR PUBLIC USE" — but only if it is true. Default: skip it.

**Accessibility (Section 508 + WCAG 2.2 AA).** Respect `prefers-reduced-motion` on every animation including I-7's watch-it-run mode (provide a static fallback that shows the same message flow as a numbered list). All hover interactions must also be keyboard-reachable (Tab to focus, Enter to expand). All visuals must have alt text — especially the agent architecture diagrams. Color is never the sole carrier of information (every amber accent is also bolded or iconified). Stacked-column horizontal scroll must be keyboard-navigable (Arrow keys move focus between columns; this is non-obvious and must be explicitly implemented). Contrast ratios verified at 4.5:1 for body text, 3:1 for large text and UI components. Skip-to-content link in the top bar. Cmd-K palette as a global keyboard-only navigation backstop.

---

## 7. The Agentic Lens: one global toggle, inline annotations

**Recommendation: a global Agentic Lens toggle that adds inline amber-tinted annotations to every doctrinal note, plus opens up Cluster F notes as a parallel-reachable layer.** Not a separate site, not a parallel track, not a tab.

Three options were considered. A separate parallel track (two side-by-side reading panes for doctrine and agentic) doubles cognitive load and breaks the stacked-notes UX. A tabbed interface per note (tab 1 = doctrine, tab 2 = agentic) hides the delta — the whole pedagogical claim is that the *change* matters, and tabs visually segregate rather than juxtapose. Inline annotations win because they make the delta literal: the doctrinal claim and the agentic claim share a screen, share a sentence neighborhood, share the reader's working memory.

Concrete behavior. The lens toggle lives in the top bar, persists via `localStorage`, and reflects in the URL (`?lens=on`) so a link can deep-share a lens-engaged view. When on: (1) Cluster F notes become reachable via inline `NoteLink`s embedded in their doctrinal counterparts ("[↯ how this changes under Thunderforge](agentic-jpp/mission-analysis-agentic)"); (2) every doctrinal note tagged with `agenticOverlay` in frontmatter renders a small amber sidebar at the relevant paragraph showing one sentence from the corresponding F-cluster note plus a click-through; (3) the JPP ring (I-2) tints by Scale-coverage depth; (4) capstone H2 (the agentic JPP run) becomes accessible from the landing page. When off: the artifact reads as a high-quality doctrine teaching site with no AI overlay — useful for officers who want to study doctrine without Scale framing.

The key discipline: every agentic claim that *isn't* in the white paper is rendered in the purple inference accent, not the amber Scale accent. F1, F2, and F10's agent-mappings are explicitly marked. Inferences are honest; the artifact's credibility depends on this rigor.

---

## 8. Phase 1 build plan

**Phase 1 — Foundation and one full vertical (≈3 weekends; this is the minimum viable artifact that is still genuinely useful).** Goal: ship a working stacked-notes site with one complete cluster end-to-end, one capstone, the Agentic Lens infrastructure, and one flagship interactive. A new TPM can read it on day one of their job and learn something durable.

Ship: project scaffolded with the §4 stack and starter commands; `mdx-components.tsx` wired; primitives P-1 (Callout) and P-3 (AcronymTooltip) live; stacked-notes shell working with URL state and mobile collapse; build-time link graph and backlinks panel; Pagefind search behind a Cmd-K palette; GitHub Actions deploying to GitHub Pages; the Cluster A foundation notes (all 8); the Cluster B JPP overview notes (B1, B2, B5, B6, B9, B10, B11 — the seven-step backbone); the Agentic Lens toggle plumbing; Cluster F notes F3 and F4 (the white paper's marquee claims); component I-2 (JPP ring); component I-7 in static-only mode (no watch-it-run yet); capstone H1 (mini-JPP run, scaffolded, no agentic mode); glossary with hover-tooltips wired but only the 20 most-essential terms populated.

**Phase 2 — Operational design and the full agentic overlay (≈3 more weekends).** Goal: every concept a TPM will hear in their first month is in the Atlas.

Add: Cluster C complete; Cluster D complete; Cluster E complete; Cluster F complete; primitives P-2 (Sidenote), P-4 (PredictThenReveal), P-5 (RetrievalCard); components I-1, I-3, I-4, I-6; I-7's watch-it-run mode with timeline scrubber and message animation; component I-8 (three-layer trace viewer); the remaining 7 Cluster B deep-dive notes; the rest of the glossary.

**Phase 3 — Capstones, governance, and polish (≈2 more weekends).** Goal: the Atlas reaches the quality bar of "would not be embarrassing if Alexandr Wang linked to it."

Add: Cluster G complete; Cluster H capstones H2, H3, H4; components I-5, I-9, I-10, I-11; spaced-repetition scheduler activated (re-surfacing retrieval prompts via localStorage); self-placement quiz on landing page with novice/semi-expert flag wired through every scaffolded note; full keyboard navigation pass; reduced-motion fallbacks for every animation; alt text audit; Lighthouse pass for performance and accessibility; one round of red-team review by an actual O-4 or O-5 (or your USAFA colleagues) on doctrinal accuracy.

**Phase 4 — Stretch (only if Phases 1–3 are clearly landing).** A graph view at `/graph` using `react-force-graph`. An ORSA-style "scenario authoring" mode for fellow TPMs to add their own vignettes. A "compare two doctrinal versions" overlay (e.g., 2020 JP 5-0 vs. 2017 JP 5-0). A printable one-page "doctrine cheat sheet" auto-generated from the glossary.

Ship Phase 1 in three weekends and the rest will follow. The artifact's value compounds with content density — each new note is more valuable than the last because it makes more cross-links possible. Get to fifteen notes and a working stacked-notes shell, and the Atlas already does something no PDF can.

---

## Conclusion: what changes once this exists

The Thunderforge Doctrine Atlas is not a documentation site. It is a **shared mental scaffold** for a new team that has to hold both halves of an unusual problem in working memory simultaneously: a 200-page doctrinal corpus and a still-forming pattern language for multi-agent military planning. Existing alternatives — the JP 5-0 PDF, war-college lectures, the Scale white paper, Anthropic's *Building Effective Agents* essay — each teach one half. None teaches the bridge. The bridge is the whole job.

The deeper bet is that **stacked notes are the right UI for doctrine, and illustrated explainers are the right prose style for doctrine + AI**, and no one has combined them yet. The hybrid is what Matuschak's site would look like if Jay Alammar wrote every note, Distill built every widget, and Nicky Case designed every worked example — applied to a corpus that genuinely rewards the treatment because doctrine is a graph and AI is a pattern language. The first three weekends of Phase 1 produce something a new Thunderforge TPM can use the day they walk in. Everything after compounds.

Build the stacked-notes shell first. Write A1. The rest follows.