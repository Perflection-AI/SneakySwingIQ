import React from 'react'
import ReactDOM from 'react-dom/client'
import posthog from 'posthog-js'
import App from './App.jsx'

// ─── PostHog init ────────────────────────────────────────────────────────────
// Set VITE_POSTHOG_KEY in GitHub Actions env (or local .env)
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: true,
  capture_pageleave: true,
})

console.log(import.meta.env)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App posthog={posthog} />
  </React.StrictMode>
)
