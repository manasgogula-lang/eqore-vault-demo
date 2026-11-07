# EQORE Vault demo

A working demo of EQORE Vault: a document system for commercial battery energy storage projects. Every project is organized into document packets (permits, fire marshal, utility interconnection, construction, commissioning, warranty, operations). The Vault holds a submission until every document is in and reviewed.

Live demo (Claude artifact): https://claude.ai/artifact/8sWS9pjCJLCsPov2RHU9kh

## What works

- Portfolio of projects with live counts (blocked submissions, returned documents, documents waiting on partners or on EQORE review)
- Project view with lifecycle phases, packets and per-document status
- File uploads (PDF, images, text) with in-page preview (PDFs rendered with pdf.js)
- AI pre-review of uploaded documents with Claude, checked against editable plan set facts for the project; flags can be dismissed with a reason
- Return to partner with comments, mark ready, submit a packet, record the reviewer's decision (approved or returned)
- Kickoff and missing-document request emails drafted per partner (copy or open in an email app, then mark as sent)
- New projects, custom packets from templates, added requirements, partner invites, owner reassignment
- Reset demo data

## How it's built

A single HTML page with no build framework. It uses [lit-html](https://lit.dev) from a CDN for rendering.

- `src/app.html`: the page (styles, UI and logic)
- `src/seed.js`: demo projects, the standard packet set and packet templates
- `src/build.mjs`: inlines `seed.js` into the page and writes `eqore-vault.html`
- `eqore-vault.html`: the built page that gets published

```bash
node src/build.mjs
```

On claude.ai the page uses artifact runtime capabilities: `db` (shared saved data), `assets` (file storage), `sample` (Claude for the AI review) and `user` (signed-in name). Opened anywhere else, it falls back to saving in the browser's local storage, and the AI review is turned off.

## Notes

- Partner names and email addresses are examples (`.example` domains).
- The demo doesn't send email.
