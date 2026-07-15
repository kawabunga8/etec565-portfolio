const placeholder = "Placeholder — content coming soon. ";

function Panel({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <details className="group mb-4 rounded-lg border border-slate-200 bg-black/40">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-6 py-4 text-xl font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
        <span className="inline-block transition-transform duration-200 group-open:rotate-90">&#9656;</span>
        {title}
      </summary>
      <div className="px-6 pb-6 pt-2 text-amber-50">
        {children ?? <p className="italic text-amber-50/70">{placeholder}</p>}
      </div>
    </details>
  );
}

export default function Assignment2() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/StockSnap_O23H6MFZTV.jpg)'}}>
      <div className="border-b border-slate-200 bg-cover bg-center" style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-4">
            <a href="/" className="text-sm font-medium text-[#B4985B] hover:underline">
              &larr; ETEC 565
            </a>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Evaluation Heuristic and Testing
          </h1>
          <p className="text-amber-50 mb-4 italic">
            Can AI help me know my students better? An evaluation framework for GenAI-assisted reading of student self-reflections.
          </p>
          <div className="text-sm text-amber-50 mb-4">
            <p>Shingo Kawamura &middot; ETEC 565: Ethical, Critical, and Professional Use of Generative AI in Teaching and Learning</p>
            <p className="font-medium text-white">Summer 2026 &middot; In Progress</p>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12 bg-black/60 rounded-lg m-6 backdrop-blur-sm">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#B4985B] mb-6">
            Overview
          </h2>
          <p className="text-amber-50 mb-6 italic">
            {placeholder} Introduce the use case, the foundation (AI only if it saves meaningful time for relational work or amplifies what I&apos;d otherwise miss), and how to read this page.
          </p>
        </section>

        <section className="mb-12">
          <Panel title="The Use Case">
            <p className="italic text-amber-50/70">{placeholder} AI reads student self-reflections, highlights emerging agency, and suggests follow-up questions for the teacher. The AI never talks to the student.</p>
          </Panel>

          <Panel title="Evaluation Heuristic — Part A: Teacher-Facing Tool">
            <p className="italic text-amber-50/70">{placeholder} The Equity of Recognition fail-gate, plus the three dimensions: Wholeness, Resilience, Agency. Criteria table with shorthand tests.</p>
          </Panel>

          <Panel title="Evaluation Heuristic — Part B: Student-Facing Feedback Test">
            <p className="italic text-amber-50/70">{placeholder} The &ldquo;in-a-pinch&rdquo; extension: Truthfulness gate, Praise Target, Feed-forward, Specificity, Voice Authenticity.</p>
          </Panel>

          <Panel title="Sustainability — No Matter How Sweet the Juice">
            <p className="italic text-amber-50/70">{placeholder} Human squeeze (effort) is worth seeing; environmental squeeze (energy and resources) needs justifying &mdash; no matter how sweet the juice.</p>
          </Panel>

          <Panel title="Prompt Template">
            <p className="italic text-amber-50/70">{placeholder} The exact prompt given to the AI, including the teacher&apos;s values and the definition of emerging agency.</p>
          </Panel>

          <Panel title="Test Data: Student Reflections">
            <p className="italic text-amber-50/70">{placeholder} Four obfuscated student reflections. Privacy note: identifying details removed and wording rewritten; no verbatim student writing was shared with any AI tool.</p>
          </Panel>

          <Panel title="Results and Scoring">
            <p className="italic text-amber-50/70">{placeholder} The AI&apos;s analyses scored against the heuristic: equity gate status, dimension judgments, and the observation-to-interpretation drift.</p>
          </Panel>

          <Panel title="Reflection">
            <p className="italic text-amber-50/70">{placeholder} ~500 words on what testing revealed &mdash; about the tool, and about the framework itself.</p>
          </Panel>

          <Panel title="AI Use">
            <p className="italic text-amber-50/70">{placeholder} Disclosure of how AI was used throughout this assignment.</p>
          </Panel>

          <Panel title="References" />
        </section>

        <section className="mb-12 bg-cover bg-center rounded-lg border border-slate-200 p-8" style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            View Full Assignment
          </h2>
          <p className="text-sm text-slate-700 italic">
            Placeholder &mdash; PDF link coming when the assignment is submitted.
          </p>
        </section>
      </main>
    </div>
  );
}
