/* Neil Kaji site — shared placeholder content.
   Single source of truth for the lists rendered on the home previews AND on the
   full Timeline / Blog / Inspirations pages. Each item carries stable `*Id`
   strings so inline edits (keyed by those ids in localStorage) sync between the
   home preview and the full page automatically.

   All copy here is editable placeholder — swap it for the real thing by clicking
   "Edit" in the nav and typing over it, or ask the agent to replace it. */

/* ── Timeline ── most recent first ─────────────────────────────────────────── */
const TIMELINE = [
  { id: 'tl-5', date: 'June 6, 2026', title: 'Won 1st place for Physics at Somers Science Fair',
    desc: 'Managed to place above 40 kids in my category and win an award for my proposed quantum computing research.' },
  { id: 'tl-4', date: 'May 31, 2026', title: 'First user feedback on app ideas',
    desc: 'Gathered initial feedback on app ideas that I would build over the summer, which yielded helpful information.' },
  { id: 'tl-1', date: 'May 30, 2026',  title: 'Launched this website',
    desc: 'Just a portfolio and place to house my thoughts, made after a handful of iterations.' },
  { id: 'tl-2', date: 'May 20, 2026', title: 'Won gold at NYSSMA majors',
    desc: 'Should be the first of many.' },
  { id: 'tl-3', date: 'October 10, 2010', title: 'Where it all began', desc: '' },
];

/* ── Blog posts ── most recent first ───────────────────────────────────────── */
const POSTS = [
  {
    id: 'post-1', date: 'May 18, 2026', read: '4 min', tag: 'Building',
    title: 'What shipping in two weeks actually taught me',
    excerpt: 'The deadline was arbitrary. The lesson was not. Here is what held up and what broke once real people showed up.',
    body: [
      'Start with the honest version of the story. The idea was small. The timeline was shorter than it should have been. You said yes anyway.',
      'Write the way you talk. Short sentences. One idea each. If a paragraph has two points, split it into two.',
      'End on the thing you would tell a friend over coffee — the part that does not fit in a tweet. Then stop. Click any of this text to rewrite it.',
    ],
  },
  {
    id: 'post-2', date: 'April 30, 2026', read: '6 min', tag: 'Learning',
    title: 'The number nobody asks about',
    excerpt: 'Everyone wants the headline metric. The one that actually changed how I work is much quieter than that.',
    body: [
      'Open with the metric everyone fixates on, then turn the camera to the one that mattered.',
      'Give it room to breathe. The brand voice is plain and confident — no exclamation marks, no buzzwords, no "game-changing."',
      'Close with what you would do differently. This is placeholder; replace it with your real second post.',
    ],
  },
  {
    id: 'post-3', date: 'March 12, 2026', read: '3 min', tag: 'Notes',
    title: 'A walk at 8:55 every night',
    excerpt: 'Not a productivity hack. Just a small ritual that turned out to matter more than most of the big ones.',
    body: [
      'The personal one. Every site needs a post that is not about work.',
      'Keep it grounded and specific — a time, a place, a small detail. Specifics are what make writing feel like a person wrote it.',
      'No lesson required. Some things are just true. Edit freely.',
    ],
  },
  {
    id: 'post-4', date: 'Feb 02, 2026', read: '5 min', tag: 'Building',
    title: 'Stupid premise, real product',
    excerpt: 'The best ideas sound like jokes until someone uses them. Here is how I stopped pre-judging my own ideas.',
    body: [
      'Tell the story of the idea you almost did not build.',
      'Name the moment it stopped being a joke — the first message from a stranger who loved it.',
      'Wrap with the principle you took from it. Placeholder — make it yours.',
    ],
  },
];

/* ── Inspirations ── ────────────────────────────────────────────────────────── */
const INSPIRATIONS = [
  { id: 'insp-1', name: 'Matthew Park', kind: 'Person',
    note: 'A 15 year old entrepreneur who is only a few days younger than me- he is absolutely cracked.' },
  { id: 'insp-2', name: 'Gon (HxH)', kind: 'Character', note: 'His determination is absolutely oustanding and genuinely eye-opening.' },
  { id: 'insp-4', name: 'Thorfinn (VS)', kind: 'Character',
    note: 'I have no enemies.' },
];

Object.assign(window, { TIMELINE, POSTS, INSPIRATIONS });
