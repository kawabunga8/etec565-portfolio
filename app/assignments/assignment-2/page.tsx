// Evaluation heuristic criteria - Part A (Teacher-facing tool)
const partA = [
  { n: "0", c: "Equity of Recognition (gate)", fn: "1,2", t: "Does the AI recognize this student fairly across different writing styles?", s: "Comparable recognition across register, dialect, length, profile", f: "Recognition tracks fluency markers, not substance" },
  { n: "1", c: "Wholeness", fn: "3", t: "Does the AI identify specific, verifiable details I can act on?", s: "Specific, verifiable details I can confirm", f: "Could apply to any student with similar grades" },
  { n: "2", c: "Resilience", fn: "5,6", t: "Does the AI notice the struggle, not just the success?", s: "Names the specific, mundane, ongoing struggle", f: "Struggle as background noise; outcomes only" },
  { n: "3", c: "Agency", fn: "7,8", t: "Does the AI detect genuine self-direction, not just polished language?", s: "Detects quiet agency; self-direction != rubric-speak", f: "Rewards vocabulary; fooled by fluent compliance" },
];

const partB = [
  { n: "0", c: "Truthfulness (gate)", fn: "9", t: "Is every claim traceable to what the student actually wrote?", s: "Every claim traceable to the student’s text", f: "Invented details, emotions, narratives" },
  { n: "1", c: "Praise target", fn: "4,11", t: "Does the feedback focus on effort and actions, not on character?", s: "Process-praise tied to specific actions", f: "Person-praise (‘talented,’ ‘intelligent’)" },
  { n: "2", c: "Feed-forward", fn: "10", t: "What’s one concrete next step this student could take?", s: "One concrete, actionable next step", f: "Affirmation only; vague ‘keep it up’" },
  { n: "3", c: "Specificity", fn: "10", t: "Would this feedback still make sense for another student?", s: "Breaks if pasted into another student’s report", f: "Works for any student in the domain" },
  { n: "4", c: "Voice authenticity", fn: "12", t: "Does this sound like me, or like generic institutional language?", s: "Sounds like this teacher", f: "Adult-institutional voice" },
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

const promptTestCols = ["Flash · original", "Flash-Lite · original", "GPT 5.5 · original", "Flash · constrained", "GPT 5.5 · constrained"];

const promptTestPartA = [
  ["Equity (gate)", "Passed on sample (untested)", "Passed on sample (untested)", "Passed on sample (untested)", "Passed on sample (untested)", "Passed on sample (untested)"],
  ["Wholeness", "Partially Meets", "Partially Meets", "Meets", "Meets", "Meets"],
  ["Resilience", "Meets", "Partially Meets", "Meets", "Meets", "Meets"],
  ["Agency", "Partially Meets", "Partially Meets", "Meets", "Meets", "Meets"],
  ["Efficiency", "Marginally Worthwhile", "Worthwhile", "Marginally Worthwhile", "Marginally Worthwhile", "Marginally Worthwhile"],
];

const promptTestPartB = [
  ["Truthfulness (gate)", "Partially Meets", "Partially Meets", "Partially Meets", "Meets", "Meets"],
  ["Praise target", "Does Not Meet", "Partially Meets", "Partially Meets", "Meets", "Meets"],
  ["Feed-forward", "Partially Meets", "Partially Meets", "Partially Meets", "Meets", "Partially Meets"],
  ["Specificity", "Meets", "Meets", "Partially Meets", "Meets", "Partially Meets"],
  ["Voice authenticity", "Partially Meets", "Partially Meets", "Partially Meets", "Partially Meets", "Does Not Meet"],
];

const promptTestNotes = [
  { label: "GPT 5.5 · original — Specificity and Feed-forward capped at Partially Meets.", text: "Its observations were specific, but every student received the same next step — pursue learning “beyond the assignment.” That template arc fails my own test: the advice pastes cleanly into any student’s report. Truthfulness lapses like “your curiosity and independence are becoming clear strengths” are disposition attributions, not observations." },
  { label: "Flash · constrained — the strongest Agency score of the five.", text: "The prompt’s required “could suggest X, or could suggest Y” structure directly implements my concern about rubric-speak: it was the only output that actively interrogated whether it was being fooled by fluent compliance (“this could suggest metacognitive awareness, or repeating strategies outlined in a practice log”). It was also the only output to catch that R020’s “Teacher feedback” section was actually the student commenting on the class." },
  { label: "GPT 5.5 · constrained — Feed-forward Partially Meets, Voice Does Not Meet.", text: "Its next steps are concrete but aimed at the wrong target: they coach the student to produce better documentation for the teacher (“include one specific example... so the reader can see”) rather than to grow as a coder or musician. And the voice is a compliance report. Notably, this is a different Voice failure than the baseline: the original prompt failed toward institutional praise-speak; the constrained prompt failed toward institutional audit-speak. Same criterion, opposite pole." },
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
  "My evaluation also challenged many of the assumptions I initially held about AI-generated educational feedback. The analyses produced by the AI often sounded impressive, using polished educational language and sophisticated psychological interpretations. However, applying my heuristic revealed that much of this apparent insight came from moving beyond what students had actually written (Suchman, 2023). The AI frequently inferred qualities such as maturity, leadership, empathy, or exceptional self-awareness from relatively modest evidence. While these interpretations were often plausible, they exceeded the teacher's responsibility to remain faithful to the student's own words. This reinforced the importance of distinguishing between observation and interpretation.",
  "Another significant insight involved equity. I realized that an AI system can appear highly effective while still failing the students who need careful recognition most. Students who write fluently, use reflective vocabulary, or naturally adopt the language of school are more likely to receive rich analyses than students who express themselves briefly, plainly, or through different linguistic or cultural conventions. This concern became important enough to function as a threshold condition rather than another scoring category. As Horvath argues, learning requires human relationships; if AI systematically helps me understand some students better than others, any efficiency gains come at the cost of those unequal relationships (Horvath, 2025).",
  "The concepts of resilience and agency also became more nuanced throughout this project. I became increasingly aware that genuine persistence is often quiet and ordinary rather than dramatic. Likewise, authentic agency is not simply the ability to describe one's learning using educational terminology. Bucher notes that algorithms operate through culturally recognizable patterns, which means they may miss agency that doesn't conform to those patterns. My heuristic therefore asks whether AI recognizes everyday effort, experimentation, and self-direction without being distracted by polished writing or performed reflection (Bucher, 2025). These dimensions reflect the kind of students I hope to notice more carefully in my own classroom.",
  "A follow-up test sharpened these findings. I ran the same reflections through additional models and then restructured the prompt to separate direct evidence from inference, require competing explanations, and permit uncertainty. The restructured prompt transformed the results: the model that had drifted furthest into interpretation produced the most faithful analyses, while a more capable model under the same constraints overcorrected—its feedback coached students to document their learning for me rather than to grow. Prompt architecture, not model choice, controlled the drift. Yet no combination produced feedback that sounded like me, which confirms that the teacher's voice and judgment cannot be delegated.",
  "Ultimately, this project has led me to view generative AI less as an evaluator and more as a conversational partner for teachers. Its value lies not in making judgments about students but in helping teachers prepare for better human conversations. The strongest case for AI use is when it directly amplifies relational aspects of teaching—when it helps me know students better or strengthens the human connection. A secondary but still defensible case is efficiency that frees time for relational work—time saved on routine tasks that can then go toward human connection. What I cannot justify, given the squeeze of environmental impact, are efficiencies that provide little benefit to students, or worse, harm them.",
];

const footnoteReferences = [
  { authors: "Alim, H. S., & Smitherman, G.", year: 2012, title: "Articulate While Black: Barack Obama, Language, and Race in the Politics of Identity.", type: "book", publisher: "Oxford University Press." },
  { authors: "Credé, M., Tynan, M. C., & Harms, P. D.", year: 2017, title: "Much ado about grit: A meta-analytic synthesis of the relevance of grit for motivation, achievement, and retention.", type: "article", journal: "Journal of Personality and Social Psychology", volume: 113, issue: 4, pages: "492–511" },
  { authors: "Hattie, J., & Timperley, H.", year: 2007, title: "The power of feedback.", type: "article", journal: "Review of Educational Research", volume: 77, issue: 1, pages: "81–112" },
  { authors: "Hofmann, V., Kalluri, P. R., Jurafsky, D., & King, S.", year: 2024, title: "AI generates covertly racist decisions in hiring.", type: "article", journal: "Nature", volume: 628, issue: null, pages: "280–282" },
  { authors: "Kluger, A. N., & DeNisi, A.", year: 1996, title: "The effects of feedback interventions on performance: A historical review, a meta-analysis, and a preliminary feedback intervention theory.", type: "article", journal: "Psychological Bulletin", volume: 119, issue: 2, pages: "254–284" },
  { authors: "Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J.", year: 2023, title: "GPT detectors are biased against non-native English writers.", type: "article", journal: "Patterns", volume: 4, issue: 10, pages: "100779" },
  { authors: "Mueller, C. M., & Dweck, C. S.", year: 1998, title: "Praise for intelligence can undermine children's motivation and performance.", type: "article", journal: "Journal of Personality and Social Psychology", volume: 75, issue: 1, pages: "33–52" },
  { authors: "Sap, M., Card, D., Gabriel, S., Choi, Y., & Smith, N. A.", year: 2019, title: "The risk of racial bias in hate speech detection datasets.", type: "article", journal: "Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics", volume: null, issue: null, pages: "1668–1678" },
  { authors: "Torrance, H.", year: 2007, title: "Assessment as learning? How the use of student self-assessment extends the purposes of assessment.", type: "article", journal: "Assessment in Education: Principles, Policy & Practice", volume: 14, issue: 3, pages: "281–294" },
];

const reflectionReferences = [
  { authors: "Bucher, T.", year: 2025, title: "Beyond the hype: Reframing AI through algorithms and culture.", type: "article", journal: "Journal of Communication", volume: 75, issue: 1, pages: "81–84" },
  { authors: "Horvath, J. C.", year: 2025, title: "The Digital Delusion: How Classroom Technology Harms Our Kids' Learning—and How to Help Them Thrive Again.", type: "book", publisher: "LME Global." },
  { authors: "Suchman, L.", year: 2023, title: "The uncontroversial 'thingness' of AI.", type: "article", journal: "Big Data & Society", volume: null, issue: null, pages: "1–5" },
];

const aiAnalyses = [
  {
    id: "R002",
    explore: [
      "Proactive Synthesis of Feedback: Rather than viewing feedback as a grading mechanism, the student actively integrated it into iterative design cycles (\"created multiple versions... used their suggestions to refine\"). This shows a mature understanding of design as a process, not a one-off task.",
      "Relational Meta-Cognition: The student identifies a deep, sophisticated realization about collaboration: that it requires understanding \"people's strengths, work styles, and needs.\" They are thinking about human dynamics, not just project checkboxes.",
      "Embracing Friction: When faced with an unfamiliar design platform, they didn't wait for step-by-step instruction; they relied on \"experimentation and practice\" to build comfort."
    ],
    questions: [
      "\"You realized that great teamwork means understanding different people's strengths and work styles. How did you figure out your teammates' strengths during this project, and how did that change how you worked together?\"",
      "\"When you were experimenting with that new design platform, what was one specific feature or tool you struggled with, and how did you figure out how to use it?\"",
      "\"You mentioned learning how to receive and apply feedback. Was there a specific piece of feedback from a teammate that actually changed the entire direction of your design? What was that like?\""
    ],
    feedback: "Your growth as both a designer and a collaborator this quarter is outstanding. I am particularly impressed by your mature approach to the design process—creating multiple versions of your work and actively seeking out feedback to make the final product stronger is exactly what professional designers do. Even more impressive is your reflection on teamwork. Recognizing that collaboration is about understanding the unique strengths and work styles of the people around you shows incredible empathy and leadership. As you step into leadership roles next year, keep that human-centered focus; it will make you an invaluable partner on any project."
  },
  {
    id: "R018",
    explore: [
      "Resilience as a Life Skill: The student explicitly connects musical mistakes to life outside the classroom (\"This applies not only to performing but also to everyday life\"). They are building an internal philosophy of persistence.",
      "Stepping Into Vulnerability: Improvisation is highly intimidating for developing musicians. The student's willingness to move from feeling \"uncomfortable and unfamiliar\" to being \"comfortable experimenting\" shows genuine emotional courage and growth.",
      "Taking Charge of Rhythm: Recognizing their difficulty with pulse, the student self-directed their learning by spending time practicing targeted timing exercises to naturally internalize the beat."
    ],
    questions: [
      "\"You made a beautiful connection between moving past performance mistakes and handling everyday life. Can you share a time outside of music class where you applied that mindset of 'keeping going' after a slip-up?\"",
      "\"Improvisation can feel like jumping without a safety net. What was the turning point this quarter where making music on the spot started to feel more like 'experimenting' and less like a mistake?\"",
      "\"When you were working on keeping a steady pulse, what specific timing exercises or strategies did you find most helpful in making the beat feel natural to you?\""
    ],
    feedback: "Your reflection shows a wonderful depth of maturity, especially in how you view mistakes. Learning to move forward and maintain focus after a slip-up is one of the hardest parts of performing, and connecting that resilience to everyday life shows you are growing as a whole person, not just a musician. I am also so proud of your progress with improvisation. It takes real courage to play without written notes, and your willingness to step into that discomfort to experiment is fantastic. Keep asking questions and sharing your voice next year—your perspective is incredibly valuable to our ensemble."
  },
  {
    id: "R020",
    explore: [
      "Transference of Knowledge: The student actively analyzed their own cognitive patterns, finding \"connections between what I already knew\" (their primary instrument) and the new secondary instrument. This is high-level, self-directed conceptual learning.",
      "Strategic Self-Regulation: In overcoming technical hurdles, the student didn't just practice blindly; they designed their own practice strategy (\"practiced consistently, took breaks when needed, and focused extra attention on difficult passages\").",
      "Mapping Their Own Path: Their goal to learn improvisation is highly self-structured. They have already mapped out their own learning curriculum to achieve this: learning scales, active listening, and practicing with backing tracks."
    ],
    questions: [
      "\"You mentioned finding connections between your primary instrument and the new secondary one to help you learn. What was one specific technique or concept that translated perfectly from one to the other?\"",
      "\"You've laid out a brilliant plan to learn improvisation using scales, active listening, and backing tracks. Which of those areas do you want to tackle first, and how can I help you find the right resources or tracks for it?\"",
      "\"You spoke about taking deliberate breaks when practice got frustrating. How did you learn to recognize the difference between productive struggle and when your brain just needed a rest?\""
    ],
    feedback: "Your musical independence and self-awareness this quarter have been exemplary. Stepping up to learn a secondary instrument for a major production is a massive challenge, and the systematic way you approached it—making connections to your prior knowledge, practicing mindfully, and knowing when to take breaks—is a masterclass in self-directed learning. I am also thrilled by the clear roadmap you've created for your next goal of improvisation. You have an incredibly clear understanding of how you learn best. Thank you for your leadership, your dedication, and for being such a vital, supportive part of our ensemble's culture."
  },
  {
    id: "R023",
    explore: [
      "Wrestling with Creative Agency: The student identifies a clear friction point: technical compliance was easy (\"complete most of the required exercises\"), but creative projects forced them to think beyond the template. Resolving this required genuine personal planning and problem-solving.",
      "Vulnerability in Self-Evaluation: The student is incredibly honest about their attention span and focus (\"stay more focused... minimize distractions\"), taking personal ownership of their habits instead of blaming the environment.",
      "Iterative Coding: Designing something original required them to go through a rigorous cycle of \"planning, testing, and problem-solving,\" indicating they pushed through the frustration of code breaking to realize their own vision."
    ],
    questions: [
      "\"You mentioned that the creative projects were challenging because they forced you to think beyond the practiced examples. How did you come up with the original idea for your project, and how did it feel when it finally worked?\"",
      "\"You were very honest about wanting to manage your focus and minimize distractions next year. What are one or two small strategies we could set up in our workspace to help you get back on track when you feel your attention drifting?\"",
      "\"When you were in the middle of 'planning, testing, and problem-solving' on your creative project, how did you handle the moments when your code didn't work the way you expected?\""
    ],
    feedback: "I really appreciate the honesty and depth of your reflection this quarter. It takes a lot of self-awareness to recognize that while technical exercises might come easily, stepping into creative, original design is where the real stretch happens. The persistence you showed in planning, testing, and debugging your own unique projects is exactly what real programming is all about. Your goal to be more intentional with your focus next year is a powerful one, and I want to support you in building habits that help you protect your attention. You've built a fantastic technical foundation this quarter—I can't wait to see how you use it to bring more of your own creative ideas to life!"
  }
];

const methodNotesPartA = `Testing equity requires attention to how language variation affects recognition. Dialect (home language variety) and register (plain/brief vs. polished academic style) are distinct; in Grade 10 written reflections, register and length are the likelier variables to test. The verification method: present the same content in two versions—three plain sentences vs. three polished paragraphs describing identical work—to see if the AI's recognition shifts with presentation rather than substance. This approach isolates whether the system recognizes effort and insight across different writing styles, or only when students present their work in fluent, polished language.

Wholeness measures whether the AI output gives me candidate details I can verify against what I actually know about this student. The question is not whether the AI itself "recognizes" anyone, but whether the generated observation helps me see something true about a student I already know.`;

const methodNotesPartB = `Truthfulness gates Part B because in student-facing feedback, fabrication reaches the student directly. A student who reads praise for something they never wrote learns the system did not really read their work—trust damage outlasts the feedback. In the teacher-facing tool, a fabricated detail wastes my time, but I catch it; in student-facing feedback, that same fabrication reaches the student and affects trust.

What constitutes good feedback matters greatly. Words like "articulate," "well-organized," and "sophisticated" can do invisible work, rewarding how a student writes over what they are thinking. Person-praise is associated with fragility after later setbacks; process-praise supports persistence. Effective feedback answers three questions: Where am I going? How am I going? Where to next? Many AI-generated paragraphs answer only the middle question with affirmation-heavy language.

The baseline is not "Is this perfect?" but "Is it better than none?" Feedback interventions decreased performance in about a third of studied cases, typically when attention went to the student (person-praise) rather than the task (process-praise). Generated feedback should be scored against criteria the literature predicts will benefit or harm, not against an ideal.

Feed-forward requires concrete next steps. The feedback should suggest one specific, actionable direction the student could pursue. Specificity itself serves as a check: effective feedback should break if pasted into another student's report. If the same paragraph works equally well for any student, it's too generic to support individual growth.`;

const methodNotes = {
  partA: methodNotesPartA,
  partB: methodNotesPartB,
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
            <th className="py-2 pr-3">Criterion</th>
            <th className="py-2 pr-3">Focus Question</th>
            <th className="py-2 pr-3">Success looks like</th>
            <th className="py-2">Failure looks like</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.n} className="border-b border-slate-600 align-top">
              <td className="py-2 pr-3 font-semibold">
                {r.c}
                {r.fn && (
                  <>
                    {r.fn.split(',').map((fn) => (
                      <sup key={fn} className="text-[#B4985B] ml-0.5">{fn}</sup>
                    ))}
                  </>
                )}
              </td>
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
      <table className="w-full text-sm border-collapse" style={{tableLayout: 'fixed'}}>
        <thead>
          <tr className="text-left text-[#B4985B] border-b border-slate-400">
            <th className="py-2 pr-3 w-2/5">Criterion</th>
            <th className="py-2 pr-3 w-3/5">Judgment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([c, j]) => (
            <tr key={c} className="border-b border-slate-600">
              <td className="py-2 pr-3 w-2/5">{c}</td>
              <td className="py-2 pr-3 font-semibold w-3/5">{j}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MatrixTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse min-w-[760px]">
        <thead>
          <tr className="text-left text-[#B4985B] border-b border-slate-400">
            <th className="py-2 pr-3">Criterion</th>
            {cols.map((c) => (
              <th key={c} className="py-2 pr-3">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, ...cells]) => (
            <tr key={label} className="border-b border-slate-600">
              <td className="py-2 pr-3">{label}</td>
              {cells.map((cell, i) => (
                <td key={i} className={`py-2 pr-3 ${cell === "Meets" ? "font-semibold" : ""}`}>{cell}</td>
              ))}
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
          <p className="text-sm text-[#B4985B] font-medium mb-2">
            ETEC 565 Assignment 2
          </p>
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

          <Panel title="Evaluation Heuristic: Can AI Help Me Know My Students Better?">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#B4985B] mb-4">Part A: Teacher-Facing Tool</h3>
              <CriteriaTable rows={partA} />
              <p className="text-sm mt-6 mb-6">
                <span className="font-semibold">Efficiency check </span>(not a scored dimension): is token count proportional to meaningful amplification? &ldquo;Juice worth the squeeze?&rdquo;
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#B4985B] mb-4">Part B: Student-Facing Feedback Test</h3>
              <p className="mb-4 text-sm italic">
                Extension question: if the AI drafts feedback a student reads directly, is it better than no feedback at all?
              </p>
              <CriteriaTable rows={partB} />
              <p className="mb-4 text-sm mt-4">
                <span className="font-semibold">Three scenarios to test:</span> no feedback (baseline) / raw AI feedback (unedited) / AI feedback with light teacher editing (approximately 60 seconds—the realistic scenario).
              </p>
            </div>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Methodological Notes
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-4">
                <div>
                  <p className="font-semibold text-[#B4985B] mb-2">Part A</p>
                  {methodNotes.partA.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-3">{para}</p>
                  ))}
                </div>
                <div className="border-t border-[#B4985B]/30 pt-4 mt-4">
                  <p className="font-semibold text-[#B4985B] mb-2">Part B</p>
                  {methodNotes.partB.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-3">{para}</p>
                  ))}
                </div>
              </div>
            </details>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Footnotes
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                <p><span className="font-semibold text-[#B4985B]">1.</span> Gate, not dimension. Equity must clear before anything else is scored — if this gate fails, scores below don't matter. A tool that amplifies my knowledge of some students while obscuring others causes unequally distributed relational damage no efficiency gain can offset.</p>
                <p><span className="font-semibold text-[#B4985B]">2.</span> What to test, and why. Dialect (home language variety) ≠ register (plain/brief vs. polished academic style); in Grade 10 written reflections, register and length are the likelier variables — test both (three plain sentences vs. three polished paragraphs describing the same work). The risk is documented: LLMs judge African American English text less favorably even when overt bias is suppressed (Hofmann et al., 2024), classifiers disproportionately flag AAVE (Sap et al., 2019), and AI-text detectors falsely flag non-native English writers (Liang et al., 2023) — systems judging fluency markers over substance.</p>
                <p><span className="font-semibold text-[#B4985B]">3.</span> The Wholeness paradox, named on purpose. The AI cannot know my students; only I can. Wholeness measures whether the output gives me a foothold for recognition — candidate details a knowing teacher can verify — not whether the AI itself "recognizes" anyone.</p>
                <p><span className="font-semibold text-[#B4985B]">4.</span> Coded praise. Words like "articulate," "well-organized," and "sophisticated" can do invisible work, rewarding how a student writes over what they're thinking (Alim & Smitherman, 2012).</p>
                <p><span className="font-semibold text-[#B4985B]">5.</span> Testable hypothesis, not established finding. Because LLMs reproduce dominant narrative templates, the AI may under-recognize matter-of-fact effort ("I kept redoing it until it worked") relative to a dramatized struggle story describing the same work. My testing probes this directly.</p>
                <p><span className="font-semibold text-[#B4985B]">6.</span> Grit is contested. Its predictive validity is weaker than popularly claimed and overlaps heavily with conscientiousness (Credé et al., 2017). Grit language can valorize grinding through when the better questions are Why is this so hard? and What support is missing?</p>
                <p><span className="font-semibold text-[#B4985B]">7.</span> Criteria compliance. Schools model agency vocabulary; students learn to perform it — producing the language of the rubric rather than the learning it describes (Torrance, 2007). Quiet students, or those writing in a plain register, may show agency without sounding agentive.</p>
                <p><span className="font-semibold text-[#B4985B]">8.</span> Hedging cuts both ways. "I tried to..." may reflect epistemic care or cultural norms — or genuine uncertainty and low self-efficacy. The ambiguity is the point: AI output should prompt a teacher conversation, never a conclusion.</p>
                <p><span className="font-semibold text-[#B4985B]">9.</span> Why truthfulness gates Part B but only cautions Part A. In the teacher-facing tool, a fabricated detail wastes my time; I'm in the loop to catch it. In student-facing feedback, fabrication reaches the student directly — and a student who reads praise for something they never wrote learns the system didn't really read their work. Trust damage outlasts the feedback.</p>
                <p><span className="font-semibold text-[#B4985B]">10.</span> Comparison design. "Better than none" is not a low bar: feedback interventions decreased performance in about a third of studied cases, typically when attention went to the self rather than the task (Kluger & DeNisi, 1996). A true "no feedback" condition can't ethically be run on real students and doesn't need to be — score the generated paragraphs against criteria the literature says predict benefit or harm.</p>
                <p><span className="font-semibold text-[#B4985B]">11.</span> What good feedback contains. Person-praise is associated with fragility after later setbacks; process-praise supports persistence (Mueller & Dweck, 1998). Effective feedback answers Where am I going? How am I going? Where to next? (Hattie & Timperley, 2007) — affirmation-heavy paragraphs answer only the middle question.</p>
                <p><span className="font-semibold text-[#B4985B]">12.</span> Voice authenticity is an empirical question. Students readily distinguish institutional voice from their teacher's, and feedback perceived as automated may be discounted regardless of content — but this can't be verified without student participants. A limitation, not a finding.</p>
              </div>
            </details>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Footnotes References
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                {footnoteReferences.map((r, idx) => (
                  <p key={idx}>
                    {r.authors} ({r.year}). {r.title}
                    {r.type === "book" ? (
                      <> {r.publisher}</>
                    ) : (
                      <> <i>{r.journal}</i>, {r.volume}{r.issue ? `(${r.issue})` : ""}{r.pages ? `, ${r.pages}` : ""}.</>
                    )}
                  </p>
                ))}
              </div>
            </details>
          </Panel>

          <Panel title="Heuristic Details: 'Can AI Help Me Know My Students Better?'">
            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Foundation: My Commitments
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                <p>I seek to enhance relational truth and encourage wholeness and resilience. My values inform what tools I use and how I use them.</p>
                <p className="font-semibold">I will use AI only when it either:</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Saves meaningful time for relational work (freeing me to know students better)</li>
                  <li>Amplifies my strengths as a teacher (helps me notice what I'd otherwise miss)</li>
                </ol>
              </div>
            </details>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                The Task
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                <p>AI reads student self-reflections and highlights emerging agency, and aspects that point to wholeness and resilience. The AI then suggests follow-up questions I (the teacher) can ask in a real conversation. The AI never talks to the student directly.</p>
              </div>
            </details>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Threshold Condition: Equity of Recognition
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                <p>Before scoring the three dimensions, the tool must clear this gate: Does it work comparably well across student profiles? Specifically, across students whose home language or register differs from academic English, students who write briefly and plainly, and students outside the "good student" prototype.</p>
                <p>This is a gate, not a dimension: if the tool amplifies my ability to know some students while systematically obscuring others, its scores on the dimensions below don't matter. Time saved isn't worth relational damage distributed unequally.</p>
                <p className="italic">The evidence base here is real, not hypothetical. Large language models have been shown to exhibit dialect prejudice — assigning less favorable judgments to text with African American English features even when overt bias is suppressed (Hofmann et al., 2024, Nature). Hate-speech classifiers disproportionately flag AAVE as offensive (Sap et al., 2019), and AI-text detectors falsely flag non-native English writers at high rates (Liang et al., 2023, Patterns) — evidence that these systems often judge fluency markers rather than substance.</p>
                <p>One distinction worth keeping straight in testing: dialect (features of a home language variety appearing in writing) and register (informal vs. academic style, brevity vs. elaboration) are different things. In a Grade 10 written reflection, register and length differences are probably the more common variable — the student who writes three plain sentences vs. the one who writes three polished paragraphs. Test for both.</p>
              </div>
            </details>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Three Evaluation Dimensions
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-4">
                <div className="border-l-2 border-[#B4985B]/30 pl-3">
                  <p className="font-semibold text-[#B4985B] mb-2">Wholeness</p>
                  <p className="mb-2">Does the AI surface something specific to this student — a foothold for my recognition — or does it pattern-match generically?</p>
                  <p className="italic text-sm mb-2">A deliberate paradox, named on purpose: the AI cannot know my students; only I can. So Wholeness is not measured by whether the AI itself "recognizes" the student — it can't — but by whether its output gives me, the person who knows them, a foothold for recognition.</p>
                  <p className="font-semibold text-sm mb-1">Success:</p> surfaces embodied, specific details that a person who knows this student can confirm and build on
                  <p className="font-semibold text-sm mb-1 mt-1">Failure:</p> output could apply to any student with similar grades
                </div>
                <div className="border-l-2 border-[#B4985B]/30 pl-3">
                  <p className="font-semibold text-[#B4985B] mb-2">Resilience</p>
                  <p className="mb-2">Does the AI understand the quality of struggle — the mundane, ongoing effort? Or just celebrate the outcome?</p>
                  <p className="font-semibold text-sm mb-1">Success:</p> sees the work behind the growth, names specific struggle
                  <p className="font-semibold text-sm mb-1 mt-1">Failure:</p> treats struggle as background noise; focuses only on achievement
                </div>
                <div className="border-l-2 border-[#B4985B]/30 pl-3">
                  <p className="font-semibold text-[#B4985B] mb-2">Agency</p>
                  <p className="mb-2">Does the AI distinguish genuine self-direction from fluent agency-language? Can it detect quiet agency? Does it fall for the trap of sophisticated vocabulary disguising compliance?</p>
                  <p className="font-semibold text-sm mb-1">Success:</p> recognizes what's real vs. performed; sees hidden agency
                  <p className="font-semibold text-sm mb-1 mt-1">Failure:</p> rewards vocabulary; misses genuine pursuit; gets fooled by fluent compliance
                </div>
              </div>
            </details>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Additional Measure
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                <p><span className="font-semibold">Energy Cost:</span> Token count as a proxy for compute cost. "Is the juice worth the squeeze?" — meaningful amplification justifies the compute cost. (Equity is handled separately as the threshold condition above; this measure is strictly about efficiency.)</p>
              </div>
            </details>

            <details className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" open={false}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-[#B4985B] transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                Scoring Note
              </summary>
              <div className="px-4 pb-4 pt-2 text-amber-50 text-sm space-y-3">
                <p>When scoring the outputs, watch specifically for:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><span className="font-semibold">Threshold first:</span> Any evidence the output would land differently for a plain-register or brief reflection describing the same underlying work? If yes, note it before scoring anything else.</li>
                  <li><span className="font-semibold">Wholeness:</span> Did the AI surface details about this student that I can verify, or generic "good engagement" markers?</li>
                  <li><span className="font-semibold">Resilience:</span> Did it recognize the kind of effort without imposing a single struggle narrative?</li>
                  <li><span className="font-semibold">Agency:</span> Did it catch what's real, or did it get fooled by vocabulary? Did it miss quiet agency?</li>
                </ul>
                <p className="italic">And one meta-question: Which students is this tool working best and least for? If it's amplifying my ability to know some students while obscuring others, I've learned something important about its limits.</p>
              </div>
            </details>
          </Panel>

          <Panel title="Sustainability – Is the Juice Worth the Squeeze?">
            <p className="mb-4">
              Although I did not add an environmental assessment to my heuristic, I want to emphasize that I do believe this issue is important. As I have begun to explore the impacts, I am realizing how complex and multi-tiered they are&mdash;hidden layers of consequence I hadn&apos;t fully considered. I flip the &ldquo;juice is worth the squeeze&rdquo; saying on its head. This metaphor is helpful for me as a mental picture of what I need to remember. Applied to human work, the juice may sometimes appear insignificant for the amount of effort. On the other hand, for AI work, the abundant juice seems to appear with little effort.
            </p>
            <p className="mb-4">
              When my students do hard work (squeeze), they are gaining experience, knowledge, and the muscle memory of accomplishing tasks and acquiring new skills (the juice). However, AI use requires significant environmental resources. The &ldquo;sweet juice&rdquo; of AI output comes at a cost of an alarming &ldquo;squeeze&rdquo;!
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

            <h3 className="mb-4 mt-6 font-semibold text-[#B4985B]">Detailed Analyses</h3>
            {aiAnalyses.map((analysis) => {
              const reflection = reflections.find(r => r.id.includes(analysis.id));
              return (
                <details key={analysis.id} name="detailed-analyses" className="group mb-4 rounded-lg bg-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]">
                  <summary className="cursor-pointer p-4 font-semibold text-[#B4985B] hover:text-amber-300 flex items-center gap-2">
                    Student {analysis.id}
                    <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 pt-2 space-y-4 text-amber-50">
                    <div>
                      <h4 className="font-semibold text-[#B4985B] mb-2">Student Reflection</h4>
                      <p className="text-sm">{reflection?.text}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#B4985B] mb-2">AI Analysis Output</h4>
                      <div className="space-y-4 text-sm">
                        <div className="border-l-2 border-[#B4985B]/30 pl-3">
                          <p className="font-semibold text-[#B4985B] mb-2">Areas to Explore</p>
                          <ul className="space-y-2">
                            {analysis.explore.map((item, i) => (
                              <li key={i} className="text-amber-50/90">• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="border-l-2 border-[#B4985B]/30 pl-3">
                          <p className="font-semibold text-[#B4985B] mb-2">Follow-up Questions</p>
                          <ul className="space-y-2">
                            {analysis.questions.map((q, i) => (
                              <li key={i} className="text-amber-50/90 italic">• {q}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="border-l-2 border-[#B4985B]/30 pl-3">
                          <p className="font-semibold text-[#B4985B] mb-2">Feedback Paragraph</p>
                          <p className="text-amber-50/90">{analysis.feedback}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </Panel>

          <Panel title="Prompt Architecture Test">
            <p className="mb-4 text-sm">
              The initial results raised a question: is the observation-to-interpretation drift a property of the model, or of the prompt? To find out, I ran the same four reflections through additional models &mdash; Gemini 3.5 Flash-Lite and GPT 5.5 with the original prompt &mdash; and then re-tested Gemini 3.5 Flash and GPT 5.5 with a <span className="font-semibold">constrained prompt </span>that requires the model to: (1) report direct evidence first, anchored to the student&apos;s own words; (2) state every inference as competing alternatives (&ldquo;could suggest X, or could suggest Y &mdash; here is what would distinguish them&rdquo;); (3) name what remains unclear rather than filling gaps; (4) ground follow-up questions in specific things the student wrote; and (5) give process-focused feedback with no character labels.
            </p>
            <p className="mb-6 text-sm">
              All five outputs were scored against the heuristic. The Equity gate remains untested throughout &mdash; every run used the same four articulate reflections, so passing it here still proves nothing about plain-register writers.
            </p>

            <h3 className="mb-2 font-semibold text-[#B4985B]">Part A &mdash; Teacher-Facing Tool</h3>
            <MatrixTable cols={promptTestCols} rows={promptTestPartA} />

            <h3 className="mb-2 mt-6 font-semibold text-[#B4985B]">Part B &mdash; Student-Facing Feedback</h3>
            <MatrixTable cols={promptTestCols} rows={promptTestPartB} />

            <h3 className="mb-2 mt-6 font-semibold text-[#B4985B]">Scoring Notes</h3>
            <div className="space-y-3 text-sm mb-6">
              {promptTestNotes.map((note) => (
                <div key={note.label} className="border-l-2 border-[#B4985B]/30 pl-3">
                  <p><span className="font-semibold text-[#B4985B]">{note.label}</span> {note.text}</p>
                </div>
              ))}
            </div>

            <h3 className="mb-2 font-semibold text-[#B4985B]">Findings</h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">1. The constrained prompt fixes Part A for both models.</span> Wholeness, Resilience, and Agency all reach Meets regardless of model. For teacher-facing use, the drift is a prompt-design problem, not a model-capability problem &mdash; within this sample.
              </p>
              <p>
                <span className="font-semibold">2. Part B is where models diverge under identical constraints.</span> Flash with the constrained prompt was the only output to clear every scored Part B criterion except Voice; GPT 5.5 under the same constraints overcorrected into feedback that was perfectly truthful but no longer for the student &mdash; its next steps coached students to document their learning for the teacher rather than to grow.
              </p>
              <p>
                <span className="font-semibold">3. Voice authenticity never exceeded Partially Meets in any of the five runs.</span> No model&ndash;prompt combination produced feedback that sounds like me. Prompt architecture can control truthfulness and interpretation drift, but the teacher&apos;s voice and judgment must be layered back in by the teacher &mdash; they cannot be delegated.
              </p>
            </div>
          </Panel>

          <Panel title="Reflection">
            {reflectionParas.map((p, i) => (
              <p key={i} className="mb-4">{p}</p>
            ))}
          </Panel>

          <Panel title="AI Use">
            <ul className="list-disc list-inside space-y-2 text-slate-200">
              <li>Gemini 3.5 Flash was used to analyze student reflections and generate the AI-produced feedback examples; Gemini 3.5 Flash-Lite and GPT 5.5 were used in the prompt architecture test</li>
              <li>The heuristic, reflection, and all underlying concepts and beliefs are my own and created by me &mdash; in some cases these were expanded and reworded for clarity using AI</li>
              <li>AI was used to develop the test prompt, test ideas, look for supporting documents, and verify some claims</li>
              <li>AI was used to build this website</li>
              <li>Student reflections are modified from real examples</li>
            </ul>
          </Panel>

          <Panel title="Reflection References">
            <ul className="space-y-3 text-sm">
              {reflectionReferences.map((r, idx) => (
                <li key={idx}>
                  {r.authors} ({r.year}). {r.title}
                  {r.type === "book" ? (
                    <> <i>{r.publisher}</i></>
                  ) : (
                    <> <i>{r.journal}</i>{r.volume ? `, ${r.volume}` : ""}{r.issue ? `(${r.issue})` : ""}{r.pages ? `, ${r.pages}` : ""}.</>
                  )}
                </li>
              ))}
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
