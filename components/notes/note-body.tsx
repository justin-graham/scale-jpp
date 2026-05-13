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
            This Atlas is built for the first month on Thunderforge: enough JP 5-0 to
            follow a planning conversation, enough public Scale framing to understand
            why agentic planning matters, and enough engineering structure to reason
            about traces, simulators, and approval gates.
          </p>
          <p>
            JP 5-0 is treated as ground truth for doctrine, including phrases like{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 Preface">
              identifying military ways and means (with associated risk)
            </SourceQuote>
            . Scale material is treated as public product thesis, such as Thunderforge
            being described as a platform that{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 25">
              integrates AI agents into operational and theater-level planning
            </SourceQuote>
            . Purple inference labels mark the bridge between them.
          </p>
          <p>
            Start with {link("joint-planning-purpose", "joint planning purpose")}, then
            move through the {link("jpp-seven-steps", "seven-step JPP spine")}. Engineers
            should keep {link("engineer-architecture", "JPP as an interface contract")} open
            in the stack.
          </p>
          <JppRing lensOn={lensOn} openStep={openNote} />
        </>
      );
    case "joint-planning-purpose":
      return (
        <>
          <p>
            JP 5-0 defines joint planning as identifying military ways and means, with
            associated risk, that national leaders can combine with other instruments of
            power. Its exact framing is{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 Preface">
              Joint planning is the process of identifying military ways and means (with
              associated risk)...
            </SourceQuote>
            . The output is not merely a document. It is a structured set of options for
            decision.
          </p>
          <p>
            That means a TPM should listen for the nouns that carry product weight:
            objective, end state, risk, assumption, constraint, task, and
            commander&apos;s intent. An engineer should listen for the same nouns as data
            contracts.
          </p>
          <TradeSpace />
          <p>
            Next: {link("ends-ways-means-risk", "the trade space")} and{" "}
            {link("apex-jpp-engine", "where JPP fits inside APEX")}.
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
    case "apex-jpp-engine":
      return (
        <>
          <p>
            <AcronymTooltip term="APEX" /> is the enterprise.{" "}
            <AcronymTooltip term="JPP" /> is the analytical process planners use to
            frame a problem, examine the mission, develop and compare COAs, and produce
            a plan or order.
          </p>
          <p>
            The useful mental model is nested: strategic guidance and the{" "}
            <AcronymTooltip term="JPEC" /> create planning demand; JPP creates the
            repeatable work loop.
          </p>
          <JppRing lensOn={lensOn} openStep={openNote} />
        </>
      );
    case "decision-advantage":
      return (
        <>
          <p>
            Scale&apos;s public argument is not that AI writes prettier plans. It is that
            agentic systems compress the Observe, Orient, Decide, Act loop and let U.S.
            forces produce better options before an adversary can exploit delay. The
            white paper compresses that thesis into{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 6">
              Agentic Warfare is deterrence by decision advantage.
            </SourceQuote>
            .
          </p>
          {lensOn ? (
            <SourceCallout kind="inference" title="Agentic Lens">
              In product terms, decision advantage depends on the whole system: data
              ingestion, agent routing, simulator calls, traceability, evaluation, and
              commander approval.
            </SourceCallout>
          ) : null}
          <p>Open {link("planning-multiverse", "the planning multiverse")} next.</p>
        </>
      );
    case "agentic-not-chatbot":
      return (
        <>
          <p>
            The white paper is explicit: Thunderforge is not primarily about faster
            warning orders or staff-estimate paperwork. The high-leverage work is
            higher-level planning judgment, especially COA development, wargaming, and
            comparison. In Scale&apos;s phrasing, Thunderforge is{" "}
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
        </>
      );
    case "jpp-seven-steps":
      return (
        <>
          <p>
            JP 5-0 names seven steps. It also says the process can be modified,
            truncated, concurrent, or iterative. Treat the steps as a disciplined loop, not
            a brittle waterfall. JP 5-0 calls the JPP{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-10">
              an orderly, analytical set of logical steps to frame a problem; examine a
              mission; develop, analyze, and compare alternative COAs...
            </SourceQuote>
            .
          </p>
          <JppRing lensOn={lensOn} openStep={openNote} />
          <p>
            The high-payoff steps for the public Thunderforge thesis are{" "}
            {link("coa-development", "COA development")} and{" "}
            {link("coa-analysis-wargaming", "COA analysis and wargaming")}.
          </p>
        </>
      );
    case "planning-initiation":
      return (
        <>
          <p>
            Planning begins when an appropriate authority recognizes the potential need
            for military capability. Staffs analyze guidance, available time, estimates,
            intelligence products, assumptions, and constraints. JP 5-0 says{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-11">
              Joint planning begins when an appropriate authority recognizes potential for
              military capability to be employed...
            </SourceQuote>
            .
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
            Mission analysis is where the staff turns direction into understanding:
            specified, implied, and essential tasks; mission statement; COGs; limitations;
            risk; initial <AcronymTooltip term="CCIR" />; and evaluation criteria. JP 5-0
            says{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-20 to III-30">
              The mission statement describes the mission in terms of the elements of who,
              what, when, where, and why.
            </SourceQuote>
          </p>
          <JppRing currentStep={2} lensOn={lensOn} openStep={openNote} />
          <TaskSorter />
          <p>
            Misclassifying tasks is not a vocabulary error. It changes what the staff
            builds next in {link("coa-development", "COA development")}.
          </p>
        </>
      );
    case "coa-development":
      return (
        <>
          <p>
            COA development produces broad, distinguishable ways to accomplish the
            mission. JP 5-0 expects narrative, sketches where useful, required
            capabilities, task organization, timelines, sustainment concepts, and risks.
            It defines COAs as{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-33">
              subsets of options that identify specific military operations to attain the
              end state...
            </SourceQuote>
            .
          </p>
          <JppRing currentStep={3} lensOn={lensOn} openStep={openNote} />
          {lensOn ? (
            <p>
              Scale&apos;s public Thunderforge case study places AI agents and
              physics-based modeling/simulation directly in this neighborhood:{" "}
              <SourceQuote kind="scale" source="Scale white paper p. 25">
                AI agents with automated, physics-based modeling and simulation tools
              </SourceQuote>
              .
            </p>
          ) : null}
          <ArchitectureDiagram />
        </>
      );
    case "coa-analysis-wargaming":
      return (
        <>
          <p>
            JP 5-0 describes wargaming as a disciplined, iterative process of action,
            reaction, and counteraction. It should test each retained friendly COA against
            most likely and most dangerous enemy COAs, while warning that{" "}
            <SourceQuote kind="doctrine" source="JP 5-0 III-53">
              Planners avoid becoming emotionally attached to a friendly COA...
            </SourceQuote>
          </p>
          <JppRing currentStep={4} lensOn={lensOn} openStep={openNote} />
          <p>
            Scale calls this the planning multiverse: many permutations that expose likely
            outcomes, vulnerabilities, and high-success options by{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 32">
              running thousands or even hundreds of thousands of permutations
            </SourceQuote>
            .
          </p>
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
          <CoaComparator />
        </>
      );
    case "coa-approval":
      return (
        <>
          <p>
            The staff briefs. The commander decides. JP 5-0&apos;s approval step combines
            staff recommendation with the commander&apos;s analysis, experience, and judgment:
            the commander{" "}
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
          </p>
          <JppRing currentStep={7} lensOn={lensOn} openStep={openNote} />
          {lensOn ? (
            <p>
              The white paper&apos;s living-plan section is explicitly future-facing. It opens
              with{" "}
              <SourceQuote kind="scale" source="Scale white paper p. 33">
                Though not yet a capability
              </SourceQuote>
              , so the Atlas marks it as future direction rather than current capability.
            </p>
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
            {["COG", "Critical capability", "Critical requirement", "Critical vulnerability"].map(
              (item) => (
                <div key={item} className="rounded-md border bg-card p-3">
                  <div className="font-mono text-xs text-muted-foreground">Analysis layer</div>
                  <div className="mt-2 text-sm font-semibold">{item}</div>
                </div>
              ),
            )}
          </div>
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
            objective. A line of effort is logical: tasks and missions connect by purpose
            and cause-effect.
          </p>
          <div className="my-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-4">
              <h3 className="m-0 text-sm font-semibold">LOO</h3>
              <p className="text-sm text-muted-foreground">Entry point -&gt; route -&gt; port -&gt; objective</p>
            </div>
            <div className="rounded-md border bg-card p-4">
              <h3 className="m-0 text-sm font-semibold">LOE</h3>
              <p className="text-sm text-muted-foreground">Access -&gt; legitimacy -&gt; sustainment -&gt; objective</p>
            </div>
          </div>
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
          <p>Next: {link("simulator-layer-safe-sim", "the simulator layer")}.</p>
        </>
      );
    case "planning-multiverse":
      return (
        <>
          <p>
            The planning multiverse reframes wargaming as exploration of many possible
            futures. Instead of a handful of manual runs, agentic systems can help produce
            structured scenario sets for human decision. Scale says{" "}
            <SourceQuote kind="scale" source="Scale white paper p. 32">
              The agentic system presents planners with a structured set of these
              scenarios...
            </SourceQuote>
          </p>
          <TraceViewer />
          <p>
            The risk is false precision. That is why {link("te-justifiable-confidence", "T&E")} and
            evidence provenance belong in the product, not in a separate compliance deck.
          </p>
        </>
      );
    case "simulator-layer-safe-sim":
      return (
        <>
          <p>
            Scale describes three layers: natural language UI, an agent layer that calls
            tools and synthesizes responses, and a simulation layer of validated models.
            The interface goal is for{" "}
            <SourceQuote kind="scale" source="Scale white paper pp. 30-31">
              agents to automate calls to simulators through a natural language interface
            </SourceQuote>
            .
          </p>
          <p>SAFE-SiM is discussed as one modeling tool among many, not as the entire simulator ecosystem.</p>
          <p>
            Engineer implication: simulator calls need explicit inputs, versioned model
            metadata, uncertainty, failure modes, and trace linkage back to the COA being
            evaluated.
          </p>
          <TraceViewer />
        </>
      );
    case "living-plans":
      return (
        <>
          <p>
            The white paper&apos;s living-plan section is compelling because it names the
            destination: plans that update as new battlefield data arrives. It is also
            careful: it says this is not yet a capability.
          </p>
          <SourceCallout kind="scale" title="Important Caveat">
            Treat living plans as a roadmap concept. Do not present it as fielded
            capability unless a public source says so.
          </SourceCallout>
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
            Scale&apos;s public T&E framing is the strongest guardrail against AI theater.
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
    case "engineer-architecture":
      return (
        <>
          <p>
            Engineers should read JP 5-0 as an interface contract. Doctrine names the
            objects users care about: mission statements, assumptions, CCIRs, COAs,
            evaluation criteria, branches, sequels, and approval decisions.
          </p>
          <ArchitectureDiagram />
          <p>
            The job is not to make a chatbot sound doctrinal. The job is to preserve
            structure, provenance, simulator evidence, traceability, and human decision
            authority.
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
