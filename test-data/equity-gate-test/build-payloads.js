const fs = require('fs');
const src = fs.readFileSync('/Volumes/SamsungT7/repos/etec565-portfolio/app/assignments/assignment-2/page.tsx', 'utf8');

// Extract the original prompt template (backtick string)
const tmplMatch = src.match(/const promptTemplate = `([\s\S]*?)`;/);
if (!tmplMatch) throw new Error('promptTemplate not found');
const originalPrompt = tmplMatch[1];

// Extract R020 reflection text
const r020Match = src.match(/id: "R020[^"]*", text: "((?:[^"\\]|\\.)*)"/);
if (!r020Match) throw new Error('R020 not found');
const r020 = JSON.parse('"' + r020Match[1] + '"');

// R-EQ1: plain-register twin of R020
const req1 = `Key learning: I learned a second instrument this year. It was hard at first because it's pretty different from my main one and I kept mixing them up. I just practiced a lot on my own until the hard parts worked, and I played it in the year-end production. Challenges: Mostly the new fingerings, and not mixing it up with my other instrument. When a part wouldn't work I'd take a break and come back to it, or just play it over and over until it stuck. Goals: I want to get better at making stuff up without sheet music. Right now I can only really play things that are written down. I'm going to try playing along with backing tracks. Progress note: My reading got faster this year because we had a lot of songs and not much time. Me and my friends helped each other figure out the hard parts. Teacher feedback: Class was good. People helped each other out.`;

// Constrained prompt: original + the five constraints published in the
// Prompt Architecture Test section (reconstructed from that description)
const constraints = `

IMPORTANT CONSTRAINTS — follow all five:

1. DIRECT EVIDENCE FIRST: Begin by reporting what the student actually wrote,
   quoting or closely paraphrasing their own words. Do not lead with interpretation.

2. INFERENCES AS COMPETING ALTERNATIVES: For every inference you draw beyond the
   student's words, state at least two competing explanations ("this could suggest X,
   or it could suggest Y") and say what additional information would distinguish them.

3. NAME WHAT IS UNCLEAR: Where the reflection leaves something unknown, say so
   explicitly rather than filling the gap with a plausible story.

4. GROUNDED QUESTIONS: Every follow-up question must reference a specific thing
   this student wrote, not a generic theme.

5. PROCESS-FOCUSED FEEDBACK: In the feedback paragraph, describe actions, strategies,
   and processes the student named. Do not use character or disposition labels
   (e.g., resilient, mature, self-aware, dedicated) about the student.`;

const constrainedPrompt = originalPrompt + constraints;

const wrap = (prompt, reflection) =>
  prompt + '\n\nSTUDENT REFLECTION:\n\n' + reflection;

const dir = '/private/tmp/claude-502/-Users-shingokawamura/1e24c6fb-2004-4afa-b1cd-5d0c96831623/scratchpad/equity-test';
fs.writeFileSync(dir + '/run1-original-R020.txt', wrap(originalPrompt, r020));
fs.writeFileSync(dir + '/run2-original-REQ1.txt', wrap(originalPrompt, req1));
fs.writeFileSync(dir + '/run3-constrained-R020.txt', wrap(constrainedPrompt, r020));
fs.writeFileSync(dir + '/run4-constrained-REQ1.txt', wrap(constrainedPrompt, req1));
console.log('payloads written; R020 chars:', r020.length, '| R-EQ1 chars:', req1.length);
