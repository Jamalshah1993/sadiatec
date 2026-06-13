/**
 * CLIENT COLOR TOKENS — SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────
 * To rebrand for a new client:
 * 1. Duplicate this file as colors.[clientname].ts
 * 2. Change only the values in the `brand` object
 * 3. Import the new file in apps/[clientapp]/tailwind.config.ts
 * 4. All Tailwind utilities, CSS variables, and components update automatically
 *
 * Current client: Sadiatec (sadiatec.com)
 * Palette reference: g-gates.com — all values extracted via Playwright (2026-06-13)
 * Key CSS vars: --vk-color-primary: #5FA9E6, --vk-color-primary-dark: #4C87B8
 */

export const colors = {
  // ─── BRAND (swap entire block for next client) ────────────────────────────
  brand: {
    primary:      '#5FA9E6',  // g-gates --vk-color-primary (CTA buttons, active nav)
    primaryDark:  '#4C87B8',  // g-gates --vk-color-primary-dark (hover states)
    primaryLight: '#D7E7F2',  // g-gates --vk-color-custom-3 (light blue tint sections)
    accent:       '#2B7DB8',  // deeper blue — CTA buttons, active states
    accentHover:  '#1E6094',  // hover state
    dark:         '#16324A',  // g-gates dark navy — dark section panels and overlays
  },

  // ─── BACKGROUNDS ──────────────────────────────────────────────────────────
  bg: {
    primary:   '#FFFFFF',   // Main page background
    secondary: '#F6F6F6',   // g-gates alternating section bg (extracted)
    tertiary:  '#ECF6FC',   // g-gates light blue-tinted sections (--vk-color-custom-4)
  },

  // ─── TEXT ─────────────────────────────────────────────────────────────────
  text: {
    primary:   '#333333',   // g-gates heading/nav text (extracted h1/h2/nav)
    secondary: '#555555',   // g-gates body text (extracted body/header)
    muted:     '#666666',   // g-gates meta/caption (--vk-color-text-meta)
    onDark:    '#FFFFFF',   // Text on dark/navy backgrounds
    onAccent:  '#FFFFFF',   // Text on primary/accent buttons
  },

  // ─── BORDERS ──────────────────────────────────────────────────────────────
  border: {
    default: '#E5E5E5',     // g-gates --vk-color-border-image
    strong:  '#CCCCCC',     // g-gates stronger divider
  },

  // ─── SEMANTIC (stable across all clients) ─────────────────────────────────
  semantic: {
    success: '#16A34A',
    warning: '#D97706',
    error:   '#DC2626',
    info:    '#2563EB',
  },

  // ─── NEUTRAL SCALE (slate — utility, not client-specific) ────────────────
  neutral: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
} as const

export type Colors = typeof colors

// Legacy flat exports — kept for backward compat with existing imports
export const neutralScale = colors.neutral
export const semanticColors = {
  primary:    'var(--color-primary)',
  secondary:  'var(--color-secondary)',
  accent:     'var(--color-accent)',
  background: 'var(--color-background)',
  surface:    'var(--color-surface)',
  text:       'var(--color-text)',
  muted:      'var(--color-muted)',
  error:      'var(--color-error)',
  success:    'var(--color-success)',
  warning:    'var(--color-warning)',
} as const
