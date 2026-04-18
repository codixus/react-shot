# Copy rules for react-shot screenshot sets

The SDK renders; copy carries the sale. These rules are not suggestions — enforce them on every set.

## The three-line rhythm

Every slice follows:

```
[EYEBROW]        (optional, 1–3 words — category, stat, or persona)
TITLE LINE 1     (2–4 words, action verb)
TITLE LINE 2     (2–4 words, outcome — wrapped in <Highlight>)
SUBTITLE         (one line, 50–80 chars, benefit-first)
```

Never ship a title on one line. Never ship a subtitle on two.

## Title rules

- **Fixed 2 lines.** Split with a single `<br />`.
- 4–7 words total across both lines.
- Second line must carry a `<Highlight>`.
- Action verb or noun up top; payoff on the bottom.
- Consistent char length across a set — within ±6 chars per line.

Good:

```tsx
<Title>
  Ship quietly,<br />
  <Highlight variant="color" color="#3C5A40">save the noise.</Highlight>
</Title>
```

Bad:

```tsx
{/* ❌ single line */}
<Title>A workspace that stays out of the way.</Title>

{/* ❌ three lines */}
<Title>
  Plan your<br />
  trips with<br />
  total clarity
</Title>

{/* ❌ no highlight on line 2 */}
<Title>
  Get more views<br />
  every post
</Title>
```

## Subtitle rules

- **Fixed 1 line.** No `<br />`.
- 50–80 characters. Count them.
- Benefit-first, conversational. "You", not "users".
- Parallel structure across slices (`"X, Y, and Z — one thing"` works as a template).
- No feature lists. No adjective stacks.

Rewrite table — ship the right column:

| Don't | Do |
|---|---|
| "An AI that plans, researches, writes, and ships — in one place." (69, OK length but feature-list) | "Ask once. Plan, research, draft, send — in one chat." (53) |
| "Bite-sized missions unlock new tools and new vocabulary." (56) | "Short missions that stick — new words, new tools, every time." (61) |
| "Flast pulls the latest, cites it, and explains it in plain language." (68) | "Live web, fresh data, and a citation on every claim." (51) |
| "Routes, stays, and every detail in one calm view." | (different app — delete, not rewrite) |

## Eyebrow rules

- 1–3 words.
- Category ("Academy", "Library"), stat ("7 personas", "Ages 6–12"), or persona ("For families").
- Use `tone` to match the surface (`light` on pale bg, `dark` on mid bg, `accent` when it matters, `ghost` for restrained types).

## Reviewing a set

Before you submit a composition, read all 5 subtitles out loud in sequence. If they don't sound like one voice, rewrite. Then stack the 5 titles on top of each other visually — if one wraps or one looks short, rebalance.

## When a client provides copy

If the copy they hand you breaks these rules, **rewrite it** and show both versions. Don't silently ship over-long subtitles or single-line titles.

## Turkish / other languages

Same line-count rules. Turkish often runs 20% longer — tighten the original English before localizing. Avoid idioms that resist translation.
