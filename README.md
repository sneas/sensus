# Sensus 🟢

A browser extension that shows the opinionated constructiveness of your comments on GitHub.

https://chromewebstore.google.com/detail/sensus-constructive-githu/eeeacchbfimdlomgbdfchlpghjlcmeod

## How it works

Every time you type a text in the comment textarea on GitHub, Sensus:

1. Sends the text of your comment to the Analyze Lambda packages/backend/src/lambdas/analyze/index.ts
1. Analyze Lambda passes the text of your comment to ChatGPT as a part of a prompt that returns JSON with values
1. Analyze Lambda calculates and returns the Constructiveness Score - a number between 1 and 5
1. The Constructiveness Score is shown in the top right corner of the comment textarea

## How to build

```sh
npm install
npm run build
```

## How to run in dev mode
### Google Chrome

1. Open `chrome://extensions` in your Chrome browser
1. Toggle "Developer mode" in top right corner of the screen
1. Click "Load unpacked" button in top left corner of the screen
1. Select `packages/extension/dist` folder from this repository (Build the project to see dist folder)