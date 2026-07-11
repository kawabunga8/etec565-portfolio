export default function Assignment1() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/StockSnap_O23H6MFZTV.jpg)'}}>
      <header className="sticky top-0 z-50 w-full flex flex-row items-center justify-between py-6 px-8" style={{backgroundColor: '#002145'}}>
        <a href="/" className="text-4xl font-bold text-white whitespace-nowrap hover:text-[#B4985B] transition-colors">ETEC 565</a>
        <p className="text-base text-[#B4985B] text-right max-w-2xl">Ethical, Critical, and Professional Use of Generative AI in Teaching and Learning</p>
      </header>
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              ETEC 565 Assignment
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Investigating Biases and Blind Spots in AI Systems
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Examining hidden assumptions in AI-generated report card comments
          </p>
          <div className="mt-6 flex gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-medium text-slate-900 dark:text-white">Course:</span> UBC Master of Educational Technology
            </div>
            <div>
              <span className="font-medium text-slate-900 dark:text-white">Instructors:</span> Dr. Sam McCready & Dr. Jennifer Jenson (MET Director)
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12 bg-black/60 rounded-lg m-6 backdrop-blur-sm">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#B4985B] mb-6">
            Research Question
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <p className="text-lg text-slate-700 dark:text-slate-300">
              When three major AI models (ChatGPT, Gemini, Claude) generate report card comments for the same student profile, what patterns emerge? And what do those patterns reveal about hidden assumptions in educational technology?
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#B4985B] mb-6">
            The Experiment
          </h2>
          <p className="text-amber-50 mb-6">
            I submitted the same prompt to three AI tools:
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6 font-mono text-sm text-slate-700 dark:text-slate-300">
            <p className="italic">
              "Write a report card comment for a Grade 10 ADST student who is quiet in class, submits solid work but rarely participates in discussion, and shows strong technical skill but limited collaboration."
            </p>
          </div>
          <p className="text-amber-50">
            The results were strikingly consistent—not in surface details, but in underlying judgment.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#B4985B] mb-6">
            Key Findings
          </h2>
          <div className="space-y-4">
            <div className="bg-cover bg-center rounded-lg border border-slate-200 dark:border-slate-800 p-6" style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                1. The Bias Is Subtle
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                All three tools produced comments that "look" professional and balanced. There's no overtly offensive language or visible stereotyping. The bias hides inside language that sounds fair.
              </p>
            </div>

            <div className="bg-cover bg-center rounded-lg border border-slate-200 dark:border-slate-800 p-6" style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                2. They Agree on What's "Wrong"
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                Every tool framed the student's technical work as a baseline, then spent the bulk of the comment on what needed fixing: participation and collaboration. The underlying message is identical: this student is good, but not yet whole.
              </p>
            </div>

            <div className="bg-cover bg-center rounded-lg border border-slate-200 dark:border-slate-800 p-6" style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                3. The Real Issue: Embedded Norms
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                All three tools default to the same implicit definition of a "good student": one who participates verbally and collaborates openly. This treats quiet, independent, technically excellent work as incomplete—as something that needs social proof.
              </p>
            </div>

            <div className="bg-cover bg-center rounded-lg border border-slate-200 dark:border-slate-800 p-6" style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                4. The Stakes Scale Silently
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                If a teacher uses AI to generate dozens or hundreds of comments each term, and each tool defaults to the same normative framing, that framing gets repeated at scale. A quiet student could end up with "needs to speak up more" attached to their name year after year—never questioned, never examined.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#B4985B] mb-6">
            Theoretical Framework
          </h2>
          <p className="text-amber-50 mb-4">
            I draw on two key ideas:
          </p>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p className="text-amber-50">
              <strong className="text-[#B4985B]">Coleman's "Technology of the Surround":</strong> AI systems tend to reproduce existing categorical logics rather than generate anything new. This doesn't only apply to obvious categories like race or gender—it applies to something like "what counts as a good student."
            </p>
            <p className="text-amber-50">
              <strong className="text-[#B4985B]">Crawford's "Atlas of AI":</strong> The polish and professionalism of AI output often masks the institutional norms and training data that shaped it. Fair-sounding output doesn't mean neutral output.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#B4985B] mb-6">
            What This Means
          </h2>
          <p className="text-amber-50 mb-4">
            I'm not arguing we should stop using AI tools. I'm arguing we need to treat subtle framing the way we'd treat factual errors: something to catch, not something to trust by default.
          </p>
          <p className="text-amber-50 mb-6">
            Three strategies I'm bringing into my practice:
          </p>
          <ol className="space-y-3 text-amber-50">
            <li>
              <strong className="text-[#B4985B]">1. Question the growth area:</strong> Before accepting an AI-generated comment, ask whether the "growth area" reflects a real concern for *this* student, or whether it's the tool's default script.
            </li>
            <li>
              <strong className="text-[#B4985B]">2. Test edge cases:</strong> Run the same prompt with variations (a loud but less skilled student, for example) to see if the tone shifts in ways that reveal underlying assumptions.
            </li>
            <li>
              <strong className="text-[#B4985B]">3. Integrate bias review into formal processes:</strong> Add it to privacy reviews and policy discussions—not just as an afterthought, but as part of the legitimate scrutiny any educational tool should receive.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#B4985B] mb-6">
            The Harder Question
          </h2>
          <p className="text-amber-50">
            Even if I catch this bias and rewrite the comment myself, I haven't fixed anything at the level of the tool. I've just patched one instance. The deeper pattern—that participation equals growth and quiet equals deficit—is still there in every AI tool, ready to shape the next comment I don't have time to scrutinize.
          </p>
          <p className="text-amber-50 mt-4">
            I don't yet know what it would take to build a tool that questions its own defaults rather than just executing them more politely.
          </p>
        </section>

        <section className="mb-12 bg-cover bg-center rounded-lg border border-slate-200 dark:border-slate-800 p-8" style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            View Full Assignment
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Read the complete analysis with all three AI-generated comments and full citations:
          </p>
          <a
            href="https://docs.google.com/document/d/1FI5_r0pXjKs-VwDqV68VGhxFDenCNwTdri8zONch8ZQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-medium rounded-lg transition-colors"
          >
            📄 View Full Document
          </a>
        </section>

        <section className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-[#B4985B] mb-2">
            References
          </h3>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <li>
              Coleman, B. (2021). Technology of the surround. <em>Catalyst: Feminism, Theory, Technoscience</em>, 7(2), 1–21.
            </li>
            <li>
              Crawford, K. (2021). <em>Atlas of AI: Power, politics, and the planetary costs of artificial intelligence</em>. Yale University Press.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
