import type { AtlasNote, Trail } from "@/lib/atlas-types";

export const sourceLedger = {
  doctrine:
    "JP 5-0, Joint Planning, 1 Dec 2020. Local source: docs/source/jp5_0.pdf.",
  scale:
    "Scale AI, The Agentic Revolution in War, Jan 2026, and Scale Thunderforge blog. Local source: docs/source/Scale Agentic Warfare.pdf.",
  inference:
    "Public-source bridge from JP 5-0 plus Scale's public material; marked so readers can distinguish product inference from published claims.",
  scenario:
    "Fictional teaching vignette for unclassified learning. Not an operational plan or real target set.",
} as const;

export const trails: Trail[] = [
  {
    id: "tpm",
    title: "TPM Trail",
    description:
      "Doctrine fluency, JPP workflow, commander touchpoints, and the agentic delta.",
    startSlug: "start-here",
    audience: "tpm",
  },
  {
    id: "engineer",
    title: "Engineer Trail",
    description:
      "Agent topology, simulator interfaces, traces, evaluation, and approval gates.",
    startSlug: "engineer-architecture",
    audience: "engineer",
  },
];

const doctrine = (label: string, ref: string, quote?: string) => ({ kind: "doctrine" as const, label, ref, quote });
const scale = (label: string, ref: string, quote?: string) => ({ kind: "scale" as const, label, ref, quote });
const inference = (label: string, ref: string, quote?: string) => ({ kind: "inference" as const, label, ref, quote });
const scenario = (label: string, ref: string, quote?: string) => ({ kind: "scenario" as const, label, ref, quote });

export const notes: AtlasNote[] = [
  {
    title: "Start with the Bridge, Not the Binder",
    slug: "start-here",
    cluster: "foundations",
    summary:
      "The Atlas turns JP 5-0 and Scale's public Thunderforge framing into a navigable mental model.",
    audience: "both",
    sourceClaims: [
      doctrine("JP 5-0 is the keystone joint planning publication.", "JP 5-0 Preface", "identifying military ways and means (with associated risk)"),
      scale("Thunderforge is publicly described as AI-enabled command, control, and planning.", "Scale white paper p. 25; Scale blog", "integrates AI agents into operational and theater-level planning"),
    ],
    agenticOverlay: "thunderforge-agentic-planning",
    tags: ["orientation", "public-safe", "thunderforge"],
    trailOrder: { tpm: 1, engineer: 2 },
  },
  {
    title: "Joint Planning Translates Strategy into Options",
    slug: "joint-planning-purpose",
    cluster: "foundations",
    summary:
      "JP 5-0 frames joint planning as matching military ways and means, with risk, to national objectives.",
    audience: "both",
    sourceClaims: [
      doctrine("Joint planning identifies military ways and means with associated risk.", "JP 5-0 Preface", "Joint planning is the process of identifying military ways and means"),
    ],
    tags: ["ends", "ways", "means", "risk"],
    trailOrder: { tpm: 2 },
  },
  {
    title: "Ends, Ways, Means, and Risk Are the Planning Trade Space",
    slug: "ends-ways-means-risk",
    cluster: "foundations",
    summary:
      "Changing one planning lever changes the others; this is the first mental model to keep live.",
    audience: "both",
    sourceClaims: [
      doctrine("JP 5-0 links objectives, military ways and means, and associated risk.", "JP 5-0 Preface and Ch. I"),
      scenario("Slider values are instructional, not operational analysis.", "Fictional learning model"),
    ],
    tags: ["risk", "tradeoffs", "strategy"],
    trailOrder: { tpm: 3 },
  },
  {
    title: "APEX Is the Enterprise; JPP Is the Engine",
    slug: "apex-jpp-engine",
    cluster: "foundations",
    summary:
      "Adaptive planning is the larger enterprise; JPP is the repeatable analytical process inside it.",
    audience: "tpm",
    sourceClaims: [
      doctrine("JP 5-0 places JPP inside adaptive planning and JPEC coordination.", "JP 5-0 Ch. II-III"),
    ],
    tags: ["apex", "jpec", "process"],
    trailOrder: { tpm: 4 },
  },
  {
    title: "Decision Advantage Is the Point of the Agentic Overlay",
    slug: "decision-advantage",
    cluster: "foundations",
    summary:
      "Scale's public argument is that agentic systems create advantage by compressing command decision cycles.",
    audience: "both",
    sourceClaims: [
      scale("Scale frames Agentic Warfare as deterrence by decision advantage.", "Scale white paper pp. 4-8", "Agentic Warfare is deterrence by decision advantage"),
    ],
    agenticOverlay: "planning-multiverse",
    tags: ["decision-advantage", "ooda", "scale"],
    trailOrder: { tpm: 5, engineer: 3 },
  },
  {
    title: "Agentic Planning Is Not Chatbot-Accelerated Paperwork",
    slug: "agentic-not-chatbot",
    cluster: "foundations",
    summary:
      "The public Thunderforge claim focuses on higher-level planning tasks like COA development and wargaming.",
    audience: "both",
    sourceClaims: [
      scale("The white paper explicitly says Thunderforge is not focused on faster planning paperwork.", "Scale white paper p. 25", "not focused on using AI to enable the quicker completion of the paperwork of planning"),
    ],
    agenticOverlay: "thunderforge-agentic-planning",
    tags: ["agents", "paperwork", "coa"],
    trailOrder: { tpm: 6, engineer: 4 },
  },
  {
    title: "The JPP Has Seven Steps, but It Is Not Waterfall",
    slug: "jpp-seven-steps",
    cluster: "jpp",
    summary:
      "JP 5-0 names seven steps and emphasizes that they can run concurrently, iteratively, or be modified.",
    audience: "both",
    sourceClaims: [
      doctrine("JPP steps can be simultaneous, iterative, truncated, or modified.", "JP 5-0 III-10 to III-12", "The JPP is an orderly, analytical set of logical steps"),
    ],
    tags: ["jpp", "seven-steps", "iteration"],
    trailOrder: { tpm: 7 },
  },
  {
    title: "Planning Initiation Starts When Authority Recognizes a Need",
    slug: "planning-initiation",
    cluster: "jpp",
    summary:
      "The first step translates direction, time available, assumptions, and initial guidance into planning momentum.",
    audience: "tpm",
    jppStep: 1,
    sourceClaims: [
      doctrine("Planning begins when appropriate authority recognizes potential military employment.", "JP 5-0 III-11", "Joint planning begins when an appropriate authority recognizes potential"),
    ],
    agenticOverlay: "thunderforge-agentic-planning",
    tags: ["step-1", "guidance"],
    trailOrder: { tpm: 8 },
  },
  {
    title: "Mission Analysis Is Where Errors Start Cascading",
    slug: "mission-analysis",
    cluster: "jpp",
    summary:
      "Mission analysis restates the mission, identifies tasks, COGs, CCIRs, limitations, and evaluation criteria.",
    audience: "both",
    jppStep: 2,
    sourceClaims: [
      doctrine("Mission analysis produces tasks, COGs, estimates, mission statement, intent, guidance, and CCIRs.", "JP 5-0 III-13 to III-15", "who, what, when, where, and why"),
    ],
    agenticOverlay: "agentic-mission-analysis",
    tags: ["step-2", "tasks", "ccir", "mission"],
    trailOrder: { tpm: 9, engineer: 8 },
  },
  {
    title: "COA Development Creates Distinguishable Options",
    slug: "coa-development",
    cluster: "jpp",
    summary:
      "COA development turns mission analysis into broad, testable concepts with narrative, sketch, risks, and required capabilities.",
    audience: "both",
    jppStep: 3,
    sourceClaims: [
      doctrine("COAs describe what is to be done and undergo validity testing, modeling, simulation, wargaming, and comparison.", "JP 5-0 III-33", "COAs are subsets of options"),
      scale("Thunderforge focuses on higher-level tasks like COA development.", "Scale white paper p. 25", "higher level tasks"),
    ],
    agenticOverlay: "agentic-coa-development",
    tags: ["step-3", "coa", "concept"],
    trailOrder: { tpm: 10, engineer: 9 },
  },
  {
    title: "COA Analysis and Wargaming Stress the Plan Before the Enemy Does",
    slug: "coa-analysis-wargaming",
    cluster: "jpp",
    summary:
      "Wargaming is action, reaction, and counteraction against likely and dangerous enemy COAs.",
    audience: "both",
    jppStep: 4,
    sourceClaims: [
      doctrine("JP 5-0 calls wargaming an iterative action-reaction-counteraction process.", "JP 5-0 III-48", "Planners avoid becoming emotionally attached to a friendly COA"),
      scale("Scale frames this as a high-leverage simulation and planning-multiverse use case.", "Scale white paper pp. 29-32", "running thousands or even hundreds of thousands of permutations"),
    ],
    agenticOverlay: "planning-multiverse",
    tags: ["step-4", "wargaming", "simulation"],
    trailOrder: { tpm: 11, engineer: 10 },
  },
  {
    title: "COA Comparison Needs Criteria Before Scoring",
    slug: "coa-comparison",
    cluster: "jpp",
    summary:
      "The discipline is defining evaluation criteria before comparison so the result informs the commander rather than rationalizing a favorite.",
    audience: "both",
    jppStep: 5,
    sourceClaims: [
      doctrine("JP 5-0 directs standard definitions before commencing COA comparison.", "JP 5-0 III-58", "should not be turned into a strictly mathematical process"),
    ],
    agenticOverlay: "agentic-coa-comparison",
    tags: ["step-5", "criteria", "bias"],
    trailOrder: { tpm: 12, engineer: 11 },
  },
  {
    title: "COA Approval Keeps the Commander in the Decision Seat",
    slug: "coa-approval",
    cluster: "jpp",
    summary:
      "The staff recommends; the commander approves, modifies, selects, or rejects.",
    audience: "both",
    jppStep: 6,
    sourceClaims: [
      doctrine("COA approval combines staff recommendation with the JFC's personal analysis, experience, and judgment.", "JP 5-0 III-58 to III-60", "combines personal analysis with the staff recommendation"),
      scale("Scale argues humans set intent, apply judgment, and own risk.", "Scale white paper pp. 7-8", "humans set intent, apply judgment, and own the risk"),
    ],
    agenticOverlay: "human-on-the-loop",
    tags: ["step-6", "commander", "approval"],
    trailOrder: { tpm: 13, engineer: 12 },
  },
  {
    title: "Plan or Order Development Turns a COA into Direction",
    slug: "plan-order-development",
    cluster: "jpp",
    summary:
      "Step 7 converts the selected COA into a plan or order with enough direction for subordinate execution.",
    audience: "tpm",
    jppStep: 7,
    sourceClaims: [
      doctrine("The JPP culminates in producing a plan or order.", "JP 5-0 III-10 and III-65"),
    ],
    agenticOverlay: "living-plans",
    tags: ["step-7", "orders", "opord"],
    trailOrder: { tpm: 14 },
  },
  {
    title: "Operational Design Frames the Problem Before Detailed Planning",
    slug: "operational-design",
    cluster: "design",
    summary:
      "Operational design helps commanders understand the environment, define the problem, and develop an operational approach.",
    audience: "both",
    sourceClaims: [
      doctrine("Operational design develops understanding of the OE, problem, and operational approach.", "JP 5-0 Ch. IV"),
    ],
    agenticOverlay: "simulator-layer-safe-sim",
    tags: ["operational-design", "problem-framing"],
    trailOrder: { tpm: 15 },
  },
  {
    title: "COG Analysis Decomposes Strength into Vulnerability",
    slug: "center-of-gravity-analysis",
    cluster: "design",
    summary:
      "Center of gravity analysis links COGs to critical capabilities, requirements, vulnerabilities, effects, objectives, and tasks.",
    audience: "both",
    sourceClaims: [
      doctrine("JP 5-0 defines critical capabilities, requirements, and vulnerabilities in COG analysis.", "JP 5-0 IV-25"),
    ],
    tags: ["cog", "cc", "cr", "cv"],
    trailOrder: { tpm: 16 },
  },
  {
    title: "End State, Objective, Effect, and Task Are Different Altitudes",
    slug: "end-state-objective-effect-task",
    cluster: "design",
    summary:
      "Planning gets clearer when the desired condition, goal, caused change, and assigned action are separated.",
    audience: "both",
    sourceClaims: [
      doctrine("JP 5-0 links end states, objectives, effects, and tasks in operational design and assessment.", "JP 5-0 IV-27 and App. K"),
    ],
    tags: ["end-state", "objective", "effect", "task"],
    trailOrder: { tpm: 17 },
  },
  {
    title: "Lines of Operation Are Spatial; Lines of Effort Are Logical",
    slug: "lines-operation-effort",
    cluster: "design",
    summary:
      "LOOs connect decisive points in geography; LOEs connect tasks and missions by purpose and cause-effect logic.",
    audience: "both",
    sourceClaims: [
      doctrine("JP 5-0 describes LOEs as linking tasks and missions by purpose; sample LOOs show decisive points.", "JP 5-0 IV-30 to IV-31"),
    ],
    tags: ["loo", "loe", "decisive-points"],
    trailOrder: { tpm: 18 },
  },
  {
    title: "Thunderforge Targets Operational and Theater-Level Planning",
    slug: "thunderforge-agentic-planning",
    cluster: "agentic",
    summary:
      "The public case study says Thunderforge integrates AI agents into operational and theater-level planning.",
    audience: "both",
    sourceClaims: [
      scale("Thunderforge integrates AI agents into operational and theater-level planning.", "Scale white paper p. 25", "integrates AI agents into operational and theater-level planning"),
      inference("Atlas architecture diagrams are public-source teaching abstractions, not internal system design.", "Public-source inference"),
    ],
    tags: ["thunderforge", "agentic-planning", "coa"],
    trailOrder: { tpm: 19, engineer: 5 },
  },
  {
    title: "The Planning Multiverse Makes Wargaming a Search Space",
    slug: "planning-multiverse",
    cluster: "agentic",
    summary:
      "Scale describes agentic planning as generating thousands or hundreds of thousands of scenario permutations.",
    audience: "both",
    sourceClaims: [
      scale("Agentic Planning systems can generate planning multiverses over many permutations.", "Scale white paper pp. 29-32", "strategic, operational, and tactical planning \"multiverses\""),
    ],
    tags: ["simulation", "multiverse", "wargaming"],
    trailOrder: { tpm: 20, engineer: 6 },
  },
  {
    title: "The Simulator Layer Is Where Agentic Planning Gets Empirical",
    slug: "simulator-layer-safe-sim",
    cluster: "agentic",
    summary:
      "The white paper describes a three-layer stack: natural language UI, agent layer, and simulation layer.",
    audience: "engineer",
    sourceClaims: [
      scale("Scale describes natural-language UI, agent layer, and simulation layer, including SAFE-SiM as one tool.", "Scale white paper pp. 30-31", "automate calls to simulators through a natural language interface"),
    ],
    tags: ["simulators", "safe-sim", "orsas"],
    trailOrder: { engineer: 7 },
  },
  {
    title: "Living Plans Are a Future Direction, Not a Present Claim",
    slug: "living-plans",
    cluster: "agentic",
    summary:
      "The white paper explicitly marks self-healing living plans as a future possibility.",
    audience: "both",
    sourceClaims: [
      scale("The living-plans section says this is not yet a capability.", "Scale white paper p. 33", "Though not yet a capability"),
    ],
    tags: ["living-plans", "future", "caveat"],
    trailOrder: { tpm: 21, engineer: 13 },
  },
  {
    title: "Human-on-the-Loop Means Oversight, Judgment, and Risk Ownership",
    slug: "human-on-the-loop",
    cluster: "governance",
    summary:
      "The human role shifts upward: commanders set intent, supervise, apply judgment, and own risk.",
    audience: "both",
    sourceClaims: [
      scale("Scale distinguishes in-the-loop bottlenecks from on-the-loop mission direction.", "Scale white paper pp. 7-8", "mission directors who provide oversight"),
    ],
    tags: ["human-control", "approval-gates", "risk"],
    trailOrder: { tpm: 22, engineer: 14 },
  },
  {
    title: "Justifiable Confidence Comes from T&E, Not Trust Theater",
    slug: "te-justifiable-confidence",
    cluster: "governance",
    summary:
      "Agentic systems require evaluation across knowledge base, models, agent harnesses, and monitoring/oversight.",
    audience: "both",
    sourceClaims: [
      scale("Scale identifies four T&E layers and lifecycle red teaming for agentic systems.", "Scale white paper pp. 44-46", "justifiable confidence"),
    ],
    tags: ["evaluation", "te", "confidence"],
    trailOrder: { tpm: 23, engineer: 15 },
  },
  {
    title: "Engineers Should Read JPP as an Interface Contract",
    slug: "engineer-architecture",
    cluster: "agentic",
    summary:
      "The technical work maps doctrine artifacts to agent responsibilities, simulator calls, traces, and approval gates.",
    audience: "engineer",
    sourceClaims: [
      inference("The architecture map is a teaching abstraction from public doctrine and Scale material.", "Public-source inference"),
    ],
    tags: ["architecture", "trace", "interfaces"],
    trailOrder: { engineer: 1 },
  },
  {
    title: "The Agentic Deltas Concentrate in Steps 3 and 4",
    slug: "agentic-jpp-overview",
    cluster: "agentic",
    summary:
      "The public Scale framing puts agent leverage on COA development and wargaming; steps 1, 2, 5, 6, 7 receive lighter assistance.",
    audience: "both",
    sourceClaims: [
      scale("Scale specifies COA development and wargaming as the agentic high-leverage zone.", "Scale white paper p. 25", "higher level tasks"),
      inference("Per-step bridge framing is a teaching abstraction over JP 5-0 plus public Scale material.", "Public-source inference"),
    ],
    tags: ["bridge", "jpp", "thunderforge", "lens"],
    trailOrder: { tpm: 19, engineer: 6 },
  },
  {
    title: "Agentic Mission Analysis: Propose, Don't Decide",
    slug: "agentic-mission-analysis",
    cluster: "agentic",
    summary:
      "Under an agent layer, candidate tasks, CCIRs, and COGs arrive pre-classified with provenance; the staff still owns the mission statement and intent.",
    audience: "both",
    jppStep: 2,
    sourceClaims: [
      doctrine("Mission analysis produces tasks, COGs, mission statement, intent, and CCIRs.", "JP 5-0 III-20 to III-30"),
      scale("Thunderforge integrates AI agents into operational and theater-level planning.", "Scale white paper p. 25", "integrates AI agents into operational and theater-level planning"),
      inference("Agent task pre-classification and CCIR drafting are public-source inferences from Scale framing.", "Public-source inference"),
    ],
    tags: ["bridge", "step-2", "ccir", "tasks"],
    trailOrder: { tpm: 19, engineer: 8 },
  },
  {
    title: "Agentic COA Development: Parallel Options with Evidence",
    slug: "agentic-coa-development",
    cluster: "agentic",
    summary:
      "Agents generate candidate COAs in parallel, each with simulator-backed evidence and confidence bands; distinguishability is still the staff's call.",
    audience: "both",
    jppStep: 3,
    sourceClaims: [
      doctrine("JP 5-0 expects COAs to be distinguishable, with narrative, capabilities, timelines, and risks.", "JP 5-0 III-33 to III-38"),
      scale("Thunderforge couples AI agents with physics-based modeling and simulation for COA generation.", "Scale white paper p. 25", "AI agents with automated, physics-based modeling and simulation tools"),
    ],
    tags: ["bridge", "step-3", "coa", "simulation"],
    trailOrder: { tpm: 20, engineer: 9 },
  },
  {
    title: "Agentic COA Comparison: Lock the Criteria, Then Score",
    slug: "agentic-coa-comparison",
    cluster: "agentic",
    summary:
      "Agent-assisted scoring needs criteria committed first; the system can make that discipline architectural rather than aspirational.",
    audience: "both",
    jppStep: 5,
    sourceClaims: [
      doctrine("COA comparison is subjective and should not be turned into a strictly mathematical process.", "JP 5-0 III-58", "should not be turned into a strictly mathematical process"),
      scale("Scale frames the system as surfacing evidence and likely-success options, with humans owning judgment.", "Scale white paper pp. 7-8", "humans set intent, apply judgment, and own the risk"),
      inference("Criteria-lock-before-scoring as an architectural constraint is a teaching inference.", "Public-source inference"),
    ],
    tags: ["bridge", "step-5", "criteria", "bias"],
    trailOrder: { tpm: 21, engineer: 11 },
  },
  {
    title: "Mini-JPP Run: Practice the Loop Once",
    slug: "mini-jpp-capstone",
    cluster: "capstone",
    summary:
      "A fictional scenario walks through the seven JPP steps with TPM and engineer side panels.",
    audience: "both",
    sourceClaims: [
      doctrine("The capstone follows JP 5-0's seven-step JPP structure.", "JP 5-0 III-10 to III-12"),
      scenario("Scenario details are fictional and built for learning.", "Fictional learning model"),
    ],
    tags: ["capstone", "practice", "fictional"],
    trailOrder: { tpm: 25, engineer: 17 },
  },
];

export const noteMap = new Map(notes.map((note) => [note.slug, note]));

export function getNote(slug: string) {
  return noteMap.get(slug);
}

export function getTrailNotes(trail: "tpm" | "engineer") {
  return notes
    .filter((note) => note.trailOrder[trail] !== undefined)
    .sort((a, b) => (a.trailOrder[trail] ?? 999) - (b.trailOrder[trail] ?? 999));
}

export function getRelatedNotes(note: AtlasNote) {
  const tagSet = new Set(note.tags);
  return notes
    .filter((candidate) => candidate.slug !== note.slug)
    .map((candidate) => ({
      note: candidate,
      score: candidate.tags.filter((tag) => tagSet.has(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.note.title.localeCompare(b.note.title))
    .slice(0, 4)
    .map((entry) => entry.note);
}

export const glossary = {
  APEX: "Adaptive Planning and Execution, the larger planning enterprise around JPP.",
  ASCOPE: "Civil-environment lens: areas, structures, capabilities, organizations, people, events.",
  CC: "Critical capability: a primary ability that makes a COG dangerous.",
  CCIR: "Commander's Critical Information Requirement.",
  COA: "Course of Action.",
  COG: "Center of Gravity: the source of power that provides moral or physical strength.",
  CONOPS: "Concept of Operations: a verbal or graphic description of the commander's intent.",
  CONPLAN: "An abbreviated plan that requires considerable expansion or alteration to be executed.",
  CR: "Critical requirement: a condition or resource a critical capability needs to function.",
  CV: "Critical vulnerability: a critical requirement that is open to attack or disruption.",
  DIME: "Instruments of national power: diplomatic, informational, military, economic.",
  EEFI: "Essential Elements of Friendly Information: what we must keep the adversary from learning.",
  "End state": "The set of conditions that, when achieved, accomplishes the mission.",
  FFIR: "Friendly Force Information Requirement: what the commander needs to know about our own forces.",
  FRAGORD: "Fragmentary order issued to change or modify an existing order.",
  GEF: "Guidance for Employment of the Force, the SecDef document driving CCMD planning.",
  GFMAP: "Global Force Management Allocation Plan, the annual force-deployment direction.",
  IPOE: "Intelligence Preparation of the Operational Environment.",
  JFC: "Joint Force Commander.",
  JPEC: "Joint Planning and Execution Community.",
  JPP: "Joint Planning Process.",
  JSCP: "Joint Strategic Campaign Plan, the CJCS-issued planning direction to CCMDs.",
  LOE: "Line of Effort: logical link of tasks and effects toward an objective.",
  LOO: "Line of Operation: spatial path through decisive points toward an objective.",
  MOE: "Measure of Effectiveness: change in system behavior that signals progress toward an objective.",
  MOP: "Measure of Performance: did the assigned task get done.",
  NDS: "National Defense Strategy.",
  NMS: "National Military Strategy.",
  NSS: "National Security Strategy.",
  OE: "Operational Environment: the conditions and actors that bear on a commander's decisions.",
  OODA: "Observe, Orient, Decide, Act: Boyd's decision loop.",
  OPLAN: "A complete and detailed joint plan ready for execution after refinement.",
  OPORD: "Operation Order: directive to coordinate the execution of an operation.",
  ORSA: "Operations Research/System Analyst.",
  PIR: "Priority Intelligence Requirement: what the commander needs to know about the adversary.",
  "PMESII-PT": "Operational-environment lens: political, military, economic, social, information, infrastructure, physical environment, time.",
  "SAFE-SiM": "DARPA Secure Advanced Framework and Environment for Simulation and Modeling.",
  "T&E": "Test and Evaluation across knowledge base, model, agent harness, and monitoring layers.",
  UCP: "Unified Command Plan, the President's document assigning geographic and functional responsibilities.",
  WARNORD: "Warning Order: preliminary notice of an order or action that is to follow.",
} as const;
