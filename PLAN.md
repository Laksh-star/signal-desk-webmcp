# WebMCP Signal Desk - Plan

## Approval Status

Status: Draft for review. Do not implement until approved.

## Goal

Build a WebMCP-enabled web app that demonstrates a strong human-agent workflow: turning noisy public/community signals into sourced, reviewable intelligence briefs and approved actions.

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

---

# Completion Plan - User-Ready App

## Approval Status

Status: Draft for review. Do not implement this completion plan until approved.

## Current Reality

Signal Desk now works as a public static app, and its WebMCP path has been confirmed in Chrome Canary with WebMCP enabled. The access risk is under control.

The remaining gap is product clarity. The app should feel less like “testing WebMCP tools” and more like a simple workflow for a real person handling customer requests after a product launch.

## Product Story

Signal Desk should be easy to explain:

> Signal Desk helps a support or product operator make sense of messy customer requests after a launch.

The user opens the app, sees customer requests from support, community, changelog comments, and sales notes, and asks:

> What are customers asking us to fix, what evidence supports it, and what should product do next?

The app then:

- groups similar customer requests,
- shows the evidence behind each pattern,
- drafts a short customer-impact brief,
- proposes next actions,
- lets the operator approve, reject, or request edits,
- keeps an audit trail of what changed.

That is the primary app experience. WebMCP is the behind-the-scenes agent layer that makes the workflow faster and more reliable.

## Target User

Primary user:

> A support/product operator responsible for turning customer requests into product follow-up after a launch.

Secondary user:

> A technical reviewer, developer, or challenge judge who wants to see how the browser agent uses WebMCP tools behind the scenes.

The app should serve both users without mixing their needs. The default screen should speak to the operator. The technical details should live in a separate “Behind the scenes” area.

## Target Workflow

The app should support one clear end-to-end user flow:

1. The operator opens the `Admin Import Activation` case.
2. They review incoming customer requests about import and setup confusion.
3. They run triage manually or ask an agent to help.
4. Similar requests are grouped into customer pain patterns.
5. The operator opens the strongest pattern and reviews supporting evidence.
6. Signal Desk drafts a customer-impact brief.
7. Signal Desk proposes product-owned next actions.
8. The operator approves, rejects, or marks actions as needs edit.
9. The audit trail shows what changed and why.

The workflow should feel like a practical customer-requests tool, not a developer test harness.

## App Structure

### Operator Layer

This is the default product experience.

Use plain labels:

- `Customer Requests`
- `Patterns`
- `Customer Impact Brief`
- `Product Actions`
- `Decision Log`

Avoid making WebMCP the headline. The operator does not need to understand browser APIs to use the app.

Core operator actions:

- `Run Triage`
- `Import Requests`
- `Review Evidence`
- `Approve Action`
- `Needs Edit`
- `Reject`
- `Reset Case`

### Behind-The-Scenes Layer

This should be a secondary panel, drawer, or modal for technical users.

It should show:

- WebMCP status: available or unavailable.
- Registered tool count.
- Exact agent prompt.
- Tool list with simple descriptions.
- Which tools are read-only versus state-changing.
- Browser requirement note: Chrome Canary with WebMCP enabled, or another WebMCP-capable browser host.
- Recent WebMCP/audit activity.

This layer should explain the technology without making the whole app feel technical.

## What Needs To Improve

### 1. First-Run Clarity

Problem: The current screen feels like a dense intelligence dashboard. A regular operator may not immediately know what to do.

Planned changes:

- Add a compact case header:
  - `Case`: Admin Import Activation.
  - `User question`: What are customers asking us to fix after import?
  - `Outcome`: customer-impact brief and product action plan.
- Rename `Run Agent Demo` to a more user-facing action such as `Run Triage`.
- Add `Behind the Scenes` as a secondary technical button.
- Keep the WebMCP status visible, but not dominant.

Acceptance criteria:

- A non-technical operator can understand the task within 20 seconds.
- The first obvious action is a product workflow action, not a technology test.
- WebMCP availability is still clear for technical users.

### 2. Customer Request Scenario

Problem: The data works, but it should feel like a real customer-requests queue.

Planned changes:

- Reframe seeded signals as customer requests and launch feedback.
- Use sources like:
  - Support Inbox
  - Community Forum
  - Sales Note
  - Changelog Comment
  - Customer Call
- Add metadata that an operator cares about:
  - customer segment,
  - affected workflow,
  - customer impact,
  - urgency,
  - suggested owner.
- Add a few more realistic requests so the patterns feel earned.

Acceptance criteria:

- The user can tell these are real-world customer requests, not abstract “signals.”
- The main pattern reads like a concrete product issue.
- Product actions feel like something a team could actually pick up.

### 3. Customer Impact Brief

Problem: “Brief” is useful, but it should be framed around what the team needs to decide.

Planned changes:

- Rename or subtitle the brief as `Customer Impact Brief`.
- Structure it into:
  - `What customers are saying`
  - `Evidence`
  - `Likely cause`
  - `Recommended product action`
  - `Open questions`
- Keep each claim linked to request evidence.

Acceptance criteria:

- The brief is readable by a product manager or support lead.
- Every important claim points back to supporting requests.
- The user can separate evidence from interpretation.

### 4. Product Actions Workflow

Problem: Review states exist, but they should feel like a real decision queue.

Planned changes:

- Rename action area to `Product Actions`.
- Add clearer action cards with:
  - owner,
  - effort,
  - impact,
  - status,
  - supporting evidence.
- Add a small `Ready to share` or `Needs review` summary.
- Make approve/reject/edit actions visually consistent and easy to scan.

Acceptance criteria:

- The operator can see what is ready, blocked, or needs edits.
- Proposed actions feel operational, not decorative.
- Review decisions appear in the decision log.

### 5. Bring-Your-Own-Requests

Problem: Seeded-only data makes the app feel like a demo.

Planned changes:

- Add `Import Requests` for CSV or JSON.
- Support a simple schema:
  - `title`
  - `summary`
  - `source`
  - `urgency`
  - `segment`
  - `tags`
  - `date`
  - optional `url`
- Parse locally in the browser.
- Add imported requests to the queue and decision log.
- Provide a sample import format.

Acceptance criteria:

- A target user can try the app with their own small request set.
- Import does not require a backend, login, or API key.
- Imported requests participate in search, grouping, brief drafting, and actions.

### 6. Evidence Experience

Problem: Provenance is the core value, so evidence should be visible and easy to trace.

Planned changes:

- Improve selected request detail.
- Add a compact evidence drawer or detail panel.
- Show which requests support each pattern, claim, and action.
- Use clear labels like `Evidence`, `Interpretation`, and `Action`.

Acceptance criteria:

- A user can trace a brief claim back to original customer requests in one click.
- Evidence is not mixed up with recommendations.
- Trust is visible without adding clutter.

### 7. Behind-The-Scenes WebMCP Panel

Problem: The app needs to showcase WebMCP, but the default user experience should not feel technical.

Planned changes:

- Add a `Behind the Scenes` panel.
- Show the 8 registered tools:
  - `search_signals`
  - `cluster_signals`
  - `draft_brief`
  - `explain_evidence`
  - `propose_actions`
  - `set_review_state`
  - `get_audit_trail`
  - `reset_demo`
- Explain each tool in user-job language.
- Show the exact test prompt for Chrome Canary WebMCP.
- Mark tools as read-only or state-changing.
- Link tool calls to visible UI updates and decision-log entries.

Acceptance criteria:

- Technical users can understand how WebMCP powers the app.
- Regular users can ignore this panel and still complete the workflow.
- The agent can complete the real customer-request triage flow reliably.

### 8. Submission Polish

Problem: The challenge package still matters, but it should document the real product workflow first.

Planned changes:

- Update `SUBMISSION.md` around the customer-request triage story.
- Record a 2-3 minute demo:
  - first 90 seconds: operator workflow,
  - final 30-60 seconds: behind-the-scenes WebMCP tools.
- Add final screenshots if helpful.

Acceptance criteria:

- The submission describes a product use case before the technology.
- The demo video shows a regular user workflow end to end.
- The WebMCP explanation is concise and credible.

## Proposed Implementation Order

### Phase A - Product Reframe

- Rename visible UI areas around customer requests.
- Add the `Admin Import Activation` case header.
- Rename `Run Agent Demo` to `Run Triage`.
- Add a secondary `Behind the Scenes` entry point.

Reason: This changes first impression from technical demo to usable product.

### Phase B - Workflow Depth

- Improve customer request data and metadata.
- Improve pattern cards, selected request detail, and evidence display.
- Restructure the brief into customer-impact sections.
- Improve product action cards and decision summary.

Reason: This makes the core workflow useful for the target operator.

### Phase C - Bring-Your-Own-Requests

- Add local CSV/JSON import.
- Add validation and sample schema.
- Ensure imported requests flow through triage, brief, actions, and audit.

Reason: This makes the app testable with real user data without backend complexity.

### Phase D - Behind-The-Scenes And Submission

- Add the technical WebMCP panel.
- Polish tool descriptions and structured outputs.
- Dogfood in Chrome Canary WebMCP.
- Update README and `SUBMISSION.md`.
- Prepare final demo script.

Reason: This preserves the challenge strength while keeping the product experience simple.

## Scope Guardrails

Do not add before submission unless explicitly approved:

- Login/accounts.
- Real Slack, Teams, Gmail, or X ingestion.
- Server-side AI calls.
- Paid API dependency.
- Multi-workspace SaaS features.
- Complex analytics charts.
- Anything that makes the app harder for a first-time operator to understand.

## Definition Of Done

The completion pass is done when:

- The app can be explained as customer-request triage in one sentence.
- A regular operator can complete the workflow without knowing what WebMCP is.
- Chrome Canary with WebMCP can run the same workflow through page tools.
- A technical user can open `Behind the Scenes` and inspect the WebMCP tool layer.
- A target user can import a small CSV/JSON request set locally.
- Evidence, customer-impact claims, product actions, and decision log are visibly connected.
- README and `SUBMISSION.md` match the final product story.
- GitHub and production deployment are updated.
- The demo script starts with the customer problem and ends with the technical WebMCP explanation.
