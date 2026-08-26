# Signal Desk

Signal Desk is a WebMCP-enabled intelligence review room for evidence-backed product, community, and market decisions.

It demonstrates a provenance-first human-agent workflow: agents can search signals, cluster themes, draft evidence-linked briefs, explain evidence, and propose actions, while humans keep explicit review control over claims, themes, and actions.

## Product Use Case

Teams often collect important feedback across forums, support queues, calls, release comments, and competitor notes. The hard part is not summarizing the stream once. The hard part is preserving which evidence supports which claim, deciding what is ready to act on, and keeping a record of what changed.

Signal Desk gives an agent structured tools for investigation and drafting while keeping the human operator in charge of review state.

## What Makes It Different

Signal Desk is not a generic analytics dashboard or chat wrapper. Its core contract is:

- Every brief claim links back to supporting evidence.
- Actions stay in an approval-gated review queue.
- Human and agent changes share one audit trail.
- WebMCP tool calls update the same state that the UI renders.
- The app runs from public-safe seeded data with no private account dependency.

## Current Phase

Current status:

- Static app shell.
- Seeded product/community intelligence dataset.
- Responsive operator workspace UI.
- Search, filter, signal detail, theme review, claim review, action review, and audit trail.
- WebMCP tools registered through `document.modelContext.registerTool`.
- Fallback status when WebMCP is unavailable.
- Public production deployment on ChatGPT Sites.

See `SUBMISSION.md` for challenge-specific submission notes.

## Run Locally

```sh
python3 -m http.server 4177
```

Open:

```text
http://127.0.0.1:4177/
```

The app uses browser `localStorage` for resettable demo state.

## WebMCP Tools

Signal Desk exposes these tools when opened in a WebMCP-capable browser:

- `search_signals`
- `cluster_signals`
- `draft_brief`
- `explain_evidence`
- `propose_actions`
- `set_review_state`
- `get_audit_trail`
- `reset_demo`

Site tools require a ChatGPT account, selected model, and browser environment that support WebMCP. They are currently intended for the ChatGPT desktop app's built-in browser. Regular Chrome, Safari, Firefox, and ChatGPT Work cloud browser can open the app UI, but they may show the fallback message instead of exposing WebMCP tools.

## Demo Flow

1. Ask the agent to find the strongest admin/import signals.
2. Ask it to explain the evidence for the onboarding theme.
3. Ask it to draft a brief from the strongest themes.
4. Ask it to propose product-owned actions.
5. Approve one action and mark one claim as needs edit.
6. Ask for the audit trail.

The app should visibly update as WebMCP tools are called.

## Development Checks

```sh
node --check src/app.js
node --check src/data.js
```

## Privacy

The included scenario data is synthetic and public-safe. The current app does not ingest private Slack, X, Teams, email, customer, or personal data.

## License

MIT
