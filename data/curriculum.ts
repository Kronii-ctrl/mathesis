import type { Board, Course, IndexedFormula } from '../types';

/**
 * All curriculum content for the site lives here. To extend the site, add a new
 * Course object to `courses` (or push topics/lessons into an existing one) — no
 * component code needs to change. Lesson `content`, `problem`, `solution`,
 * `answer` and `note` fields are all rendered as Markdown + LaTeX (KaTeX),
 * so use $...$ for inline maths and $$...$$ for display maths.
 */

export const boards: Board[] = [
  { id: 'igcse', name: 'Cambridge IGCSE', short: 'IGCSE' },
  { id: 'aa', name: 'IB Analysis & Approaches', short: 'AA' },
  { id: 'ai', name: 'IB Applications & Interpretation', short: 'AI' },
];

export const courses: Course[] = [
  /* ───────────────────────────── IGCSE 0580 ───────────────────────────── */
  {
    id: 'igcse-0580',
    board: 'igcse',
    level: '0580',
    title: 'Cambridge IGCSE Mathematics',
    subtitle: 'Syllabus 0580 · Core & Extended',
    description:
      'The foundational Cambridge IGCSE course covering number, algebra, geometry, trigonometry, and statistics — the springboard into IB Mathematics.',
    accent: '#3b82f6',
    topics: [
      {
        id: 'number',
        title: 'Number',
        description: 'Working with quantities: standard form, percentages and ratio.',
        lessons: [
          {
            id: 'standard-form',
            title: 'Standard Form',
            summary: 'Write very large and very small numbers compactly and compute with them.',
            content: `**Standard form** (scientific notation) writes a number as

$$a \\times 10^{n}, \\qquad 1 \\le a < 10,\\; n \\in \\mathbb{Z}.$$

The digit part $a$ is always at least $1$ and strictly less than $10$. The power $n$ records how far the decimal point moves: **positive** $n$ for large numbers, **negative** $n$ for small numbers.

### Why use it?
- Compactly express quantities like the speed of light $2.998 \\times 10^{8}\\,\\text{m/s}$ or the mass of an electron $9.11 \\times 10^{-31}\\,\\text{kg}$.
- Multiply and divide quickly using the **laws of indices**.

### Multiplying and dividing
Combine the digit parts and the powers separately:

$$(a \\times 10^{m})(b \\times 10^{n}) = (ab) \\times 10^{m+n}.$$

If $ab$ falls outside $[1,10)$, re-normalise by shifting the power.`,
            formulas: [
              { id: 'sf-form', name: 'Standard form', latex: 'a \\times 10^{n}, \\quad 1 \\le a < 10', note: 'The canonical form of any non-zero number.' },
              { id: 'sf-mult', name: 'Multiplying', latex: '(a\\times10^{m})(b\\times10^{n}) = ab\\times10^{m+n}', tags: ['indices', 'exponents'] },
              { id: 'sf-div', name: 'Dividing', latex: '\\dfrac{a\\times10^{m}}{b\\times10^{n}} = \\dfrac{a}{b}\\times10^{m-n}' },
            ],
            examples: [
              {
                title: 'Converting to standard form',
                problem: 'Write $0.000\\,427$ in standard form.',
                solution: `Move the decimal point so exactly one non-zero digit sits in front of it:

$$0.000427 = 4.27 \\times 10^{-4}.$$

The point moved **4 places to the right**, so $n=-4$ (small number ⟹ negative power).`,
              },
              {
                title: 'Multiplying in standard form',
                problem: 'Evaluate $(6 \\times 10^{5}) \\times (4 \\times 10^{-2})$, giving your answer in standard form.',
                solution: `Multiply digit parts and add powers:

$$6 \\times 4 = 24, \\qquad 10^{5} \\times 10^{-2} = 10^{3}.$$

So we get $24 \\times 10^{3}$. But $24 \\ge 10$, so re-normalise:

$$24 \\times 10^{3} = 2.4 \\times 10^{1} \\times 10^{3} = 2.4 \\times 10^{4}.$$`,
              },
            ],
            questions: [
              { id: 'sf-q1', difficulty: 'Easy', prompt: 'Write $53\\,000$ in standard form.', answer: '$5.3 \\times 10^{4}$', solution: 'There are 4 places after the leading digit $5.3$, so $53000 = 5.3 \\times 10^{4}$.' },
              { id: 'sf-q2', difficulty: 'Medium', prompt: 'Evaluate $\\dfrac{8 \\times 10^{7}}{2 \\times 10^{3}}$ in standard form.', answer: '$4 \\times 10^{4}$', solution: 'Divide the digit parts: $8 \\div 2 = 4$. Subtract powers: $10^{7-3}=10^{4}$. Result: $4 \\times 10^{4}$.' },
              { id: 'sf-q3', difficulty: 'Hard', prompt: 'Light travels at $3 \\times 10^{8}\\,\\text{m/s}$. How far does it travel in $2.5 \\times 10^{-3}$ seconds? Give your answer in standard form.', answer: '$7.5 \\times 10^{5}\\,\\text{m}$', solution: 'Distance $= speed \\times time = (3\\times10^{8})(2.5\\times10^{-3})$. Multiply digits $3 \\times 2.5 = 7.5$ and add powers $10^{8-3}=10^{5}$, giving $7.5 \\times 10^{5}\\,\\text{m}$.' },
            ],
          },
          {
            id: 'percentages',
            title: 'Percentages & Reverse Percentages',
            summary: 'Increase, decrease, find the original amount, and chain percentage changes.',
            content: `A **percentage** is a fraction out of 100. To apply a change, use a **multiplier**.

### Percentage change
- Increase by $r\\%$: multiply by $\\left(1 + \\dfrac{r}{100}\\right)$.
- Decrease by $r\\%$: multiply by $\\left(1 - \\dfrac{r}{100}\\right)$.

### Reverse percentages
If you know the amount **after** a change, divide by the multiplier to recover the original. This is the part most candidates get wrong: you must **divide**, not subtract the same percentage back.

### Repeated change
For $n$ equal changes, raise the multiplier to the power $n$ — this is the bridge to exponential growth and compound interest in IB.`,
            formulas: [
              { id: 'pc-change', name: 'New amount', latex: 'N = A \\times \\left(1 \\pm \\dfrac{r}{100}\\right)', note: 'Use $+$ for an increase, $-$ for a decrease.' },
              { id: 'pc-reverse', name: 'Reverse percentage', latex: 'A = \\dfrac{N}{1 \\pm \\frac{r}{100}}' },
              { id: 'pc-repeat', name: 'Repeated change', latex: 'N = A\\left(1 \\pm \\dfrac{r}{100}\\right)^{n}', tags: ['compound', 'growth'] },
            ],
            examples: [
              {
                title: 'Reverse percentage',
                problem: 'A coat costs \\$84 after a 30% discount. What was the original price?',
                solution: `The sale price is $70\\%$ of the original, i.e. multiplier $0.70$:

$$\\text{original} = \\frac{84}{0.70} = \\$120.$$

Check: $120 \\times 0.70 = 84$. ✓ (Subtracting 30% of \\$84 would give the wrong answer.)`,
              },
            ],
            questions: [
              { id: 'pc-q1', difficulty: 'Easy', prompt: 'Increase \\$240 by 15%.', answer: '\\$276', solution: 'Multiplier $1.15$: $240 \\times 1.15 = 276$.' },
              { id: 'pc-q2', difficulty: 'Medium', prompt: 'After a 12% pay rise, Maria earns \\$28\\,000. What did she earn before?', answer: '\\$25\\,000', solution: 'Divide by the multiplier $1.12$: $28000 \\div 1.12 = 25000$.' },
              { id: 'pc-q3', difficulty: 'Hard', prompt: 'A car worth \\$18\\,000 depreciates 15% per year. What is it worth after 3 years? Round to the nearest dollar.', answer: '\\$11\\,054', solution: 'Multiplier $0.85$ applied 3 times: $18000 \\times 0.85^{3} = 18000 \\times 0.614125 = 11054.25 \\approx \\$11\\,054$.' },
            ],
          },
        ],
      },
      {
        id: 'algebra',
        title: 'Algebra',
        description: 'Manipulating expressions and solving equations.',
        lessons: [
          {
            id: 'quadratics',
            title: 'Solving Quadratic Equations',
            summary: 'Factorising, completing the square, and the quadratic formula.',
            content: `A **quadratic equation** has the form

$$ax^{2} + bx + c = 0, \\qquad a \\neq 0.$$

There are three standard routes to the solutions (roots):

### 1. Factorising
If $ax^2+bx+c$ factorises as $(px+q)(rx+s)$, set each factor to zero. Fast when the numbers are friendly.

### 2. Completing the square
Rewrite as $a(x-h)^2 + k = 0$. This also reveals the **vertex** $(h,k)$ of the parabola.

### 3. The quadratic formula
Always works. The **discriminant** $\\Delta = b^2 - 4ac$ tells you how many real roots exist:
- $\\Delta > 0$: two distinct real roots
- $\\Delta = 0$: one repeated root
- $\\Delta < 0$: no real roots`,
            formulas: [
              { id: 'qf', name: 'Quadratic formula', latex: 'x = \\dfrac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}', note: 'Solves $ax^2+bx+c=0$ for any real coefficients.', tags: ['roots', 'parabola'] },
              { id: 'disc', name: 'Discriminant', latex: '\\Delta = b^{2} - 4ac', note: 'Sign of $\\Delta$ counts the real roots.' },
              { id: 'vertex', name: 'Vertex (completed square)', latex: 'a(x-h)^{2}+k, \\quad h=-\\dfrac{b}{2a}' },
            ],
            examples: [
              {
                title: 'By factorising',
                problem: 'Solve $x^{2} - 5x + 6 = 0$.',
                solution: `Find two numbers that multiply to $6$ and add to $-5$: these are $-2$ and $-3$.

$$x^{2}-5x+6 = (x-2)(x-3) = 0.$$

So $x = 2$ or $x = 3$.`,
              },
              {
                title: 'Using the formula',
                problem: 'Solve $2x^{2} + 3x - 4 = 0$, giving answers to 2 d.p.',
                solution: `Here $a=2,\\,b=3,\\,c=-4$. The discriminant is

$$\\Delta = 3^{2} - 4(2)(-4) = 9 + 32 = 41.$$

Then

$$x = \\frac{-3 \\pm \\sqrt{41}}{4} = \\frac{-3 \\pm 6.403}{4}.$$

So $x = 0.85$ or $x = -2.35$ (2 d.p.).`,
              },
            ],
            questions: [
              { id: 'q-q1', difficulty: 'Easy', prompt: 'Solve $x^{2} - 9 = 0$.', answer: '$x = 3$ or $x = -3$', solution: 'A difference of two squares: $x^2-9=(x-3)(x+3)=0$, so $x = \\pm 3$.' },
              { id: 'q-q2', difficulty: 'Medium', prompt: 'Solve $x^{2} + 2x - 15 = 0$ by factorising.', answer: '$x = 3$ or $x = -5$', solution: 'Two numbers multiplying to $-15$ and summing to $2$ are $5$ and $-3$: $(x+5)(x-3)=0$, so $x=-5$ or $x=3$.' },
              { id: 'q-q3', difficulty: 'Hard', prompt: 'The equation $x^{2} + kx + 9 = 0$ has exactly one (repeated) root. Find the possible values of $k$.', answer: '$k = 6$ or $k = -6$', solution: 'One repeated root means $\\Delta = 0$: $k^2 - 4(1)(9) = 0 \\Rightarrow k^2 = 36 \\Rightarrow k = \\pm 6$.' },
            ],
          },
          {
            id: 'indices',
            title: 'Indices (Laws of Exponents)',
            summary: 'Multiply, divide and raise powers; handle zero, negative and fractional indices.',
            content: `The **laws of indices** let you combine powers of the same base without expanding.

For any base $a \\neq 0$ and integers (or rationals) $m,n$:

The trickier cases:
- A **zero** index gives $1$: $a^{0}=1$.
- A **negative** index is a reciprocal: $a^{-n} = \\frac{1}{a^{n}}$.
- A **fractional** index is a root: $a^{1/n} = \\sqrt[n]{a}$ and $a^{m/n} = \\left(\\sqrt[n]{a}\\right)^{m}$.

These rules are the engine behind exponential and logarithmic functions later in IB.`,
            formulas: [
              { id: 'i-mult', name: 'Product rule', latex: 'a^{m} \\times a^{n} = a^{m+n}' },
              { id: 'i-div', name: 'Quotient rule', latex: 'a^{m} \\div a^{n} = a^{m-n}' },
              { id: 'i-pow', name: 'Power of a power', latex: '(a^{m})^{n} = a^{mn}' },
              { id: 'i-neg', name: 'Negative index', latex: 'a^{-n} = \\dfrac{1}{a^{n}}' },
              { id: 'i-frac', name: 'Fractional index', latex: 'a^{m/n} = \\sqrt[n]{a^{m}}', tags: ['roots', 'surds'] },
            ],
            examples: [
              {
                title: 'Simplifying',
                problem: 'Simplify $\\dfrac{x^{5} \\times x^{2}}{x^{3}}$.',
                solution: `Add the powers on top, then subtract:

$$\\frac{x^{5+2}}{x^{3}} = x^{7-3} = x^{4}.$$`,
              },
              {
                title: 'Fractional and negative indices',
                problem: 'Evaluate $16^{-3/4}$.',
                solution: `Negative index ⟹ reciprocal; the $\\tfrac14$ power is a 4th root:

$$16^{-3/4} = \\frac{1}{16^{3/4}} = \\frac{1}{\\left(\\sqrt[4]{16}\\right)^{3}} = \\frac{1}{2^{3}} = \\frac{1}{8}.$$`,
              },
            ],
            questions: [
              { id: 'i-q1', difficulty: 'Easy', prompt: 'Simplify $y^{4} \\times y^{6}$.', answer: '$y^{10}$', solution: 'Add the indices: $4+6=10$, so $y^{10}$.' },
              { id: 'i-q2', difficulty: 'Medium', prompt: 'Evaluate $27^{2/3}$.', answer: '$9$', solution: '$27^{2/3} = \\left(\\sqrt[3]{27}\\right)^{2} = 3^{2} = 9$.' },
              { id: 'i-q3', difficulty: 'Hard', prompt: 'Solve $2^{x} = \\dfrac{1}{8}$.', answer: '$x = -3$', solution: 'Write the right side as a power of 2: $\\frac{1}{8} = 2^{-3}$. Equate exponents: $x = -3$.' },
            ],
          },
        ],
      },
      {
        id: 'geometry-trig',
        title: 'Geometry & Trigonometry',
        description: 'Right-angled trigonometry and the rules for any triangle.',
        lessons: [
          {
            id: 'pythagoras-trig',
            title: 'Pythagoras & Right-Angled Trigonometry',
            summary: 'Find sides and angles in right triangles with Pythagoras and SOHCAHTOA.',
            content: `In a **right-angled triangle**, the side opposite the right angle is the **hypotenuse** (the longest side).

### Pythagoras' theorem
Relates the three sides:

$$a^{2} + b^{2} = c^{2},$$

where $c$ is the hypotenuse. Use it whenever you know two sides and want the third.

### Trigonometric ratios — SOHCAHTOA
Label sides relative to the angle $\\theta$ you care about: **opposite**, **adjacent**, **hypotenuse**.

- $\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}$
- $\\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}$
- $\\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}$

To find an **angle**, use the inverse functions $\\sin^{-1}, \\cos^{-1}, \\tan^{-1}$.`,
            formulas: [
              { id: 'pyth', name: 'Pythagoras', latex: 'a^{2} + b^{2} = c^{2}', note: '$c$ is the hypotenuse.' },
              { id: 'soh', name: 'Sine ratio', latex: '\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}' },
              { id: 'cah', name: 'Cosine ratio', latex: '\\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}' },
              { id: 'toa', name: 'Tangent ratio', latex: '\\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}', tags: ['sohcahtoa'] },
            ],
            examples: [
              {
                title: 'Finding a side',
                problem: 'A right triangle has legs $6\\,\\text{cm}$ and $8\\,\\text{cm}$. Find the hypotenuse.',
                solution: `$$c^{2} = 6^{2} + 8^{2} = 36 + 64 = 100 \\Rightarrow c = \\sqrt{100} = 10\\,\\text{cm}.$$`,
              },
              {
                title: 'Finding an angle',
                problem: 'A ladder of length $5\\,\\text{m}$ leans against a wall, reaching $4\\,\\text{m}$ up. Find the angle it makes with the ground.',
                solution: `Opposite $=4$, hypotenuse $=5$, so use sine:

$$\\sin\\theta = \\frac{4}{5} = 0.8 \\Rightarrow \\theta = \\sin^{-1}(0.8) = 53.1^{\\circ}\\ (1\\text{ d.p.}).$$`,
              },
            ],
            questions: [
              { id: 'pt-q1', difficulty: 'Easy', prompt: 'Find the hypotenuse of a right triangle with legs $3$ and $4$.', answer: '$5$', solution: '$c = \\sqrt{3^2+4^2} = \\sqrt{25} = 5$.' },
              { id: 'pt-q2', difficulty: 'Medium', prompt: 'In a right triangle the hypotenuse is $13$ and one leg is $5$. Find the other leg.', answer: '$12$', solution: 'Rearrange Pythagoras: $b = \\sqrt{13^2 - 5^2} = \\sqrt{169-25} = \\sqrt{144} = 12$.' },
              { id: 'pt-q3', difficulty: 'Hard', prompt: 'A right triangle has hypotenuse $10$ and an angle of $35^{\\circ}$. Find the length of the side opposite the $35^{\\circ}$ angle (2 d.p.).', answer: '$5.74$', solution: 'Opposite $= \\text{hyp}\\times\\sin\\theta = 10 \\sin 35^{\\circ} = 10 \\times 0.5736 = 5.74$.' },
            ],
          },
          {
            id: 'sine-cosine-rule',
            title: 'Sine & Cosine Rules',
            summary: 'Solve any (non-right) triangle and find its area.',
            content: `For triangles **without** a right angle, use the sine and cosine rules. Label each angle with a capital and the side opposite it with the matching lower-case letter.

### Sine rule
Use when you have a matching side–angle **pair**:

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}.$$

### Cosine rule
Use when you have **two sides and the included angle** (to find the third side), or **all three sides** (to find an angle):

$$a^{2} = b^{2} + c^{2} - 2bc\\cos A.$$

### Area of a triangle
With two sides and the included angle:

$$\\text{Area} = \\tfrac12 ab \\sin C.$$`,
            formulas: [
              { id: 'sine-rule', name: 'Sine rule', latex: '\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}', note: 'Side–angle pairs.' },
              { id: 'cosine-rule', name: 'Cosine rule', latex: 'a^{2} = b^{2} + c^{2} - 2bc\\cos A', note: 'Two sides + included angle, or all three sides.' },
              { id: 'tri-area', name: 'Area of a triangle', latex: '\\text{Area} = \\tfrac12 ab\\sin C', tags: ['area'] },
            ],
            examples: [
              {
                title: 'Cosine rule for a side',
                problem: 'A triangle has $b = 7$, $c = 9$ and included angle $A = 40^{\\circ}$. Find $a$ (2 d.p.).',
                solution: `$$a^{2} = 7^{2} + 9^{2} - 2(7)(9)\\cos 40^{\\circ} = 49 + 81 - 126(0.766) = 33.46.$$

So $a = \\sqrt{33.46} = 5.79$ (2 d.p.).`,
              },
            ],
            questions: [
              { id: 'sc-q1', difficulty: 'Easy', prompt: 'Find the area of a triangle with sides $a=6$, $b=8$ and included angle $C=30^{\\circ}$.', answer: '$12$', solution: 'Area $= \\tfrac12 ab\\sin C = \\tfrac12(6)(8)\\sin30^{\\circ} = 24 \\times 0.5 = 12$.' },
              { id: 'sc-q2', difficulty: 'Medium', prompt: 'In triangle $ABC$, $a = 10$, $A = 50^{\\circ}$ and $B = 60^{\\circ}$. Find side $b$ (2 d.p.).', answer: '$11.31$', solution: 'Sine rule: $b = \\dfrac{a\\sin B}{\\sin A} = \\dfrac{10\\sin60^{\\circ}}{\\sin50^{\\circ}} = \\dfrac{8.660}{0.766} = 11.31$.' },
              { id: 'sc-q3', difficulty: 'Hard', prompt: 'A triangle has sides $5$, $6$ and $7$. Find its largest angle (1 d.p.).', answer: '$78.5^{\\circ}$', solution: 'The largest angle is opposite the longest side ($7$). Cosine rule: $\\cos\\theta = \\dfrac{5^2+6^2-7^2}{2(5)(6)} = \\dfrac{12}{60} = 0.2$, so $\\theta = \\cos^{-1}(0.2) = 78.5^{\\circ}$.' },
            ],
          },
        ],
      },
    ],
  },

  /* ──────────────────────────── IB AA SL ──────────────────────────── */
  {
    id: 'aa-sl',
    board: 'aa',
    level: 'SL',
    title: 'Mathematics: Analysis & Approaches SL',
    subtitle: 'IB Diploma · Standard Level',
    description:
      'A calculus-focused course for students who enjoy algebraic rigour: sequences, functions, trigonometry, calculus and statistics.',
    accent: '#8b5cf6',
    topics: [
      {
        id: 'sequences',
        title: 'Sequences & Series',
        description: 'Arithmetic and geometric patterns and their sums.',
        lessons: [
          {
            id: 'arith-geo',
            title: 'Arithmetic & Geometric Sequences',
            summary: 'The two key families of sequences, their nth terms and series sums.',
            content: `A **sequence** is an ordered list of terms. Two families dominate the syllabus.

### Arithmetic
Each term differs from the last by a constant **common difference** $d$:

$$u_{n} = u_{1} + (n-1)d.$$

The sum of the first $n$ terms (an *arithmetic series*) is

$$S_{n} = \\frac{n}{2}\\big(2u_{1} + (n-1)d\\big) = \\frac{n}{2}(u_{1} + u_{n}).$$

### Geometric
Each term is the previous one times a constant **common ratio** $r$:

$$u_{n} = u_{1} r^{\\,n-1}.$$

The sum of $n$ terms is $S_n = \\dfrac{u_1(r^n-1)}{r-1}$. When $|r| < 1$, the series **converges** to a finite sum to infinity.`,
            formulas: [
              { id: 'arith-nth', name: 'Arithmetic nth term', latex: 'u_{n} = u_{1} + (n-1)d' },
              { id: 'arith-sum', name: 'Arithmetic series', latex: 'S_{n} = \\dfrac{n}{2}\\big(2u_{1} + (n-1)d\\big)' },
              { id: 'geo-nth', name: 'Geometric nth term', latex: 'u_{n} = u_{1} r^{\\,n-1}' },
              { id: 'geo-sum', name: 'Geometric series', latex: 'S_{n} = \\dfrac{u_{1}(r^{n}-1)}{r-1}, \\quad r \\neq 1' },
              { id: 'geo-inf', name: 'Sum to infinity', latex: 'S_{\\infty} = \\dfrac{u_{1}}{1-r}, \\quad |r| < 1', tags: ['convergence'] },
            ],
            examples: [
              {
                title: 'Arithmetic series',
                problem: 'Find the sum of the first 20 terms of $3, 7, 11, \\dots$',
                solution: `Here $u_1 = 3$, $d = 4$, $n = 20$:

$$S_{20} = \\frac{20}{2}\\big(2(3) + (20-1)(4)\\big) = 10(6 + 76) = 10 \\times 82 = 820.$$`,
              },
              {
                title: 'Sum to infinity',
                problem: 'A geometric series has $u_1 = 12$ and $r = \\tfrac13$. Find $S_\\infty$.',
                solution: `Since $|r| = \\tfrac13 < 1$, the series converges:

$$S_{\\infty} = \\frac{u_1}{1-r} = \\frac{12}{1 - \\frac13} = \\frac{12}{\\frac23} = 18.$$`,
              },
            ],
            questions: [
              { id: 'seq-q1', difficulty: 'Easy', prompt: 'Find the 10th term of the arithmetic sequence with $u_1 = 5$ and $d = 3$.', answer: '$32$', solution: '$u_{10} = 5 + (10-1)\\times 3 = 5 + 27 = 32$.' },
              { id: 'seq-q2', difficulty: 'Medium', prompt: 'A geometric sequence has $u_1 = 2$ and $u_4 = 54$. Find the common ratio $r$.', answer: '$r = 3$', solution: '$u_4 = u_1 r^3 \\Rightarrow 54 = 2r^3 \\Rightarrow r^3 = 27 \\Rightarrow r = 3$.' },
              { id: 'seq-q3', difficulty: 'Hard', prompt: 'The sum to infinity of a geometric series is $40$ and the first term is $10$. Find $r$.', answer: '$r = \\tfrac34$', solution: 'From $S_\\infty = \\dfrac{u_1}{1-r}$: $40 = \\dfrac{10}{1-r} \\Rightarrow 1-r = \\tfrac{10}{40} = \\tfrac14 \\Rightarrow r = \\tfrac34$.' },
            ],
          },
        ],
      },
      {
        id: 'calculus',
        title: 'Calculus',
        description: 'Rates of change and accumulation — differentiation and integration.',
        lessons: [
          {
            id: 'differentiation',
            title: 'Introduction to Differentiation',
            summary: 'The derivative as a gradient function; the power rule; tangents and stationary points.',
            content: `The **derivative** $f'(x)$ (also written $\\dfrac{dy}{dx}$) gives the **gradient** of the curve $y=f(x)$ at each point — the instantaneous rate of change.

### The power rule
For $y = x^{n}$,

$$\\frac{dy}{dx} = n x^{n-1}.$$

Differentiation is linear, so differentiate term by term and pull out constants.

### Uses
- **Tangent gradient:** evaluate $f'(x)$ at the point.
- **Stationary points:** solve $f'(x) = 0$. Classify with the second derivative $f''(x)$: positive ⟹ minimum, negative ⟹ maximum.`,
            formulas: [
              { id: 'power-rule', name: 'Power rule', latex: '\\dfrac{d}{dx}\\,x^{n} = n x^{n-1}', tags: ['derivative', 'gradient', 'differentiation'] },
              { id: 'deriv-const', name: 'Constant multiple', latex: "\\dfrac{d}{dx}\\big(k\\,f(x)\\big) = k\\,f'(x)", tags: ['derivative', 'differentiation'] },
              { id: 'stationary', name: 'Stationary points', latex: "f'(x) = 0", note: "Then test $f''(x)$ to classify.", tags: ['derivative', 'turning point', 'maximum', 'minimum'] },
            ],
            examples: [
              {
                title: 'Differentiate a polynomial',
                problem: 'Differentiate $y = 3x^{4} - 2x^{2} + 7x - 5$.',
                solution: `Apply the power rule term by term (the constant $-5$ vanishes):

$$\\frac{dy}{dx} = 12x^{3} - 4x + 7.$$`,
              },
              {
                title: 'Finding a turning point',
                problem: 'Find and classify the stationary point of $y = x^{2} - 6x + 1$.',
                solution: `Differentiate and set to zero:

$$\\frac{dy}{dx} = 2x - 6 = 0 \\Rightarrow x = 3.$$

Then $y = 3^2 - 6(3) + 1 = -8$, so the point is $(3,-8)$. Since $\\dfrac{d^2y}{dx^2} = 2 > 0$, it is a **minimum**.`,
              },
            ],
            questions: [
              { id: 'diff-q1', difficulty: 'Easy', prompt: 'Differentiate $y = x^{3}$.', answer: '$\\dfrac{dy}{dx} = 3x^{2}$', solution: 'Power rule: $\\frac{d}{dx}x^3 = 3x^{3-1} = 3x^2$.' },
              { id: 'diff-q2', difficulty: 'Medium', prompt: 'Find the gradient of $y = 2x^{2} - 4x$ at $x = 3$.', answer: '$8$', solution: '$\\frac{dy}{dx} = 4x - 4$; at $x=3$ this is $4(3)-4 = 8$.' },
              { id: 'diff-q3', difficulty: 'Hard', prompt: 'Find the equation of the tangent to $y = x^{2} + 1$ at the point $(2, 5)$.', answer: '$y = 4x - 3$', solution: 'Gradient: $\\frac{dy}{dx} = 2x$, so at $x=2$ it is $4$. Tangent: $y - 5 = 4(x-2) \\Rightarrow y = 4x - 3$.' },
            ],
          },
          {
            id: 'integration',
            title: 'Integration Basics',
            summary: 'The reverse of differentiation; indefinite and definite integrals; area under a curve.',
            content: `**Integration** reverses differentiation. The indefinite integral of $x^n$ raises the power and divides:

$$\\int x^{n}\\,dx = \\frac{x^{n+1}}{n+1} + C, \\qquad n \\neq -1.$$

Don't forget the **constant of integration** $C$ for indefinite integrals.

### Definite integrals
A **definite integral** evaluates the antiderivative between limits and gives the (signed) **area under the curve**:

$$\\int_{a}^{b} f(x)\\,dx = \\Big[F(x)\\Big]_{a}^{b} = F(b) - F(a).$$`,
            formulas: [
              { id: 'int-power', name: 'Power rule for integration', latex: '\\int x^{n}\\,dx = \\dfrac{x^{n+1}}{n+1} + C, \\; n \\neq -1', tags: ['integral', 'antiderivative', 'integration'] },
              { id: 'int-def', name: 'Definite integral', latex: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)', tags: ['area', 'integral', 'integration'] },
            ],
            examples: [
              {
                title: 'Indefinite integral',
                problem: 'Find $\\displaystyle\\int (6x^{2} + 2)\\,dx$.',
                solution: `Integrate term by term:

$$\\int (6x^2 + 2)\\,dx = 6\\cdot\\frac{x^3}{3} + 2x + C = 2x^{3} + 2x + C.$$`,
              },
              {
                title: 'Area under a curve',
                problem: 'Find the area under $y = x^{2}$ between $x = 0$ and $x = 3$.',
                solution: `$$\\int_{0}^{3} x^{2}\\,dx = \\left[\\frac{x^{3}}{3}\\right]_{0}^{3} = \\frac{27}{3} - 0 = 9.$$`,
              },
            ],
            questions: [
              { id: 'int-q1', difficulty: 'Easy', prompt: 'Find $\\displaystyle\\int 4x\\,dx$.', answer: '$2x^{2} + C$', solution: '$\\int 4x\\,dx = 4\\cdot\\frac{x^2}{2} + C = 2x^2 + C$.' },
              { id: 'int-q2', difficulty: 'Medium', prompt: 'Evaluate $\\displaystyle\\int_{1}^{2} 3x^{2}\\,dx$.', answer: '$7$', solution: '$\\int 3x^2\\,dx = x^3$. Then $[x^3]_1^2 = 8 - 1 = 7$.' },
              { id: 'int-q3', difficulty: 'Hard', prompt: 'The gradient of a curve is $\\dfrac{dy}{dx} = 6x - 4$ and it passes through $(1, 3)$. Find $y$.', answer: '$y = 3x^{2} - 4x + 4$', solution: 'Integrate: $y = 3x^2 - 4x + C$. Use $(1,3)$: $3 = 3 - 4 + C \\Rightarrow C = 4$. So $y = 3x^2 - 4x + 4$.' },
            ],
          },
        ],
      },
    ],
  },

  /* ──────────────────────────── IB AA HL ──────────────────────────── */
  {
    id: 'aa-hl',
    board: 'aa',
    level: 'HL',
    title: 'Mathematics: Analysis & Approaches HL',
    subtitle: 'IB Diploma · Higher Level',
    description:
      'The most demanding IB maths course: everything in AA SL plus complex numbers, advanced calculus, proof and deeper algebra.',
    accent: '#6d28d9',
    topics: [
      {
        id: 'complex',
        title: 'Complex Numbers',
        description: 'Numbers with a real and imaginary part, and their geometry.',
        lessons: [
          {
            id: 'complex-form',
            title: 'Complex Numbers & Modulus–Argument Form',
            summary: 'Cartesian and polar forms, the Argand diagram, and multiplication as rotation.',
            content: `A **complex number** is $z = a + bi$ where $i^{2} = -1$. We plot it on an **Argand diagram** with real part on the $x$-axis and imaginary part on the $y$-axis.

### Modulus and argument
- **Modulus** (distance from origin): $|z| = \\sqrt{a^{2}+b^{2}}$.
- **Argument** (angle from positive real axis): $\\arg z = \\arctan\\!\\big(\\tfrac{b}{a}\\big)$, adjusted for the correct quadrant.

### Modulus–argument (polar) form
$$z = r(\\cos\\theta + i\\sin\\theta) = r\\,\\text{cis}\\,\\theta, \\quad r = |z|,\\ \\theta = \\arg z.$$

In polar form, **multiplication multiplies moduli and adds arguments** — multiplying by a complex number is a rotation-and-scale.`,
            formulas: [
              { id: 'modulus', name: 'Modulus', latex: '|z| = \\sqrt{a^{2}+b^{2}}' },
              { id: 'arg', name: 'Argument', latex: '\\arg z = \\arctan\\!\\left(\\dfrac{b}{a}\\right)', note: 'Adjust by quadrant so $-\\pi < \\arg z \\le \\pi$.' },
              { id: 'polar', name: 'Polar form', latex: 'z = r(\\cos\\theta + i\\sin\\theta)' },
              { id: 'demoivre', name: "De Moivre's theorem", latex: 'z^{n} = r^{n}(\\cos n\\theta + i\\sin n\\theta)', tags: ['powers', 'roots'] },
            ],
            examples: [
              {
                title: 'Convert to polar form',
                problem: 'Write $z = 1 + i\\sqrt{3}$ in modulus–argument form.',
                solution: `Modulus: $|z| = \\sqrt{1^2 + (\\sqrt3)^2} = \\sqrt{4} = 2$.

Argument: $\\arg z = \\arctan\\!\\big(\\tfrac{\\sqrt3}{1}\\big) = \\tfrac{\\pi}{3}$ (first quadrant).

So $z = 2\\big(\\cos\\tfrac{\\pi}{3} + i\\sin\\tfrac{\\pi}{3}\\big)$.`,
              },
            ],
            questions: [
              { id: 'cx-q1', difficulty: 'Easy', prompt: 'Find $|3 - 4i|$.', answer: '$5$', solution: '$|3-4i| = \\sqrt{3^2 + (-4)^2} = \\sqrt{25} = 5$.' },
              { id: 'cx-q2', difficulty: 'Medium', prompt: 'Simplify $(2 + 3i)(1 - i)$.', answer: '$5 + i$', solution: 'Expand: $2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i$ (using $i^2=-1$).' },
              { id: 'cx-q3', difficulty: 'Hard', prompt: 'Using De Moivre, find $\\big(\\cos\\tfrac{\\pi}{6} + i\\sin\\tfrac{\\pi}{6}\\big)^{6}$.', answer: '$-1$', solution: 'By De Moivre, raise to power 6: $\\cos(6\\cdot\\tfrac{\\pi}{6}) + i\\sin(6\\cdot\\tfrac{\\pi}{6}) = \\cos\\pi + i\\sin\\pi = -1$.' },
            ],
          },
        ],
      },
      {
        id: 'calc-hl',
        title: 'Differentiation Techniques',
        description: 'Rules for differentiating products, quotients and compositions.',
        lessons: [
          {
            id: 'diff-rules',
            title: 'Chain, Product & Quotient Rules',
            summary: 'Differentiate compositions and combinations of functions.',
            content: `Beyond the power rule, HL needs three combination rules.

### Chain rule (compositions)
For $y = f(g(x))$,

$$\\frac{dy}{dx} = f'(g(x))\\cdot g'(x).$$

### Product rule
For $y = uv$,

$$\\frac{dy}{dx} = u'v + uv'.$$

### Quotient rule
For $y = \\dfrac{u}{v}$,

$$\\frac{dy}{dx} = \\frac{u'v - uv'}{v^{2}}.$$`,
            formulas: [
              { id: 'chain', name: 'Chain rule', latex: "\\dfrac{dy}{dx} = f'(g(x))\\,g'(x)", tags: ['derivative', 'differentiation', 'composition'] },
              { id: 'product', name: 'Product rule', latex: "(uv)' = u'v + uv'", tags: ['derivative', 'differentiation'] },
              { id: 'quotient', name: 'Quotient rule', latex: "\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^{2}}", tags: ['derivative', 'differentiation'] },
            ],
            examples: [
              {
                title: 'Chain rule',
                problem: 'Differentiate $y = (3x^{2} + 1)^{5}$.',
                solution: `Let the inside be $g = 3x^2+1$, so $g' = 6x$. Then

$$\\frac{dy}{dx} = 5(3x^{2}+1)^{4}\\cdot 6x = 30x(3x^{2}+1)^{4}.$$`,
              },
              {
                title: 'Product rule',
                problem: 'Differentiate $y = x^{2}\\,e^{x}$.',
                solution: `Take $u = x^2$ ($u' = 2x$) and $v = e^x$ ($v' = e^x$):

$$\\frac{dy}{dx} = 2x\\,e^{x} + x^{2}e^{x} = x e^{x}(2 + x).$$`,
              },
            ],
            questions: [
              { id: 'dr-q1', difficulty: 'Easy', prompt: 'Differentiate $y = (2x + 1)^{3}$.', answer: '$6(2x+1)^{2}$', solution: 'Chain rule: $3(2x+1)^2 \\times 2 = 6(2x+1)^2$.' },
              { id: 'dr-q2', difficulty: 'Medium', prompt: 'Differentiate $y = x\\sin x$.', answer: '$\\sin x + x\\cos x$', solution: 'Product rule with $u=x$, $v=\\sin x$: $u\'v + uv\' = \\sin x + x\\cos x$.' },
              { id: 'dr-q3', difficulty: 'Hard', prompt: 'Differentiate $y = \\dfrac{x}{x^{2}+1}$.', answer: '$\\dfrac{1 - x^{2}}{(x^{2}+1)^{2}}$', solution: 'Quotient rule with $u=x$ ($u\'=1$), $v=x^2+1$ ($v\'=2x$): $\\dfrac{(1)(x^2+1) - x(2x)}{(x^2+1)^2} = \\dfrac{1 - x^2}{(x^2+1)^2}$.' },
            ],
          },
        ],
      },
    ],
  },

  /* ──────────────────────────── IB AI SL ──────────────────────────── */
  {
    id: 'ai-sl',
    board: 'ai',
    level: 'SL',
    title: 'Mathematics: Applications & Interpretation SL',
    subtitle: 'IB Diploma · Standard Level',
    description:
      'A modelling- and technology-focused course: finance, statistics, real-world functions and the practical use of mathematics.',
    accent: '#10b981',
    topics: [
      {
        id: 'finance',
        title: 'Financial Mathematics',
        description: 'Interest, depreciation and the time value of money.',
        lessons: [
          {
            id: 'compound-interest',
            title: 'Compound Interest & Depreciation',
            summary: 'Model growth and decay of money over time, including multiple compounding periods.',
            content: `**Compound interest** earns interest on previously earned interest — growth is *exponential*, not linear.

### Compound interest
$$FV = PV\\left(1 + \\frac{r}{100k}\\right)^{kn},$$

where $PV$ is the present value, $r\\%$ the annual rate, $k$ the number of compounding periods per year, and $n$ the number of years.

### Depreciation
Assets lose value the same way, with a negative rate:

$$FV = PV\\left(1 - \\frac{r}{100}\\right)^{n}.$$

This is exactly the repeated-percentage idea from IGCSE, dressed in financial language.`,
            formulas: [
              { id: 'ci', name: 'Compound interest', latex: 'FV = PV\\left(1 + \\dfrac{r}{100k}\\right)^{kn}', note: '$k$ = compounding periods per year.' },
              { id: 'dep', name: 'Depreciation', latex: 'FV = PV\\left(1 - \\dfrac{r}{100}\\right)^{n}', tags: ['decay'] },
            ],
            examples: [
              {
                title: 'Monthly compounding',
                problem: '\\$2000 is invested at 6% per year compounded monthly. Find its value after 5 years.',
                solution: `Here $PV=2000$, $r=6$, $k=12$, $n=5$:

$$FV = 2000\\left(1 + \\frac{6}{1200}\\right)^{60} = 2000(1.005)^{60} = 2000 \\times 1.3489 = \\$2697.70.$$`,
              },
            ],
            questions: [
              { id: 'fin-q1', difficulty: 'Easy', prompt: '\\$500 is invested at 4% per year compounded annually. Find its value after 3 years (2 d.p.).', answer: '\\$562.43', solution: '$FV = 500(1.04)^3 = 500 \\times 1.124864 = 562.43$.' },
              { id: 'fin-q2', difficulty: 'Medium', prompt: 'A laptop worth \\$1200 depreciates at 20% per year. Find its value after 4 years (2 d.p.).', answer: '\\$491.52', solution: '$FV = 1200(0.8)^4 = 1200 \\times 0.4096 = 491.52$.' },
              { id: 'fin-q3', difficulty: 'Hard', prompt: 'How many whole years until \\$1000 invested at 5% per year (compounded annually) first exceeds \\$1500?', answer: '$9$ years', solution: 'Solve $1000(1.05)^n > 1500 \\Rightarrow 1.05^n > 1.5 \\Rightarrow n > \\frac{\\ln 1.5}{\\ln 1.05} = 8.31$. The first whole year is $n = 9$.' },
            ],
          },
        ],
      },
      {
        id: 'statistics-ai',
        title: 'Statistics & Probability',
        description: 'Describing data and modelling with the normal distribution.',
        lessons: [
          {
            id: 'normal-distribution',
            title: 'The Normal Distribution',
            summary: 'Model continuous data with a bell curve and compute probabilities.',
            content: `Many natural measurements (heights, errors, exam scores) follow a **normal distribution**: a symmetric bell curve described entirely by its **mean** $\\mu$ and **standard deviation** $\\sigma$.

We write $X \\sim N(\\mu, \\sigma^{2})$.

### Key facts
- The curve is symmetric about $\\mu$.
- The **empirical (68–95–99.7) rule:** about $68\\%$ of data lies within $1\\sigma$ of the mean, $95\\%$ within $2\\sigma$, and $99.7\\%$ within $3\\sigma$.

### Standardising
Convert any value to a **$z$-score** — how many standard deviations it sits from the mean:

$$z = \\frac{x - \\mu}{\\sigma}.$$

In exams you use your GDC's normal CDF to get probabilities directly.`,
            formulas: [
              { id: 'zscore', name: 'z-score', latex: 'z = \\dfrac{x - \\mu}{\\sigma}', note: 'Standardises a value to the standard normal.' },
              { id: 'normal-notation', name: 'Normal model', latex: 'X \\sim N(\\mu, \\sigma^{2})' },
            ],
            examples: [
              {
                title: 'Using the empirical rule',
                problem: 'Adult male heights are $N(176, 7^{2})$ cm. Roughly what proportion are between 169 cm and 183 cm?',
                solution: `$169 = 176 - 7$ and $183 = 176 + 7$, i.e. exactly $\\pm 1\\sigma$ from the mean. By the empirical rule that range holds about **68%** of the data.`,
              },
            ],
            questions: [
              { id: 'nd-q1', difficulty: 'Easy', prompt: 'For $X \\sim N(50, 25)$, find the standard deviation $\\sigma$.', answer: '$5$', solution: 'The variance is $25$, so $\\sigma = \\sqrt{25} = 5$.' },
              { id: 'nd-q2', difficulty: 'Medium', prompt: 'Scores are $N(60, 10^{2})$. Find the $z$-score of a mark of $75$.', answer: '$z = 1.5$', solution: '$z = \\dfrac{75 - 60}{10} = 1.5$.' },
              { id: 'nd-q3', difficulty: 'Hard', prompt: 'A test is $N(100, 15^{2})$. Using the empirical rule, roughly what proportion of scores exceed 130?', answer: '$\\approx 2.5\\%$', solution: '$130 = 100 + 2(15)$, i.e. $+2\\sigma$. About $95\\%$ lie within $\\pm 2\\sigma$, leaving $5\\%$ in the two tails, so about $2.5\\%$ in the upper tail.' },
            ],
          },
        ],
      },
    ],
  },

  /* ──────────────────────────── IB AI HL ──────────────────────────── */
  {
    id: 'ai-hl',
    board: 'ai',
    level: 'HL',
    title: 'Mathematics: Applications & Interpretation HL',
    subtitle: 'IB Diploma · Higher Level',
    description:
      'Applied mathematics at the highest level: advanced modelling, regression, matrices, graph theory and statistical inference.',
    accent: '#059669',
    topics: [
      {
        id: 'modelling',
        title: 'Bivariate Statistics',
        description: 'Relationships between two variables: correlation and regression.',
        lessons: [
          {
            id: 'regression',
            title: 'Correlation & Linear Regression',
            summary: "Measure and model linear relationships using Pearson's r and the least-squares line.",
            content: `When two variables are measured together (e.g. hours studied vs. exam score), we look for a **linear relationship**.

### Pearson's correlation coefficient
$r$ measures the strength and direction of a linear relationship, with $-1 \\le r \\le 1$:
- $r$ near $+1$: strong positive linear relationship.
- $r$ near $-1$: strong negative.
- $r$ near $0$: little/no *linear* relationship.

### Least-squares regression line
The line of best fit $y = ax + b$ minimises the sum of squared vertical residuals. It always passes through the mean point $(\\bar{x}, \\bar{y})$. Use it to **predict** — but only interpolate within the data range; extrapolation is unreliable.

### Coefficient of determination
$r^{2}$ is the proportion of variation in $y$ explained by the linear model.`,
            formulas: [
              { id: 'pearson', name: "Pearson's r", latex: 'r = \\dfrac{S_{xy}}{\\sqrt{S_{xx}\\,S_{yy}}}', note: 'Between $-1$ and $1$.' },
              { id: 'reg-line', name: 'Regression line', latex: 'y - \\bar{y} = \\dfrac{S_{xy}}{S_{xx}}(x - \\bar{x})', tags: ['least squares', 'best fit'] },
              { id: 'r-squared', name: 'Coefficient of determination', latex: 'r^{2}', note: 'Proportion of variance explained.' },
            ],
            examples: [
              {
                title: 'Interpreting r',
                problem: 'A study finds $r = -0.92$ between screen time and sleep hours. Interpret this.',
                solution: `$r = -0.92$ is close to $-1$, indicating a **strong negative** linear relationship: as screen time increases, sleep hours tend to decrease. Note this is correlation, **not** proof of causation.`,
              },
            ],
            questions: [
              { id: 'reg-q1', difficulty: 'Easy', prompt: 'A correlation coefficient is $r = 0.05$. Describe the linear relationship.', answer: 'Very weak / essentially no linear relationship.', solution: 'Since $r$ is very close to $0$, there is little to no *linear* association between the variables.' },
              { id: 'reg-q2', difficulty: 'Medium', prompt: 'A regression line is $y = 2.5x + 4$. Predict $y$ when $x = 6$.', answer: '$19$', solution: 'Substitute $x = 6$: $y = 2.5(6) + 4 = 15 + 4 = 19$.' },
              { id: 'reg-q3', difficulty: 'Hard', prompt: 'A model has $r = 0.8$. What percentage of the variation in $y$ is explained by the linear model, and what does the rest represent?', answer: '$64\\%$ explained; the other $36\\%$ is unexplained variation.', solution: '$r^2 = 0.8^2 = 0.64 = 64\\%$ of the variation in $y$ is explained by the linear relationship; the remaining $36\\%$ is due to other factors / random variation.' },
            ],
          },
        ],
      },
    ],
  },
];

/* ───────────────────────────── Selectors ───────────────────────────── */

export const boardName = (id: Board['id']): string =>
  boards.find((b) => b.id === id)?.name ?? id;

export const boardShort = (id: Board['id']): string =>
  boards.find((b) => b.id === id)?.short ?? id;

export function getCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export function findLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  for (const topic of course.topics) {
    const lesson = topic.lessons.find((l) => l.id === lessonId);
    if (lesson) return { course, topic, lesson };
  }
  return undefined;
}

/** Flatten every formula across all courses for the global reference / search. */
export function allFormulas(): IndexedFormula[] {
  const out: IndexedFormula[] = [];
  for (const course of courses) {
    for (const topic of course.topics) {
      for (const lesson of topic.lessons) {
        for (const f of lesson.formulas ?? []) {
          out.push({
            ...f,
            courseId: course.id,
            courseTitle: course.title,
            courseLevel: course.level,
            board: course.board,
            topicTitle: topic.title,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}

/** Every practice question in a course, tagged with its lesson/topic. */
export function courseQuestions(courseId: string) {
  const course = getCourse(courseId);
  if (!course) return [];
  return course.topics.flatMap((topic) =>
    topic.lessons.flatMap((lesson) =>
      (lesson.questions ?? []).map((q) => ({
        ...q,
        topicTitle: topic.title,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
      })),
    ),
  );
}
