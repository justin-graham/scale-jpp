"use client";

import type { NoteBodyProps } from "@/lib/atlas-types";
import { ArchitectureDiagram } from "@/components/interactive/architecture-diagram";
import { CoaComparator } from "@/components/interactive/coa-comparator";
import { JppRing } from "@/components/interactive/jpp-ring";
import { MiniJppCapstone } from "@/components/interactive/mini-jpp-capstone";
import { TaskSorter } from "@/components/interactive/task-sorter";
import { TraceViewer } from "@/components/interactive/trace-viewer";
import { TradeSpace } from "@/components/interactive/trade-space";
import { AcronymTooltip } from "@/components/mdx/acronym-tooltip";
import { NoteLink } from "@/components/mdx/note-link";
import { PredictThenReveal } from "@/components/mdx/predict-then-reveal";
import { SourceCallout } from "@/components/mdx/source-callout";
import { SourceQuote } from "@/components/mdx/source-quote";

export function NoteBody({ note, lensOn, openNote }: NoteBodyProps) {
  const link = (slug: string, label: string) => (
    <NoteLink slug={slug} openNote={openNote}>
      {label}
    </NoteLink>
  );

  switch (note.slug) {
    case "start-here":
      return (
        <>
          <p>
            I built this to prepare working on Thunderforge: enough JP 5-0 to
            follow planning talk, enough Scale framing to understand
            why agentic planning matters, and enough engineering structure to reason
            about traces, simulators, and approval gates.
          </p>
          <p>
            JP 5-0 is treated as ground truth for doctrine, including phrases like{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 Preface">
              identifying military ways and means (with associated risk)
            </SourceQuote>
            . Scale material is treated as product thesis, such as Thunderforge
            being described as a platform that{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 25">
              integrates AI agents into operational and theater-level planning
            </SourceQuote>
            . Purple inference labels mark the bridge between them.
          </p>
          <p>
            Start with {link("joint-planning-purpose", "ways, means, and ends")}, then
            move through the {link("jpp-seven-steps", "seven steps of the JPP")}. The
            agentic overlay starts at {link("agentic-jpp-overview", "the bridge map")}.
          </p>
          <JppRing lensOn={lensOn} openStep={openNote} />
        </>
      );
    case "joint-planning-purpose":
      return (
        <>
          <p>
            The JP 5-0&apos;s exact framing is{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 Preface">
              Joint planning is the process of identifying military ways and means (with
              associated risk)...
            </SourceQuote>
            . The output is a structured set of options for decisions.
          </p>
          <p>
            TPMs should listen for the nouns that carry product weight:
            objective, end state, risk, assumption, constraint, task, and
            commander&apos;s intent. Engineers should listen for the same nouns as data
            contracts.
          </p>
          <p>
            Ends, ways, means, and risk are coupled. A more ambitious end state without
            more time or means raises risk. More means may lower risk, but can introduce
            political, access, logistics, or escalation costs.
          </p>
          <TradeSpace />
          <p>
            Next: {link("jpp-seven-steps", "seven steps of the JPP")}.
          </p>
        </>
      );
    case "ends-ways-means-risk":
      return (
        <>
          <p>
            Ends, ways, means, and risk are coupled. A more ambitious end state without
            more time or means raises risk. More means may lower risk, but can introduce
            political, access, logistics, or escalation costs.
          </p>
          <TradeSpace />
          <SourceCallout kind="scenario">
            The slider is intentionally simple. It teaches coupling, not operational
            analysis.
          </SourceCallout>
        </>
      );
    case "agentic-not-chatbot":
      return (
        <>
          <p>
            Scale&apos;s public argument is not that AI writes prettier plans. It is that
            agentic systems compress the <AcronymTooltip term="OODA" /> loop and let U.S.
            forces produce better options before an adversary can exploit delay. The
            white paper compresses that thesis into{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 6">
              Agentic Warfare is deterrence by decision advantage.
            </SourceQuote>
          </p>
          <p>
            The white paper is also explicit about what Thunderforge is{" "}
            <em>not</em>: it is not primarily about faster warning orders or
            staff-estimate paperwork. The high-leverage work is higher-level planning
            judgment, especially COA development, wargaming, and comparison.
            Thunderforge is{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 25">
              not focused on using AI to enable the quicker completion of the paperwork of
              planning
            </SourceQuote>
            .
          </p>
          <p>
            The distinction matters for engineering. A document generator can be useful,
            but an agentic planning system needs tools, memory, orchestration, evaluation,
            and human approval gates.
          </p>
          <ArchitectureDiagram />
          {lensOn ? (
            <SourceCallout kind="inference" title="Agentic Lens">
              In product terms, decision advantage depends on the whole system: data
              ingestion, agent routing, simulator calls, traceability, evaluation, and
              commander approval.
            </SourceCallout>
          ) : null}
          <p>Open {link("planning-multiverse", "agentic planning")} next.</p>
        </>
      );
    case "jpp-seven-steps":
      return (
        <>
          <p>
            <AcronymTooltip term="APEX" /> is the function.{" "}
            <AcronymTooltip term="JPP" /> is the engine inside it — the analytical process
            planners use to frame a problem, examine the mission, develop and compare
            COAs, and produce a plan. Strategic guidance and the{" "}
            <AcronymTooltip term="JPEC" /> create planning demand; the seven JPP steps
            create the repeatable work loop.
          </p>
          <p>
            JP 5-0 names the seven steps and says the process can be modified, truncated,
            concurrent, or iterative. Treat them as a disciplined loop:{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-10">
              an orderly, analytical set of logical steps to frame a problem; examine a
              mission; develop, analyze, and compare alternative COAs...
            </SourceQuote>
          </p>
          <JppRing lensOn={lensOn} openStep={openNote} />
          <p>
            The high-payoff steps for the Thunderforge thesis are{" "}
            {link("coa-development", "COA development")} and{" "}
            {link("coa-analysis-wargaming", "COA analysis and wargaming")}.
          </p>
        </>
      );
    case "planning-initiation":
      return (
        <>
          <p>
            JP 5-0 says{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-11">
              Joint planning begins when an appropriate authority recognizes potential for
              military capability to be employed...
            </SourceQuote>. Staffs analyze guidance, available time,
            intelligence products, assumptions, and constraints.
          </p>
          <JppRing currentStep={1} lensOn={lensOn} openStep={openNote} />
          {lensOn ? (
            <SourceCallout kind="inference" title="Agentic Lens">
              Public materials do not specify this step. A reasonable product bridge is
              automated ingestion and triage of guidance, assumptions, and source
              documents, with humans still setting intent.
            </SourceCallout>
          ) : null}
        </>
      );
    case "mission-analysis":
      return (
        <>
          <p>
            Mission analysis is where the commander&apos;s intent turns into understanding.
            Outputs: specified, implied, and essential tasks; restated mission; COGs;
            limitations; risk; initial{" "}
            <AcronymTooltip term="CCIR" /> split between{" "}
            <AcronymTooltip term="PIR" /> and <AcronymTooltip term="FFIR" />; and
            evaluation criteria. JP 5-0 says{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-20 to III-30">
              The mission statement describes the mission in terms of the elements of who,
              what, when, where, and why.
            </SourceQuote>
          </p>
          <JppRing currentStep={2} lensOn={lensOn} openStep={openNote} />
          <p>
            Specified tasks are directed. Implied tasks are not directed but are needed for the
            specified tasks to succeed. Essential tasks are the small subset whose failure
            means mission failure.
          </p>
          <PredictThenReveal
            question='A higher-HQ order says "secure the port by D+3." Your staff also needs to coordinate with the partner coast guard. Which bucket is the coast-guard coordination?'
            hint="One bucket is directed; the others are derived."
          >
            Implied. The order did not direct coast-guard coordination, but the mission
            cannot succeed without it. The essential task is the broader mission outcome
            the specified and implied tasks add up to.
          </PredictThenReveal>
          <TaskSorter />
          {lensOn ? (
            <p>
              Under an agent layer, candidate task classifications and draft CCIRs arrive
              as proposals with source provenance. See{" "}
              {link("agentic-mission-analysis", "agentic mission analysis")}.
            </p>
          ) : null}
          <p>
            Misclassifying tasks changes what the staff
            builds next in {link("coa-development", "COA development")}.
          </p>
        </>
      );
    case "coa-development":
      return (
        <>
          <p>
            COA development produces broad, distinguishable ways to accomplish the
            mission. JP 5-0 defines COAs as{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-33">
              subsets of options that identify specific military operations to attain the
              end state...
            </SourceQuote>
          </p>
          <JppRing currentStep={3} lensOn={lensOn} openStep={openNote} />
          <p>
            The discipline is genuine distinguishability. Doctrine screens each
            candidate against five criteria: suitable, feasible, acceptable,
            distinguishable, and complete. A COA that fails any of these gets rebuilt or
            dropped before it reaches wargaming.
          </p>
          <PredictThenReveal
            question="Two candidate COAs differ only in which port they use. Are they distinguishable?"
            hint="Distinguishability is about the approach, not the asset list."
          >
            No. Different ports with the same scheme of maneuver and sustainment concept
            is one COA with two logistics options. A distinguishable second COA changes
            the operational approach: a different sequence of effects, a different main
            effort, or a different acceptance of risk.
          </PredictThenReveal>
          {lensOn ? (
            <p>
              This is the high-leverage zone for Thunderforge. The public case study
              places AI agents and physics-based modeling/simulation directly here:{" "}
              <SourceQuote kind="scale" source="Scale white paper p. 25">
                AI agents with automated, physics-based modeling and simulation tools
              </SourceQuote>
              . See {link("agentic-coa-development", "agentic COA development")}.
            </p>
          ) : null}
          <ArchitectureDiagram />
        </>
      );
    case "coa-analysis-wargaming":
      return (
        <>
          <p>
            JP 5-0 describes wargaming as an iterative process of action,
            reaction, and counteraction. Each retained friendly COA is tested against
            most-likely and most-dangerous enemy COAs. The output is
            a richer understanding of what breaks, where, and why.{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-53">
              Planners avoid becoming emotionally attached to a friendly COA...
            </SourceQuote>
          </p>
          <JppRing currentStep={4} lensOn={lensOn} openStep={openNote} />
          <p>
            Doctrine names three methods that trade coverage for cost. Box focuses on a
            single critical event in time and space. Belt walks the COA through a sequence
            of phases. Avenue-in-depth follows one route from start to objective. The
            method picks itself once the staff names the question wargaming has to answer.
          </p>
          <PredictThenReveal
            question="The decisive question is whether COA B's main effort can survive enemy interdiction during the third week. Which wargame method fits?"
            hint="Two dimensions matter: where in time, and how wide."
          >
            Box. The question is narrow in time (week three) and in space (the main
            effort&apos;s axis). Belt would over-cover; avenue-in-depth would lose the time
            focus.
          </PredictThenReveal>
          {lensOn ? (
            <p>
              Scale calls this the planning multiverse:{" "}
              <SourceQuote kind="scale" source="Scale white paper p. 32">
                running thousands or even hundreds of thousands of permutations
              </SourceQuote>
              . See {link("planning-multiverse", "agentic planning")} for the
              agentic delta.
            </p>
          ) : null}
          <TraceViewer />
        </>
      );
    case "coa-comparison":
      return (
        <>
          <p>
            COA comparison is where the staff explains why one option is preferred in
            terms of criteria and risk. JP 5-0 warns against turning comparison into pure
            math:{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-58">
              COA comparison is subjective and should not be turned into a strictly
              mathematical process.
            </SourceQuote>
          </p>
          <JppRing currentStep={5} lensOn={lensOn} openStep={openNote} />
          <p>
            Evaluation criteria are defined and weighted
            <em> before </em>
            COAs are scored. Reversing the sequence lets the favored COA select
            its own grading rubric. The comparator below makes that failure mode visible:
            pick a winner first, then move weights, and watch which criteria the
            recommendation suddenly prefers.
          </p>
          <PredictThenReveal
            question="A staff scored three COAs first, then debated weights. Is the recommendation defensible?"
            hint="The objection is procedural, not arithmetic."
          >
            No. Tuning weights after a winner is visible turns the matrix into a
            justification engine. The doctrinal correction is to commit criteria and
            weights, then score, then report.
          </PredictThenReveal>
          <CoaComparator />
          {lensOn ? (
            <p>
              See {link("agentic-coa-comparison", "agentic COA comparison")} for how an
              agent layer can make criteria-lock architectural rather than aspirational.
            </p>
          ) : null}
        </>
      );
    case "coa-approval":
      return (
        <>
          <p>
            The commander decides. The commander{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-59">
              combines personal analysis with the staff recommendation, resulting in a
              selected COA.
            </SourceQuote>
          </p>
          <JppRing currentStep={6} lensOn={lensOn} openStep={openNote} />
          <p>
            Scale&apos;s human-on-the-loop framing preserves human authority while moving
            commanders away from approving every low-level action; in its words,{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 7">
              humans set intent, apply judgment, and own the risk
            </SourceQuote>
            .
          </p>
          <p>Open {link("human-on-the-loop", "human-on-the-loop")} for the governance layer.</p>
        </>
      );
    case "plan-order-development":
      return (
        <>
          <p>
            Step 7 turns the approved COA into executable direction: a plan or order
            aligned to commander&apos;s intent, assumptions, branches, sequels, and assessment.
            The output names: <AcronymTooltip term="OPLAN" />,{" "}
            <AcronymTooltip term="CONPLAN" />, <AcronymTooltip term="OPORD" />, and the
            order family (<AcronymTooltip term="WARNORD" />,{" "}
            <AcronymTooltip term="FRAGORD" />) that fires through execution.
          </p>
          <JppRing currentStep={7} lensOn={lensOn} openStep={openNote} />
          {lensOn ? (
            <>
              <p>
                The white paper&apos;s living-plan section names the destination — plans
                that self-update as new battlefield data arrives — and is careful to mark
                it as future direction. It opens with{" "}
                <SourceQuote kind="scale" source="Scale white paper p. 33">
                  Though not yet a capability
                </SourceQuote>
                .
              </p>
              <SourceCallout kind="scale" title="Important caveat">
                Treat living plans as a roadmap concept. Do not present it as fielded
                capability unless a public source says so.
              </SourceCallout>
            </>
          ) : null}
        </>
      );
    case "operational-design":
      return (
        <>
          <p>
            Operational design is the cognitive work that precedes and informs detailed
            planning: understand the operational environment, define the problem, and
            develop an operational approach.
          </p>
          <p>
            For TPMs, this is where ambiguity management lives. For engineers, this is
            where requirements should resist premature schema lock-in.
          </p>
          <p>
            Continue to {link("center-of-gravity-analysis", "COG analysis")} and{" "}
            {link("lines-operation-effort", "LOO/LOE")}.
          </p>
        </>
      );
    case "center-of-gravity-analysis":
      return (
        <>
          <p>
            COG analysis decomposes a source of strength into critical capabilities,
            critical requirements, and critical vulnerabilities. The point is not naming a
            magic node. The point is finding what can be influenced to change the outcome.
          </p>
          <div className="my-6 grid gap-3 md:grid-cols-4">
            {[
              ["COG", "Source of strength", "Adversary integrated air defense"],
              ["Critical capability", "What it does", "Detect and engage at range"],
              ["Critical requirement", "What it needs", "Long-range radars + C2 links"],
              ["Critical vulnerability", "Where it breaks", "Single forward radar node"],
            ].map(([label, role, example]) => (
              <div key={label} className="rounded-md border bg-card p-3">
                <div className="font-mono text-xs text-muted-foreground">{role}</div>
                <div className="mt-2 text-sm font-semibold">{label}</div>
                <div className="mt-2 text-xs text-muted-foreground">{example}</div>
              </div>
            ))}
          </div>
          <p>
            Read the row left to right and the decomposition becomes operational: a COG
            is too big to attack directly, so attack what it requires; among requirements,
            attack what is exposed. The vulnerability is the target. The COG is the
            reason.
          </p>
          <PredictThenReveal
            question='If defeating a named COG would not force the adversary to change course or fail strategic objectives, what does that tell the staff?'
            hint="JP 5-0 is explicit on the test."
          >
            The COG identification is invalid. JP 5-0 directs that the staff re-examine
            the analysis. A correctly named COG, if defeated, breaks the adversary&apos;s
            ability to accomplish strategic objectives.
          </PredictThenReveal>
          <SourceCallout kind="doctrine">
            JP 5-0 says invalid COG identification should be reexamined if defeating it
            would not force the adversary to change course or fail strategic objectives.
          </SourceCallout>
        </>
      );
    case "end-state-objective-effect-task":
      return (
        <>
          <p>
            A useful planning conversation keeps altitude clean: end state is the desired
            condition, objective is the goal, effect is the change produced, and task is
            assigned action.
          </p>
          <div className="my-6 space-y-2">
            {[
              ["End state", "Desired conditions"],
              ["Objective", "Clearly defined goal"],
              ["Effect", "Change that supports the objective"],
              ["Task", "Action assigned to a force or organization"],
            ].map(([label, detail]) => (
              <div key={label} className="flex items-center gap-3 rounded-md border bg-card p-3">
                <div className="w-32 font-semibold">{label}</div>
                <div className="text-sm text-muted-foreground">{detail}</div>
              </div>
            ))}
          </div>
        </>
      );
    case "lines-operation-effort":
      return (
        <>
          <p>
            A line of operation is spatial: actions on decisive points lead toward an
            objective along a route in geography. A line of effort is logical: tasks and
            missions connect by purpose and cause-effect, not necessarily by terrain. Most
            plans use both.
          </p>
          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-4">
              <h3 className="m-0 text-sm font-semibold"><AcronymTooltip term="LOO" /></h3>
              <p className="mt-2 text-xs text-muted-foreground">Spatial path through decisive points</p>
              <p className="mt-3 text-sm">
                Entry point &rarr; route &rarr; port &rarr; lodgment &rarr; objective
              </p>
            </div>
            <div className="rounded-md border bg-card p-4">
              <h3 className="m-0 text-sm font-semibold"><AcronymTooltip term="LOE" /></h3>
              <p className="mt-2 text-xs text-muted-foreground">Logical link of effects toward an objective</p>
              <p className="mt-3 text-sm">
                Access &rarr; legitimacy &rarr; sustainment &rarr; partner capacity &rarr; objective
              </p>
            </div>
          </div>
          <p>
            Decisive points are nodes on either line whose action shifts the plan
            measurably toward the objective. The job in operational design is to choose
            which decisive points sit on which line, and in what order.
          </p>
          <PredictThenReveal
            question="A campaign aims to restore partner government legitimacy. Is that work better tracked on an LOO or an LOE?"
            hint="Legitimacy is not a place."
          >
            LOE. Legitimacy is not a geographic node; it is an effect produced by linked
            tasks (security, governance support, public communication). An LOO would
            force the planner to invent a terrain metaphor for something that lives in
            cause-effect logic.
          </PredictThenReveal>
        </>
      );
    case "thunderforge-agentic-planning":
      return (
        <>
          <p>
            The public Scale white paper describes Thunderforge as an AI-enabled command,
            control, and planning prototype integrating AI agents into operational and
            theater-level planning:{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 25">
              The platform integrates AI agents into operational and theater-level
              planning.
            </SourceQuote>
          </p>
          <p>
            The case study says Thunderforge couples AI agents with automated,
            physics-based modeling and simulation tools to generate validated,
            confidence-bound COAs.
          </p>
          <ArchitectureDiagram />
          <p>
            For engineers, the right read of JP 5-0 is as an interface contract. Doctrine
            names the objects the system has to preserve: mission statements,
            assumptions, CCIRs, COAs, evaluation criteria, branches, sequels, and
            approval decisions. The job is not to make a chatbot sound doctrinal — it is
            to preserve structure, provenance, simulator evidence, traceability, and
            human decision authority.
          </p>
          <p>Next: {link("planning-multiverse", "agentic planning")}.</p>
        </>
      );
    case "planning-multiverse":
      return (
        <>
          <p>
            The planning multiverse reframes wargaming as exploration of many possible
            futures. Instead of a handful of manual runs, agentic systems can help produce
            structured scenario sets for human decision. {" "}
            <SourceQuote kind="scale" source="Scale white paper p. 32">
              The agentic system presents planners with a structured set of these
              scenarios...
            </SourceQuote>
          </p>
          <p>
            It comes in three layers: natural language UI, an agent layer that calls
            tools and synthesizes responses, and a simulation layer of validated models.
            The interface goal is for{" "}
            <SourceQuote kind="scale" source="Scale white paper pp. 30-31">
              agents to automate calls to simulators through a natural language interface
            </SourceQuote>
            .
          </p>
          <p>
            Engineer implication: simulator calls need explicit inputs, versioned model
            metadata, uncertainty, failure modes, and trace linkage back to the COA being
            evaluated.
          </p>
          <TraceViewer />
          <p>
            False precision is a risk, which is why {link("te-justifiable-confidence", "T&E")} and
            evidence provenance belong in the product, not in a separate compliance deck.
          </p>
        </>
      );
    case "human-on-the-loop":
      return (
        <>
          <p>
            Human-on-the-loop does not mean humans disappear. It means humans move from
            approving every low-level action to supervising systems, setting intent,
            applying judgment, and owning risk:{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 7">
              elevating them from hands-on controllers to mission directors who provide
              oversight.
            </SourceQuote>
          </p>
          <p>
            The product implication is direct: approval gates, escalation policy, audit
            logs, and model cards are core UX and architecture, not afterthoughts.
          </p>
          <MiniJppCapstone openStep={openNote} />
        </>
      );
    case "te-justifiable-confidence":
      return (
        <>
          <p>
            Scale&apos;s public Test and Evaluation framing is the strongest guardrail against AI hallucination.
            The system has to characterize what agents can do reliably, where they fail,
            and what oversight system contains that risk. The white paper says commanders
            need{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 8">
              justifiable confidence that the system is robust, predictable, and aligned
            </SourceQuote>
            .
          </p>
          <div className="my-6 grid gap-3 md:grid-cols-2">
            {["Knowledge base", "Underlying models", "Agent harnesses", "Monitoring and oversight"].map(
              (layer) => (
                <div key={layer} className="rounded-md border bg-card p-3">
                  <div className="font-semibold">{layer}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    A distinct evaluation surface for mission assurance.
                  </div>
                </div>
              ),
            )}
          </div>
        </>
      );
    case "agentic-jpp-overview":
      return (
        <>
          <p>
            Although all planning steps will be accounted for eventually, Scale concentrates agent leverage on COA development and
            wargaming. Thunderforge adds an agent layer that touches each step at different depth.
          </p>
          <JppRing lensOn openStep={openNote} />
          <div className="my-6 grid gap-2">
            {[
              ["Step 1 — Planning initiation", "Light", "Ingest and triage guidance, assumptions, source documents."],
              ["Step 2 — Mission analysis", "Moderate", "Pre-classify tasks, draft CCIRs, propose candidate COGs."],
              ["Step 3 — COA development", "Heavy", "Generate parallel COAs with simulator-backed evidence."],
              ["Step 4 — COA analysis (wargaming)", "Heavy", "Run many permutations against likely and dangerous enemy COAs."],
              ["Step 5 — COA comparison", "Moderate", "Score against locked criteria; surface evidence per criterion."],
              ["Step 6 — COA approval", "Light (intentional)", "Commander decides; agents support, do not vote."],
              ["Step 7 — Plan or order development", "Light today; living plans are future", "Render structured decisions into orders."],
            ].map(([step, weight, note]) => (
              <div key={step} className="rounded-md border bg-card p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="text-sm font-semibold">{step}</div>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-agentic">
                    {weight}
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>
          <p>
            Continue to {link("agentic-mission-analysis", "agentic mission analysis")},{" "}
            {link("agentic-coa-development", "agentic COA development")},{" "}
            {link("planning-multiverse", "agentic planning")} for step 4, and{" "}
            {link("agentic-coa-comparison", "agentic COA comparison")}.
          </p>
        </>
      );
    case "agentic-mission-analysis":
      return (
        <>
          <p>
            Under an agent layer, the inputs to mission analysis (higher-HQ orders,
            intelligence products, prior plans) get ingested, parsed, and pre-classified
            before a human reads them. The output is a stack of proposals with specified vs. implied vs.
            essential candidates, draft CCIRs linked to objectives, and candidate COGs
            surfaced from {" "}
            <AcronymTooltip term="PMESII-PT" /> signals.
          </p>
          <JppRing currentStep={2} lensOn openStep={openNote} />
          <p>
            A task labeled &ldquo;essential&rdquo; by an agent is a hypothesis; the staff confirms or
            overrides. Every proposal carries the source it came from so the staff can
            audit the chain back to the higher-HQ order.
          </p>
          <TaskSorter />
          <p>
            Back to the doctrinal step: {link("mission-analysis", "mission analysis")}.
          </p>
        </>
      );
    case "agentic-coa-development":
      return (
        <>
          <p>
            COA development is the Thunderforge main use case. Scale describes{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 25">
              AI agents with automated, physics-based modeling and simulation tools
            </SourceQuote>
            generating candidate COAs in parallel, each with simulator-validated
            outcomes and confidence bands.
          </p>
          <JppRing currentStep={3} lensOn openStep={openNote} />
          <p>
            The product shape is a small set of candidates, each with
            narrative, required capabilities, sustainment concept, risks, and a model
            run summary.
          </p>
          <PredictThenReveal
            question="An agent layer returns ten candidate COAs. Is that better than three?"
            hint="More options can be worse if they are not distinguishable."
          >
            Not by itself. JP 5-0 asks for distinguishable options, not many options. Ten
            near-duplicates cost the staff more time than three genuinely different
            approaches. The agent layer earns its keep by widening the option space,
            not by inflating the count.
          </PredictThenReveal>
          <ArchitectureDiagram />
          <p>
            Back to the doctrinal step: {link("coa-development", "COA development")}.
            Next: {link("planning-multiverse", "agentic planning")} for step 4.
          </p>
        </>
      );
    case "agentic-coa-comparison":
      return (
        <>
          <p>
            Agent-assisted comparison surfaces simulator evidence per criterion: this COA
            wins on tempo and loses on sustainment; that COA is robust to enemy
            interdiction but assumes partner access. The JP 5-0 still warns that{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-58">
              COA comparison is subjective and should not be turned into a strictly
              mathematical process.
            </SourceQuote>
          </p>
          <JppRing currentStep={5} lensOn openStep={openNote} />
          <p>
            The architectural move in response to this risk is to make criteria-lock a property of the system. If
            the staff can move weights after the ranking is visible, the bias surface is
            still open. The slider behavior in the comparator below
            is what the staff should <em>not</em> be able to do in production.
          </p>
          <CoaComparator />
          <p>
            Back to the doctrinal step: {link("coa-comparison", "COA comparison")}.
          </p>
        </>
      );
    case "mini-jpp-capstone":
      return <MiniJppCapstone openStep={openNote} />;
    default:
      return (
        <p>
          This note is registered but does not yet have a custom body. Use the source
          claims and related notes as the scaffold for expansion.
        </p>
      );
  }
}
