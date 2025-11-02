import posthog from "posthog-js"

/**
 * PostHog initialization for Next.js 15.3+
 * This runs once when the app loads on the client
 * See: https://posthog.com/docs/libraries/next-js
 */
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  cookieless_mode: "always",
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: '2025-05-24',
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking
  debug: process.env.NODE_ENV === "development",
});