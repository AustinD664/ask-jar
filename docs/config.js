<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ask Jar</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0a0f;
      color: #e0e8ff;
      font-family: 'Segoe UI', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      border-bottom: 1px solid #1a2a4a;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo { font-size: 1.4rem; font-weight: bold; color: #4fc3f7; letter-spacing: 3px; }
    .logo span { color: #ffffff; }
    .header-right { display: flex; align-items: center; gap: 1rem; }
    .product-name { color: #5a7aa0; font-size: 0.85rem; }
    .api-key-input {
      background: #0d1a2a;
      border: 1px solid #1a2a4a;
      border-radius: 6px;
      color: #e0e8ff;
      padding: 0.4rem 0.75rem;
      font-size: 0.8rem;
      outline: none;
      width: 240px;
    }
    .api-key-input:focus { border-color: #4fc3f7; }
    .main { display: flex; flex: 1; height: calc(100vh - 61px); overflow: hidden; }
    .toc-panel {
      width: 240px;
      min-width: 240px;
      border-right: 1px solid #1a2a4a;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .toc-header {
      padding: 1rem 1.25rem 0.5rem;
      font-size: 0.65rem;
      color: #4fc3f7;
      text-transform: uppercase;
      letter-spacing: 2px;
      border-bottom: 1px solid #1a2a4a;
    }
    .toc-item {
      padding: 0.75rem 1.25rem;
      font-size: 0.83rem;
      color: #5a7aa0;
      cursor: pointer;
      border-bottom: 1px solid #0d1520;
      transition: all 0.15s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .toc-item:hover { background: #0d1a2a; color: #a0c8e8; }
    .toc-item.active { background: #0d2137; color: #4fc3f7; border-left: 3px solid #4fc3f7; padding-left: calc(1.25rem - 3px); }
    .toc-dot { width: 6px; height: 6px; border-radius: 50%; background: #1a2a4a; flex-shrink: 0; }
    .toc-item.active .toc-dot { background: #4fc3f7; }
    .ask-all-btn {
      margin: 1rem;
      padding: 0.6rem;
      background: #0d2137;
      border: 1px solid #4fc3f7;
      border-radius: 6px;
      color: #4fc3f7;
      font-size: 0.8rem;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }
    .ask-all-btn:hover { background: #4fc3f7; color: #000; font-weight: bold; }
    .doc-panel {
      width: 300px;
      min-width: 300px;
      border-right: 1px solid #1a2a4a;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .doc-panel-header {
      padding: 1rem 1.25rem 0.75rem;
      border-bottom: 1px solid #1a2a4a;
      font-size: 0.85rem;
      color: #a0b8d0;
      font-weight: bold;
    }
    .doc-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.25rem;
      font-size: 0.8rem;
      line-height: 1.75;
      color: #6080a0;
      white-space: pre-wrap;
    }
    .doc-content.empty {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2a3a5a;
      font-style: italic;
      font-size: 0.82rem;
    }
    .chat-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 1.25rem; }
    .chat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .section-label { font-size: 0.65rem; color: #4fc3f7; text-transform: uppercase; letter-spacing: 2px; }
    .clear-btn {
      background: transparent;
      border: 1px solid #1a2a4a;
      color: #5a7aa0;
      border-radius: 6px;
      padding: 0.3rem 0.6rem;
      font-size: 0.72rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .clear-btn:hover { border-color: #4fc3f7; color: #4fc3f7; }
    .suggested { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
    .suggest-btn {
      background: #0d1a2a;
      border: 1px solid #1a2a4a;
      color: #5a7aa0;
      border-radius: 20px;
      padding: 0.25rem 0.65rem;
      font-size: 0.72rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .suggest-btn:hover { border-color: #4fc3f7; color: #4fc3f7; }
    .context-badge { font-size: 0.68rem; color: #5a7aa0; margin-bottom: 0.5rem; }
    .context-badge span { color: #4fc3f7; }
    .chat-window {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .message { display: flex; flex-direction: column; gap: 0.2rem; max-width: 90%; }
    .message.user { align-self: flex-end; align-items: flex-end; }
    .message.jarvis { align-self: flex-start; align-items: flex-start; }
    .message-label { font-size: 0.62rem; color: #5a7aa0; text-transform: uppercase; letter-spacing: 1px; }
    .message.jarvis .message-label { color: #4fc3f7; }
    .message-bubble { padding: 0.65rem 0.9rem; border-radius: 10px; font-size: 0.86rem; line-height: 1.6; }
    .message.user .message-bubble { background: #0d2a3a; border: 1px solid #1a4a6a; color: #e0e8ff; border-bottom-right-radius: 3px; }
    .message.jarvis .message-bubble { background: #0d1a2a; border: 1px solid #1a2a4a; color: #c0d8f0; border-bottom-left-radius: 3px; }
    .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #2a3a5a; gap: 0.5rem; text-align: center; }
    .empty-state .icon { font-size: 2.5rem; }
    .empty-state p { font-size: 0.82rem; }
    .input-row { display: flex; gap: 0.6rem; }
    .question-input {
      flex: 1;
      background: #0d1a2a;
      border: 1px solid #1a2a4a;
      border-radius: 8px;
      color: #e0e8ff;
      padding: 0.7rem 1rem;
      font-size: 0.88rem;
      outline: none;
      font-family: inherit;
    }
    .question-input:focus { border-color: #4fc3f7; }
    .question-input::placeholder { color: #2a3a5a; }
    .send-btn {
      background: #4fc3f7;
      color: #000;
      border: none;
      border-radius: 8px;
      padding: 0.7rem 1.25rem;
      font-size: 0.88rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .send-btn:hover { background: #81d4fa; }
    .send-btn:disabled { background: #1a2a4a; color: #5a7aa0; cursor: not-allowed; }
  </style>
</head>
<body>

<header>
  <div class="logo">ASK <span>JAR</span></div>
  <div class="header-right">
    <span class="product-name" id="product-name"></span>
    <input class="api-key-input" type="password" id="api-key" placeholder="Anthropic API key (sk-ant-...)" />
  </div>
</header>

<div class="main">

  <div class="toc-panel">
    <div class="toc-header">Contents</div>
    <div id="toc-items"></div>
    <button class="ask-all-btn" onclick="setContext('all')">Ask about everything</button>
  </div>

  <div class="doc-panel">
    <div class="doc-panel-header" id="doc-title">Select a section</div>
    <div class="doc-content empty" id="doc-content">Select a section from the left to preview its content.</div>
  </div>

  <div class="chat-panel">
    <div class="chat-header">
      <div class="section-label">JARVIS</div>
      <button class="clear-btn" onclick="clearChat()">Clear</button>
    </div>

    <div class="suggested">
      <button class="suggest-btn" onclick="askSuggested(this)">How do I get started?</button>
      <button class="suggest-btn" onclick="askSuggested(this)">What are the system requirements?</button>
      <button class="suggest-btn" onclick="askSuggested(this)">How does the permission system work?</button>
      <button class="suggest-btn" onclick="askSuggested(this)">What integrations are available?</button>
      <button class="suggest-btn" onclick="askSuggested(this)">How do I contact support?</button>
      <button class="suggest-btn" onclick="askSuggested(this)">What are the pricing options?</button>
      <button class="suggest-btn" onclick="askSuggested(this)">Walk me through the key features</button>
    </div>

    <div class="context-badge" id="context-badge">Context: <span>All sections</span></div>

    <div class="chat-window" id="chat-window">
      <div class="empty-state" id="empty-state">
        <div class="icon">⬡</div>
        <p>Select a section from the left<br>or click "Ask about everything" to begin.</p>
      </div>
    </div>

    <div class="input-row">
      <input class="question-input" id="question-input" type="text"
        placeholder="Ask JARVIS anything about the documentation..."
        onkeydown="if(event.key==='Enter') askQuestion()" />
      <button class="send-btn" id="send-btn" onclick="askQuestion()">Ask</button>
    </div>
  </div>

</div>

<script>
  // ===========================================================================
  // CONFIGURATION — Edit this to customize for your product
  // ===========================================================================
  const JARVIS_CONFIG = {
    productName: "Acme Project Management Suite",
    apiKey: "",
    sections: [
      {
        title: "Getting Started",
        content: `Welcome to the Acme Project Management Suite. This guide will help you get up and running quickly.

To create your first project, click the New Project button in the top navigation bar. You will be prompted to enter a project name, select a template, and invite team members. Projects can be set to Public (visible to all workspace members) or Private (invite-only).

Once your project is created you will land on the Project Dashboard. This shows your task board, upcoming deadlines, team activity, and project health score. The health score is calculated based on on-time completion rate, open blockers, and team engagement over the past 30 days.

System requirements: Acme Suite runs in any modern browser. Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+ are fully supported. A stable internet connection is required. The mobile app is available on iOS 14+ and Android 10+.`
      },
      {
        title: "Task Management",
        content: `Tasks are the core unit of work in Acme Suite. Every task belongs to a project and can be assigned to one or more team members.

Creating a task: Click the Add Task button on any board column or list view. Enter a title, description, due date, and assignee. You can also set priority (Critical, High, Medium, Low) and attach files up to 25MB each.

Task statuses: Tasks move through the following statuses by default -- To Do, In Progress, In Review, Blocked, and Done. Your admin can customize these statuses for each project.

Subtasks: Any task can have up to 50 subtasks. Subtasks appear indented below the parent task. Completing all subtasks does not automatically complete the parent task.

Recurring tasks: Set a task to recur daily, weekly, monthly, or on a custom schedule.

Dependencies: Tasks can be linked as blockers. If Task B depends on Task A, Task B will show a warning indicator until Task A is marked complete.`
      },
      {
        title: "Team & Permissions",
        content: `Acme Suite uses a role-based permission system with four levels: Owner, Admin, Member, and Guest.

Owner: Full access to all settings, billing, and member management. Each workspace has exactly one Owner.

Admin: Can manage members, customize project settings, create and delete projects, and access all reports. Admins cannot change billing or transfer ownership.

Member: Can create and edit tasks, comment, upload files, and view all public projects. Members cannot delete projects or manage other users.

Guest: Read-only access to specific projects they have been invited to. Guests cannot create tasks or comment.

Inviting team members: Go to Workspace Settings > Members > Invite. Enter the email address and select a role. Invitations expire after 7 days.

Single Sign-On: SSO via Google, Microsoft, and Okta is available on Business and Enterprise plans.`
      },
      {
        title: "Reporting & Analytics",
        content: `Acme Suite includes built-in reporting tools accessible from the Reports tab in the left sidebar.

Burndown Chart: Shows the rate of task completion versus the ideal completion rate for a sprint or project timeline.

Velocity Report: Tracks how many tasks or story points your team completes per sprint.

Workload View: Shows each team member's assigned tasks and estimated hours for the current week.

Custom Reports: Business and Enterprise plan users can build custom reports using any combination of task fields, assignees, date ranges, and statuses. Reports can be exported as CSV or PDF and scheduled for automatic email delivery.

Data retention: Report data is retained for 12 months on Free and Starter plans, 3 years on Business plans, and indefinitely on Enterprise plans.`
      },
      {
        title: "Integrations",
        content: `Acme Suite integrates with over 50 tools via native integrations and Zapier.

Slack: Connect Acme Suite to your Slack workspace to receive task notifications, due date reminders, and daily digests in any channel.

GitHub: Link pull requests and commits to Acme tasks. When a linked PR is merged, the associated task automatically moves to In Review status.

Google Drive and Dropbox: Attach files directly from cloud storage without downloading and re-uploading.

Zapier: Build custom automations connecting Acme Suite to any of Zapier's 5,000+ supported apps.

API: The Acme REST API allows full programmatic access to all workspace data. Rate limit is 1,000 requests per hour on all paid plans.`
      },
      {
        title: "Billing & Plans",
        content: `Acme Suite offers four pricing tiers: Free, Starter, Business, and Enterprise.

Free: Up to 5 members, 3 active projects, 100MB storage, basic reporting. No credit card required.

Starter ($9 per member per month): Unlimited projects, 10GB storage, time tracking, custom task statuses, and priority support.

Business ($19 per member per month): Everything in Starter plus advanced reporting, custom roles, SSO, API access, and 100GB storage.

Enterprise: Custom pricing for teams over 100 members. Includes SLA guarantees, custom data retention, and 24/7 phone support.

Changing plans: You can upgrade at any time. Downgrades take effect at the next renewal date.

Refund policy: Annual plans are refundable within 30 days. Monthly plans are non-refundable but can be cancelled at any time.`
      }
    ]
  };
  // ===========================================================================

  let currentContext = 'all';
  let messages = [];

  function init() {
    document.title = `Ask Jar — ${JARVIS_CONFIG.productName}`;
    document.getElementById('product-name').textContent = JARVIS_CONFIG.productName;
    if (JARVIS_CONFIG.apiKey) document.getElementById('api-key').value = JARVIS_CONFIG.apiKey;

    const toc = document.getElementById('toc-items');
    JARVIS_CONFIG.sections.forEach((section, i) => {
      const item = document.createElement('div');
      item.className = 'toc-item';
      item.id = `toc-${i}`;
      item.innerHTML = `<div class="toc-dot"></div>${section.title}`;
      item.onclick = () => setContext(i);
      toc.appendChild(item);
    });
  }

  function setContext(index) {
    currentContext = index;
    messages = [];

    document.querySelectorAll('.toc-item').forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });

    if (index === 'all') {
      document.getElementById('doc-title').textContent = 'All Documentation';
      document.getElementById('doc-content').textContent =
        JARVIS_CONFIG.sections.map(s => `=== ${s.title} ===\n${s.content.trim()}`).join('\n\n');
      document.getElementById('context-badge').innerHTML = `Context: <span>All ${JARVIS_CONFIG.sections.length} sections</span>`;
    } else {
      const section = JARVIS_CONFIG.sections[index];
      document.getElementById('doc-title').textContent = section.title;
      document.getElementById('doc-content').textContent = section.content.trim();
      document.getElementById('context-badge').innerHTML = `Context: <span>${section.title}</span>`;
    }

    document.getElementById('doc-content').classList.remove('empty');
    clearChat();
  }

  function getDocumentContext() {
    if (currentContext === 'all') {
      return JARVIS_CONFIG.sections.map(s => `=== ${s.title} ===\n${s.content.trim()}`).join('\n\n');
    }
    const s = JARVIS_CONFIG.sections[currentContext];
    return `=== ${s.title} ===\n${s.content.trim()}`;
  }

  function addMessage(role, content) {
    const win = document.getElementById('chat-window');
    const empty = document.getElementById('empty-state');
    if (empty) empty.remove();
    const div = document.createElement('div');
    div.className = `message ${role}`;
    div.innerHTML = `
      <div class="message-label">${role === 'user' ? 'You' : 'JARVIS'}</div>
      <div class="message-bubble">${content.replace(/\n/g, '<br>')}</div>
    `;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
  }

  function clearChat() {
    messages = [];
    document.getElementById('chat-window').innerHTML = `
      <div class="empty-state" id="empty-state">
        <div class="icon">⬡</div>
        <p>Select a section from the left<br>or click "Ask about everything" to begin.</p>
      </div>`;
  }

  function askSuggested(btn) {
    document.getElementById('question-input').value = btn.textContent;
    askQuestion();
  }

  async function askQuestion() {
    const apiKey = document.getElementById('api-key').value.trim();
    const question = document.getElementById('question-input').value.trim();
    if (!apiKey) { alert('Please enter your Anthropic API key in the top right.'); return; }
    if (!question) return;

    addMessage('user', question);
    messages.push({ role: 'user', content: question });
    document.getElementById('question-input').value = '';
    document.getElementById('send-btn').disabled = true;
    document.getElementById('send-btn').textContent = '...';

    const win = document.getElementById('chat-window');
    const typing = document.createElement('div');
    typing.className = 'message jarvis';
    typing.id = 'typing';
    typing.innerHTML = `<div class="message-label">JARVIS</div><div class="message-bubble" style="color:#2a4a6a;font-style:italic">Consulting the documentation...</div>`;
    win.appendChild(typing);
    win.scrollTop = win.scrollHeight;

    const system = `You are JARVIS -- Just A Rather Very Intelligent System. You are the intelligent documentation assistant for ${JARVIS_CONFIG.productName}. You are precise, efficient, and quietly brilliant. You answer questions about the documentation accurately and concisely. You reference specific sections when relevant. You never fabricate information not found in the documentation. If something is not covered, say so clearly and suggest where the user might find more help.

Documentation:
---
${getDocumentContext()}
---`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system,
          messages
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API error');
      const answer = data.content[0].text;
      messages.push({ role: 'assistant', content: answer });
      document.getElementById('typing').remove();
      addMessage('jarvis', answer);
    } catch (err) {
      document.getElementById('typing').remove();
      addMessage('jarvis', `I encountered an error: ${err.message}. Please check your API key and try again.`);
    } finally {
      document.getElementById('send-btn').disabled = false;
      document.getElementById('send-btn').textContent = 'Ask';
      win.scrollTop = win.scrollHeight;
    }
  }

  init();
</script>
</body>
</html>
