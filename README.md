# SwingIQ — Van Westendorp Price Sensitivity Survey

A React-based pricing survey app for **SwingIQ** AI golf coaching service. Uses the **Van Westendorp Price Sensitivity Meter (PSM)** method to find the optimal price point across subscription and pay-per-use plans.

Live on GitHub Pages.

## Features

- **Two pricing modes**: Monthly Subscription & Pay Per Use
- **Four Van Westendorp questions** per plan: Too Cheap, Best Value, Expensive, Too Expensive
- **Cascading slider logic** — downstream values auto-nudge to maintain strictly increasing order
- **Real-time validation** with visual progress indicators
- **Google Sheets backend** — responses are written via a Google Apps Script web app
- **GitHub Pages deployment** via CI/CD (push to `main` triggers deploy)

## Pricing Plans Surveyed

| Mode | Tier | Range |
|------|------|-------|
| Subscription | General AI | $0 – $40/mo |
| Subscription | Coach's AI Agent | $0 – $120/mo |
| Pay Per Use | Single Swing AI Analysis | $0 – $20/session |
| Pay Per Use | Single Coach Feedback | $0 – $60/session |

## Tech Stack

- **React 18** + **Vite**
- **Recharts** (imported, chart-ready)
- **Google Apps Script** as a lightweight API backend
- **GitHub Actions** for CI/CD → GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Create a `.env` file in the project root:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
```

## Google Sheets Setup

1. Open (or create) a Google Sheet
2. Go to **Extensions → Apps Script**
3. Paste the contents of [google-apps-script.js](google-apps-script.js) into the editor
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the web app URL into your `.env` file (or GitHub repo secret `GOOGLE_SCRIPT_URL`)

The script will auto-create a `Sheet1` tab with headers on first POST.

## Deploy

Pushing to `main` automatically triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`). Set the `GOOGLE_SCRIPT_URL` secret in **Settings → Secrets and variables → Actions**.

## Project Structure

```
├── src/
│   ├── main.jsx          # Entry point
│   └── App.jsx           # Survey UI, logic, and styles
├── google-apps-script.js # Google Sheets backend script
├── index.html            # HTML template
├── vite.config.js        # Vite config (base: /SneakySwingIQ/)
├── .github/workflows/
│   └── deploy.yml        # GitHub Pages CI/CD
└── .env                  # VITE_GOOGLE_SCRIPT_URL (not committed)
```

## License

Private — all rights reserved.
