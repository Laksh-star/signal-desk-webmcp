# Signal Desk WebMCP Submission

## Production URL

https://signal-desk-webmcp.lakshyindy.chatgpt.site

## Repository

https://github.com/Laksh-star/signal-desk-webmcp

## Status

Public deployment. The app is a static HTTPS site and does not require a local background service. In a WebMCP-capable browser, the page registers 8 tools through `document.modelContext`. In a regular browser, the UI still works and the `Run Triage` button exercises the same workflow locally.

## One-Line Description

Signal Desk helps support and product operators turn messy customer requests after a launch into evidence-backed product actions.

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

## Final Submission Checklist

- Public repository URL: https://github.com/Laksh-star/signal-desk-webmcp
- Public live app URL: https://signal-desk-webmcp.lakshyindy.chatgpt.site
- Public demo video under 3 minutes.
- README includes run instructions and WebMCP tools.
- License included.
- Devpost form includes the challenge description and demo video.
- Confirm the public app URL still returns `200` before submitting.
