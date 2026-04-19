// =============================================================================
// ASK JAR — Configuration File
// Edit this file to configure JARVIS for your documentation.
// =============================================================================

const JARVIS_CONFIG = {

  // The name of your product or system
  productName: "Acme Project Management Suite",

  // Your Anthropic API key (or leave blank to prompt users to enter their own)
  apiKey: "",

  // A one-line description shown in the header
  tagline: "Your intelligent guide to the Acme Project Management Suite",

  // Documentation sections — add as many as you need
  // Each section has a title and content (plain text or markdown-style)
  sections: [
    {
      title: "Getting Started",
      content: `
Welcome to the Acme Project Management Suite. This guide will help you get up and running quickly.

To create your first project, click the New Project button in the top navigation bar. You will be prompted to enter a project name, select a template, and invite team members. Projects can be set to Public (visible to all workspace members) or Private (invite-only).

Once your project is created you will land on the Project Dashboard. This shows your task board, upcoming deadlines, team activity, and project health score. The health score is calculated based on on-time completion rate, open blockers, and team engagement over the past 30 days.

System requirements: Acme Suite runs in any modern browser. Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+ are fully supported. A stable internet connection is required. The mobile app is available on iOS 14+ and Android 10+.
      `
    },
    {
      title: "Task Management",
      content: `
Tasks are the core unit of work in Acme Suite. Every task belongs to a project and can be assigned to one or more team members.

Creating a task: Click the Add Task button on any board column or list view. Enter a title, description, due date, and assignee. You can also set priority (Critical, High, Medium, Low) and attach files up to 25MB each.

Task statuses: Tasks move through the following statuses by default -- To Do, In Progress, In Review, Blocked, and Done. Your admin can customize these statuses for each project.

Subtasks: Any task can have up to 50 subtasks. Subtasks appear indented below the parent task. Completing all subtasks does not automatically complete the parent task -- this must be done manually.

Recurring tasks: Set a task to recur daily, weekly, monthly, or on a custom schedule. Recurring tasks generate a new copy automatically when marked complete.

Dependencies: Tasks can be linked as blockers. If Task B depends on Task A, Task B will show a warning indicator until Task A is marked complete.
      `
    },
    {
      title: "Team & Permissions",
      content: `
Acme Suite uses a role-based permission system with four levels: Owner, Admin, Member, and Guest.

Owner: Full access to all settings, billing, and member management. Each workspace has exactly one Owner.

Admin: Can manage members, customize project settings, create and delete projects, and access all reports. Admins cannot change billing or transfer ownership.

Member: Can create and edit tasks, comment, upload files, and view all public projects. Members cannot delete projects or manage other users.

Guest: Read-only access to specific projects they have been invited to. Guests cannot create tasks, comment, or view private projects they have not been explicitly invited to.

Inviting team members: Go to Workspace Settings > Members > Invite. Enter the email address and select a role. Invitations expire after 7 days. Guests are invited at the project level, not the workspace level.

Single Sign-On: SSO via Google, Microsoft, and Okta is available on Business and Enterprise plans. Contact your admin to enable SSO for your workspace.
      `
    },
    {
      title: "Reporting & Analytics",
      content: `
Acme Suite includes built-in reporting tools accessible from the Reports tab in the left sidebar.

Burndown Chart: Shows the rate of task completion versus the ideal completion rate for a sprint or project timeline. Useful for identifying if a project is ahead or behind schedule.

Velocity Report: Tracks how many tasks or story points your team completes per sprint. Available for teams using sprint-based workflows.

Workload View: Shows each team member's assigned tasks and estimated hours for the current week. Helps identify overloaded or underutilized team members.

Custom Reports: Business and Enterprise plan users can build custom reports using any combination of task fields, assignees, date ranges, and statuses. Reports can be exported as CSV or PDF and scheduled for automatic email delivery.

Data retention: Report data is retained for 12 months on Free and Starter plans, 3 years on Business plans, and indefinitely on Enterprise plans.
      `
    },
    {
      title: "Integrations",
      content: `
Acme Suite integrates with over 50 tools via native integrations and Zapier.

Slack: Connect Acme Suite to your Slack workspace to receive task notifications, due date reminders, and daily digests in any channel. Use the /acme command in Slack to create tasks without leaving Slack.

GitHub: Link pull requests and commits to Acme tasks. When a linked PR is merged, the associated task automatically moves to In Review status.

Google Drive & Dropbox: Attach files directly from cloud storage without downloading and re-uploading. File previews are shown inline in task comments.

Zapier: Build custom automations connecting Acme Suite to any of Zapier's 5,000+ supported apps. Common use cases include creating tasks from new emails, syncing with CRM tools, and posting to communication channels.

API: The Acme REST API allows full programmatic access to all workspace data. API keys are generated in Workspace Settings > API. Rate limit is 1,000 requests per hour on all paid plans.
      `
    },
    {
      title: "Billing & Plans",
      content: `
Acme Suite offers four pricing tiers: Free, Starter, Business, and Enterprise.

Free: Up to 5 members, 3 active projects, 100MB storage, basic reporting. No credit card required.

Starter ($9 per member per month): Unlimited projects, 10GB storage per workspace, time tracking, custom task statuses, and priority support. Billed annually or monthly.

Business ($19 per member per month): Everything in Starter plus advanced reporting, custom roles, SSO, API access, 100GB storage, and a dedicated customer success manager for teams over 20.

Enterprise: Custom pricing for teams over 100 members. Includes SLA guarantees, custom data retention, on-premise deployment options, and 24/7 phone support.

Changing plans: You can upgrade at any time and will be charged a prorated amount for the remainder of the billing period. Downgrades take effect at the next renewal date. Data is not deleted when downgrading but you may lose access to features until you upgrade again.

Refund policy: Annual plans are refundable within 30 days of purchase. Monthly plans are non-refundable but can be cancelled at any time.
      `
    }
  ]
};
