[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0, ValueFromRemainingArguments = $true)]
    [ValidateNotNullOrEmpty()]
    [string[]] $Path
)

$ErrorActionPreference = 'Stop'
$workspaceRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..\..'))
$workspaceRootPrefix = $workspaceRoot.TrimEnd('\') + '\'

$resolvedPaths = foreach ($requestedPath in $Path) {
    $resolvedPath = Resolve-Path -LiteralPath $requestedPath -ErrorAction Stop
    $fullPath = [System.IO.Path]::GetFullPath($resolvedPath.Path)

    if (($fullPath -ne $workspaceRoot) -and
        (-not $fullPath.StartsWith($workspaceRootPrefix, [System.StringComparison]::OrdinalIgnoreCase))) {
        throw "Requested path is outside workspace: $requestedPath"
    }

    $fullPath
}

Push-Location $workspaceRoot
try {
    $prettierArguments = @('--write', '--config', '.prettierrc', '--ignore-unknown') + $resolvedPaths

    if (Test-Path -LiteralPath 'node_modules/.bin/prettier.cmd') {
        & npx --no-install prettier @prettierArguments
    }
    else {
        Write-Output 'No local Prettier found; using npx download.'
        & npx --yes prettier @prettierArguments
    }

    if ($LASTEXITCODE -ne 0) {
        throw "Prettier failed with exit code $LASTEXITCODE"
    }

    $isGitRepository = git rev-parse --is-inside-work-tree 2>$null
    if ($isGitRepository -eq 'true') {
        git diff --check
        if ($LASTEXITCODE -ne 0) {
            throw "git diff --check failed with exit code $LASTEXITCODE"
        }
    }
}
finally {
    Pop-Location
}
