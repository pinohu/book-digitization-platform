# DYNASTY-DESIGN.md — Dynasty Empire Master Design System

> **Authority**: This is the root design specification for all Dynasty Empire web properties.  
> Every project-level DESIGN.md inherits from this document and overrides only what is specific to that product.  
> AI agents: read this file first, then the project's own DESIGN.md.

---

## Brand DNA

Dynasty Empire builds multi-generational wealth infrastructure. The design language must communicate:

- **Government-grade trust** — the credibility of an institution
- **Founder-class authority** — the confidence of someone who doesn't need to convince you
- **Operational precision** — everything works; nothing is decorative noise
- **Generational permanence** — built to last decades, not to chase trends

No startup whimsy. No neon gradients. No "move fast" energy. Every pixel should feel like it was placed by someone who will still be here in 30 years.

---

## 1. Global Color Tokens

These tokens are the cross-portfolio constants. Project-level files map these to their specific roles.

### Core Palette

| Token | Hex | Role |
|---|---|---|
| `dynasty-black` | `#0A0A0A` | Primary text, hero headlines across all products |
| `dynasty-near-black` | `#141413` | Warm near-black for body copy (slight warmth) |
| `dynasty-white` | `#FAFAFA` | Light surface backgrounds |
| `dynasty-pure-white` | `#FFFFFF` | Card surfaces, maximum contrast |
| `dynasty-gold` | `#C9A84C` | Authority accents, premium tier markers, trust signals |
| `dynasty-gold-light` | `#F0D99A` | Tinted gold surface for badge backgrounds |
| `dynasty-gold-dark` | `#8B6E2A` | Gold text on light backgrounds |

### Product-Specific Accent Tokens

| Token | Hex | Product | Role |
|---|---|---|---|
| `gov-purple` | `#635BFF` | LeadOS-Gov (sitbid.com) | CTAs, active states, payment surfaces — Stripe-matched |
| `gov-purple-hover` | `#4434D4` | LeadOS-Gov | Hover/pressed state on purple elements |
| `gov-navy` | `#061B31` | LeadOS-Gov | Deep heading color — financial-grade authority |
| `gov-blue` | `#0A72EF` | LeadOS-Gov | Informational states, links |
| `crop-green` | `#3ECF8E` | PA CROP Services | Brand accent, compliance indicators |
| `crop-green-link` | `#00C573` | PA CROP Services | Interactive green, links |
| `crop-green-border` | `rgba(62,207,142,0.3)` | PA CROP Services | Subtle green accent borders |
| `dir-blue` | `#0075DE` | Directory portfolio | Primary CTA for listing-based sites |

### Semantic Tokens (All Products)

| Token | Hex | Role |
|---|---|---|
| `status-success` | `#15BE53` | Verified, approved, active |
| `status-success-bg` | `rgba(21,190,83,0.15)` | Success badge backgrounds |
| `status-success-text` | `#108C3D` | Success badge text |
| `status-pending` | `#FFA500` | Pending review, awaiting action |
| `status-pending-bg` | `rgba(255,165,0,0.12)` | Pending badge background |
| `status-pending-text` | `#8B5A00` | Pending badge text |
| `status-expired` | `#E53E3E` | Expired, rejected, error |
| `status-expired-bg` | `rgba(229,62,62,0.12)` | Error badge background |
| `status-expired-text` | `#B53333` | Error badge text |
| `status-draft` | `#64748B` | Draft, inactive, archived |
| `status-admin` | `#7928CA` | Admin-only surfaces and markers |

---

## 2. Global Typography Foundation

### Font Stack by Product Category

| Category | Display / Headlines | Body / UI | Code / Mono |
|---|---|---|---|
| Gov SaaS (LeadOS-Gov) | `Geist`, then `Inter` | `Inter` | `Geist Mono` |
| Compliance (PA CROP) | `Inter` | `Inter` | `Source Code Pro` |
| Directories | `Inter` | `Inter` | `ui-monospace` |
| Authority Sites | `Georgia` (serif) | `Inter` | `ui-monospace` |

### Cross-Portfolio Typography Rules

- **Minimum body size**: 16px — never smaller for paragraph text
- **Minimum line-height**: 1.5 on body text — readability is non-negotiable
- **No pure black text**: Use `dynasty-near-black` (`#141413`) — slight warmth reduces harshness
- **Heading weight range**: 500–600 max — no heavy 700+ weight on marketing surfaces
- **Negative letter-spacing at display sizes**: Apply tightening at 32px+ for density
- **WCAG AA minimum**: 4.5:1 contrast ratio on all text — enforced, not aspirational

### Universal Letter-Spacing Scale

| Font size | Letter spacing |
|---|---|
| 48px+ | −1.5px to −2.4px |
| 32–47px | −0.8px to −1.2px |
| 24–31px | −0.3px to −0.6px |
| 16–23px | −0.1px to −0.2px |
| Below 16px | Normal or slight positive (+0.1px) |

---

## 3. Global Spacing & Layout

### Base Unit: 8px

All spacing is a multiple of 8px unless micro-adjustments require 4px.

| Scale step | Value | Use |
|---|---|---|
| 1 | 4px | Icon gaps, tight inline spacing |
| 2 | 8px | Component internal padding (tight) |
| 3 | 12px | Component internal padding (standard) |
| 4 | 16px | Card padding, grid gaps |
| 5 | 24px | Section internal padding |
| 6 | 32px | Between components |
| 7 | 48px | Between sections (mobile) |
| 8 | 64px | Between sections (desktop) |
| 9 | 96px | Major section breaks |
| 10 | 128px | Hero vertical padding |

### Max-Width Containers

| Context | Max width |
|---|---|
| Marketing / Landing | 1200px |
| SaaS Dashboard | 1440px |
| Documentation / KB | 860px |
| Forms / Wizard | 640px |

---

## 4. Global Border Radius Scale

| Name | Value | Use |
|---|---|---|
| Sharp | 2px | Data tables, inline code |
| Subtle | 4px | Small badges, micro-elements |
| Standard | 6px | Buttons, input fields |
| Comfortable | 8px | Cards, containers, dropdowns |
| Large | 12px | Featured cards, dashboard panels |
| XL | 16px | Hero containers, modal dialogs |
| XXL | 24px | Highlighted promotional blocks |
| Pill | 9999px | Status badges, filter chips |
| Circle | 50% | Avatars, icon buttons |

---

## 5. Global Shadow System

| Level | Value | Use |
|---|---|---|
| Ring | `rgba(0,0,0,0.08) 0px 0px 0px 1px` | Border-as-shadow, cards |
| Ambient | `rgba(0,0,0,0.04) 0px 2px 8px` | Subtle card lift |
| Elevated | `rgba(0,0,0,0.08) 0px 8px 24px` | Dropdowns, popovers |
| Modal | `rgba(0,0,0,0.15) 0px 16px 48px` | Modals, drawers |
| Focus | `0 0 0 2px #635BFF` | Gov/payment focus ring |
| Focus (crop) | `0 0 0 2px #3ECF8E` | Compliance focus ring |

---

## 6. Status Badge System (Cross-Product)

All Dynasty products share this badge pattern:

```
Background: {status}-bg token
Text: {status}-text token
Border: 1px solid {status} at 30% opacity
Padding: 2px 8px
Radius: 9999px (pill)
Font: 12px, weight 500
```

Valid status values: `active`, `pending`, `expired`, `draft`, `verified`, `suspended`, `admin`

---

## 7. Cross-Product Do's and Don'ts

### Always Do
- Use warm-tinted near-black (`#141413`) instead of pure black (`#000000`)
- Apply `dynasty-gold` as the cross-portfolio trust signal (badges, premium markers)
- Maintain WCAG AA contrast on all text
- Use semantic status tokens — never ad-hoc colors for states
- Keep border-radius ≥ 6px on all interactive surfaces
- Write hover/focus/disabled states for every interactive component

### Never Do
- Use pure white (`#FFFFFF`) as a page background — always `#FAFAFA` minimum
- Introduce warm orange/yellow hues into gov or compliance products
- Use weight 700+ on body or UI text — reserved for display headlines only
- Create custom one-off colors — always map to a token
- Skip loading/skeleton states on async content
- Use more than 2 font families in one product

---

## 8. Accessibility Standards (Non-Negotiable)

- **WCAG AA** on all products (4.5:1 body, 3:1 large text)
- **Focus rings** on every interactive element — visible, styled, 2px minimum
- **Touch targets**: 44×44px minimum on all clickable elements
- **Alt text** on all meaningful images
- **No color-only information** — icons or labels must accompany color-coded states
- **Keyboard navigation** through all forms and dashboards

---

## 9. Agent Prompt Guide (Master)

When generating UI for any Dynasty Empire product:

1. **Check the project DESIGN.md first** — it overrides this file for product-specific details
2. **Default to dynasty-black (`#0A0A0A`) and dynasty-white (`#FAFAFA`)** for text/background
3. **Use the product accent** — `gov-purple` for LeadOS-Gov, `crop-green` for PA CROP
4. **Apply dynasty-gold sparingly** — it marks premium tiers and authority signals only
5. **Status badges must use semantic tokens** — never ad-hoc green/red/yellow
6. **Minimum 6px border radius** on all interactive elements — no sharp corners in user-facing UI
7. **Every component needs**: default, hover, focus, disabled, and loading states

---

*This document is maintained by Dynasty Empire LLC. Last architecture review: April 2026.*
