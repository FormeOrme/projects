---
name: prettier-format
description: "Format one or more files or a folder with Prettier using the repository's .prettierrc. Use when the user asks to format, prettify, or run Prettier on specified paths."
argument-hint: "[file-or-folder ...]"
user-invocable: true
---

# Prettier Format

Format explicitly requested files or folders with the repository's Prettier configuration.

## Procedure

1. Read the user's requested paths. If no path is given, ask which file or folder to format.
2. Confirm each path exists and is inside the workspace. Do not expand the request to unrelated paths.
3. Run [format.ps1](./scripts/format.ps1) from the workspace root with the requested paths:

    ```powershell
    & .claude/skills/prettier-format/scripts/format.ps1 <path>...
    ```

    Quote paths containing spaces. Pass folders directly so Prettier discovers supported files recursively. The script uses the root `.prettierrc`, rejects paths outside the workspace, and runs `git diff --check` in Git repositories.

4. Report the files or folders formatted and any files skipped as unsupported or ignored.

The script uses `npx --no-install prettier` when a local installation exists. Otherwise, it uses `npx --yes prettier` and reports that `npx` downloads it. Never overwrite files outside the requested paths.
