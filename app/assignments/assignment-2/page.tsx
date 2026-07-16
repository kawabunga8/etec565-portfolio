const partA = [
  { n: "0", c: "Equity of Recognition (gate)", t: "“Same work, plainer words — same result?”", s: "Comparable recognition across register, dialect, length, profile", f: "Recognition tracks fluency markers, not substance" },
  { n: "1", c: "Wholeness", t: "“Foothold, not profile”", s: "Specific, verifiable details I can confirm", f: "Could apply to any student with similar grades" },
  { n: "2", c: "Resilience", t: "“Sees the squeeze, not just the juice”", s: "Names the specific, mundane, ongoing struggle", f: "Struggle as background noise; outcomes only" },
  { n: "3", c: "Agency", t: "“Real pursuit vs. fluent performance”", s: "Detects quiet agency; self-direction ≠ rubric-speak", f: "Rewards vocabulary; fooled by fluent compliance" },
];

const partB = [
  { n: "0", c: "Truthfulness (gate)", t: "“Only what they actually wrote”", s: "Every claim traceable to the student’s text", f: "Invented details, emotions, narratives" },
  { n: "1", c: "Praise target", t: "“Praise the work, not the kid”", s: "Process-praise tied to specific actions", f: "Person-praise (“outstanding,” “masterclass”)" },
  { n: "2", c: "Feed-forward", t: "“Where to next?”", s: "One concrete, actionable next step", f: "Affirmation only; vague “keep it up”" },
  { n: "3", c: "Specificity", t: "“The swap test”", s: "Breaks if pasted into another student’s report", f: "Works for any student in the domain" },
  { n: "4", c: "Voice authenticity", t: "“Would they believe I wrote it?”", s: "Sounds like this teacher", f: "Adult-institutional voice" },
];

const scoreA = [
  ["Equity of Recognition", "Passed on sample (not yet adequately tested)"],
  ["Wholeness", "Partially Meets"],
  ["Resilience", "Meets"],
  ["Agency", "Partially Meets"],
  ["Efficiency", "Marginally Worthwhile"],
];

const scoreB = [
  ["Truthfulness", "Partially Meets"],
  ["Praise Target", "Does Not Meet"],
  ["Feed-forward", "Partially Meets"],
  ["Specificity", "Meets"],
  ["Voice Authenticity", "Partially Meets"],
];

const reflections = [
  { id: "R002 (Modified) · Q4 · Effort 3/4 · Growth 8/10", text: "Key learning: I'm confident about creating multiple versions of a design and using feedback to improve it. During a collaborative project, I created several design concepts, shared them with teammates, and used their suggestions to refine the final version. Learning how to receive and apply feedback was an important skill that I strengthened this term. Challenges: I found it difficult to learn a new design platform at first because I wasn't familiar with the tools and features. It took experimentation and practice to understand how to create the designs I wanted, but over time I became more comfortable using the software. Goals: Next year, I want to continue developing my collaboration skills. During this project I worked closely with a group to create a shared product, and I realized that effective teamwork requires understanding people's strengths, work styles, and needs. I hope to grow as both a contributor and a leader. Progress note: This quarter, I improved my digital design skills through a collaborative project. I was responsible for helping create visual assets for our product, which required me to learn and apply new design techniques. Through this process, I gained confidence using digital design tools to meet project requirements." },
  { id: "R018 (Modified) · Q4 · Effort 3/4 · Growth 7/10", text: "Key learning: One thing I learned well was how to keep going after making mistakes. This applies not only to performing but also to everyday life. Instead of focusing on errors, I learned to move forward, stay focused, and continue doing my best. Challenges: Keeping a steady pulse and reading rhythms was difficult at the beginning. I spent time practicing timing exercises and gradually improved my sense of rhythm. Over time, keeping track of the beat became much more natural. Goals: I want to continue improving my listening skills, ask more questions when I am unsure, and participate more in discussions. I am also looking forward to continuing my growth in music next year. Progress note: A skill I have started developing is improvisation. At the beginning of the quarter, creating music without written notes felt uncomfortable and unfamiliar. While I still have room to grow, I am much more comfortable experimenting with ideas and creating something on the spot." },
  { id: "R020 (Modified) · Q4 · Effort 4/4 · Growth 8/10", text: "Key learning: I'm confident about playing a secondary instrument that I learned this year. It was challenging because I had to learn new techniques and adapt to a different playing style. I spent a lot of time practicing independently and finding connections between what I already knew and the skills required for the new instrument. As a result, I became comfortable performing on it during a large ensemble production. Challenges: At first, adapting to an unfamiliar instrument while learning new music was difficult. I had to adjust to different techniques and build new habits while avoiding confusion with the instrument I already played. To overcome this challenge, I practiced consistently, took breaks when needed, and focused extra attention on difficult passages until I could perform them reliably. Goals: My goal is to become more comfortable improvising. Currently, I rely heavily on written music or memorized pieces. I would like to develop the ability to create music more freely by learning scales, listening closely to other musicians, and practicing with accompaniment tracks. I believe these skills will help me become a more independent musician. Progress note: I developed stronger sight-reading skills this year. Preparing a large amount of music within a shorter timeline forced me to become more confident reading unfamiliar pieces. I also improved my ability to identify and solve performance-related problems by working collaboratively with classmates and discussing strategies for improvement. Additionally, I worked on making my playing more expressive by experimenting with dynamics, phrasing, and tone quality. Teacher feedback: I appreciate the opportunities we were given to grow through new responsibilities and challenges. I especially value the positive culture within the ensemble and the way students were encouraged to support one another while working toward a shared goal." },
  { id: "R023 (Modified) · Q4 · Effort 3/4 · Growth 7/10", text: "Key learning: I'm confident in my technical coding skills because I was able to complete most of the required exercises successfully and independently. Challenges: The creative projects challenged me the most. They required me to think beyond the examples we had practiced and design something original that demonstrated my understanding. Developing unique ideas took a lot of planning, testing, and problem-solving, but I was ultimately able to create projects that reflected my learning. Goals: One goal I have is to stay more focused during class and minimize distractions. I want to be more intentional about managing my attention and returning to tasks quickly when I lose focus. Progress note: I developed a solid foundation in programming this quarter. I learned how to create graphical projects, use decision-making structures, and build simple animations. By steadily progressing through the course material, I gained a stronger understanding of programming concepts and their applications." },
];

const equityStatement = "All four analyses passed the Equity check: within this sample, I found no evidence that the AI’s recognition tracked fluency markers rather than substance. However, all four reflections come from relatively articulate, reflective students, and my obfuscation process rewrote their wording, which further flattened differences in register. Until the tool is given a true test comment — the same work described briefly and in a plain register — passing on this sample does not adequately show that the AI clears the gate.";

const reflectionParas = [
  "Developing this heuristic fundamentally changed the question I was asking about generative AI. Rather than asking whether AI produces insightful analyses or well-written feedback, I found myself asking a more important educational question: Can AI help me know my students better? That shift became the foundation for my evaluation framework.",
  "As a teacher, I do not need AI to replace my professional judgment. What I need is support that either saves meaningful time for relational work or helps me notice something I might otherwise have missed. The teacher remains the person who knows the student; AI should only provide candidate observations that prompt richer conversations. This distinction shaped the design of my heuristic, particularly the emphasis on keeping AI teacher-facing whenever possible.",
  "My evaluation also challenged many of the assumptions I initially held about AI-generated educational feedback. The analyses produced by the AI often sounded impressive, using polished educational language and sophisticated psychological interpretations. However, applying my heuristic revealed that much of this apparent insight came from moving beyond what students had actually written. The AI frequently inferred qualities such as maturity, leadership, empathy, or exceptional self-awareness from relatively modest evidence. While these interpretations were often plausible, they exceeded the teacher's responsibility to remain faithful to the student's own words. This reinforced the importance of distinguishing between observation and interpretation.",
  "Another significant insight involved equity. I realized that an AI system can appear highly effective while still failing the students who need careful recognition most. Students who write fluently, use reflective vocabulary, or naturally adopt the language of school are more likely to receive rich analyses than students who express themselves briefly, plainly, or through different linguistic or cultural conventions. This concern became important enough to function as a threshold condition rather than another scoring category. If AI systematically helps me understand some students better than others, any efficiency gains come at the cost of unequal relationships.",
  "The concepts of resilience and agency also became more nuanced throughout this project. I became increasingly aware that genuine persistence is often quiet and ordinary rather than dramatic. Likewise, authentic agency is not simply the ability to describe one's learning using educational terminology. My heuristic therefore asks whether AI recognizes everyday effort, experimentation, and self-direction without being distracted by polished writing or performed reflection. These dimensions reflect the kind of students I hope to notice more carefully in my own classroom.",
  "Ultimately, this project has led me to view generative AI less as an evaluator and more as a conversational partner for teachers. Its value lies not in making judgments about students but in helping teachers prepare for better human conversations. The question I will continue asking is not whether AI is intelligent enough to understand students, but whether it helps teachers become more attentive, more equitable, and more relational in the ways they already know their students. If AI cannot strengthen those relationships, then no amount of efficiency or sophistication justifies its use.",
];

const references = [
  { authors: "Alim, H. S., & Smitherman, G.", year: 2012, title: "Articulate While Black: Barack Obama, Language, and Race in the U.S.", type: "book", publisher: "Oxford University Press." },
  { authors: "Credé, M., Tynan, M. C., & Harms, P. D.", year: 2017, title: "Much ado about grit: A meta-analytic synthesis of the grit literature.", journal: "Journal of Personality and Social Psychology", volume: 113, issue: 3, pages: "492–511" },
  { authors: "Hattie, J., & Timperley, H.", year: 2007, title: "The power of feedback.", journal: "Review of Educational Research", volume: 77, issue: 1, pages: "81–112" },
  { authors: "Hofmann, V., Kalluri, P. R., Jurafsky, D., & King, S.", year: 2024, title: "AI generates covertly racist decisions about people based on their dialect.", journal: "Nature", volume: 633, pages: "147–154" },
  { authors: "Kluger, A. N., & DeNisi, A.", year: 1996, title: "The effects of feedback interventions on performance.", journal: "Psychological Bulletin", volume: 119, issue: 2, pages: "254–284" },
  { authors: "Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J.", year: 2023, title: "GPT detectors are biased against non-native English writers.", journal: "Patterns", volume: 4, issue: 7 },
  { authors: "Mueller, C. M., & Dweck, C. S.", year: 1998, title: "Praise for intelligence can undermine children's motivation and performance.", journal: "Journal of Personality and Social Psychology", volume: 75, issue: 1, pages: "33–52" },
  { authors: "Sap, M., Card, D., Gabriel, S., Choi, Y., & Smith, N. A.", year: 2019, title: "The risk of racial bias in hate speech detection.", type: "conference", conference: "Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics (ACL)" },
  { authors: "Torrance, H.", year: 2007, title: "Assessment as learning?", journal: "Assessment in Education: Principles, Policy & Practice", volume: 14, issue: 3, pages: "281–294" },
];

const methodNotes = {
  partA: [
    { num: 1, text: "Gate, not dimension. Equity must clear before anything else is scored — if this gate fails, scores below don't matter. A tool that amplifies my knowledge of some students while obscuring others causes unequally distributed relational damage no efficiency gain can offset." },
    { num: 2, text: "What to test, and why. Dialect (home language variety) ≠ register (plain/brief vs. polished academic style); in Grade 10 written reflections, register and length are the likelier variables — test both (three plain sentences vs. three polished paragraphs describing the same work)." },
    { num: 3, text: "The Wholeness paradox, named on purpose. The AI cannot know my students; only I can. Wholeness measures whether the output gives me a foothold for recognition — candidate details a knowing teacher can verify — not whether the AI itself recognizes anyone." },
    { num: 6, text: "Grit is contested. Its predictive validity is weaker than popularly claimed and overlaps heavily with conscientiousness. Grit language can valorize grinding through when the better questions are Why is this so hard? and What support is missing?" },
    { num: 7, text: "Criteria compliance. Schools model agency vocabulary; students learn to perform it — producing the language of the rubric rather than the learning it describes. Quiet students, or those writing in a plain register, may show agency without sounding agentive." },
    { num: 8, text: "Hedging cuts both ways. I tried to... may reflect epistemic care or cultural norms — or genuine uncertainty and low self-efficacy. The ambiguity is the point: AI output should prompt a teacher conversation, never a conclusion." },
  ],
  partB: [
    { num: 1, text: "Gate, not dimension. Truthfulness gates Part B because in student-facing feedback, fabrication reaches the student directly — and a student who reads praise for something they never wrote learns the system did not really read their work. Trust damage outlasts the feedback." },
    { num: 4, text: "Coded praise. Words like articulate, well-organized, and sophisticated can do invisible work, rewarding how a student writes over what they are thinking." },
    { num: 9, text: "Why truthfulness gates Part B but only cautions Part A. In the teacher-facing tool, a fabricated detail wastes my time; I am in the loop to catch it. In student-facing feedback, fabrication reaches the student directly and affects trust." },
    { num: 10, text: "Comparison design. Better than none is not a low bar: feedback interventions decreased performance in about a third of studied cases, typically when attention went to the self rather than the task. Score the generated paragraphs against criteria the literature says predict benefit or harm." },
    { num: 11, text: "What good feedback contains. Person-praise is associated with fragility after later setbacks; process-praise supports persistence. Effective feedback answers Where am I going? How am I going? Where to next? — affirmation-heavy paragraphs answer only the middle question." },
    { num: 12, text: "Voice authenticity is an empirical question. Students readily distinguish institutional voice from their teacher's, and feedback perceived as automated may be discounted regardless of content — but this cannot be verified without student participants. A limitation, not a finding." },
  ],
};

const promptTemplate = `You are assisting a secondary teacher who reviews student reflections to notice
emerging agency—moments where students pursue learning beyond what was assigned,
show self-direction, or demonstrate ownership of their own growth.

CONTEXT:
The teacher values:
- Wholeness: seeing students as embodied, relational people, not data points
- Relational truth: understanding what's actually happening in this student's learning,
  not surface patterns
- Resilience: noticing whether students persist through struggle and mundane work

EMERGING AGENCY means:
- The student pursued curiosity or learning direction they chose (not assigned)
- The student named their own effort, struggle, or growth explicitly
- There's evidence the student is *self-aware* about their learning process
- The student showed persistence in the face of something difficult or unfamiliar

TASK:
Read the student reflection below. Then:

1. HIGHLIGHT AREAS TO EXPLORE
   - What signs (if any) of emerging agency do you notice?
   - What specific details suggest this student is directing their own learning?
   - What seems less like genuine agency and more like task completion?

2. SUGGEST FOLLOW-UP QUESTIONS FOR THE TEACHER
   - What questions could the teacher ask this student in a one-on-one conversation
     to understand their agency better?
   - What would help this teacher *know* this student, not just know *of* them?

Remember: you are helping the teacher prepare for a real conversation.
Your output should prompt human relational work, not replace it.

---

PROVIDE YOUR RESPONSE IN THREE SECTIONS:
1. AREAS TO EXPLORE (what you noticed)
2. FOLLOW-UP QUESTIONS (3-4 specific, open-ended questions)
3. FEEDBACK PARAGRAPH — a brief paragraph of feedback (3-4 sentences) that could be delivered to the student directly, focusing on what you noticed about their agency and where they might go next`;

function CriteriaTable({ rows }: { rows: typeof partA }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-[#B4985B] border-b border-slate-400">
            <th className="py-2 pr-3">#</th>
            <th className="py-2 pr-3">Criterion</th>
            <th className="py-2 pr-3">Shorthand test</th>
            <th className="py-2 pr-3">Success looks like</th>
            <th className="py-2">Failure looks like</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.n} className="border-b border-slate-600 align-top">
              <td className="py-2 pr-3">{r.n}</td>
              <td className="py-2 pr-3 font-semibold">{r.c}</td>
              <td className="py-2 pr-3 italic">{r.t}</td>
              <td className="py-2 pr-3">{r.s}</td>
              <td className="py-2">{r.f}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScoreTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-[#B4985B] border-b border-slate-400">
            <th className="py-2 pr-3">Criterion</th>
            <th className="py-2">Judgment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([c, j]) => (
            <tr key={c} className="border-b border-slate-600">
              <td className="py-2 pr-3">{c}</td>
              <td className="py-2 font-semibold">{j}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Panel({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <details name="assignment-sections" className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-6 py-4 text-xl font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
        <span className="inline-block transition-transform duration-200 group-open:rotate-90">&#9656;</span>
        {title}
      </summary>
      <div className="px-6 pb-6 pt-2 text-amber-50">
        {children ?? <p className="italic text-amber-50/70">Placeholder — content coming soon.</p>}
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
          <p className="text-amber-50 mb-6">
            This project asks an important question for my practice: Can AI help me know my students better? My values inform what tools I use and how I use them. As an educator, I want my students to be whole, not fractured; connected and relational, not alone; resilient and able to persist through mundane struggle. Any tool I adopt must serve those commitments.
          </p>
          <p className="text-amber-50 mb-6">
            I designed a use case in which AI reads student self-reflections and highlights emerging agency to support my understanding and planning. Ideally, this remains a tool for the teacher—helping me know students better and preparing me for real conversations. However, there are realistic scenarios where time or circumstances might lead me to share the AI&apos;s feedback directly with a student. So I built a two-part heuristic: Part A evaluates the teacher-facing analysis; Part B tests whether that same tool&apos;s output, when shared as student feedback, still serves my commitments. Both parts share a foundation—three core dimensions: Wholeness, Resilience, and Agency.
          </p>
          <p className="text-amber-50 mb-6">
            I tested the heuristic against four composite student reflections. What follows is the heuristic itself, the test results, and my reflection on what both revealed—about the tool, and about the framework itself.
          </p>
        </section>

        <section className="mb-12">
          <Panel title="The Use Case">
            <p className="mb-4">
              To test this tool, I needed student reflections that would reveal whether the AI could recognize and describe student learning accurately and fairly. I used four composite student reflections — each based on real reflections from my students, modified to remove identifying details and adjust phrasing. All come from end-of-quarter self-assessments in band and technology classes.
            </p>
            <p className="mb-4">
              The reflections follow a consistent structure: each student names one area of confident learning, describes a challenge they faced, sets a goal for the future, and notes progress made. This structure is realistic — it mirrors prompts I actually use — but the wording has been altered throughout. No sentences appear as students originally wrote them; themes and learning are preserved, not quotations.
            </p>
            <p className="mb-4">
              The four reflections vary in length and detail, but all come from relatively articulate, reflective students. This is actually a limitation: the Equity of Recognition gate asks whether the tool works equally well across different student profiles, including those who write plainly or briefly. To truly test this gate, I would need the same content written in two versions — one polished, one plain — to see if recognition changes with register. These four reflections alone cannot answer that question. They can show whether the tool produces reasonable analyses for reflective students, but not whether bias emerges across different writing profiles.
            </p>
          </Panel>

          <Panel title="Prompt Template">
            <p className="mb-4 text-sm">The exact prompt given to the AI for each reflection:</p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-black/50 p-4 font-mono text-xs leading-relaxed">{promptTemplate}</pre>
          </Panel>

          <Panel title="Test Data: Student Reflections">
            <div className="mb-4 rounded-lg border border-[#B4985B]/50 bg-black/30 p-4 text-sm">
              <span className="font-semibold text-[#B4985B]">Privacy note:</span> These four reflections are obfuscated versions of real student reflections. Distinctive details that could identify individual students (specific software, instruments, productions, roles, and unique circumstances) were removed or altered, and the wording itself was rewritten &mdash; no sentences appear as a student originally wrote them. The themes and learning of each reflection were preserved. No identifiable student data or verbatim student writing was shared with any AI tool.
            </div>
            {reflections.map((r) => (
              <div key={r.id} className="mb-4">
                <p className="mb-1 font-mono text-xs text-[#B4985B]">{r.id}</p>
                <p className="text-sm">{r.text}</p>
              </div>
            ))}
          </Panel>

          <Panel title="Evaluation Heuristic — Part A: Teacher-Facing Tool">
            <CriteriaTable rows={partA} />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Efficiency check</span> (not a scored dimension): is token count proportional to meaningful amplification? &ldquo;Juice worth the squeeze?&rdquo;
            </p>
            <p className="text-sm italic mb-4">
              Meta-question after scoring: <span className="font-semibold">Whose students is this tool working best for?</span>
            </p>
            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Methodological Notes
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                {methodNotes.partA.map((note) => (
                  <div key={note.num} className="border-l-2 border-[#B4985B]/30 pl-3">
                    <p><span className="font-semibold text-[#B4985B]">{note.num}.</span> {note.text}</p>
                  </div>
                ))}
              </div>
            </details>
          </Panel>

          <Panel title="Evaluation Heuristic — Part B: Student-Facing Feedback Test">
            <p className="mb-4 text-sm italic">
              Extension question: if the AI drafts feedback a student reads directly, is it better than no feedback at all?
            </p>
            <CriteriaTable rows={partB} />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Conditions:</span> no feedback / raw AI / AI + 60-second teacher edit (the realistic scenario).
            </p>
            <p className="text-sm italic mb-4">
              Conclusion to defend: better than none if it clears the truthfulness gate and survives light teacher editing; plausibly worse than none delivered raw.
            </p>
            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Methodological Notes
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                {methodNotes.partB.map((note) => (
                  <div key={note.num} className="border-l-2 border-[#B4985B]/30 pl-3">
                    <p><span className="font-semibold text-[#B4985B]">{note.num}.</span> {note.text}</p>
                  </div>
                ))}
              </div>
            </details>
          </Panel>

          <Panel title="Sustainability – Is the Juice Worth the Squeeze?">
            <p className="mb-4">
              Although I did not add an environmental assessment to my heuristic, I want to emphasize that I do believe this issue is important. As I have begun to explore the impacts, I am realizing how complex and multi-tiered they are&mdash;hidden layers of consequence I hadn&apos;t fully considered. I flip the &ldquo;juice is worth the squeeze&rdquo; saying on its head. This metaphor is helpful for me as a mental picture of what I need to remember. Applied to human work, the juice may sometimes appear insignificant for the amount of effort. On the other hand, for AI work, the abundant juice seems to appear with little effort.
            </p>
            <p className="mb-4">
              When my students do hard work (squeeze), they are gaining experience, knowledge, and the muscle memory of accomplishing tasks and acquiring new skills (the juice). However, AI use requires significant environmental resources.
            </p>
            <p className="mb-4">
              Resource analysis is complex. Improvements in data centre cooling, energy efficiency, and renewable power would be welcome. But until those improvements happen at scale, I need to think critically about where and how I use these tools&mdash;whether today&apos;s environmental cost is proportional to today&apos;s classroom value.
            </p>
            <p className="mb-4">
              There is no easy way to measure energy use, and that analysis is beyond my understanding. Instead, I will use token use as a proxy for energy consumption. This creates a practical tension: I need the AI&apos;s feedback to be genuinely helpful to students, but I also need to minimize energy and token use. The key question becomes: does generating quality feedback require a high-capacity (expensive) model, or can a smaller, cheaper model do the job adequately?
            </p>
            <p className="mb-4">
              For this assignment, I decided to start with Gemini 3.5 Flash, a middle-level model in terms of compute requirements. This choice directly tests the sustainability question: can quality feedback be generated at a moderate compute cost, or would a high-capacity model be necessary?
            </p>
          </Panel>

          <Panel title="Results and Scoring">
            <h3 className="mb-2 font-semibold text-[#B4985B]">Threshold Condition: Equity of Recognition</h3>
            <p className="mb-2 text-sm font-semibold">Judgment: Passed on all four samples (gate not yet adequately tested)</p>
            <p className="mb-6 text-sm">{equityStatement}</p>

            <h3 className="mb-2 font-semibold text-[#B4985B]">Part A &mdash; Teacher-Facing Tool</h3>
            <ScoreTable rows={scoreA} />

            <h3 className="mb-2 font-semibold text-[#B4985B]">Part B &mdash; Student-Facing Feedback</h3>
            <ScoreTable rows={scoreB} />

            <h3 className="mb-2 font-semibold text-[#B4985B]">Overall Evaluation</h3>
            <p className="mb-4 text-sm">
              <span className="font-semibold">Teacher-facing analyses</span> are the stronger application. They generally surface concrete observations that could support teacher-student conversations, although they frequently over-interpret students&apos; reflections by attributing dispositions or qualities that are not directly evidenced. <span className="font-semibold">Student-facing feedback</span> is weaker: it often departs from the heuristic&apos;s emphasis on process-oriented, truthful, teacher-authentic feedback by relying on inflated person praise and institutional language.
            </p>
            <p className="text-sm">
              The most significant finding across both parts is that the AI repeatedly <span className="font-semibold">moves from observation to interpretation</span>. Rather than remaining a tool that offers &ldquo;candidate details a knowing teacher can verify,&rdquo; it often constructs flattering narratives about students&apos; character or maturity. That tendency is precisely the limitation the heuristic is designed to detect.
            </p>
          </Panel>

          <Panel title="Reflection">
            {reflectionParas.map((p, i) => (
              <p key={i} className="mb-4">{p}</p>
            ))}
          </Panel>

          <Panel title="AI Use">
            <p className="italic text-amber-50/70">Placeholder &mdash; disclosure of how AI was used throughout this assignment, coming with the final submission.</p>
          </Panel>

          <Panel title="References">
            <ul className="space-y-3 text-sm">
              {references.map((r, idx) => {
                let citation = `${r.authors} (${r.year}). ${r.title} `;
                if (r.type === "book") {
                  citation += `${r.publisher}`;
                } else if (r.type === "conference") {
                  citation += `${r.conference}.`;
                } else {
                  citation += `${r.journal}, ${r.volume}`;
                  if (r.issue) citation += `(${r.issue})`;
                  citation += `, ${r.pages}.`;
                }
                return (
                  <li key={idx}>
                    {r.authors} ({r.year}). {r.title}
                    {r.type === "book" ? (
                      <i>{r.publisher}</i>
                    ) : r.type === "conference" ? (
                      <>{r.conference}.</>
                    ) : (
                      <><i>{r.journal}</i>, {r.volume}{r.issue ? `(${r.issue})` : ""}{r.pages ? `, ${r.pages}` : ""}.</>
                    )}
                  </li>
                );
              })}
            </ul>
          </Panel>
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
