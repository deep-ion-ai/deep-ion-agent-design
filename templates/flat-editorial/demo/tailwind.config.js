// Tailwind theme wired to the CSS custom properties generated from
// ../tokens/*.json by scripts/build-tokens.mjs (see src/tokens.generated.css).
// This file itself is demo-only scaffolding, not part of the template spec.
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // Mirrors templates/flat-editorial/tokens/breakpoints.json.
    // CSS custom properties can't be used inside @media conditions,
    // so these values are duplicated here as literals.
    screens: {
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
    },
    extend: {
      colors: {
        accent: {
          base: "var(--color-accent-base)",
          strong: "var(--color-accent-strong)",
          wash: "var(--color-accent-wash)",
        },
        status: {
          success: "var(--color-status-success)",
          danger: "var(--color-status-danger)",
          warning: "var(--color-status-warning)",
          info: "var(--color-status-info)",
        },
        surface: {
          canvas: "var(--color-surface-canvas)",
          muted: "var(--color-surface-muted)",
          sunken: "var(--color-surface-sunken)",
          rule: "var(--color-surface-rule)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          "on-accent": "var(--color-text-on-accent)",
        },
        chrome: {
          "header-bg": "var(--color-chrome-header-bg)",
          "code-bg": "var(--color-chrome-code-bg)",
          "selection-bg": "var(--color-chrome-selection-bg)",
        },
        overlay: {
          backdrop: "var(--color-overlay-backdrop)",
        },
      },
      fontFamily: {
        body: "var(--font-family-body)",
        ui: "var(--font-family-ui)",
        mono: "var(--font-family-mono)",
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        prose: "var(--font-size-prose)",
        lg: "var(--font-size-lg)",
        display: "var(--font-heading-display)",
        h1: "var(--font-heading-h1)",
        h2: "var(--font-heading-h2)",
        h3: "var(--font-heading-h3)",
        h4: "var(--font-heading-h4)",
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      lineHeight: {
        prose: "var(--font-line-height-prose)",
        base: "var(--font-line-height-base)",
        tight: "var(--font-line-height-tight)",
        display: "var(--font-line-height-display)",
      },
      letterSpacing: {
        tight: "var(--font-tracking-tight)",
        normal: "var(--font-tracking-normal)",
        wide: "var(--font-tracking-wide)",
      },
      // font.measure.* — the token group with no counterpart in the other
      // template, and the one this identity depends on most.
      maxWidth: {
        prose: "var(--font-measure-prose)",
        wide: "var(--font-measure-wide)",
        page: "var(--font-measure-page)",
      },
      spacing: {
        0: "var(--spacing-0)",
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
        24: "var(--spacing-24)",
        "prose-block": "var(--spacing-component-prose-block)",
        "prose-heading-top": "var(--spacing-component-prose-heading-top)",
        "prose-heading-bottom": "var(--spacing-component-prose-heading-bottom)",
        "card-padding": "var(--spacing-component-card-padding)",
        "header-height": "var(--spacing-component-header-height)",
        "icon-sm": "var(--spacing-component-icon-sm)",
        "icon-md": "var(--spacing-component-icon-md)",
        "icon-lg": "var(--spacing-component-icon-lg)",
        "avatar-sm": "var(--spacing-component-avatar-sm)",
        "avatar-lg": "var(--spacing-component-avatar-lg)",
        "tap-target": "var(--spacing-component-tap-target)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-base)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        // shadow.none is Tailwind's own `shadow-none`. This template has
        // exactly one shadow, and it is for the nav panel only.
        overlay: "var(--shadow-overlay)",
      },
      transitionDuration: {
        state: "var(--duration-state)",
        layout: "var(--duration-layout)",
      },
      transitionTimingFunction: {
        standard: "var(--easing-standard)",
        exit: "var(--easing-exit)",
      },
    },
  },
  plugins: [],
};
