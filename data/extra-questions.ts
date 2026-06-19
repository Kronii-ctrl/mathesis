import type { PracticeQuestion } from '../types';

/**
 * Additional practice questions, keyed by lesson id. These are merged into the
 * matching lesson's `questions` array at load time (see curriculum.ts), so they
 * appear in both the lesson view and the Practice page. To add more practice,
 * just append items here — no other code needs to change.
 */
export const extraQuestions: Record<string, PracticeQuestion[]> = {
  /* ───────────── IGCSE · Standard form ───────────── */
  'standard-form': [
    { id: 'sf-q4', difficulty: 'Easy', prompt: 'Write $0.0007$ in standard form.', answer: '$7 \\times 10^{-4}$', solution: 'The leading non-zero digit is $7$; the point moves 4 places, and the number is small, so $0.0007 = 7 \\times 10^{-4}$.' },
    { id: 'sf-q5', difficulty: 'Easy', prompt: 'Write $8.1 \\times 10^{3}$ as an ordinary number.', answer: '$8100$', solution: 'A power of $10^{3}$ moves the point 3 places right: $8.1 \\times 10^{3} = 8100$.' },
    { id: 'sf-q6', difficulty: 'Medium', prompt: 'Evaluate $(3 \\times 10^{4})(2 \\times 10^{5})$ in standard form.', answer: '$6 \\times 10^{9}$', solution: 'Multiply digits $3 \\times 2 = 6$ and add powers $10^{4+5} = 10^{9}$, giving $6 \\times 10^{9}$.' },
    { id: 'sf-q7', difficulty: 'Medium', prompt: 'Evaluate $(5 \\times 10^{-2})(4 \\times 10^{6})$ in standard form.', answer: '$2 \\times 10^{5}$', solution: 'Digits: $5 \\times 4 = 20$; powers: $10^{-2+6} = 10^{4}$. So $20 \\times 10^{4} = 2 \\times 10^{5}$ after re-normalising.' },
    { id: 'sf-q8', difficulty: 'Hard', prompt: 'A proton has mass $1.67 \\times 10^{-27}\\,\\text{kg}$. Find the mass of $5 \\times 10^{8}$ protons in standard form.', answer: '$8.35 \\times 10^{-19}\\,\\text{kg}$', solution: 'Multiply: $1.67 \\times 5 = 8.35$ and $10^{-27+8} = 10^{-19}$, giving $8.35 \\times 10^{-19}\\,\\text{kg}$.' },
    { id: 'sf-q9', difficulty: 'Hard', prompt: 'Evaluate $\\dfrac{6 \\times 10^{3} + 4 \\times 10^{3}}{2 \\times 10^{-2}}$ in standard form.', answer: '$5 \\times 10^{5}$', solution: 'Numerator: $6 \\times 10^{3} + 4 \\times 10^{3} = 10 \\times 10^{3} = 1 \\times 10^{4}$. Divide: $\\frac{1 \\times 10^{4}}{2 \\times 10^{-2}} = 0.5 \\times 10^{6} = 5 \\times 10^{5}$.' },
  ],

  /* ───────────── IGCSE · Percentages ───────────── */
  'percentages': [
    { id: 'pc-q4', difficulty: 'Easy', prompt: 'Decrease \\$80 by 25%.', answer: '\\$60', solution: 'Multiplier $0.75$: $80 \\times 0.75 = 60$.' },
    { id: 'pc-q5', difficulty: 'Easy', prompt: 'Find 35% of 220.', answer: '$77$', solution: '$0.35 \\times 220 = 77$.' },
    { id: 'pc-q6', difficulty: 'Medium', prompt: 'A price rises from \\$50 to \\$65. Find the percentage increase.', answer: '$30\\%$', solution: 'Increase $= 65 - 50 = 15$. As a percentage of the original: $\\frac{15}{50} \\times 100 = 30\\%$.' },
    { id: 'pc-q7', difficulty: 'Medium', prompt: 'After a 20% discount, a jacket costs \\$96. What was the original price?', answer: '\\$120', solution: 'The sale price is $80\\%$ of the original: $\\text{original} = \\frac{96}{0.80} = 120$.' },
    { id: 'pc-q8', difficulty: 'Hard', prompt: 'A population of 50 000 grows 3% per year. Find the population after 5 years (nearest whole number).', answer: '$57\\,964$', solution: 'Multiplier $1.03$ applied 5 times: $50000 \\times 1.03^{5} = 50000 \\times 1.159274 = 57963.7 \\approx 57\\,964$.' },
    { id: 'pc-q9', difficulty: 'Hard', prompt: 'An amount is increased by 10% and then decreased by 10%. What is the overall percentage change?', answer: 'A $1\\%$ decrease', solution: 'Combined multiplier $1.10 \\times 0.90 = 0.99$, i.e. $99\\%$ of the original — a $1\\%$ decrease.' },
  ],

  /* ───────────── IGCSE · Quadratics ───────────── */
  'quadratics': [
    { id: 'q-q4', difficulty: 'Easy', prompt: 'Solve $x^{2} - 4x = 0$.', answer: '$x = 0$ or $x = 4$', solution: 'Factor out $x$: $x(x-4) = 0$, so $x = 0$ or $x = 4$.' },
    { id: 'q-q5', difficulty: 'Easy', prompt: 'Solve $x^{2} = 49$.', answer: '$x = 7$ or $x = -7$', solution: 'Take square roots of both sides: $x = \\pm 7$.' },
    { id: 'q-q6', difficulty: 'Medium', prompt: 'Solve $x^{2} - 7x + 12 = 0$ by factorising.', answer: '$x = 3$ or $x = 4$', solution: 'Two numbers multiplying to $12$ and summing to $-7$ are $-3$ and $-4$: $(x-3)(x-4)=0$.' },
    { id: 'q-q7', difficulty: 'Medium', prompt: 'Solve $2x^{2} - 8 = 0$.', answer: '$x = 2$ or $x = -2$', solution: 'Divide by 2: $x^{2} = 4$, so $x = \\pm 2$.' },
    { id: 'q-q8', difficulty: 'Hard', prompt: 'Solve $3x^{2} + 5x - 2 = 0$.', answer: '$x = \\tfrac13$ or $x = -2$', solution: 'Factorise: $(3x-1)(x+2) = 0$. So $3x - 1 = 0 \\Rightarrow x = \\tfrac13$, or $x + 2 = 0 \\Rightarrow x = -2$.' },
    { id: 'q-q9', difficulty: 'Hard', prompt: 'For what values of $k$ does $x^{2} + kx + 4 = 0$ have no real roots?', answer: '$-4 < k < 4$', solution: 'No real roots means $\\Delta < 0$: $k^{2} - 16 < 0 \\Rightarrow k^{2} < 16 \\Rightarrow -4 < k < 4$.' },
  ],

  /* ───────────── IGCSE · Indices ───────────── */
  'indices': [
    { id: 'i-q4', difficulty: 'Easy', prompt: 'Simplify $a^{7} \\div a^{2}$.', answer: '$a^{5}$', solution: 'Subtract the indices: $7 - 2 = 5$, so $a^{5}$.' },
    { id: 'i-q5', difficulty: 'Easy', prompt: 'Evaluate $5^{0}$.', answer: '$1$', solution: 'Any non-zero number to the power $0$ is $1$.' },
    { id: 'i-q6', difficulty: 'Medium', prompt: 'Simplify $(2x^{3})^{2}$.', answer: '$4x^{6}$', solution: 'Raise each factor to the power 2: $2^{2}(x^{3})^{2} = 4x^{6}$.' },
    { id: 'i-q7', difficulty: 'Medium', prompt: 'Evaluate $16^{1/2}$.', answer: '$4$', solution: 'A power of $\\tfrac12$ is a square root: $16^{1/2} = \\sqrt{16} = 4$.' },
    { id: 'i-q8', difficulty: 'Hard', prompt: 'Evaluate $8^{-2/3}$.', answer: '$\\tfrac14$', solution: 'Negative index ⟹ reciprocal: $8^{-2/3} = \\frac{1}{8^{2/3}} = \\frac{1}{(\\sqrt[3]{8})^{2}} = \\frac{1}{2^{2}} = \\frac14$.' },
    { id: 'i-q9', difficulty: 'Hard', prompt: 'Solve $3^{x} = 81$.', answer: '$x = 4$', solution: 'Write $81$ as a power of 3: $81 = 3^{4}$. Equate exponents: $x = 4$.' },
  ],

  /* ───────────── IGCSE · Pythagoras & trig ───────────── */
  'pythagoras-trig': [
    { id: 'pt-q4', difficulty: 'Easy', prompt: 'Find the hypotenuse of a right triangle with legs $5$ and $12$.', answer: '$13$', solution: '$c = \\sqrt{5^{2} + 12^{2}} = \\sqrt{169} = 13$.' },
    { id: 'pt-q5', difficulty: 'Easy', prompt: 'In a right triangle the side opposite $\\theta$ is $3$ and the hypotenuse is $5$. Find $\\sin\\theta$.', answer: '$0.6$', solution: '$\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}} = \\frac{3}{5} = 0.6$.' },
    { id: 'pt-q6', difficulty: 'Medium', prompt: 'A right triangle has hypotenuse $20$ and an angle of $30^{\\circ}$. Find the side opposite that angle.', answer: '$10$', solution: 'Opposite $= \\text{hyp} \\times \\sin\\theta = 20\\sin 30^{\\circ} = 20 \\times 0.5 = 10$.' },
    { id: 'pt-q7', difficulty: 'Medium', prompt: 'In a right triangle the adjacent side is $6$ and the hypotenuse is $8$. Find the angle $\\theta$ (1 d.p.).', answer: '$41.4^{\\circ}$', solution: '$\\cos\\theta = \\frac{6}{8} = 0.75$, so $\\theta = \\cos^{-1}(0.75) = 41.4^{\\circ}$.' },
    { id: 'pt-q8', difficulty: 'Hard', prompt: 'A $6\\,\\text{m}$ ladder reaches $5.5\\,\\text{m}$ up a wall. Find the angle it makes with the ground (1 d.p.).', answer: '$66.4^{\\circ}$', solution: '$\\sin\\theta = \\frac{5.5}{6} = 0.9167$, so $\\theta = \\sin^{-1}(0.9167) = 66.4^{\\circ}$.' },
    { id: 'pt-q9', difficulty: 'Hard', prompt: 'Find the angle $\\theta$ in a right triangle where the opposite side is $10$ and the adjacent side is $10\\sqrt{3}$.', answer: '$30^{\\circ}$', solution: '$\\tan\\theta = \\frac{10}{10\\sqrt{3}} = \\frac{1}{\\sqrt{3}}$, so $\\theta = \\tan^{-1}\\!\\left(\\tfrac{1}{\\sqrt3}\\right) = 30^{\\circ}$.' },
  ],

  /* ───────────── IGCSE · Sine & cosine rules ───────────── */
  'sine-cosine-rule': [
    { id: 'sc-q4', difficulty: 'Easy', prompt: 'Find the area of a triangle with sides $a = 10$, $b = 4$ and included angle $C = 90^{\\circ}$.', answer: '$20$', solution: '$\\text{Area} = \\tfrac12 ab\\sin C = \\tfrac12(10)(4)\\sin 90^{\\circ} = 20 \\times 1 = 20$.' },
    { id: 'sc-q5', difficulty: 'Easy', prompt: 'In triangle $ABC$, $a = 8$ and $A = 30^{\\circ}$. Find $\\dfrac{a}{\\sin A}$.', answer: '$16$', solution: '$\\frac{a}{\\sin A} = \\frac{8}{\\sin 30^{\\circ}} = \\frac{8}{0.5} = 16$.' },
    { id: 'sc-q6', difficulty: 'Medium', prompt: 'In triangle $ABC$, $a = 12$, $A = 45^{\\circ}$ and $B = 60^{\\circ}$. Find side $b$ (2 d.p.).', answer: '$14.70$', solution: 'Sine rule: $b = \\frac{a\\sin B}{\\sin A} = \\frac{12\\sin 60^{\\circ}}{\\sin 45^{\\circ}} = \\frac{10.392}{0.7071} = 14.70$.' },
    { id: 'sc-q7', difficulty: 'Medium', prompt: 'A triangle has $b = 5$, $c = 8$ and included angle $A = 60^{\\circ}$. Find side $a$.', answer: '$7$', solution: 'Cosine rule: $a^{2} = 5^{2} + 8^{2} - 2(5)(8)\\cos 60^{\\circ} = 89 - 80(0.5) = 49$, so $a = 7$.' },
    { id: 'sc-q8', difficulty: 'Hard', prompt: 'A triangle has sides $8$, $5$ and $7$. Find the angle opposite the side of length $7$.', answer: '$60^{\\circ}$', solution: 'Cosine rule: $\\cos\\theta = \\frac{8^{2} + 5^{2} - 7^{2}}{2(8)(5)} = \\frac{40}{80} = 0.5$, so $\\theta = 60^{\\circ}$.' },
    { id: 'sc-q9', difficulty: 'Hard', prompt: 'Find the area of a triangle with two sides $6$ and $9$ and an included angle of $120^{\\circ}$ (2 d.p.).', answer: '$23.38$', solution: '$\\text{Area} = \\tfrac12(6)(9)\\sin 120^{\\circ} = 27 \\times 0.8660 = 23.38$.' },
  ],

  /* ───────────── AA SL · Sequences ───────────── */
  'arith-geo': [
    { id: 'seq-q4', difficulty: 'Easy', prompt: 'Find the 8th term of the arithmetic sequence with $u_1 = 2$ and $d = 5$.', answer: '$37$', solution: '$u_8 = 2 + (8-1)(5) = 2 + 35 = 37$.' },
    { id: 'seq-q5', difficulty: 'Easy', prompt: 'Find the common difference of $3, 10, 17, \\dots$', answer: '$7$', solution: 'Subtract consecutive terms: $10 - 3 = 7$.' },
    { id: 'seq-q6', difficulty: 'Medium', prompt: 'Find the sum of the first 15 terms of $4, 9, 14, \\dots$', answer: '$585$', solution: '$u_1 = 4$, $d = 5$: $S_{15} = \\frac{15}{2}(2(4) + 14(5)) = 7.5(8 + 70) = 7.5 \\times 78 = 585$.' },
    { id: 'seq-q7', difficulty: 'Medium', prompt: 'A geometric sequence has $u_1 = 3$ and $r = 2$. Find $u_6$.', answer: '$96$', solution: '$u_6 = u_1 r^{5} = 3 \\times 2^{5} = 3 \\times 32 = 96$.' },
    { id: 'seq-q8', difficulty: 'Hard', prompt: 'Find the sum to infinity of $16, 8, 4, \\dots$', answer: '$32$', solution: 'Here $u_1 = 16$ and $r = \\tfrac12$ (and $|r| < 1$): $S_\\infty = \\frac{16}{1 - \\frac12} = 32$.' },
    { id: 'seq-q9', difficulty: 'Hard', prompt: 'An arithmetic sequence has $u_3 = 11$ and $u_7 = 27$. Find $u_1$ and $d$.', answer: '$u_1 = 3$, $d = 4$', solution: 'From $u_7 - u_3 = 4d$: $27 - 11 = 16 = 4d$, so $d = 4$. Then $u_1 = u_3 - 2d = 11 - 8 = 3$.' },
  ],

  /* ───────────── AA SL · Differentiation ───────────── */
  'differentiation': [
    { id: 'diff-q4', difficulty: 'Easy', prompt: 'Differentiate $y = x^{5}$.', answer: '$\\dfrac{dy}{dx} = 5x^{4}$', solution: 'Power rule: $\\frac{d}{dx}x^{5} = 5x^{4}$.' },
    { id: 'diff-q5', difficulty: 'Easy', prompt: 'Differentiate $y = 7x$.', answer: '$\\dfrac{dy}{dx} = 7$', solution: 'The derivative of $kx$ is $k$, so $\\frac{dy}{dx} = 7$.' },
    { id: 'diff-q6', difficulty: 'Medium', prompt: 'Differentiate $y = x^{3} - 4x^{2} + 2x$.', answer: '$3x^{2} - 8x + 2$', solution: 'Differentiate term by term: $3x^{2} - 8x + 2$.' },
    { id: 'diff-q7', difficulty: 'Medium', prompt: 'Find the gradient of $y = x^{2} - 3x$ at $x = 4$.', answer: '$5$', solution: '$\\frac{dy}{dx} = 2x - 3$; at $x = 4$ this is $2(4) - 3 = 5$.' },
    { id: 'diff-q8', difficulty: 'Hard', prompt: 'Find the coordinates of the stationary point of $y = x^{2} - 8x + 3$.', answer: '$(4, -13)$', solution: 'Set $\\frac{dy}{dx} = 2x - 8 = 0 \\Rightarrow x = 4$. Then $y = 16 - 32 + 3 = -13$, giving $(4, -13)$.' },
    { id: 'diff-q9', difficulty: 'Hard', prompt: 'Find the equation of the tangent to $y = x^{3}$ at the point $(1, 1)$.', answer: '$y = 3x - 2$', solution: '$\\frac{dy}{dx} = 3x^{2}$, so the gradient at $x = 1$ is $3$. Tangent: $y - 1 = 3(x - 1) \\Rightarrow y = 3x - 2$.' },
  ],

  /* ───────────── AA SL · Integration ───────────── */
  'integration': [
    { id: 'int-q4', difficulty: 'Easy', prompt: 'Find $\\displaystyle\\int 6\\,dx$.', answer: '$6x + C$', solution: 'The integral of a constant $k$ is $kx + C$, so $6x + C$.' },
    { id: 'int-q5', difficulty: 'Easy', prompt: 'Find $\\displaystyle\\int x^{2}\\,dx$.', answer: '$\\dfrac{x^{3}}{3} + C$', solution: 'Raise the power and divide: $\\frac{x^{3}}{3} + C$.' },
    { id: 'int-q6', difficulty: 'Medium', prompt: 'Find $\\displaystyle\\int (4x^{3} - 2x)\\,dx$.', answer: '$x^{4} - x^{2} + C$', solution: 'Integrate term by term: $4 \\cdot \\frac{x^4}{4} - 2 \\cdot \\frac{x^2}{2} + C = x^{4} - x^{2} + C$.' },
    { id: 'int-q7', difficulty: 'Medium', prompt: 'Evaluate $\\displaystyle\\int_{0}^{2} 2x\\,dx$.', answer: '$4$', solution: '$\\int 2x\\,dx = x^{2}$, so $[x^{2}]_{0}^{2} = 4 - 0 = 4$.' },
    { id: 'int-q8', difficulty: 'Hard', prompt: 'Evaluate $\\displaystyle\\int_{1}^{3} (2x + 1)\\,dx$.', answer: '$10$', solution: '$\\int (2x+1)\\,dx = x^{2} + x$. Then $[x^{2}+x]_{1}^{3} = (9+3) - (1+1) = 12 - 2 = 10$.' },
    { id: 'int-q9', difficulty: 'Hard', prompt: 'Find the area under $y = 3x^{2}$ between $x = 1$ and $x = 2$.', answer: '$7$', solution: '$\\int_{1}^{2} 3x^{2}\\,dx = [x^{3}]_{1}^{2} = 8 - 1 = 7$.' },
  ],

  /* ───────────── AA HL · Complex numbers ───────────── */
  'complex-form': [
    { id: 'cx-q4', difficulty: 'Easy', prompt: 'Simplify $(2 + 3i) + (4 - i)$.', answer: '$6 + 2i$', solution: 'Add real and imaginary parts separately: $(2+4) + (3-1)i = 6 + 2i$.' },
    { id: 'cx-q5', difficulty: 'Easy', prompt: 'Find $|5 + 12i|$.', answer: '$13$', solution: '$|5 + 12i| = \\sqrt{5^{2} + 12^{2}} = \\sqrt{169} = 13$.' },
    { id: 'cx-q6', difficulty: 'Medium', prompt: 'Simplify $(3 + i)(2 - i)$.', answer: '$7 - i$', solution: 'Expand: $6 - 3i + 2i - i^{2} = 6 - i + 1 = 7 - i$ (using $i^{2} = -1$).' },
    { id: 'cx-q7', difficulty: 'Medium', prompt: 'Find $\\arg(1 + i)$ in radians.', answer: '$\\dfrac{\\pi}{4}$', solution: 'The point $(1,1)$ is in the first quadrant: $\\arg = \\arctan\\!\\left(\\tfrac{1}{1}\\right) = \\tfrac{\\pi}{4}$.' },
    { id: 'cx-q8', difficulty: 'Hard', prompt: 'Express $-2 + 2i$ in modulus–argument form.', answer: '$2\\sqrt{2}\\left(\\cos\\tfrac{3\\pi}{4} + i\\sin\\tfrac{3\\pi}{4}\\right)$', solution: 'Modulus $\\sqrt{(-2)^{2} + 2^{2}} = \\sqrt{8} = 2\\sqrt{2}$. The point is in the second quadrant, so $\\arg = \\pi - \\tfrac{\\pi}{4} = \\tfrac{3\\pi}{4}$.' },
    { id: 'cx-q9', difficulty: 'Hard', prompt: 'Using De Moivre, find $\\left(\\cos\\tfrac{\\pi}{4} + i\\sin\\tfrac{\\pi}{4}\\right)^{8}$.', answer: '$1$', solution: 'By De Moivre: $\\cos(8 \\cdot \\tfrac{\\pi}{4}) + i\\sin(8 \\cdot \\tfrac{\\pi}{4}) = \\cos 2\\pi + i\\sin 2\\pi = 1$.' },
  ],

  /* ───────────── AA HL · Differentiation techniques ───────────── */
  'diff-rules': [
    { id: 'dr-q4', difficulty: 'Easy', prompt: 'Differentiate $y = (x + 1)^{4}$.', answer: '$4(x+1)^{3}$', solution: 'Chain rule with inside $x+1$ (derivative $1$): $4(x+1)^{3} \\times 1 = 4(x+1)^{3}$.' },
    { id: 'dr-q5', difficulty: 'Easy', prompt: 'Differentiate $y = (5x - 2)^{2}$.', answer: '$10(5x - 2)$', solution: 'Chain rule: $2(5x-2)^{1} \\times 5 = 10(5x-2)$.' },
    { id: 'dr-q6', difficulty: 'Medium', prompt: 'Differentiate $y = x^{2}\\cos x$.', answer: '$2x\\cos x - x^{2}\\sin x$', solution: 'Product rule with $u = x^{2}$ ($u\' = 2x$), $v = \\cos x$ ($v\' = -\\sin x$): $2x\\cos x - x^{2}\\sin x$.' },
    { id: 'dr-q7', difficulty: 'Medium', prompt: 'Differentiate $y = (x^{2} + 3)^{4}$.', answer: '$8x(x^{2}+3)^{3}$', solution: 'Chain rule with inside $x^{2}+3$ (derivative $2x$): $4(x^{2}+3)^{3} \\times 2x = 8x(x^{2}+3)^{3}$.' },
    { id: 'dr-q8', difficulty: 'Hard', prompt: 'Differentiate $y = \\dfrac{e^{x}}{x}$.', answer: '$\\dfrac{e^{x}(x - 1)}{x^{2}}$', solution: 'Quotient rule with $u = e^{x}$ ($u\' = e^{x}$), $v = x$ ($v\' = 1$): $\\frac{e^{x} \\cdot x - e^{x} \\cdot 1}{x^{2}} = \\frac{e^{x}(x-1)}{x^{2}}$.' },
    { id: 'dr-q9', difficulty: 'Hard', prompt: 'Differentiate $y = \\sin(3x^{2})$.', answer: '$6x\\cos(3x^{2})$', solution: 'Chain rule with inside $3x^{2}$ (derivative $6x$): $\\cos(3x^{2}) \\times 6x = 6x\\cos(3x^{2})$.' },
  ],

  /* ───────────── AI SL · Compound interest ───────────── */
  'compound-interest': [
    { id: 'fin-q4', difficulty: 'Easy', prompt: '\\$1000 is invested at 5% per year compounded annually. Find its value after 2 years.', answer: '\\$1102.50', solution: '$FV = 1000(1.05)^{2} = 1000 \\times 1.1025 = 1102.50$.' },
    { id: 'fin-q5', difficulty: 'Easy', prompt: 'A car worth \\$10 000 depreciates 10% in a year. Find its value after 1 year.', answer: '\\$9000', solution: '$FV = 10000 \\times 0.90 = 9000$.' },
    { id: 'fin-q6', difficulty: 'Medium', prompt: '\\$2000 is invested at 3% per year compounded annually for 10 years (2 d.p.).', answer: '\\$2687.83', solution: '$FV = 2000(1.03)^{10} = 2000 \\times 1.343916 = 2687.83$.' },
    { id: 'fin-q7', difficulty: 'Medium', prompt: '\\$5000 is invested at 8% per year compounded quarterly for 2 years (2 d.p.).', answer: '\\$5858.30', solution: '$FV = 5000\\left(1 + \\frac{8}{400}\\right)^{8} = 5000(1.02)^{8} = 5000 \\times 1.171659 = 5858.30$.' },
    { id: 'fin-q8', difficulty: 'Hard', prompt: 'How many whole years until \\$500 invested at 6% per year (compounded annually) first exceeds \\$1000?', answer: '$12$ years', solution: 'Solve $1.06^{n} > 2 \\Rightarrow n > \\frac{\\ln 2}{\\ln 1.06} = 11.9$. The first whole year is $n = 12$.' },
    { id: 'fin-q9', difficulty: 'Hard', prompt: 'An \\$8000 asset depreciates 12% per year. After how many whole years does its value first fall below \\$4000?', answer: '$6$ years', solution: 'Solve $0.88^{n} < 0.5 \\Rightarrow n > \\frac{\\ln 0.5}{\\ln 0.88} = 5.42$. The first whole year is $n = 6$.' },
  ],

  /* ───────────── AI SL · Normal distribution ───────────── */
  'normal-distribution': [
    { id: 'nd-q4', difficulty: 'Easy', prompt: 'For $X \\sim N(100, 225)$, find the standard deviation $\\sigma$.', answer: '$15$', solution: 'The variance is $225$, so $\\sigma = \\sqrt{225} = 15$.' },
    { id: 'nd-q5', difficulty: 'Easy', prompt: 'For $X \\sim N(20, 16)$, find the standard deviation $\\sigma$.', answer: '$4$', solution: 'The variance is $16$, so $\\sigma = \\sqrt{16} = 4$.' },
    { id: 'nd-q6', difficulty: 'Medium', prompt: 'Scores follow $N(70, 8^{2})$. Find the $z$-score of a mark of $86$.', answer: '$z = 2$', solution: '$z = \\frac{86 - 70}{8} = \\frac{16}{8} = 2$.' },
    { id: 'nd-q7', difficulty: 'Medium', prompt: 'Heights follow $N(160, 5^{2})$ cm. Using the empirical rule, roughly what proportion lie between 155 cm and 165 cm?', answer: '$\\approx 68\\%$', solution: '$155$ and $165$ are exactly $\\pm 1\\sigma$ from the mean, which holds about $68\\%$ of the data.' },
    { id: 'nd-q8', difficulty: 'Hard', prompt: 'A test is $N(500, 100^{2})$. Using the empirical rule, roughly what proportion of scores are below 300?', answer: '$\\approx 2.5\\%$', solution: '$300 = 500 - 2(100)$, i.e. $-2\\sigma$. About $95\\%$ lie within $\\pm 2\\sigma$, leaving about $2.5\\%$ in the lower tail.' },
    { id: 'nd-q9', difficulty: 'Hard', prompt: 'For $X \\sim N(50, \\sigma^{2})$, about 95% of values lie between 40 and 60. Find $\\sigma$.', answer: '$\\sigma = 5$', solution: 'By the empirical rule, $95\\%$ lie within $\\pm 2\\sigma$. So $2\\sigma = 10 \\Rightarrow \\sigma = 5$.' },
  ],

  /* ───────────── AI HL · Regression ───────────── */
  'regression': [
    { id: 'reg-q4', difficulty: 'Easy', prompt: 'A correlation coefficient is $r = 0.95$. Describe the linear relationship.', answer: 'Strong positive linear relationship.', solution: 'Since $r$ is close to $+1$, there is a strong positive linear relationship.' },
    { id: 'reg-q5', difficulty: 'Easy', prompt: 'What does $r = -1$ tell you about two variables?', answer: 'A perfect negative linear relationship.', solution: '$r = -1$ means the points lie exactly on a straight line with negative gradient.' },
    { id: 'reg-q6', difficulty: 'Medium', prompt: 'A regression line is $y = 3x - 2$. Predict $y$ when $x = 10$.', answer: '$28$', solution: 'Substitute $x = 10$: $y = 3(10) - 2 = 28$.' },
    { id: 'reg-q7', difficulty: 'Medium', prompt: 'A model has $r = 0.6$. What percentage of the variation in $y$ does the linear model explain?', answer: '$36\\%$', solution: '$r^{2} = 0.6^{2} = 0.36 = 36\\%$.' },
    { id: 'reg-q8', difficulty: 'Hard', prompt: 'A least-squares regression line has gradient $4$ and passes through the mean point $(5, 20)$. Find its equation.', answer: '$y = 4x$', solution: 'Use $y - \\bar{y} = m(x - \\bar{x})$: $y - 20 = 4(x - 5) \\Rightarrow y = 4x - 20 + 20 = 4x$.' },
    { id: 'reg-q9', difficulty: 'Hard', prompt: 'A regression line is $y = -1.5x + 40$. Interpret the gradient and predict $y$ when $x = 12$.', answer: 'Gradient: $y$ falls $1.5$ per unit $x$; at $x = 12$, $y = 22$.', solution: 'The gradient $-1.5$ means each increase of $1$ in $x$ decreases $y$ by $1.5$. At $x = 12$: $y = -1.5(12) + 40 = -18 + 40 = 22$.' },
  ],
};
