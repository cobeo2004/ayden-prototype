## Overview

Ayden's portfolio identity centers entirely on **"The Jack Principle"** — a thematic, high-contrast visual system inspired by traditional playing card graphics and the persona of a "jack of all trades"[cite: 1]. The interface is structured around a light gray background floor (`{colors.canvas}`) paired with authoritative black typography (`{colors.primary}`) and bold hits of playing-card crimson (`{colors.accent}`)[cite: 1]. The system balances structured grids with custom playing-card motifs (Spades, Hearts, Clubs, Diamonds) and hand-drawn accents to express a mix of operational strategy, community engagement, and creative storytelling[cite: 1].

The visual rhythm switches cleanly between structured data dashboards (CRM layouts, sales funnels, project metrics) and expressive, card-based portfolio grids[cite: 1]. UI chrome stays highly tactile with container shapes mimicking rounded playing cards (`{rounded.card}`) and crisp, thin borders defining individual project bounds[cite: 1]. 

Typography is split intentionally between loud, ultra-condensed display cuts (Bebas Neue/Anton) for impactful thematic statements, reliable geometric sans-serif layers (Montserrat/Be Vietnam) for structural information, and flowing handwritten scripts (Shadows Into Light 2/Amsterdam 4) for signature notes[cite: 1]. 

**Key Characteristics:**
- **Thematic Floor:** A crisp, light gray canvas backdrop (`{colors.canvas}`) contrasted against pure black surfaces (`{colors.surface-dark}`) and striking red elements[cite: 1].
- **Loud Display Hierarchy:** Major sectional headers use ultra-bold, condensed uppercase formatting to structure information quickly[cite: 1].
- **Playing Card Radii:** Containers utilize a precise, smooth medium corner radius (`{rounded.card}`) that visually mirrors a clean deck of playing cards[cite: 1].
- **Thematic Iconography:** Strategic placement of card suit vectors (♠, ♥, ♣, ♦) and custom star/asterisk markers acting as functional bullet accents[cite: 1].
- **Dual Structural Layouts:** Clean technical data dashboards (e.g., CRM snapshots, performance line-and-bar charts) sitting perfectly alongside content-forward card grids[cite: 1].

---

## Colors

### Brand & Accent
- **Primary / Ink** (`{colors.primary}` — #000000): Deep black used for structural display text, navigation items, layout boundaries, and full dark surface fills[cite: 1].
- **Accent Red** (`{colors.accent}` — #d31e1e): A vibrant, high-saturation playing-card crimson used for thematic anchors, highlights, active status nodes, and primary graphics[cite: 1].
- **Muted Accent** (`{colors.accent-muted}` — #f4dcd9): A soft, desaturated red tint used behind alert components, tags, or as interactive card backdrops.

### Surface
- **Canvas Backdrop** (`{colors.canvas}` — #ececec): The standard, light-gray environmental background texture that ties all cards and layouts together[cite: 1].
- **Surface Plain** (`{colors.surface-plain}` — #ffffff): Crisp, clean white container fills that anchor individual project blocks, dashboards, and portfolio metrics[cite: 1].
- **Surface Dark** (`{colors.surface-dark}` — #111111): Used for main structural sidebar blocks (such as the Carpe Diem CRM sidebar) and heavy hero blocks[cite: 1].

### Text & Status
- **Body Text** (`{colors.body}` — #2b2b2b): Dark gray to ensure clean readability across white surface blocks[cite: 1].
- **On Dark** (`{colors.on-dark}` — #ffffff): Pure white text applied cleanly over dark surfaces, buttons, or charts[cite: 1].
- **Status Success** (`{colors.success}` — #c6f6d5): A soft mint green badge backdrop denoting resolved cases or reached goals[cite: 1].
- **Status Pending** (`{colors.pending}` — #feebc8): A warm pastel yellow marker denoting active outreach or items in progress[cite: 1].

---

## Typography

### Font Family
The typography suite leverages an expressive mix of three distinct type families[cite: 1]:
1. **Display (Impact & Structural):** **Bebas Neue** or **Anton** form the heavy uppercase typographic voice[cite: 1]. Perfect for large title sequences ("EXPERIENCE", "THE JACK PRINCIPLE")[cite: 1].
2. **Body & Interface:** **Montserrat** or **Be Vietnam** provide the geometric sans-serif workhorse foundation for all readable metrics, tables, descriptions, and labels[cite: 1].
3. **Signature Accent:** **Shadows Into Light 2** or **Amsterdam 4** provide organic, flowing handwritten scripts overlaid precisely on top of display elements to inject personality[cite: 1].

### Hierarchy

| Token | Size | Weight | Line Height | Case | Family / Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 72px | 900 | 0.95 | UPPERCASE | Anton / Bebas Neue; Giant section intros[cite: 1] |
| `{typography.display-lg}` | 36px | 700 | 1.1 | UPPERCASE | Bebas Neue; Section headlines & dashboard headers[cite: 1] |
| `{typography.title-md}` | 20px | 700 | 1.3 | Mixed | Montserrat; Card titles and project blocks[cite: 1] |
| `{typography.body-md}` | 14px | 400 | 1.5 | Sentence | Be Vietnam; Main paragraphs, listings, bulleted details[cite: 1] |
| `{typography.label-caps}` | 12px | 700 | 1.2 | UPPERCASE | Montserrat; Metadata tags, status labels, chart captions[cite: 1] |
| `{typography.signature}` | 28px | Regular | 1.0 | Cursive | Shadows Into Light 2; Overlaid editorial accents[cite: 1] |

---

## Layout & Spacing

### Spacing Scale
- **Base Increment:** 4px scale.
- **Tokens:** `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px.
- **Layout Padding:** Layout containers maintain a strict `{spacing.xl}` (32px) boundary padding to ensure graphical elements never crowd the edges of the display area.
- **Card Grid Gap:** Spacing between individual item blocks inside grids holds a uniform `{spacing.md}` (16px) or `{spacing.lg}` (24px) depending on density context[cite: 1].

### Grid Systems
- **Dashboard Configurations:** 2-column asymmetric layout split between a fixed side profile/navigation column and a wider multi-card modular content area[cite: 1].
- **Portfolio Grid:** 4-column item grid at full width desktop viewport, collapsing dynamically to 2-column or single-column blocks on mobile screens[cite: 1].

---

## Shapes & Radii

### Border Radius Scale

| Token | Value | Applied Context |
|---|---|---|
| `{rounded.none}` | 0px | Hard table borders, standard layout dividers, linear charts[cite: 1]. |
| `{rounded.sm}` | 6px | Internal interface components, interface tags, status badges, small buttons[cite: 1]. |
| `{rounded.card}` | 16px | Standard portfolio cards, dashboard blocks, highlighted callouts (Playing card look)[cite: 1]. |
| `{rounded.full}` | 9999px | Actionable pill components, circular icon containers, profile nodes[cite: 1]. |

---

## Components

### Navigation & Headers
- **`profile-header-pill`**: A rounded container positioned neatly at layout boundaries containing branding signatures ("AYDEN'S PORTFOLIO") paired alongside active contextual tags[cite: 1].
- **`thematic-sidebar`**: Pure dark structural canvas panel containing structured navigation lists, branding layouts, or status checkmarks[cite: 1].

### Cards & Layout Containers
- **`playing-card-container`**: Pure white backdrop (`{colors.surface-plain}`), featuring standard crisp `{rounded.card}` geometry[cite: 1]. Houses a specific sub-layout: top-weighted card suit symbol identifier, thick bold heading, and aligned bullet pointers[cite: 1].
- **`metric-dashboard-card`**: An analytical layout system incorporating a thin baseline wrapper grid, containing metric labels, interactive tracking charts, or data status funnels[cite: 1].
- **`multimedia-content-card`**: Rounded card layout anchoring a high-contrast thumbnail graphic (such as localized short-form mobile video screenshots) with typography tags situated cleanly beneath the frame[cite: 1].

### Buttons & Tags
- **`status-badge`**: Small background containers utilizing `{rounded.sm}` geometries with high contrast text colors matching target states (e.g., light green for resolved, yellow for processing)[cite: 1].
- **`action-button-pill`**: Highly interactive structural action items using `{rounded.full}` rounding, colored in deep black (`{colors.primary}`) or crisp red (`{colors.accent}`)[cite: 1].

---

## Do's and Don'ts

### Do
- Maintain high-contrast tracking between the light background field and individual content cards[cite: 1].
- Use uppercase ultra-bold headings exclusively for top-level structural layout labeling[cite: 1].
- Leverage custom character iconography (such as star bullets or card suite indicators) to keep theme consistency clean and apparent[cite: 1].
- Ensure visual dashboards mimic a high-fidelity workspace look with structured tables, records, and clear status bars[cite: 1].

### Don't
- Do not dilute text clarity by overlaying running body paragraphs on top of raw red graphic fields[cite: 1].
- Do not mix corner structures arbitrarily; ensure all standard blocks follow the defined soft deck curvature rule (`{rounded.card}`)[cite: 1].
- Do not crowd technical data metrics; leave clean breathing room around bar components, funnels, and data tables[cite: 1].