import type { AtlasNote, Trail } from "@/lib/atlas-types";

export const sourceLedger = {
  doctrine:
    "JP 5-0, Joint Planning, 1 Dec 2020. Local source: docs/source/jp5_0.pdf.",
  scale:
    "Scale AI, The Agentic Revolution in War, Jan 2026, and Scale Thunderforge blog. Local source: docs/source/Scale Agentic Warfare.pdf.",
  inference:
    "Public-source bridge from JP 5-0 plus Scale's public material; marked so readers can distinguish product inference from published claims.",
  scenario:
    "Teaching vignette for unclassified learning. Not an operational plan or real target set.",
} as const;

export const trails: Trail[] = [
  {
    id: "default",
    title: "The Spine",
    description:
      "Doctrine, JPP workflow, the agentic overlay, governance, and one practice run.",
    startSlug: "start-here",
  },
];

const doctrine = (label: string, ref: string, quote?: string) => ({ kind: "doctrine" as const, label, ref, quote });
const scale = (label: string, ref: string, quote?: string) => ({ kind: "scale" as const, label, ref, quote });
const inference = (label: string, ref: string, quote?: string) => ({ kind: "inference" as const, label, ref, quote });
const scenario = (label: string, ref: string, quote?: string) => ({ kind: "scenario" as const, label, ref, quote });

export const notes: AtlasNote[] = [
  {
    title: "Start Here",
    slug: "start-here",
    cluster: "foundations",
    summary:
      "Turn the JPP 5-0 and Scale's Thunderforge into a navigable mental model.",
    sourceClaims: [
      doctrine("JP 5-0 is the keystone joint planning publication.", "JP 5-0 Preface", "identifying military ways and means (with associated risk)"),
      scale("Thunderforge is publicly described as AI-enabled command, control, and planning.", "Scale white paper p. 25; Scale blog", "integrates AI agents into operational and theater-level planning"),
    ],
    agenticOverlay: "thunderforge-agentic-planning",
    tags: ["orientation", "public-safe", "thunderforge"],
    trailOrder: 1,
  },
  {
    title: "Ways, Means, Ends",
    slug: "joint-planning-purpose",
    cluster: "foundations",
    summary:
      "JP 5-0 frames planning as matching military ways and means, with risk, to national objectives.",
    sourceClaims: [
      doctrine("Joint planning identifies military ways and means with associated risk.", "JP 5-0 Preface", "Joint planning is the process of identifying military ways and means"),
    ],
    tags: ["ends", "ways", "means", "risk"],
    trailOrder: 2,
  },
  {
    title: "Ends, Ways, Means, and Risk Are the Planning Trade Space",
    slug: "ends-ways-means-risk",
    cluster: "foundations",
    summary:
      "Changing one planning lever changes the others; this is the first mental model to keep live.",
    sourceClaims: [
      doctrine("JP 5-0 links objectives, military ways and means, and associated risk.", "JP 5-0 Preface and Ch. I"),
      scenario("Slider values are instructional, not operational analysis.", "Fictional learning model"),
    ],
    tags: ["risk", "tradeoffs", "strategy"],
    trailOrder: 3,
  },
  {
    title: "Agentic Planning Is Decision Advantage",
    slug: "agentic-not-chatbot",
    cluster: "foundations",
    summary:
      "Scale's public thesis is deterrence by decision advantage; Thunderforge focuses on COA development and wargaming, not warning orders.",
    sourceClaims: [
      scale("Scale frames Agentic Warfare as deterrence by decision advantage.", "Scale white paper pp. 4-8", "Agentic Warfare is deterrence by decision advantage"),
      scale("The white paper explicitly says Thunderforge is not focused on faster planning paperwork.", "Scale white paper p. 25", "not focused on using AI to enable the quicker completion of the paperwork of planning"),
    ],
    agenticOverlay: "thunderforge-agentic-planning",
    tags: ["agents", "decision-advantage", "ooda", "coa"],
    trailOrder: 4,
  },
  {
    title: "Seven Steps of the JPP",
    slug: "jpp-seven-steps",
    cluster: "jpp",
    summary:
      "JP 5-0 names seven steps inside the larger APEX enterprise; the steps can run concurrently, iteratively, or be modified.",
    sourceClaims: [
      doctrine("JPP steps can be simultaneous, iterative, truncated, or modified.", "JP 5-0 III-10 to III-12", "The JPP is an orderly, analytical set of logical steps"),
      doctrine("JP 5-0 places JPP inside adaptive planning (APEX) and JPEC coordination.", "JP 5-0 Ch. II-III"),
    ],
    tags: ["jpp", "seven-steps", "apex", "iteration"],
    trailOrder: 5,
  },
  {
    title: "Planning Initiation",
    slug: "planning-initiation",
    cluster: "jpp",
    summary:
      "The first step translates direction, time available, assumptions, and initial guidance into planning momentum.",
    jppStep: 1,
    sourceClaims: [
      doctrine("Planning begins when appropriate authority recognizes potential military employment.", "JP 5-0 III-11", "Joint planning begins when an appropriate authority recognizes potential"),
    ],
    agenticOverlay: "thunderforge-agentic-planning",
    tags: ["step-1", "guidance"],
    trailOrder: 6,
  },
  {
    title: "Mission Analysis",
    slug: "mission-analysis",
    cluster: "jpp",
    summary:
      "Mission analysis restates the mission, identifies tasks, COGs, CCIRs, limitations, and evaluation criteria.",
    jppStep: 2,
    sourceClaims: [
      doctrine("Mission analysis produces tasks, COGs, estimates, mission statement, intent, guidance, and CCIRs.", "JP 5-0 III-13 to III-15", "who, what, when, where, and why"),
    ],
    agenticOverlay: "agentic-mission-analysis",
    tags: ["step-2", "tasks", "ccir", "mission"],
    trailOrder: 7,
  },
  {
    title: "COA Development",
    slug: "coa-development",
    cluster: "jpp",
    summary:
      "COA development turns mission analysis into broad, testable concepts with narrative, sketch, risks, and required capabilities.",
    jppStep: 3,
    sourceClaims: [
      doctrine("COAs describe what is to be done and undergo validity testing, modeling, simulation, wargaming, and comparison.", "JP 5-0 III-33", "COAs are subsets of options"),
      scale("Thunderforge focuses on higher-level tasks like COA development.", "Scale white paper p. 25", "higher level tasks"),
    ],
    agenticOverlay: "agentic-coa-development",
    tags: ["step-3", "coa", "concept"],
    trailOrder: 8,
  },
  {
    title: "Stress the Plan",
    slug: "coa-analysis-wargaming",
    cluster: "jpp",
    summary:
      "Wargaming is action, reaction, and counteraction against likely and dangerous enemy COAs.",
    jppStep: 4,
    sourceClaims: [
      doctrine("JP 5-0 calls wargaming an iterative action-reaction-counteraction process.", "JP 5-0 III-48", "Planners avoid becoming emotionally attached to a friendly COA"),
      scale("Scale frames this as a high-leverage simulation and planning-multiverse use case.", "Scale white paper pp. 29-32", "running thousands or even hundreds of thousands of permutations"),
    ],
    agenticOverlay: "planning-multiverse",
    tags: ["step-4", "wargaming", "simulation"],
    trailOrder: 9,
  },
  {
    title: "COA Comparison Criteria",
    slug: "coa-comparison",
    cluster: "jpp",
    summary:
      "The discipline is defining evaluation criteria before comparison so the result informs the commander rather than rationalizing a favorite.",
    jppStep: 5,
    sourceClaims: [
      doctrine("JP 5-0 directs standard definitions before commencing COA comparison.", "JP 5-0 III-58", "should not be turned into a strictly mathematical process"),
    ],
    agenticOverlay: "agentic-coa-comparison",
    tags: ["step-5", "criteria", "bias"],
    trailOrder: 10,
  },
  {
    title: "COA Approval",
    slug: "coa-approval",
    cluster: "jpp",
    summary:
      "The staff recommends; the commander approves, modifies, selects, or rejects.",
    jppStep: 6,
    sourceClaims: [
      doctrine("COA approval combines staff recommendation with the JFC's personal analysis, experience, and judgment.", "JP 5-0 III-58 to III-60", "combines personal analysis with the staff recommendation"),
      scale("Scale argues humans set intent, apply judgment, and own risk.", "Scale white paper pp. 7-8", "humans set intent, apply judgment, and own the risk"),
    ],
    agenticOverlay: "human-on-the-loop",
    tags: ["step-6", "commander", "approval"],
    trailOrder: 11,
  },
  {
    title: "COA into Order",
    slug: "plan-order-development",
    cluster: "jpp",
    summary:
      "Step 7 converts the selected COA into a plan or order with enough direction for subordinate execution; living-plan self-healing is a future direction, not a present capability.",
    jppStep: 7,
    sourceClaims: [
      doctrine("The JPP culminates in producing a plan or order.", "JP 5-0 III-10 and III-65"),
      scale("The Scale white paper marks self-healing living plans as future, not yet a capability.", "Scale white paper p. 33", "Though not yet a capability"),
    ],
    tags: ["step-7", "orders", "opord", "living-plans"],
    trailOrder: 12,
  },
  {
    title: "Operational Design",
    slug: "operational-design",
    cluster: "design",
    summary:
      "Operational design helps commanders understand the environment, define the problem, and develop an operational approach.",
    sourceClaims: [
      doctrine("Operational design develops understanding of the OE, problem, and operational approach.", "JP 5-0 Ch. IV"),
    ],
    agenticOverlay: "planning-multiverse",
    tags: ["operational-design", "problem-framing"],
    trailOrder: 13,
  },
  {
    title: "COG Analysis",
    slug: "center-of-gravity-analysis",
    cluster: "design",
    summary:
      "Center of gravity analysis links COGs to critical capabilities, requirements, vulnerabilities, effects, objectives, and tasks.",
    sourceClaims: [
      doctrine("JP 5-0 defines critical capabilities, requirements, and vulnerabilities in COG analysis.", "JP 5-0 IV-25"),
    ],
    tags: ["cog", "cc", "cr", "cv"],
    trailOrder: 14,
  },
  {
    title: "End State and Objective",
    slug: "end-state-objective-effect-task",
    cluster: "design",
    summary:
      "Planning gets clearer when the desired condition, goal, caused change, and assigned action are separated.",
    sourceClaims: [
      doctrine("JP 5-0 links end states, objectives, effects, and tasks in operational design and assessment.", "JP 5-0 IV-27 and App. K"),
    ],
    tags: ["end-state", "objective", "effect", "task"],
    trailOrder: 15,
  },
  {
    title: "Lines of Operation vs Lines of Effort",
    slug: "lines-operation-effort",
    cluster: "design",
    summary:
      "LOOs connect decisive points in geography; LOEs connect tasks and missions by purpose and cause-effect logic.",
    sourceClaims: [
      doctrine("JP 5-0 describes LOEs as linking tasks and missions by purpose; sample LOOs show decisive points.", "JP 5-0 IV-30 to IV-31"),
    ],
    tags: ["loo", "loe", "decisive-points"],
    trailOrder: 16,
  },
  {
    title: "Theater-Level Planning",
    slug: "thunderforge-agentic-planning",
    cluster: "agentic",
    summary:
      "Thunderforge integrates AI agents into operational and theater-level planning; engineers should read JPP as the interface contract that names the objects the system has to preserve.",
    sourceClaims: [
      scale("Thunderforge integrates AI agents into operational and theater-level planning.", "Scale white paper p. 25", "integrates AI agents into operational and theater-level planning"),
      inference("Atlas architecture diagrams are public-source teaching abstractions, not internal system design.", "Public-source inference"),
    ],
    tags: ["thunderforge", "agentic-planning", "coa", "architecture"],
    trailOrder: 17,
  },
  {
    title: "Steps 3 and 4",
    slug: "agentic-jpp-overview",
    cluster: "agentic",
    summary:
      "The public Scale framing puts agent leverage on COA development and wargaming; steps 1, 2, 5, 6, 7 receive lighter assistance.",
    sourceClaims: [
      scale("Scale specifies COA development and wargaming as the agentic high-leverage zone.", "Scale white paper p. 25", "higher level tasks"),
      inference("Per-step bridge framing is a teaching abstraction over JP 5-0 plus public Scale material.", "Public-source inference"),
    ],
    tags: ["bridge", "jpp", "thunderforge", "lens"],
    trailOrder: 18,
  },
  {
    title: "Agentic Mission Analysis",
    slug: "agentic-mission-analysis",
    cluster: "agentic",
    summary:
      "Under an agent layer, candidate tasks, CCIRs, and COGs arrive pre-classified with provenance; the staff still owns the mission statement and intent.",
    jppStep: 2,
    sourceClaims: [
      doctrine("Mission analysis produces tasks, COGs, mission statement, intent, and CCIRs.", "JP 5-0 III-20 to III-30"),
      scale("Thunderforge integrates AI agents into operational and theater-level planning.", "Scale white paper p. 25", "integrates AI agents into operational and theater-level planning"),
      inference("Agent task pre-classification and CCIR drafting are public-source inferences from Scale framing.", "Public-source inference"),
    ],
    tags: ["bridge", "step-2", "ccir", "tasks"],
    trailOrder: 19,
  },
  {
    title: "Agentic COA Development",
    slug: "agentic-coa-development",
    cluster: "agentic",
    summary:
      "Agents generate candidate COAs in parallel, each with simulator-backed evidence and confidence bands; distinguishability is still the staff's call.",
    jppStep: 3,
    sourceClaims: [
      doctrine("JP 5-0 expects COAs to be distinguishable, with narrative, capabilities, timelines, and risks.", "JP 5-0 III-33 to III-38"),
      scale("Thunderforge couples AI agents with physics-based modeling and simulation for COA generation.", "Scale white paper p. 25", "AI agents with automated, physics-based modeling and simulation tools"),
    ],
    tags: ["bridge", "step-3", "coa", "simulation"],
    trailOrder: 20,
  },
  {
    title: "Agentic Planning",
    slug: "planning-multiverse",
    cluster: "agentic",
    summary:
      "Scale describes agentic planning as multiverse exploration over simulator-backed scenario permutations.",
    sourceClaims: [
      scale("Agentic Planning systems can generate planning multiverses over many permutations.", "Scale white paper pp. 29-32", "strategic, operational, and tactical planning \"multiverses\""),
      scale("Scale describes natural-language UI, agent layer, and simulation layer, including SAFE-SiM as one tool.", "Scale white paper pp. 30-31", "automate calls to simulators through a natural language interface"),
    ],
    tags: ["simulation", "multiverse", "wargaming", "step-4", "safe-sim"],
    trailOrder: 21,
  },
  {
    title: "Agentic COA Comparison",
    slug: "agentic-coa-comparison",
    cluster: "agentic",
    summary:
      "Agent-assisted scoring needs criteria committed first; the system can make that discipline architectural rather than aspirational.",
    jppStep: 5,
    sourceClaims: [
      doctrine("COA comparison is subjective and should not be turned into a strictly mathematical process.", "JP 5-0 III-58", "should not be turned into a strictly mathematical process"),
      scale("Scale frames the system as surfacing evidence and likely-success options, with humans owning judgment.", "Scale white paper pp. 7-8", "humans set intent, apply judgment, and own the risk"),
      inference("Criteria-lock-before-scoring as an architectural constraint is a teaching inference.", "Public-source inference"),
    ],
    tags: ["bridge", "step-5", "criteria", "bias"],
    trailOrder: 22,
  },
  {
    title: "Human-on-the-Loop",
    slug: "human-on-the-loop",
    cluster: "governance",
    summary:
      "The human role shifts upward: commanders set intent, supervise, apply judgment, and own risk.",
    sourceClaims: [
      scale("Scale distinguishes in-the-loop bottlenecks from on-the-loop mission direction.", "Scale white paper pp. 7-8", "mission directors who provide oversight"),
    ],
    tags: ["human-control", "approval-gates", "risk"],
    trailOrder: 23,
  },
  {
    title: "Test and Evaluation",
    slug: "te-justifiable-confidence",
    cluster: "governance",
    summary:
      "Agentic systems require evaluation across knowledge base, models, agent harnesses, and monitoring/oversight.",
    sourceClaims: [
      scale("Scale identifies four T&E layers and lifecycle red teaming for agentic systems.", "Scale white paper pp. 44-46", "justifiable confidence"),
    ],
    tags: ["evaluation", "te", "confidence"],
    trailOrder: 24,
  },
  {
    title: "Mini-JPP Run",
    slug: "mini-jpp-capstone",
    cluster: "capstone",
    summary:
      "A fictional scenario walks through the seven JPP steps end to end.",
    sourceClaims: [
      doctrine("The capstone follows JP 5-0's seven-step JPP structure.", "JP 5-0 III-10 to III-12"),
      scenario("Scenario details are fictional and built for learning.", "Fictional learning model"),
    ],
    tags: ["capstone", "practice", "fictional"],
    trailOrder: 25,
  },
];

export const noteMap = new Map(notes.map((note) => [note.slug, note]));

export function getNote(slug: string) {
  return noteMap.get(slug);
}

export function getTrailNotes() {
  return [...notes].sort((a, b) => (a.trailOrder ?? 999) - (b.trailOrder ?? 999));
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
