---
name: git-commit-message
description: "Use when the user asks to generate, suggest, write, or improve a Git commit message from current workspace changes or a diff."
---

# Git Commit Message

Generate a concise, accurate Git commit message from the current workspace changes.

## Workflow

1. Inspect `git status --short`.
2. Inspect the relevant diff with `git diff` and, when useful, `git diff --stat`.
3. Read nearby history with `git log -5 --oneline` when the repository has an established commit style.
4. Separate changes made for this task from unrelated worktree changes. Never describe unrelated changes as part of the message.
5. Infer the smallest accurate change scope. Do not invent behavior, tests, or files not supported by the diff.
6. Return the recommended message without committing.

## Output

Prefer Conventional Commits:

```text
<type>(<scope>): <imperative summary>

<optional body explaining why or the important behavior>
```

Use a one-line message when the change is small. Keep the subject imperative, specific, and under 72 characters when practical. Use `feat` for new behavior, `fix` for bug fixes, `refactor` for internal restructuring, `docs` for documentation, `test` for tests, `chore` for maintenance, and `style` for formatting-only changes.

Mention meaningful validation in the body only when it is visible from the task context or command results. If unrelated changes or ambiguity affect the message, state that briefly after the recommendation.

Do not run `git commit`, amend commits, stage files, or modify repository files unless the user explicitly asks for those actions.
