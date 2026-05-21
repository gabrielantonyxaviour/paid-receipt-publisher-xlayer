# UI Template Plan

## Template Chosen

Selected inspiration: `10-stripe-press`.

Reason: Paid receipts are evidence objects. The Stripe Press pattern treats each item as a high-value editorial object, using a full-viewport horizontal/pinned carousel and per-item color themes. That maps better to a receipt proof bundle than a generic dashboard.

## Source Inspected

- `/Users/gabrielantonyxaviour/Documents/templates/INDEX.md`
- `/Users/gabrielantonyxaviour/Documents/templates/10-stripe-press/CHEAT.md`
- `/Users/gabrielantonyxaviour/Documents/templates/10-stripe-press/app/components/Hero.tsx`
- `/Users/gabrielantonyxaviour/Documents/templates/10-stripe-press/app/components/BookCarousel.tsx`
- `/Users/gabrielantonyxaviour/Documents/templates/10-stripe-press/app/app/globals.css`

## Visual System

- Archetype: Brutalist Editorial with crypto evidence density.
- Typography: serif headline for proof objects, sans/mono for hashes and chain data.
- Palette: dark ink base, paper/receipt panels, amber/green/blue/red per receipt kind. Avoid one-note blue/purple crypto gradients.
- Layout: first viewport shows the proof chain root, live-chain status, and one primary command.
- Interaction: receipt types are navigable as proof chapters; each chapter exposes canonical hash, policy decision, and publish status.

## First-Screen Judge Moment

The judge immediately sees:

- "Paid Receipt Publisher" as the product name.
- A chain root digest.
- A clear `Local proof: verified` / `X Layer publish: blocked until wallet` status.
- The exact command to reproduce the proof bundle.
- A receipt ledger strip showing `payment`, `swap`, `denial`, `refund`, and `service_result`.

## Design Patterns To Copy

- Per-item theme recoloring from `BookCarousel`.
- Editorial object treatment from `BookCover`, translated into receipt cards with hash bands and chain metadata.
- Large sparse hero with one proof object visible.
- Fixed side rail / proof index instead of stat-card metrics.

## Risks To Avoid

- Do not make a plain CRUD dashboard.
- Do not show stat cards as the hero.
- Do not claim live X Layer settlement without transaction hashes.
- Do not hide blocked chain state in footnotes.
