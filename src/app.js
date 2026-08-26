import { initialState } from "./data.js";

const stateKey = "signal-desk-state-v1";
const filters = ["all", "critical", "high", "medium", "selected"];
let activeFilter = "all";
let searchTerm = "";
let state = loadState();

const els = {
  signalList: document.querySelector("#signal-list"),
  signalFilters: document.querySelector("#signal-filters"),
  signalSearch: document.querySelector("#signal-search"),
  themeList: document.querySelector("#theme-list"),
  themeCount: document.querySelector("#theme-count"),
  briefContent: document.querySelector("#brief-content"),
  briefStatus: document.querySelector("#brief-status"),
  actionList: document.querySelector("#action-list"),
  actionCount: document.querySelector("#action-count"),
  signalDetail: document.querySelector("#signal-detail"),
  auditList: document.querySelector("#audit-list"),
  resetDemo: document.querySelector("#reset-demo"),
  selectCritical: document.querySelector("#select-critical"),
  toolStatus: document.querySelector("#tool-status"),
  scoreboard: document.querySelector("#scoreboard"),
};

const reviewStates = ["proposed", "approved", "rejected", "needs_edit"];
const webMcpToolNames = [
  "search_signals",
  "cluster_signals",
  "draft_brief",
  "explain_evidence",
  "propose_actions",
  "set_review_state",
  "get_audit_trail",
  "reset_demo",
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const saved = window.localStorage.getItem(stateKey);
  if (!saved) return clone(initialState);

  try {
    return JSON.parse(saved);
  } catch {
    window.localStorage.removeItem(stateKey);
    return clone(initialState);
  }
}

function saveState() {
  state.lastUpdated = new Date().toISOString();
  window.localStorage.setItem(stateKey, JSON.stringify(state));
}

function resetDemo() {
  state = clone(initialState);
  activeFilter = "all";
  searchTerm = "";
  els.signalSearch.value = "";
  saveState();
  render();
}

function resetDemoWithAudit(actor = "Human") {
  resetDemo();
  addAudit(actor, "Reset demo scenario", "Restored seeded signals, themes, brief, actions, and audit trail.");
  saveState();
  render();
}

function addAudit(actor, action, detail) {
  state.auditTrail.unshift({
    id: `audit-${Date.now()}`,
    actor,
    action,
    detail,
    timestamp: new Date().toISOString(),
  });
}

function getSignal(id) {
  return state.signals.find((signal) => signal.id === id);
}

function getTheme(id) {
  return state.themes.find((theme) => theme.id === id);
}

function getAction(id) {
  return state.actions.find((action) => action.id === id);
}

function getActiveSignal() {
  return getSignal(state.activeSignalId) || state.signals[0];
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function labelFor(value) {
  return value.replace("_", " ");
}

function tokenizeSearch(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function signalHaystack(signal) {
  return [
    signal.title,
    signal.excerpt,
    signal.source,
    signal.author,
    signal.channel,
    ...signal.evidenceTags,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesSearchTokens(haystack, tokens) {
  return !tokens.length || tokens.every((token) => haystack.includes(token));
}

function asToolResult(text, structuredContent = {}) {
  return {
    content: [{ type: "text", text }],
    structuredContent,
  };
}

function signalSummary(signal) {
  return {
    id: signal.id,
    title: signal.title,
    source: signal.source,
    author: signal.author,
    channel: signal.channel,
    confidence: signal.confidence,
    priority: signal.priority,
    excerpt: signal.excerpt,
    evidenceTags: signal.evidenceTags,
    url: signal.url,
  };
}

function themeSummary(theme) {
  return {
    id: theme.id,
    name: theme.name,
    summary: theme.summary,
    confidence: theme.confidence,
    reviewState: theme.reviewState,
    signalIds: theme.signalIds,
    evidence: theme.signalIds
      .map((id) => getSignal(id))
      .filter(Boolean)
      .map((signal) => signalSummary(signal)),
  };
}

function actionSummary(action) {
  return {
    id: action.id,
    title: action.title,
    owner: action.owner,
    due: action.due,
    state: action.state,
    rationale: action.rationale,
    evidenceSignalIds: action.evidenceSignalIds,
  };
}

function allEvidenceIds() {
  return new Set([
    ...state.themes.flatMap((theme) => theme.signalIds),
    ...state.brief.sections.flatMap((section) => section.evidenceSignalIds),
    ...state.actions.flatMap((action) => action.evidenceSignalIds),
  ]);
}

function reviewCounts() {
  const reviewItems = [
    ...state.themes.map((theme) => theme.reviewState),
    ...state.brief.sections.map((section) => section.reviewState),
    ...state.actions.map((action) => action.state),
  ];

  return reviewItems.reduce(
    (counts, reviewState) => {
      counts[reviewState] = (counts[reviewState] || 0) + 1;
      return counts;
    },
    { proposed: 0, approved: 0, rejected: 0, needs_edit: 0 },
  );
}

function updateToolStatus(status, label) {
  const dotClass = status === "available" ? "available" : status === "unavailable" ? "unavailable" : "pending";
  els.toolStatus.innerHTML = `
    <span class="status-dot ${dotClass}" aria-hidden="true"></span>
    <span>${label}</span>
  `;
}

function renderScoreboard() {
  const counts = reviewCounts();
  els.scoreboard.innerHTML = `
    <div class="metric">
      <span>Signals</span>
      <strong>${state.signals.length}</strong>
    </div>
    <div class="metric">
      <span>Evidence Used</span>
      <strong>${allEvidenceIds().size}</strong>
    </div>
    <div class="metric">
      <span>Approved</span>
      <strong>${counts.approved}</strong>
    </div>
    <div class="metric">
      <span>Needs Review</span>
      <strong>${counts.proposed + counts.needs_edit}</strong>
    </div>
  `;
}

function filteredSignals() {
  const searchTokens = tokenizeSearch(searchTerm);
  return state.signals.filter((signal) => {
    const matchesFilter =
      activeFilter === "all" ||
      signal.priority === activeFilter ||
      signal.confidence === activeFilter ||
      signal.status === activeFilter;
    const matchesSearch = matchesSearchTokens(signalHaystack(signal), searchTokens);

    return matchesFilter && matchesSearch;
  });
}

function renderFilters() {
  els.signalFilters.innerHTML = filters
    .map(
      (filter) => `
        <button
          class="chip ${activeFilter === filter ? "active" : ""}"
          type="button"
          data-filter="${filter}"
        >
          ${labelFor(filter)}
        </button>
      `,
    )
    .join("");
}

function renderSignals() {
  const signals = filteredSignals();
  els.signalList.innerHTML =
    signals
      .map(
        (signal) => `
          <article class="signal-card ${signal.id === state.activeSignalId ? "active" : ""}" data-signal-id="${signal.id}">
            <div class="card-row">
              <span class="source">${signal.source}</span>
              <span class="priority ${signal.priority}">${signal.priority}</span>
            </div>
            <h3>${signal.title}</h3>
            <p>${signal.excerpt}</p>
            <div class="meta-row">
              <span>${signal.author}</span>
              <span>${formatDate(signal.timestamp)}</span>
            </div>
            <div class="tag-row">
              ${signal.evidenceTags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
          </article>
        `,
      )
      .join("") || `<p class="empty-state">No signals match this view.</p>`;
}

function renderThemes() {
  els.themeCount.textContent = `${state.themes.length} themes`;
  els.themeList.innerHTML = state.themes
    .map((theme) => {
      const supportCount = theme.signalIds.length;
      return `
        <article class="theme-card ${theme.id === state.activeThemeId ? "active" : ""}" data-theme-id="${theme.id}">
          <div class="card-row">
            <span class="confidence">${theme.confidence} confidence</span>
            <span class="state ${theme.reviewState}">${labelFor(theme.reviewState)}</span>
          </div>
          <h3>${theme.name}</h3>
          <p>${theme.summary}</p>
          <div class="support-line">${supportCount} supporting signals</div>
          <div class="review-controls compact" data-review-theme-id="${theme.id}">
            <button type="button" data-state="approved">Approve</button>
            <button type="button" data-state="needs_edit">Needs Edit</button>
            <button type="button" data-state="rejected">Reject</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderBrief() {
  els.briefStatus.textContent = labelFor(state.brief.status);
  els.briefStatus.className = `status-pill ${state.brief.status}`;
  els.briefContent.innerHTML = `
    <div class="brief-title">
      <h3>${state.brief.title}</h3>
      <p>Updated by ${state.brief.updatedBy}</p>
    </div>
    <div class="claim-list">
      ${state.brief.sections
        .map(
          (section) => `
            <article class="claim-card">
              <div class="card-row">
                <span class="claim-label">${section.label}</span>
                <span class="state ${section.reviewState}">${labelFor(section.reviewState)}</span>
              </div>
              <p>${section.claim}</p>
              <div class="evidence-links">
                ${section.evidenceSignalIds
                  .map((id) => {
                    const signal = getSignal(id);
                    return `<button type="button" data-signal-id="${id}">${signal ? signal.title : id}</button>`;
                  })
                  .join("")}
              </div>
              <div class="review-controls compact" data-claim-id="${section.id}">
                <button type="button" data-state="approved">Approve</button>
                <button type="button" data-state="needs_edit">Needs Edit</button>
                <button type="button" data-state="rejected">Reject</button>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderActions() {
  els.actionCount.textContent = `${state.actions.length} actions`;
  els.actionList.innerHTML = state.actions
    .map(
      (action) => `
        <article class="action-card">
          <div class="card-row">
            <span class="owner">${action.owner}</span>
            <span class="state ${action.state}">${labelFor(action.state)}</span>
          </div>
          <h3>${action.title}</h3>
          <p>${action.rationale}</p>
          <div class="meta-row">
            <span>Due ${action.due}</span>
            <span>${action.evidenceSignalIds.length} evidence links</span>
          </div>
          <div class="evidence-links">
            ${action.evidenceSignalIds
              .map((id) => {
                const signal = getSignal(id);
                return `<button type="button" data-signal-id="${id}">${signal ? signal.title : id}</button>`;
              })
              .join("")}
          </div>
          <div class="review-controls" data-action-id="${action.id}">
            <button type="button" data-state="approved">Approve</button>
            <button type="button" data-state="needs_edit">Needs Edit</button>
            <button type="button" data-state="rejected">Reject</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderDetail() {
  const signal = getActiveSignal();
  if (!signal) {
    els.signalDetail.innerHTML = `<p class="empty-state">Select a signal to inspect evidence.</p>`;
    return;
  }

  const linkedThemes = state.themes.filter((theme) => theme.signalIds.includes(signal.id));
  const linkedClaims = state.brief.sections.filter((section) => section.evidenceSignalIds.includes(signal.id));
  const linkedActions = state.actions.filter((action) => action.evidenceSignalIds.includes(signal.id));

  els.signalDetail.innerHTML = `
    <article class="detail-card">
      <div class="card-row">
        <span class="source">${signal.source}</span>
        <span class="confidence">${signal.confidence} confidence</span>
      </div>
      <h3>${signal.title}</h3>
      <p>${signal.excerpt}</p>
      <dl>
        <div><dt>Author</dt><dd>${signal.author}</dd></div>
        <div><dt>Channel</dt><dd>${signal.channel}</dd></div>
        <div><dt>Captured</dt><dd>${formatDate(signal.timestamp)}</dd></div>
        <div><dt>Status</dt><dd>${labelFor(signal.status)}</dd></div>
      </dl>
      <a class="evidence-url" href="${signal.url}" target="_blank" rel="noreferrer">Open evidence source</a>
      <div class="linked-themes">
        <h4>Linked themes</h4>
        ${linkedThemes.map((theme) => `<span>${theme.name}</span>`).join("") || "<p>No linked themes.</p>"}
      </div>
      <div class="linked-themes">
        <h4>Used in brief claims</h4>
        ${linkedClaims.map((claim) => `<span>${claim.label}</span>`).join("") || "<p>No brief claims cite this signal.</p>"}
      </div>
      <div class="linked-themes">
        <h4>Used in actions</h4>
        ${linkedActions.map((action) => `<span>${action.title}</span>`).join("") || "<p>No actions cite this signal.</p>"}
      </div>
    </article>
  `;
}

function renderAudit() {
  els.auditList.innerHTML = state.auditTrail
    .slice(0, 8)
    .map(
      (entry) => `
        <li>
          <div class="audit-head">
            <span>${entry.actor}</span>
            <time>${formatDate(entry.timestamp)}</time>
          </div>
          <strong>${entry.action}</strong>
          <p>${entry.detail}</p>
        </li>
      `,
    )
    .join("");
}

function render() {
  renderScoreboard();
  renderFilters();
  renderSignals();
  renderThemes();
  renderBrief();
  renderActions();
  renderDetail();
  renderAudit();
}

function selectSignal(signalId) {
  const signal = getSignal(signalId);
  if (!signal) return;

  state.activeSignalId = signalId;
  state.signals = state.signals.map((item) =>
    item.id === signalId ? { ...item, status: "selected" } : item,
  );
  saveState();
  render();
}

function setHumanReviewState(targetType, targetId, reviewState) {
  if (!reviewStates.includes(reviewState)) return;

  let target;
  if (targetType === "action") {
    target = getAction(targetId);
    if (target && target.state !== reviewState) target.state = reviewState;
  } else if (targetType === "theme") {
    target = getTheme(targetId);
    if (target && target.reviewState !== reviewState) target.reviewState = reviewState;
  } else if (targetType === "claim") {
    target = state.brief.sections.find((section) => section.id === targetId);
    if (target && target.reviewState !== reviewState) target.reviewState = reviewState;
  }

  if (!target) return;
  addAudit("Human", `Marked ${targetType} ${labelFor(reviewState)}`, target.title || target.name || target.label);
  saveState();
  render();
}

function getModelContext() {
  return document.modelContext || navigator.modelContext || null;
}

function searchSignalsTool({ query = "", priority = "all", confidence = "all", limit = 6 } = {}) {
  const searchTokens = tokenizeSearch(query);
  const safeLimit = Math.max(1, Math.min(Number(limit) || 6, 20));
  const matches = state.signals
    .filter((signal) => {
      const matchesQuery = matchesSearchTokens(signalHaystack(signal), searchTokens);
      const matchesPriority = priority === "all" || signal.priority === priority;
      const matchesConfidence = confidence === "all" || signal.confidence === confidence;

      return matchesQuery && matchesPriority && matchesConfidence;
    })
    .slice(0, safeLimit)
    .map((signal) => signalSummary(signal));

  return asToolResult(`Found ${matches.length} matching signals.`, { signals: matches });
}

function clusterSignalsTool({ signalIds = [], minConfidence = "medium" } = {}) {
  const selectedSignals = signalIds.length
    ? signalIds.map((id) => getSignal(id)).filter(Boolean)
    : state.signals.filter((signal) =>
        minConfidence === "high"
          ? signal.confidence === "high"
          : ["high", "medium"].includes(signal.confidence),
      );

  if (!selectedSignals.length) {
    return asToolResult("No matching signals were available to cluster.", { themes: [] });
  }

  const signalIdSet = new Set(selectedSignals.map((signal) => signal.id));
  state.themes = state.themes.map((theme) => ({
    ...theme,
    signalIds: theme.signalIds.filter((id) => signalIdSet.has(id) || !signalIds.length),
    reviewState: theme.reviewState === "approved" ? "approved" : "proposed",
  }));
  state.activeThemeId = state.themes[0]?.id || state.activeThemeId;
  addAudit(
    "Agent",
    `Clustered ${selectedSignals.length} signals`,
    "Refreshed theme support from the selected signal set while preserving evidence links.",
  );
  saveState();
  render();

  return asToolResult(`Clustered ${selectedSignals.length} signals into ${state.themes.length} themes.`, {
    themes: state.themes.map((theme) => themeSummary(theme)),
  });
}

function draftBriefTool({ themeIds = [], title = "" } = {}) {
  const selectedThemes = (themeIds.length ? themeIds : state.themes.map((theme) => theme.id))
    .map((id) => getTheme(id))
    .filter(Boolean);

  if (!selectedThemes.length) {
    return asToolResult("No themes were available for drafting.", { brief: state.brief });
  }

  state.brief = {
    title: title || "Launch Intelligence Brief: Import Activation",
    status: "draft",
    updatedBy: "WebMCP agent",
    sections: selectedThemes.map((theme, index) => ({
      id: `claim-agent-${index + 1}`,
      label: index === 0 ? "Primary risk" : index === 1 ? "Evidence pattern" : "Recommended move",
      claim:
        index === 0
          ? `${theme.name}: ${theme.summary}`
          : `${theme.name} is supported by ${theme.signalIds.length} linked signals and should remain reviewable before action.`,
      evidenceSignalIds: theme.signalIds.slice(0, 3),
      reviewState: "proposed",
    })),
  };
  addAudit(
    "Agent",
    `Drafted brief from ${selectedThemes.length} themes`,
    "Every generated claim carries linked supporting signals.",
  );
  saveState();
  render();

  return asToolResult(`Drafted ${state.brief.sections.length} evidence-linked brief claims.`, {
    brief: state.brief,
  });
}

function explainEvidenceTool({ targetType = "theme", targetId = "" } = {}) {
  if (targetType === "claim") {
    const claim = state.brief.sections.find((section) => section.id === targetId);
    if (!claim) return asToolResult(`Claim ${targetId} was not found.`, { evidence: [] });

    const evidence = claim.evidenceSignalIds.map((id) => getSignal(id)).filter(Boolean).map(signalSummary);
    return asToolResult(`Claim "${claim.label}" is supported by ${evidence.length} signals.`, {
      target: claim,
      evidence,
    });
  }

  const theme = getTheme(targetId || state.activeThemeId);
  if (!theme) return asToolResult(`Theme ${targetId} was not found.`, { evidence: [] });

  return asToolResult(`Theme "${theme.name}" is supported by ${theme.signalIds.length} signals.`, {
    theme: themeSummary(theme),
  });
}

function proposeActionsTool({ themeIds = [], owner = "Product" } = {}) {
  const selectedThemes = (themeIds.length ? themeIds : [state.activeThemeId])
    .map((id) => getTheme(id))
    .filter(Boolean);

  if (!selectedThemes.length) {
    return asToolResult("No themes were available for action proposals.", { actions: [] });
  }

  const newActions = selectedThemes.map((theme, index) => ({
    id: `act-agent-${Date.now()}-${index}`,
    title: `Review response for ${theme.name.toLowerCase()}`,
    owner,
    due: "2026-09-01",
    rationale: `Proposed from ${theme.signalIds.length} linked evidence signals. Human approval is required before execution.`,
    evidenceSignalIds: theme.signalIds.slice(0, 3),
    state: "proposed",
  }));

  state.actions = [...newActions, ...state.actions];
  addAudit(
    "Agent",
    `Proposed ${newActions.length} actions`,
    "Actions were added as proposed items and require human review before execution.",
  );
  saveState();
  render();

  return asToolResult(`Proposed ${newActions.length} approval-gated actions.`, {
    actions: newActions.map((action) => actionSummary(action)),
  });
}

function setReviewStateTool({ targetType = "action", targetId = "", reviewState = "needs_edit" } = {}) {
  if (!reviewStates.includes(reviewState)) {
    return asToolResult(`Unsupported review state: ${reviewState}.`, { allowedStates: reviewStates });
  }

  let target;
  if (targetType === "action") {
    target = getAction(targetId);
    if (target) target.state = reviewState;
  } else if (targetType === "theme") {
    target = getTheme(targetId);
    if (target) target.reviewState = reviewState;
  } else if (targetType === "claim") {
    target = state.brief.sections.find((section) => section.id === targetId);
    if (target) target.reviewState = reviewState;
  }

  if (!target) {
    return asToolResult(`${targetType} ${targetId} was not found.`, { updated: false });
  }

  addAudit("Agent", `Marked ${targetType} ${labelFor(reviewState)}`, target.title || target.name || target.label);
  saveState();
  render();

  return asToolResult(`Marked ${targetType} ${targetId} as ${labelFor(reviewState)}.`, {
    updated: true,
    targetType,
    targetId,
    reviewState,
  });
}

function getAuditTrailTool({ limit = 8 } = {}) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 8, 20));
  return asToolResult(`Returning ${Math.min(safeLimit, state.auditTrail.length)} audit entries.`, {
    auditTrail: state.auditTrail.slice(0, safeLimit),
  });
}

async function registerWebMcpTools() {
  const modelContext = getModelContext();
  window.SignalDeskWebMCP = {
    available: Boolean(modelContext),
    tools: webMcpToolNames,
  };

  if (!modelContext?.registerTool) {
    updateToolStatus("unavailable", "Use ChatGPT desktop browser for WebMCP");
    return;
  }

  const controller = new AbortController();
  window.addEventListener("pagehide", () => controller.abort(), { once: true });

  const tools = [
    {
      name: "search_signals",
      description:
        "Search Signal Desk evidence by query, priority, and confidence. Returns signal summaries without changing app state.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Keyword or phrase to search for." },
          priority: { type: "string", enum: ["all", "critical", "high", "medium"] },
          confidence: { type: "string", enum: ["all", "high", "medium"] },
          limit: { type: "integer", minimum: 1, maximum: 20 },
        },
        additionalProperties: false,
      },
      execute: searchSignalsTool,
    },
    {
      name: "cluster_signals",
      description:
        "Refresh visible theme support from selected signals while preserving evidence links and adding an agent audit event.",
      inputSchema: {
        type: "object",
        properties: {
          signalIds: { type: "array", items: { type: "string" } },
          minConfidence: { type: "string", enum: ["medium", "high"] },
        },
        additionalProperties: false,
      },
      execute: clusterSignalsTool,
    },
    {
      name: "draft_brief",
      description:
        "Draft evidence-linked brief claims from selected themes and update the visible brief editor.",
      inputSchema: {
        type: "object",
        properties: {
          themeIds: { type: "array", items: { type: "string" } },
          title: { type: "string" },
        },
        additionalProperties: false,
      },
      execute: draftBriefTool,
    },
    {
      name: "explain_evidence",
      description:
        "Explain the evidence supporting a theme or brief claim. Returns the linked signals and does not change app state.",
      inputSchema: {
        type: "object",
        properties: {
          targetType: { type: "string", enum: ["theme", "claim"] },
          targetId: { type: "string" },
        },
        additionalProperties: false,
      },
      execute: explainEvidenceTool,
    },
    {
      name: "propose_actions",
      description:
        "Create approval-gated action proposals from selected themes and add them to the visible review queue.",
      inputSchema: {
        type: "object",
        properties: {
          themeIds: { type: "array", items: { type: "string" } },
          owner: { type: "string" },
        },
        additionalProperties: false,
      },
      execute: proposeActionsTool,
    },
    {
      name: "set_review_state",
      description:
        "Set review state for an action, theme, or brief claim. This records an agent audit event.",
      inputSchema: {
        type: "object",
        properties: {
          targetType: { type: "string", enum: ["action", "theme", "claim"] },
          targetId: { type: "string" },
          reviewState: { type: "string", enum: reviewStates },
        },
        required: ["targetType", "targetId", "reviewState"],
        additionalProperties: false,
      },
      execute: setReviewStateTool,
    },
    {
      name: "get_audit_trail",
      description:
        "Return recent human and agent changes from the Signal Desk audit trail without changing app state.",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 20 },
        },
        additionalProperties: false,
      },
      execute: getAuditTrailTool,
    },
    {
      name: "reset_demo",
      description:
        "Reset Signal Desk to its seeded demo scenario and record that the agent reset it.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: () => {
        resetDemoWithAudit("Agent");
        return asToolResult("Reset the Signal Desk demo scenario.", {
          signals: state.signals.length,
          themes: state.themes.length,
          actions: state.actions.length,
        });
      },
    },
  ];

  try {
    for (const tool of tools) {
      await modelContext.registerTool(tool, { signal: controller.signal });
    }
    window.SignalDeskWebMCP.available = true;
    window.SignalDeskWebMCP.abort = () => controller.abort();
    updateToolStatus("available", `${tools.length} WebMCP tools`);
  } catch (error) {
    console.error("Signal Desk WebMCP registration failed", error);
    updateToolStatus("unavailable", "WebMCP registration failed");
  }
}

els.signalFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  render();
});

els.signalList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-signal-id]");
  if (!card) return;
  selectSignal(card.dataset.signalId);
});

els.briefContent.addEventListener("click", (event) => {
  const stateButton = event.target.closest("[data-state]");
  const claimControls = event.target.closest("[data-claim-id]");
  if (stateButton && claimControls) {
    setHumanReviewState("claim", claimControls.dataset.claimId, stateButton.dataset.state);
    return;
  }

  const button = event.target.closest("[data-signal-id]");
  if (!button) return;
  selectSignal(button.dataset.signalId);
});

els.themeList.addEventListener("click", (event) => {
  const stateButton = event.target.closest("[data-state]");
  const reviewControls = event.target.closest("[data-review-theme-id]");
  if (stateButton && reviewControls) {
    setHumanReviewState("theme", reviewControls.dataset.reviewThemeId, stateButton.dataset.state);
    return;
  }

  const card = event.target.closest("[data-theme-id]");
  if (!card) return;
  state.activeThemeId = card.dataset.themeId;
  saveState();
  render();
});

els.actionList.addEventListener("click", (event) => {
  const evidenceButton = event.target.closest("[data-signal-id]");
  if (evidenceButton) {
    selectSignal(evidenceButton.dataset.signalId);
    return;
  }

  const button = event.target.closest("[data-state]");
  const controls = event.target.closest("[data-action-id]");
  if (!button || !controls) return;
  setHumanReviewState("action", controls.dataset.actionId, button.dataset.state);
});

els.signalSearch.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim().toLowerCase();
  render();
});

els.resetDemo.addEventListener("click", resetDemo);

els.selectCritical.addEventListener("click", () => {
  activeFilter = "critical";
  searchTerm = "";
  els.signalSearch.value = "";
  const criticalSignal = state.signals.find((signal) => signal.priority === "critical");
  if (criticalSignal) state.activeSignalId = criticalSignal.id;
  render();
});

render();
registerWebMcpTools();
