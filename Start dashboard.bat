@echo off
rem Runs the Family Photos dashboard on this PC at http://localhost:8765/
rem Keep this window open while you use the dashboard; close it to stop.
cd /d "%~dp0"
start "" http://localhost:8765/
python -m http.server 8765
if errorlevel 1 (
  echo.
  echo Could not start. If the dashboard is already running elsewhere ^(for example from Claude^), just open http://localhost:8765/
  pause
)
