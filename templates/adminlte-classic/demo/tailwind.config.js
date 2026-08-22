// Tailwind theme wired to the CSS custom properties generated from
// ../tokens/*.json by scripts/build-tokens.mjs (see src/tokens.generated.css).
// This file itself is demo-only scaffolding, not part of the template spec.
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // Mirrors templates/adminlte-classic/tokens/breakpoints.json.
    // CSS custom properties can't be used inside @media conditions,
    // so these values are duplicated here as literals.
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        brand: {
          primary: "var(--color-brand-primary)",
          secondary: "var(--color-brand-secondary)",
        },
        status: {
          success: "var(--color-status-success)",
          danger: "var(--color-status-danger)",
          warning: "var(--color-status-warning)",
          info: "var(--color-status-info)",
        },
        neutral: {
          light: "var(--color-neutral-light)",
          dark: "var(--color-neutral-dark)",
        },
        surface: {
          canvas: "var(--color-surface-canvas)",
          muted: "var(--color-surface-muted)",
          border: "var(--color-surface-border)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          inverse: "var(--color-text-inverse)",
          link: "var(--color-text-link)",
          // Text sitting ON a saturated accent fill.
          "on-accent": "var(--color-text-on-accent)",
          "on-accent-dark": "var(--color-text-on-accent-dark)",
          // The accents darkened for use AS text on a light surface.
          "accent-primary": "var(--color-text-accent-primary)",
          "accent-secondary": "var(--color-text-accent-secondary)",
          "accent-success": "var(--color-text-accent-success)",
          "accent-danger": "var(--color-text-accent-danger)",
          "accent-warning": "var(--color-text-accent-warning)",
          "accent-info": "var(--color-text-accent-info)",
        },
        chart: {
          "series-1": "var(--color-chart-series-1)",
          "series-2": "var(--color-chart-series-2)",
          "series-3": "var(--color-chart-series-3)",
          grid: "var(--color-chart-grid)",
          sparkline: "var(--color-chart-sparkline)",
        },
        overlay: {
          backdrop: "var(--color-overlay-backdrop)",
          "accent-shade": "var(--color-overlay-accent-shade)",
          "accent-glyph": "var(--color-overlay-accent-glyph)",
          "accent-glyph-dark": "var(--color-overlay-accent-glyph-dark)",
        },
        chrome: {
          "sidebar-bg": "var(--color-chrome-sidebar-bg)",
          "sidebar-text": "var(--color-chrome-sidebar-text)",
          "sidebar-text-active": "var(--color-chrome-sidebar-text-active)",
          "sidebar-item-hover-bg": "var(--color-chrome-sidebar-item-hover-bg)",
          "sidebar-item-active-bg": "var(--color-chrome-sidebar-item-active-bg)",
          "topbar-bg": "var(--color-chrome-topbar-bg)",
        },
      },
      fontFamily: {
        base: ["var(--font-family-base)"],
        mono: ["var(--font-family-monospace)"],
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        h1: "var(--font-heading-h1)",
        h2: "var(--font-heading-h2)",
        h3: "var(--font-heading-h3)",
        h4: "var(--font-heading-h4)",
        h5: "var(--font-heading-h5)",
        h6: "var(--font-heading-h6)",
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      lineHeight: {
        tight: "var(--font-line-height-tight)",
        base: "var(--font-line-height-base)",
        dense: "var(--font-line-height-dense)",
      },
      spacing: {
        0: "var(--spacing-0)",
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        "card-padding": "var(--spacing-component-card-padding)",
        "card-header-y": "var(--spacing-component-card-header-padding-y)",
        "cell-x": "var(--spacing-component-table-cell-padding-x)",
        "cell-y": "var(--spacing-component-table-cell-padding-y)",
        "grid-gap": "var(--spacing-component-grid-gap)",
        "sidebar-x": "var(--spacing-component-sidebar-padding-x)",
        "sidebar-w": "var(--spacing-component-sidebar-width)",
        "viz-h": "var(--spacing-component-viz-height)",
        "icon-sm": "var(--spacing-component-icon-sm)",
        "icon-md": "var(--spacing-component-icon-md)",
        "icon-lg": "var(--spacing-component-icon-lg)",
        "avatar-sm": "var(--spacing-component-avatar-sm)",
        "avatar-md": "var(--spacing-component-avatar-md)",
        "avatar-lg": "var(--spacing-component-avatar-lg)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-base)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
        hairline: "var(--radius-hairline)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        raised: "var(--shadow-raised)",
      },
    },
  },
  plugins: [],
};
