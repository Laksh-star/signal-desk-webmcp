# Signal Desk Submission Package

## Production URL

https://signal-desk-webmcp.lakshyindy.chatgpt.site

## Repository

https://github.com/Laksh-star/signal-desk-webmcp

## Status

Public deployment. The app is a static HTTPS site and does not require a local background service. In a WebMCP-capable browser, the page registers 8 tools through `document.modelContext`. In a regular browser, the UI still works and the `Run Triage` button exercises the same workflow locally.

Verified on August 27, 2026:

- Current live deployment loads with `8 WebMCP tools` in a WebMCP-capable browser.
- All 8 tools were fetched and called through the browser WebMCP capability.
- Repeated action proposal and repeated approval calls are idempotent.
- The demo was reset to the seeded clean state after testing.

## One-Line Description

Signal Desk helps support and product operators turn messy customer requests after a launch into evidence-backed product actions.

## Copy-Paste Short Description

Signal Desk is a customer-request triage workspace for product and support teams. It takes scattered launch feedback, finds repeated pain patterns, drafts a customer-impact brief, proposes product-owned follow-up actions, and keeps every claim linked to evidence with a visible decision log.

## Copy-Paste Technical Differentiator

Signal Desk uses WebMCP to expose product-native browser tools instead of asking an agent to scrape and click through the UI. The page registers tools for searching requests, clustering patterns, explaining evidence, drafting briefs, proposing actions, changing review state, reading the audit trail, and resetting the case. Tool calls update the same visible state the human operator reviews, so the agent workflow remains inspectable, approval-gated, and auditable.

## Longer Description

Signal Desk is a customer-request triage workspace. A support or product operator opens a launch case, reviews incoming requests from support, community, sales notes, changelog comments, and customer calls, then turns those requests into a customer-impact brief and product action plan.

WebMCP is the behind-the-scenes agent layer. The page exposes structured tools so an agent can search requests, group pain patterns, draft evidence-linked claims, explain supporting evidence, propose follow-up actions, and update review state. The human operator keeps control through approval states, while every agent and human change is visible in the decision log.

The demo uses synthetic public-safe data, so the workflow runs immediately without private Slack, X, Teams, email, or customer credentials.

## Exact WebMCP Test Prompt

Use this prompt after opening the production URL in a WebMCP-capable browser:

```text
Use the WebMCP tools on the open Signal Desk page. Search for admin import customer requests, explain the evidence behind the post-import onboarding gap, draft a customer-impact brief, propose product-owned actions, and show the decision log.
```

Expected result:

- The agent searches the seeded customer request set for admin/import evidence.
- The app highlights the post-import onboarding gap pattern.
- The customer-impact brief is updated with evidence-linked claims.
- Product-owned follow-up actions are proposed for human review.
- The decision log shows the sequence of tool-backed changes.

## Verified WebMCP Smoke Result

Tested on the live site on August 27, 2026.

Tools called:

1. `reset_demo`
2. `search_signals`
3. `cluster_signals`
4. `explain_evidence`
5. `draft_brief`
6. `propose_actions`
7. `set_review_state`
8. `get_audit_trail`

Observed outputs:

- `search_signals` found 4 matching customer requests for `admin import`.
- `explain_evidence` showed the post-import onboarding gap was supported by 4 customer requests.
- `draft_brief` created 2 evidence-linked customer-impact claims.
- `propose_actions` created 1 approval-gated product action.
- A second `propose_actions` call returned that proposals were already in the review queue.
- `set_review_state` approved `act-001`.
- A second approval call returned that `act-001` was already approved.
- `get_audit_trail` returned the tool-backed action history.
- `Reset Case` restored the seeded case to 3 actions and 3 audit rows.

## Normal Browser Test

Open the production URL in Chrome, Safari, Firefox, or another ordinary browser and click `Run Triage`. This runs the same seeded workflow without WebMCP support, so the value proposition is still visible even when `document.modelContext` is unavailable.

## Demo Script Under 3 Minutes

1. Open Signal Desk and frame the user problem: customers imported workspaces, but admins are confused about the next setup step.
2. Show the operator workflow: customer requests, pain patterns, customer-impact brief, product actions, and decision log.
3. Run the workflow with `Run Triage`, or paste the exact WebMCP prompt if WebMCP is available.
4. Show the updated brief, proposed actions, and decision log.
5. Approve one action and mark one claim as needs edit.
6. Open `Behind the Scenes` and briefly show the 8 WebMCP tools that power the agent workflow.
7. Close by emphasizing the workflow contract: claims stay evidence-linked, actions stay approval-gated, and every change is auditable.

## Judging Points

- Thoughtful WebMCP: agents use product-native tools instead of guessing through the UI.
- Human-agent experience: the user sees the same state the agent changes.
- Usefulness: support and product teams need a reliable way to turn messy customer requests into product follow-up.
- Originality: the app is customer-request triage with provenance and approvals, not a generic dashboard.
- Execution: works from a seeded deterministic scenario and needs no private data.

## Browser Requirement Note

The ordinary app experience works in any modern browser. The WebMCP tool experience requires a browser host that exposes `document.modelContext`; Chrome Canary with WebMCP enabled and the Codex in-app browser WebMCP capability have been verified. Regular Chrome may show `WebMCP unavailable` unless the right WebMCP flag and host integration are active.

## Final Submission Checklist

- Public repository URL: https://github.com/Laksh-star/signal-desk-webmcp
- Public live app URL: https://signal-desk-webmcp.lakshyindy.chatgpt.site
- Public demo video under 3 minutes.
- README includes run instructions and WebMCP tools.
- License included.
- Submission form includes the project description and demo video.
- Confirm the public app URL still returns `200` before submitting.
