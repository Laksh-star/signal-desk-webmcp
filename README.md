# Signal Desk

Signal Desk helps support and product operators make sense of messy customer requests after a launch.

It groups related requests, shows supporting evidence, drafts a customer-impact brief, proposes product-owned actions, and keeps a decision log. WebMCP powers the behind-the-scenes agent workflow, while the default experience stays usable for a regular operator.

## Product Use Case

Teams often collect important feedback across support queues, community forums, customer calls, release comments, and sales notes. After a launch, the hard part is not reading one message. The hard part is finding the pattern, proving it with evidence, deciding what product should do next, and keeping a record of the decision.

Signal Desk gives an operator a practical triage workflow, with an agent available to search, group, draft, explain, and propose actions inside the same visible workspace.

## Runtime Model

Signal Desk does not require a local background service. The production app is a static HTTPS site with a small Worker wrapper for hosting.

When WebMCP is available, the browser host provides `document.modelContext` and the page registers tools into that host. When WebMCP is not available, the human UI still works and the `Run Triage` button exercises the same workflow locally in any browser.

## What Makes It Different

Signal Desk is not a generic dashboard or chat wrapper. Its core contract is:

- Every customer-impact claim links back to supporting requests.
- Product actions stay in an approval-gated review queue.
- Human and agent changes share one decision log.
- WebMCP tool calls update the same state that the UI renders.
- The app runs from public-safe seeded data with no private account dependency.

## Current Phase

Current status:

- Static app shell.
- Seeded product/community intelligence dataset.
- Responsive operator workspace UI.
- Search, filter, request detail, pattern review, claim review, action review, and decision log.
- Normal-browser `Run Triage` fallback.
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

Site tools require a browser environment that supports WebMCP. Chrome Canary with WebMCP enabled has been confirmed. Regular Chrome, Safari, Firefox, and ChatGPT Work cloud browser can open the app UI, but they may show the fallback message instead of exposing WebMCP tools.

## Operator Flow

1. Open the `Admin Import Activation` case.
2. Review customer requests about import and setup confusion.
3. Run triage or ask the agent to find the strongest request pattern.
4. Review the evidence behind the onboarding gap.
5. Draft a customer-impact brief.
6. Propose product-owned actions.
7. Approve one action and mark one claim as needs edit.
8. Check the decision log.

For a WebMCP test, ask:

```text
Use the WebMCP tools on the open Signal Desk page. Search for admin import customer requests, explain the evidence behind the post-import onboarding gap, draft a customer-impact brief, propose product-owned actions, and show the decision log.
```

For a regular browser demo, click `Run Triage`. It searches the seeded customer requests, drafts the brief, proposes an approval-gated action, and writes the decision log without any external service.

## Behind The Scenes

The app includes a `Behind the Scenes` panel with WebMCP status, tool names, browser support notes, and the exact agent test prompt.

The WebMCP tools are:

- `search_signals`
- `cluster_signals`
- `draft_brief`
- `explain_evidence`
- `propose_actions`
- `set_review_state`
- `get_audit_trail`
- `reset_demo`

## Review Flow

1. Review the customer-impact brief.
2. Inspect linked request evidence.
3. Review proposed product actions.
4. Approve one action and mark one claim as needs edit.
5. Check the decision log.

The app should visibly update as WebMCP tools or normal UI actions run.

## Development Checks

```sh
npm run check
npm run build
```

## Privacy

The included scenario data is synthetic and public-safe. The current app does not ingest private Slack, X, Teams, email, customer, or personal data.

## License

MIT
