# Accessibility Plan — Book Digitization Platform

This **Accessibility Compliance & Implementation Plan** is designed for the **Book Digitization Platform**. Given the mission of **Origin Eyes Incorporated (USA)** to support the **Criterion Educational Foundation (Nigeria)** in preserving Catholic Classics, this plan ensures that these sacred and educational texts are not only digitized but are universally accessible to scholars, clergy, and students with disabilities worldwide.

---

# Accessibility Compliance Plan: Book Digitization Platform

## 1. WCAG 2.1 AA Checklist
*Target Standard: Web Content Accessibility Guidelines (WCAG) 2.1 Level AA*

### PERCEIVABLE: Information and UI components must be presentable to users in ways they can perceive.
- [ ] **1.1.1 Non-text content:** All UI icons (search, settings, download) have alt text. Meaningful book cover images have descriptions; decorative flourishes have empty alt attributes (`alt=""`).
- [ ] **1.2.1 Audio/video (Pre-recorded):** Any introductory videos about the foundation include text transcripts.
- [ ] **1.2.2 Captions (Live):** Synchronized captions for all video content.
- [ ] **1.3.1 Info and relationships:** Proper heading hierarchy (H1 for book titles, H2 for chapters). Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<footer>`) so screen readers understand the page structure.
- [ ] **1.3.2 Meaningful sequence:** The reading order of the digitized text in the DOM matches the visual reading order.
- [ ] **1.3.3 Sensory characteristics:** Instructions do not say "Click the red button"; instead, "Click the 'Download' button."
- [ ] **1.4.1 Use of color:** Error states or highlighted text are not indicated by color alone (e.g., use an icon + red text).
- [ ] **1.4.2 Audio control:** If an "Audiobook" feature is implemented, a visible pause/stop button is provided.
- [ ] **1.4.3 Contrast minimum:** Text meets 4.5:1 ratio. High-contrast mode is supported for reading classic texts.
- [ ] **1.4.4 Resize text:** Users can zoom to 200% without the digital reader interface breaking.
- [ ] **1.4.5 Images of text:** **CRITICAL:** Digitized books must use OCR (Optical Character Recognition) to provide real, selectable text rather than just "pictures of pages."
- [ ] **1.4.10 Reflow:** The digital reader must support reflow at 320px width (mobile view) without horizontal scrolling.
- [ ] **1.4.11 Non-text contrast:** UI components (buttons, form borders) have a 3:1 contrast ratio against the background.

### OPERABLE: UI components and navigation must be operable.
- [ ] **2.1.1 Keyboard:** Every feature (search, page turning, font adjustment) is accessible via `Tab`, `Enter`, and `Space`.
- [ ] **2.1.2 No keyboard trap:** Users can never get "stuck" inside a book viewer or a pop-up modal.
- [ ] **2.2.1 Timing adjustable:** No session timeouts that prevent a user from finishing a reading session.
- [ ] **2.3.1 Three flashes:** No content flashes more than 3 times per second.
- [ ] **2.4.1 Skip navigation:** A "Skip to Content" link appears on the first `Tab` press.
- [ ] **2.4.2 Page titled:** Each book has a unique, descriptive `<title>` (e.g., "The Imitation of Christ | Criterion Foundation").
- [ ] **2.4.3 Focus order:** Tabbing through the library moves logically from Search $\rightarrow$ Results $\rightarrow$ Book Card.
- [ ] **2.4.4 Link purpose:** Links are descriptive (e.g., "Read 'Summa Theologica' online" instead of "Read more").
- [ ] **2.4.6 Headings and labels:** All form inputs (Search bar) have visible, permanent labels.
- [ ] **2.4.7 Focus visible:** A clear outline appears around buttons and links when navigated via keyboard.
- [ ] **2.5.1 Pointer gestures:** Any "swipe to turn page" gesture has a click/tap alternative.

### UNDERSTANDABLE: Information and UI operation must be understandable.
- [ ] **3.1.1 Language of page:** The `<html>` tag specifies the language (e.g., `<html lang="en">`).
- [ ] **3.1.2 Language of parts:** If a Catholic text includes Latin, use `<span lang="la">` for screen reader accuracy.
- [ ] **3.2.1 On focus:** Moving focus to a menu does not trigger a sudden change in context (like an auto-play video).
- [ ] **3.2.2 On input:** Changing a font size setting does not unexpectedly refresh or move the user's position.
- [ ] **3.3.1 Error identification:** If a search fails, the error is described in text (e.g., "No books found matching 'St. Augustine'").
- [ ] **3.3.2 Labels or instructions:** Search bars and login fields have clear instructions.
- [ ] **3.3.3 Error suggestion:** If a user enters an invalid email for a newsletter, suggest the correct format.
- [ ] **3.3.4 Error prevention:** Confirm before a user deletes a "Saved Bookmark" or "Favorite Book."

### ROBUST: Content must be robust enough to be interpreted by a wide variety of user agents.
- [ ] **4.1.1 Parsing:** HTML is valid; no duplicate IDs which confuse screen readers.
- [ ] **4.1.2 Name, role, value:** Custom components (like a custom "Volume Slider") use ARIA roles to tell the browser "this is a slider."
- [ ] **4.1.3 Status messages:** When a book finishes loading, an ARIA live region announces "Book loaded successfully."

---

## 2. Automated Testing Setup (axe-core)

To ensure continuous compliance during the development of the platform, the following automation stack is required:

*   **Installation:**
    `npm install @axe-core/react axe-core`
*   **Development Integration:** Use `@axe-core/react` to inject accessibility audits directly into the browser console during development. This alerts developers to errors immediately.
*   **CI/CD Integration:** Integrate `axe-core` into the GitHub Actions or GitLab pipeline using the Playwright axe plugin. This prevents code from being merged if it violates critical accessibility rules.
*   **Pre-commit Hook:** Use `husky` to run a lightweight axe scan on any modified UI components before a developer can commit code.

### Example Test Code (Playwright + axe-core)
```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have any detectable accessibility violations on the Book Library page', async ({ page }) => {
  await page.goto('https://digitization-platform.org/library');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

*   **Reporting & Severity:**
    *   **Critical:** Blocks usage (e.g., Keyboard trap). **Action: Stop Deployment.**
    *   **Serious:** Major barrier (e.g., Missing form labels). **Action: Fix before Release.**
    *   **Moderate:** Degraded experience (e.g., Low contrast). **Action: Fix in next Sprint.**
    *   **Minor:** Annoyance (e.g., Redundant alt text). **Action: Backlog.**

---

## 3. Manual Testing Guide

Automated tools only catch ~40% of issues. Manual testing is mandatory for a reading platform.

### A. Keyboard-Only Protocol (30-Minute Script)
1.  **Navigation:** Use `Tab` to move through the library. Can you reach every book?
2.  **Interaction:** Use `Enter`/`Space` to open a book. Can you use `Arrow Keys` to turn pages?
3.  **Visuals:** Is there a "focus ring" (outline) around every item you select?
4.  **Modals:** Open a "Settings" menu. Can you close it using the `Esc` key? Does the focus stay inside the menu?

### B. Screen Reader Testing
*   **Tools:** NVDA (Windows/Free), VoiceOver (macOS/iOS).
*   **Test Flows:**
    *   **The Reading Flow:** Open a digitized book. Does the screen reader read the text linearly? Does it announce chapter headings?
    *   **The Search Flow:** Type a name. Does the reader announce "3 results found"?
    *   **The Landmark Flow:** Does the reader allow you to jump straight to the "Main Content" or "Navigation"?

### C. Color, Contrast, and Reflow
*   **Contrast:** Use the **WebAIM Contrast Checker** on the main reading font vs. the background.
*   **Vision Simulation:** Use Chrome DevTools to simulate **Protanopia** (Red-blindness) to ensure UI icons are still distinguishable.
*   **Reflow:** Zoom the browser to **400%**. The text should stack vertically like a mobile site, not require side-to-side scrolling.

### D. Digitization-Specific Test (OCR Check)
*   **The "Selectability" Test:** Try to highlight a sentence in a digitized book with a mouse. If you cannot highlight the text, the OCR has failed, and the book is **inaccessible** to screen readers.

---

## 4. Remediation Priority Matrix

| Priority | Impact | Effort | Examples | Timeline |
| :--- | :--- | :--- | :--- | :--- |
| **P0 Critical** | Blocks access | Any | Keyboard traps; OCR produces images only; Missing form labels. | **Fix Immediately** |
| **P1 High** | Major barrier | Low-Med | Poor contrast on text; Missing "Skip to Content"; No focus indicator. | **Within 2 weeks** |
| **P2 Medium** | Degraded exp. | Medium | Missing ARIA landmarks; Decorative images having descriptions. | **Within 1 month** |
| **P3 Low** | Minor annoyance | High | Suboptimal heading hierarchy; Verbose/redundant alt text. | **Within 1 quarter** |

---

## 5. Accessibility Statement Template

*Copy and adapt this for the platform's footer/about page.*

> ### Accessibility Statement
>
> **Our Commitment**
> Origin Eyes Incorporated and the Criterion Educational Foundation are committed to ensuring digital accessibility for the Catholic community and scholars worldwide. We are dedicated to making our digitized collection of Catholic Classics available to everyone, regardless of ability.
>
> **Conformance Status**
> We strive to conform to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA**. We are currently [Partially/Fully] conformant. We recognize that some parts of the platform (such as [Insert Feature, e.g., legacy search filters]) may currently present challenges, and we are working actively to remediate them.
>
> **Known Limitations**
> * [Limitation 1]: Expected remediation by [Date].
> * [Limitation 2]: Expected remediation by [Date].
>
> **Feedback & Contact**
> We welcome your feedback to help us improve. If you encounter accessibility barriers while using our platform, please contact us:
> * **Email:** [accessibility@origineyes.org]
> * **Response Commitment:** We aim to acknowledge all accessibility feedback within **2 business days** and provide a resolution or status update within **10 business days**.
>
> **Last Assessed:** [Insert Date]

---

### Resources & Training
*   **Learning:** [W3C WAI Tutorials](https://www.w3.org/WAI/tutorials/)
*   **Testing Tool:** [axe DevTools Browser Extension](https://www.deque.com/axe/)
*   **Contrast Check:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)