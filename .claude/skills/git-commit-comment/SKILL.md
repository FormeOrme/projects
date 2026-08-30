---
name: git-commit-comment
description: "Use when the user asks to generate, suggest, write, or improve a Git commit message from current workspace changes or a diff."
---

# Git Commit Comment

Generate a concise, accurate Git commit message from the current workspace changes.

## Workflow

1. Inspect `git status --short`.
2. Check for staged files with `git diff --cached --name-only`. If none are staged, run `git add -A` and note that all changes were staged.
3. Get the staged, existing file paths with `git diff --cached --name-only --diff-filter=ACMR`.
4. Format every staged path with the repository's Prettier configuration:

    ```powershell
    npx prettier --write --config .prettierrc --ignore-unknown <staged-path>...
    ```

    Prefer `npx --no-install prettier` when a local installation exists. Otherwise use `npx --yes prettier` and report that `npx` downloads it. Quote paths containing spaces.

5. Re-stage formatter changes with `git add --all -- <staged-path>...`.
6. Inspect the staged diff with `git diff --cached` and, when useful, `git diff --cached --stat`.
7. Read nearby history with `git log -5 --oneline` when the repository has an established commit style.
8. Separate changes made for this task from unrelated worktree changes. Never describe unrelated changes as part of the message.
9. Infer the smallest accurate change scope. Do not invent behavior, tests, or files not supported by the diff.
10. Return a staging comment followed by the recommended message. Do not commit.

## Output

Prefer Conventional Commits:

```text
<type>(<scope>): <imperative summary>

<optional body explaining why or the important behavior>
```

Use a one-line message when the change is small. Keep the subject imperative, specific, and under 72 characters when practical. Use `feat` for new behavior, `fix` for bug fixes, `refactor` for internal restructuring, `docs` for documentation, `test` for tests, `chore` for maintenance, and `style` for formatting-only changes.

Mention meaningful validation in the body only when it is visible from the task context or command results. If unrelated changes or ambiguity affect the message, state that briefly after the recommendation.

## Staging Comment

Before the commit message, report:

```text
Staging: <already-staged files were formatted | no staged files found; all changes staged>; <number> staged paths formatted and re-staged.
```

Mention unsupported or deleted paths skipped by Prettier. Do not include the staging comment in the commit message unless the user asks for that.

Do not run `git commit` or amend commits. Staging and formatting are required by this skill, but do not modify files outside the staged paths after the initial `git add -A`.
