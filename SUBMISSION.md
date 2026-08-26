# Signal Desk WebMCP Submission

## Production URL

https://signal-desk-webmcp.lakshyindy.chatgpt.site

## Repository

https://github.com/Laksh-star/signal-desk-webmcp

## Status

Public deployment. The app is a static HTTPS site and does not require a local background service. In a WebMCP-capable browser, the page registers 8 tools through `document.modelContext`. In a regular browser, the UI still works and the `Run Agent Demo` button exercises the same workflow locally.

## One-Line Description

Signal Desk is a provenance-first WebMCP intelligence review room where agents can search evidence, draft cited briefs, propose approval-gated actions, and preserve a shared human-agent audit trail.

## Longer Description

Signal Desk turns noisy community and product signals into a reviewable intelligence workspace. The app exposes structured WebMCP tools so an agent can search signals, cluster themes, draft evidence-linked claims, explain supporting evidence, propose follow-up actions, and update review state. Human operators keep control through explicit approval states, while every agent and human change is visible in the audit trail.

The demo uses synthetic public-safe data, so judges can run the workflow immediately without private Slack, X, Teams, email, or customer credentials.

## Exact WebMCP Test Prompt

Use this prompt after opening the production URL in a WebMCP-capable browser:

```text
Use the WebMCP tools on the open Signal Desk page. Search for admin import signals, explain the evidence behind the post-import onboarding gap, draft an evidence-linked brief, propose product-owned actions, and show the audit trail.
```

Expected result:

- The agent searches the seeded signal set for admin/import evidence.
- The app highlights the post-import onboarding gap theme.
- The draft brief is updated with evidence-linked claims.
- Product-owned follow-up actions are proposed for human review.
- The audit trail shows the sequence of tool-backed changes.

## Normal Browser Test

Open the production URL in Chrome, Safari, Firefox, or another ordinary browser and click `Run Agent Demo`. This runs the same seeded workflow without WebMCP support, so the value proposition is still visible even when `document.modelContext` is unavailable.

## Demo Script Under 3 Minutes

1. Open Signal Desk and point out whether the header says `8 WebMCP tools` or `WebMCP unavailable`.
2. If WebMCP is available, paste the exact prompt above.
3. If WebMCP is unavailable, click `Run Agent Demo`.
4. Show the updated brief, proposed actions, and audit trail.
5. Approve one action and mark one claim as needs edit.
6. Close by emphasizing the workflow contract: claims stay evidence-linked, actions stay approval-gated, and every change is auditable.

## Judging Points

- Thoughtful WebMCP: agents use product-native tools instead of guessing through the UI.
- Human-agent experience: the user sees the same state the agent changes.
- Usefulness: product, community, founder, and analyst teams need evidence-backed synthesis.
- Originality: the app is a decision room with provenance and approvals, not a generic dashboard.
- Execution: works from a seeded deterministic scenario and needs no private data.

## Final Submission Checklist

- Public repository URL: https://github.com/Laksh-star/signal-desk-webmcp
- Public live app URL: https://signal-desk-webmcp.lakshyindy.chatgpt.site
- Public demo video under 3 minutes.
- README includes run instructions and WebMCP tools.
- License included.
- Devpost form includes the challenge description and demo video.
- Confirm the public app URL still returns `200` before submitting.
