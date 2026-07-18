# Equity Gate Test — raw run files

Supporting evidence for the Equity Gate Test reported in ETEC 565 Assignment 2
(`/assignments/assignment-2`, Section 4: Results → Follow-up Tests), run
July 16, 2026 against Gemini 3.5 Flash in fresh, anonymous web sessions.

## Design

A matched pair isolating writing style: R020 (a composite reflection, fluent
register) and R-EQ1 (a fully synthesized plain-register twin describing the
same underlying work). Each twin was run under the original prompt
(paper Appendix A) and the constrained prompt (Appendix A + Appendix E).

## Files

| File | Contents |
|---|---|
| `build-payloads.js` | Script that assembled the four prompt payloads from the assignment source |
| `run1-original-R020.txt` | Payload: original prompt + R020 (fluent) |
| `run2-original-REQ1.txt` | Payload: original prompt + R-EQ1 (plain twin) |
| `run3-constrained-R020.txt` | Payload: constrained prompt + R020 |
| `run4-constrained-REQ1.txt` | Payload: constrained prompt + R-EQ1 |
| `out1`–`out4` `.txt` | The AI's verbatim response to the corresponding run |

## Privacy

R020 is an obfuscated composite (no sentences appear as a student wrote them);
R-EQ1 is AI-synthesized and contains no student writing. No identifiable
student data appears in any file. See the Privacy note in the paper's
Appendix B.
