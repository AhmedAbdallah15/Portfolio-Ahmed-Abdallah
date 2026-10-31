@echo off
setlocal
if not exist "%~dp0.tools\node_modules\npm\bin\npm-cli.js" (
  echo Project-local npm is missing. See SETUP_GUIDE.md.
  exit /b 1
)
where node.exe >nul 2>nul
if errorlevel 1 (
  if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
    set "PATH=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
  ) else (
    echo Node.js was not found. Install Node.js LTS from https://nodejs.org/en/download.
    exit /b 1
  )
)
pushd "%~dp0"
node "%~dp0.tools\node_modules\npm\bin\npm-cli.js" %*
set "npm_exit=%ERRORLEVEL%"
popd
exit /b %npm_exit%
