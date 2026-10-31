# Project-local npm fallback for this machine. Normal installations can use npm directly.
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$NpmArgs)
$ErrorActionPreference = 'Stop'
$npmCli = Join-Path $PSScriptRoot '.tools\node_modules\npm\bin\npm-cli.js'
if (!(Test-Path -LiteralPath $npmCli)) { throw 'Local npm missing. See SETUP_GUIDE.md for bootstrap instructions.' }
& node $npmCli @NpmArgs
exit $LASTEXITCODE
