# JOY Facebook Messenger Bot

## Overview
A Facebook Messenger bot built on the `fca-priyansh` library (a fork of the Facebook Chat API). It automates responses, manages Facebook groups, and provides entertainment/utility features through Messenger.

## Tech Stack
- **Language:** JavaScript (Node.js 20.x)
- **Package Manager:** npm
- **Bot Framework:** fca-priyansh (Facebook Chat API)
- **Database:** SQLite via Sequelize ORM (`includes/data.sqlite`)
- **Web Server:** Express.js (dashboard/uptime page on port 5000)

## Project Structure
- `index.js` — Entry point: starts Express dashboard server on port 5000, spawns bot process
- `JOY.js` — Main bot logic, loads config/db/commands/events
- `config.json` — Bot configuration (prefix, admin UIDs, API keys)
- `models/commands/` — Individual bot command modules
- `models/events/` — Event handler modules
- `includes/database/` — Sequelize setup and model definitions
- `includes/handle/` — Core command/event/reaction handling logic
- `languages/` — Multi-language support files
- `utils/` — Logging and helper utilities
- `index.html` — Dashboard/uptime web page

## Running the App
- **Workflow:** "Start application" runs `npm start` (node index.js)
- **Port:** 5000 (bound to 0.0.0.0 for Replit proxy)
- **Deployment:** VM target (always-running bot)

## Important Notes
- The bot requires a valid Facebook session cookie (appstate) in `ARIF-FCA.json` to authenticate
- Without a valid appstate/cookie, the bot process will fail to login — this is expected behavior
- The Express dashboard still runs and is accessible even when the bot can't authenticate
- The bot auto-restarts up to 5 times on failure
