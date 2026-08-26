# WebMCP Signal Desk - Plan

## Approval Status

Status: Draft for review. Do not implement until approved.

## Goal

Build a WebMCP-enabled web app for the OpenAI WebMCP Challenge that demonstrates a strong human-agent workflow: turning noisy public/community signals into sourced, reviewable intelligence briefs and approved actions.

The app should be judge-friendly, deterministic, deployable, and usable without private X, Slack, Teams, or email credentials.

## Product Thesis

Signal Desk is a review room for community and market signals.

A human can inspect a stream of sourced signals, evidence, themes, draft brief sections, and proposed actions. An agent can use structured WebMCP tools exposed by the app to search, cluster, draft, explain, and prepare actions inside the same shared UI.

The key idea: the agent is not clicking around a generic interface. It is using product-native tools that preserve provenance, review state, and human approval boundaries.

## Differentiated Bet

Signal Desk is not trying to win as a generic analytics dashboard. It should win as a provenance-first decision workspace.

The app's special claim:

> Signal Desk is a provenance-first intelligence workspace where agents can investigate, draft, and propose actions, but every claim remains evidence-linked and every consequential action remains human-reviewed.

Most lightweight WebMCP demos can expose tools such as search, summarize, add item, and export. Signal Desk should go one level deeper by enforcing a workflow contract:

- Every agent-generated claim must link back to supporting signals.
- The agent can propose actions, but cannot silently approve them.
- Brief sections, evidence, and action states are visible in the same workspace.
- Human review state is part of the data model, not an afterthought.
- The audit trail is a product feature, not just a developer log.

The core demo should make this obvious: when the agent drafts a brief, each claim carries evidence; when it proposes actions, they wait for approval; when anything changes, the audit trail records it.

## Why This Fits WebMCP

WebMCP should be central to the demo, not a bolt-on.

The app becomes better with WebMCP because:

- Agents can query the app's structured state directly instead of scraping cards and buttons.
- The human and agent share the same evidence board, draft workspace, and approval trail.
- Tool outputs update visible app state, so the user can inspect what changed.
- Risky or external-facing actions stay approval-gated.
- The demo can show faster, more reliable collaboration than UI-only browser automation.

## Target Submission

The challenge submission should include:

- Working live URL.
- Public repository with source, instructions, and open source license.
- Clear text description explaining use case, WebMCP implementation, and human-agent value.
- Public demo video under 3 minutes.
- Seeded sample dataset so judges can run the workflow immediately.

## MVP Scope

The MVP should fit in a 2-3 day build window.

### Core UI

- Signal inbox with source, timestamp, author/channel, evidence URL, and confidence labels.
- Theme board grouping signals into emerging narratives.
- Brief editor with generated sections and cited evidence.
- Action queue with proposed follow-ups and approval state.
- Audit trail showing which tool changed what.
- Demo controls to reset or load a predefined scenario.

### Required Differentiators

- Claim-to-evidence links in the brief editor.
- Explicit action lifecycle: `proposed`, `approved`, `rejected`, `needs_edit`.
- Agent and human events in one readable audit trail.
- Clear separation between evidence, interpretation, and proposed action.
- Judge-visible state changes after WebMCP tool calls.

### Seed Data

Use synthetic or public-safe sample data modeled on community intelligence workflows:

- Product feedback signals.
- Support/community pain points.
- Competitor or ecosystem updates.
- Launch or docs confusion signals.
- Potential follow-up actions.

Do not include private workspace, Slack, X, Teams, customer, or personal data.

### WebMCP Tools

Initial tool set:

- `search_signals`: Find signals by keyword, source, theme, confidence, or date.
- `cluster_signals`: Group selected or filtered signals into themes.
- `draft_brief`: Create or update a brief from selected themes and signals.
- `explain_evidence`: Return evidence and rationale for a theme or draft claim.
- `propose_actions`: Suggest follow-up actions tied to cited signals.
- `set_review_state`: Mark draft sections or actions as approved, rejected, or needs-edit.
- `get_audit_trail`: Summarize recent agent and human changes.
- `reset_demo`: Restore the sample scenario for judges.

Optional polish tools if time allows:

- `compare_brief_versions`
- `export_markdown`
- `create_stakeholder_summary`
- `score_signal_priority`

## Non-Goals

These are explicitly out of scope unless approved later:

- Real X scraping or posting.
- Real Slack/Teams integrations.
- Private data ingestion.
- Background automations.
- Authentication.
- Multi-tenant accounts.
- Payment, billing, or production SaaS infrastructure.
- Complex AI backend dependency required for the demo to function.

## Technical Direction

Preferred shape:

- Small web app, likely React plus Vite or Next.js depending on deployment choice.
- Client-side seeded data store for predictable judging.
- WebMCP registered in browser via `document.modelContext.registerTool`.
- Graceful fallback UI if WebMCP is unavailable.
- Deploy on a simple public host such as Vercel, Netlify, Cloudflare, Render, or ChatGPT Sites.
- Keep implementation understandable and heavily demoable.

## Demo Story

The demo should show a judge asking an agent to:

1. Find the strongest signals about a product launch problem.
2. Cluster those signals into 2-3 themes.
3. Draft a concise intelligence brief with citations.
4. Explain the evidence behind one claim.
5. Propose follow-up actions.
6. Approve one action and reject another.
7. Show the audit trail proving what changed.

The visible app should update throughout the workflow.

## Winning Criteria We Optimize For

- WebMCP leverage: tools are meaningful, structured, and state-changing.
- Execution: polished, coherent, working product experience.
- Impact: real workflow for operators, founders, community teams, product teams, and analysts.
- Creativity: human-agent decision room with enforced provenance and approval state, not another generic chat wrapper.
- Demo clarity: judges can understand the value in under 3 minutes.

## Risks

- WebMCP browser support may be experimental or inconsistent.
- Overbuilding integrations could burn time and introduce privacy risk.
- A generic dashboard would not stand out.
- A purely technical proof of concept would score weakly on product experience.
- Demo video quality matters; unclear narration can reduce perceived value.

## Mitigations

- Keep the public app seeded and deterministic.
- Make WebMCP tools visible through state changes and audit entries.
- Add a non-WebMCP fallback panel explaining unavailable browser support.
- Avoid real third-party credentials.
- Finish MVP before adding polish.
- Write README and demo script alongside implementation, not at the end.

## Build Phases After Approval

### Phase 1 - Skeleton

- Create app scaffold.
- Add sample data model.
- Build core UI layout.
- Add resettable local state.

### Phase 2 - WebMCP

- Register initial WebMCP tools.
- Wire tools to state mutations.
- Add audit logging for tool calls.
- Test in ChatGPT in-app browser or Chrome WebMCP mode.

### Phase 3 - Product Polish

- Improve visual design and responsive layout.
- Add brief editor, evidence drawer, and action states.
- Add demo scenario reset.
- Add README and license.

### Phase 4 - Submission Package

- Deploy live app.
- Verify public URL.
- Record under-3-minute demo.
- Draft Devpost description.
- Confirm repo is public and self-contained.

## Approval Questions

Before implementation, confirm:

- Project name: keep `Signal Desk`, or rename?
- Public dataset style: product/community intelligence, competitive intelligence, or another domain?
- Deployment target preference: ChatGPT Sites, Vercel, Netlify, Cloudflare, Render, or simplest available?
- Should the first implementation avoid any live model/API calls and stay fully deterministic?
