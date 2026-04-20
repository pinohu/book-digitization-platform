# DESIGN.md — Book Digitization Platform
> Inherits from: DYNASTY-DESIGN.md

## 1. Visual Theme & Atmosphere
The visual identity of the Book Digitization Platform is defined by a philosophy we term "Ecclesiastical Modernism." This aesthetic seeks to bridge the gap between the timeless, sacred nature of Catholic Classics and the cutting-edge precision of AI-driven OCR and RAG systems. The atmosphere is one of academic prestige, quietude, and archival permanence. It avoids the sterile, "tech-bro" look of contemporary SaaS, instead opting for a palette and layout that evokes a high-end digital library or a modernized Vatican archive. The use of cream-toned backgrounds (#FDFCFB) replaces the harshness of pure white, mimicking the feel of high-quality vellum or archival paper, which reduces eye strain during long scholarly research sessions.

The interface leverages a sophisticated tension between the structured, authoritative nature of the Merriweather serif and the clean, utilitarian efficiency of Open Sans. The dominant accent, Deep Green (#006400), is not merely a brand color but a symbolic nod to tradition, growth, and the institutional stability of the Criterion Educational Foundation. This is balanced by the strategic application of Dynasty Gold (#C9A84C), which is reserved exclusively for premium tier markers, verified archival stamps, and high-value call-to-actions, ensuring that prestige is signaled sparingly and effectively. The overall impression is one of "Digital Stewardship"—the software does not overshadow the content; it serves as a transparent, elegant lens through which the physical word is transitioned into the digital realm.

Technically, the interface is characterized by "whisper-weight" borders and subtle, brand-tinted depth. Rather than using heavy dropshadows, the platform employs a sophisticated layering system where elevation is signaled by a combination of a 1px border (#E2E8E2) and a very soft, green-tinted rgba shadow. This creates a sense of tactile layering, as if the user is interacting with physical folders and pages stacked atop a desk. The spacing is generous, employing a strict 8px base grid to ensure a rhythmic, breathable layout that encourages deep focus and minimizes cognitive load, essential for scholars engaging with complex theological texts.

Key Characteristics:
- Base Spacing: 8px (Linear scale: 8, 16, 24, 32, 48, 64, 80, 96)
- Border Weight: 1px solid #E2E8E2 (Whisper-weight philosophy)
- Corner Radius: sm=6px (Inputs), md=10px (Cards), lg=16px (Modals/Containers)
- Primary Accent: #006400 (Deep Green) with 150ms ease-in-out transitions
- Depth Logic: Brand-tinted rgba(0, 100, 0, 0.08) for low-level elevation
- Typography Contrast: High-contrast Merriweather for headers / Mid-contrast Open Sans for UI
- Interaction Feedback: Subtle scale-down (0.98) on active button states
- Surface Texture: #FDFCFB background to simulate archival paper quality

## 2. Color Palette & Roles
| Color | Hex | Role | Application |
| :--- | :--- | :--- | :--- |
| Page Background | #FDFCFB | Base Layer | Main app background, body wrappers |
| Card Surface | #FFFFFF | Component Layer | Book cards, search results, modals |
| Primary Text | #1A1C1A | High Emphasis | Page titles, body text, primary labels |
| Secondary Text | #4A4D4A | Medium Emphasis | Subheaders, metadata, descriptions |
| Muted Text | #7A7D7A | Low Emphasis | Placeholders, timestamps, disabled text |
| Primary Accent | #006400 | Action/Brand | Primary buttons, active nav links, icons |
| Accent Hover | #004D00 | Interaction | Button hover states, link hover |
| Accent Light | #E6F2E6 | Subtle Highlight | Active row highlights, badge backgrounds |
| Border | #E2E8E2 | Structure | Dividers, input borders, card outlines |
| Shadow | rgba(0, 100, 0, 0.08) | Elevation | Card shadows, dropdown menus |
| Focus Ring | #006400 | Accessibility | 2px offset ring for keyboard navigation |
| Dynasty Gold | #C9A84C | Premium/Elite | Subscription badges, "Verified" stamps |

### Status System
| Status | Background | Text | Border | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| Verified/Active | #E6F2E6 | #004D00 | #B3D9B3 | Digitization complete & verified |
| Pending | #FFF9E6 | #856404 | #FFEeba | OCR processing in progress |
| Expired/Error | #FDECEA | #B00020 | #F5C6CB | Upload failed or subscription lapsed |
| Draft | #F5F5F5 | #666666 | #DDDDDD | Book record created but no files |
| Admin | #E8EAF6 | #3F51B5 | #C5CAE9 | System-level configuration records |

## 3. Typography Rules
Font Stack:
| Role | Font | Fallback | OpenType Features |
| :--- | :--- | :--- | :--- |
| Display/Headers | Merriweather | Georgia, serif | `font-variant-ligatures: common-ligatures` |
| UI/Body | Open Sans | Helvetica, sans-serif | `font-feature-settings: "cv01", "cv02"` |
| Code/Mono | JetBrains Mono | Menlo, monospace | `font-variant-ligatures: none` |

Hierarchy:
| Role | Font | Size | Weight | Line Height | Letter Spacing | Features | Use |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| H1 Display | Merriweather | 48px | 700 | 1.2 | -0.02em | Tightened | Landing Page Hero |
| H2 Section | Merriweather | 32px | 700 | 1.3 | -0.01em | Tightened | Dashboard Headers |
| H3 Sub-section | Merriweather | 24px | 600 | 1.4 | -0.005em | Standard | Card Titles |
| H4 Small Header | Merriweather | 20px | 600 | 1.4 | 0 | Standard | Sidebar Groupings |
| Body Large | Open Sans | 18px | 400 | 1.6 | 0 | Readable | Reader Main Text |
| Body Base | Open Sans | 16px | 400 | 1.5 | 0 | Standard | General UI Text |
| Body Small | Open Sans | 14px | 400 | 1.5 | 0 | Compact | Metadata, Captions |
| UI Label | Open Sans | 13px | 600 | 1.0 | 0.02em | Uppercase | Tab Labels, Badges |
| Caption | Open Sans | 12px | 400 | 1.4 | 0 | Muted | Footer, Legal |
| Mono Small | JetBrains Mono | 13px | 400 | 1.5 | 0 | Fixed | ISBN, File Paths |
| Mono Base | JetBrains Mono | 14px | 500 | 1.5 | 0 | Fixed | API Keys, Code |
| Button Text | Open Sans | 15px | 600 | 1.0 | 0.01em | Centered | CTA Labels |
| Badge Text | Open Sans | 11px | 700 | 1.0 | 0.05em | Uppercase | Status Pills |
| Quote/Citation | Merriweather | 18px | 400 | 1.6 | 0 | Italic | Book Citations |

## 4. Component Stylings
### Primary Button
- **Default**: BG #006400, Text #FFFFFF, Border 1px #004D00, Shadow rgba(0, 100, 0, 0.2)
- **Hover**: BG #004D00, Text #FFFFFF, Scale 1.02, Shadow rgba(0, 100, 0, 0.3)
- **Focus**: BG #004D00, Ring 2px #006400, Offset 2px
- **Active**: BG #003D00, Scale 0.98, Shadow none
- **Disabled**: BG #C2D6C2, Text #7A7D7A, Cursor not-allowed
- **Loading**: BG #006400, Spinner #FFFFFF (16px), Text hidden/shifted

### Secondary Button
- **Default**: BG #FFFFFF, Text #006400, Border 1px #006400, Shadow none
- **Hover**: BG #E6F2E6, Text #004D00, Border 1px #006400
- **Focus**: Ring 2px #006400, Offset 2px
- **Active**: BG #D1E6D1, Scale 0.98
- **Disabled**: BG #F5F5F5, Text #A0A0A0, Border 1px #E2E8E2
- **Loading**: Spinner #006400 (16px), Text "Processing..."

### Destructive Button
- **Default**: BG #FFFFFF, Text #B00020, Border 1px #F5C6CB
- **Hover**: BG #FDECEA, Text #B00020, Border 1px #B00020
- **Focus**: Ring 2px #B00020, Offset 2px
- **Active**: BG #FDECEA, Scale 0.98
- **Disabled**: BG #F5F5F5, Text #A0A0A0
- **Loading**: Spinner #B00020 (16px)

### Standard Card
- **Surface**: #FFFFFF
- **Border**: 1px solid #E2E8E2
- **Radius**: 10px
- **Shadow**: 0px 4px 12px rgba(0, 100, 0, 0.05)
- **Padding**: 24px
- **Interaction**: Hover lift (translateY -4px), shadow increase to rgba(0, 100, 0, 0.1)

### Featured Card (Premium/Gold)
- **Surface**: #FFFFFF
- **Border**: 1px solid #C9A84C
- **Radius**: 10px
- **Shadow**: 0px 8px 20px rgba(201, 168, 76, 0.15)
- **Accent**: Top-border 4px solid #C9A84C
- **Padding**: 24px

### Status Badges
- **Shape**: Pill (border-radius: 9999px)
- **Padding**: 4px 12px
- **Font**: UI Label (11px, 700, Uppercase, 0.05em spacing)
- **Border**: 1px solid (matching status table)

### Form Inputs
- **Default**: BG #FFFFFF, Border 1px #E2E8E2, Text #1A1C1A, Radius 6px, Padding 10px 12px
- **Hover**: Border 1px #BDBDBD
- **Focus**: Border 1px #006400, Ring 2px rgba(0, 100, 0, 0.2), Outline none
- **Active**: Border 1px #004D00
- **Disabled**: BG #F5F5F5, Text #7A7D7A, Border 1px #E2E8E2, Cursor not-allowed
- **Loading**: Right-aligned spinner (14px) #006400, Border 1px #006400

## 5. Layout Principles
The platform follows a "Content-First" layout strategy. The primary goal is to minimize the distance between the user and the digitized text.
- **Grid System**: 12-column fluid grid with 24px gutters.
- **Page Structure**: 
    - *Global Header*: Fixed, 64px height, #FFFFFF surface, 1px bottom border #E2E8E2.
    - *Main Content Area*: Max-width 1440px, centered, with 48px horizontal padding.
    - *Sidebar (Dashboard)*: 280px width, #FDFCFB background, subtle right border #E2E8E2.
- **Whitespace Philosophy**: "Academic Breathing Room." We utilize excessive whitespace (min 32px between major sections) to prevent the UI from feeling cluttered, echoing the margins of a physical book.
- **Source-First Reader**: A split-pane layout. Left pane (50%) displays the high-resolution S3 scan (PDF/TIFF); right pane (50%) displays the OpenAI OCR processed text. This ensures "Verbatim Trust" by allowing scholars to instantly verify the AI's transcription against the original image.

## 6. Depth & Elevation
| Level | Shadow Value | Use |
| :--- | :--- | :--- |
| Flat | None | Page background, base inputs |
| Low | 0 2px 4px rgba(0, 100, 0, 0.04) | Subtle buttons, table headers |
| Medium | 0 4px 12px rgba(0, 100, 0, 0.08) | Standard cards, dropdown menus |
| High | 0 12px 24px rgba(0, 100, 0, 0.12) | Popovers, tooltips, featured cards |
| Floating | 0 20px 40px rgba(0, 100, 0, 0.16) | Modals, global alerts |
| Overlay | rgba(0, 0, 0, 0.4) | Backdrop for modals (blur 4px) |

## 7. Do's and Don'ts
**Do:**
- Use Merriweather for every single heading and title to maintain an academic feel.
- Ensure every action button has all 6 defined states implemented in CSS/Tailwind.
- Use the #FDFCFB cream background for all page-level wrappers.
- Apply the 8px grid strictly; never use arbitrary values like 13px or 17px.
- Use Dynasty Gold (#C9A84C) only for premium tiers or "Verified" status.
- Implement the split-pane reader for every book view to ensure citation accuracy.
- Use negative letter-spacing on H1 and H2 headers for a professional, "published" look.
- Ensure all borders are "whisper-weight" (1px) and use #E2E8E2.
- Use the brand-tinted rgba(0, 100, 0, 0.08) shadow instead of generic black/gray.
- Keep the UI minimal; let the digitized Catholic Classics be the focal point.
- Maintain high contrast for accessibility (WCAG AA) on all text elements.
- Use pill-shaped badges for all status indicators.

**Don't:**
- Never use pure black (#000000) for text; always use #1A1C1A.
- Never use generic Tailwind blue (#3B82F6) or any non-brand colors.
- Avoid rounded corners larger than 16px; no "bubble" aesthetics.
- Never use "Lorem Ipsum" or placeholder text in the UI; use real book titles.
- Don't use heavy, dark shadows that create a "floating" 2010s web look.
- Avoid using serif fonts for small UI labels or button text.
- Never hide the original scan in the reader; the source is the authority.
- Don't use bright, neon colors for status indicators; stick to the muted palette.
- Avoid centering large blocks of body text; always left-align for readability.
- Never use a white background (#FFFFFF) for the main page wrapper.
- Don't implement "infinite scroll" for archival lists; use structured pagination.
- Avoid using icons without accompanying text labels in the main navigation.

## 8. Responsive Behavior
| Breakpoint | Width | Key Changes |
| :--- | :--- | :--- |
| Mobile | < 640px | Single column; sidebar becomes bottom-nav; reader becomes tabbed (Scan vs Text) |
| Tablet | 640px - 1024px | 2-column grid for cards; sidebar collapses to icons; reader stays split-pane |
| Desktop | 1024px - 1440px | Full 12-column grid; expanded sidebar; full split-pane reader with zoom |
| Ultra-Wide | > 1440px | Max-width container (1440px) centered; increased outer margins |

## 9. Agent Prompt Guide
Quick Color Reference:
- Accent: #006400 | Surface: #FFFFFF | BG: #FDFCFB | Gold: #C9A84C | Border: #E2E8E2

Example Component Prompts:
- "Create a BookCard component using #FFFFFF surface, 1px #E2E8E2 border, 10px radius, and a Merriweather H3 title. Include a status badge using the 'Verified' pill style (#E6F2E6 bg, #004D00 text)."
- "Build a PrimaryButton with the 6-state logic: default #006400, hover #004D00, active scale 0.98, and a 150ms transition."
- "Implement a split-pane ReaderLayout: left side for S3 image display, right side for OpenAI OCR text using Open Sans 18px, 1.6 line-height, on #FDFCFB background."
- "Design a PremiumTierBadge using Dynasty Gold #C9A84C, 11px uppercase Open Sans, pill shape, with a subtle gold-tinted shadow."
- "Create a FormInput field with a 6px radius, #E2E8E2 border, and a #006400 focus ring with 2px offset."

Iteration Guide:
1. Check if the background is #FDFCFB (not #FFFFFF).
2. Verify all headers use Merriweather with negative letter-spacing.
3. Ensure no generic blue/gray colors are used.
4. Confirm the 8px spacing grid is maintained.
5. Check that buttons have hover and active states.
6. Validate that the "Source-First" split-pane is present in readers.
7. Ensure all borders are 1px and use the #E2E8E2 color.