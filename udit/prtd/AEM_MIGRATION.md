# PRTD AEM Migration & Standards Compliance Guide

## Overview

`index.html` is a static visual prototype demonstrating the Permanent Resident Travel Document (PRTD) single-page stepper experience. The prototype includes the full Canada.ca header, menu, breadcrumb, page feedback widget, date modified, and footer to facilitate standalone inspection.

In Adobe Experience Manager (AEM), **the global shell is provided by the WET/GCWeb Page Template**. Only the page-specific content between the designated authorable comments is inserted into an AEM **Generic HTML Component** (or decomposed into Core Components).

---

## 1. Authorable Payload Boundaries

In `index.html`, the authorable payload boundaries:

* **Payload Start:** Starts immediately with the `<div class="container">` wrapping the page `h1` (`#wb-cont`).
* **Payload End:** Ends at the closing `</div>` of the container wrapping the `.pr-layout` stepper and stages.

### Shell Elements Handled by AEM Page Template (Do Not Copy):
* `<head>` tags, metadata, and standard GCWeb stylesheets
* Skip Links (`#wb-tphp`)
* Header, Language Toggle (`#wb-lng`), Canada Wordmark, and Search (`#wb-srch`)
* Main Menu (`#wb-sm` / `.gcweb-menu`) & Breadcrumbs (`#wb-bc`)
* Page Feedback Widget (`.gc-pg-hlpfl`) & Share widget (`.wb-share`)
* Date Modified (`#wb-dtmd`)
* Global Footer (`#wb-info`, `.gc-main-footer`, `.gc-sub-footer`, `.wtrmrk`)
* Global WET scripts (jQuery, `wet-boew.min.js`, `theme.min.js`)

---

## 2. Canada.ca & GCWeb Standards Compliance

The prototype adheres strictly to official WET-BOEW and GCWeb standards:

| Component | Standard Compliance Implementation |
|---|---|
| **Container Width** | Wrapped in standard `.container` (1170px desktop / 970px medium / 750px tablet / 100% fluid mobile). Zero horizontal overflow. |
| **Grid & Rail Spacing** | `.pr-side` width is `260px` with a `40px` layout gap (`260px + 40px + 840px = 1140px` usable width). |
| **Body Typography** | Standard GCWeb `16px` base (`line-height: 1.5`), inheriting from `theme.min.css`. No inflated overrides. |
| **Headings Scale** | Sized natively by AEM / GCWeb (`theme.min.css`). No custom font-size overrides.<br>`H1` = 38px desktop / 34px mobile with native 72px red accent bar (`border-image` from GCWeb).<br>`H2 Eyebrow` (`.pr-eyebrow.h4`) = semantic stage landmark.<br>`H3 Stage Headings` (`.pr-stage-h`) = 24px native GCWeb subsection heading.<br>`H4 Subheadings` = 18px native GCWeb heading.<br>**Zero skipped heading levels** for strict WCAG AA / screen reader compliance. |
| **Color Architecture** | Standard Canada.ca hex codes (`#26374a`, `#284162`, `#0535d2`, `#af3c43`) used directly without unnecessary `:root` indirection layers, fully compatible with AEM clientlibs and browser DevTools. |
| **Contextual Alerts** | Standard WET semantic alerts: `<section class="alert alert-warning">` and `<section class="alert alert-info">`. Fully accessible, native borders and iconography. |
| **Collapsible Content** | Standard HTML `<details class="print-open"><summary>` with native Canada.ca disclosure markers. Collapsed by default on screen, printable via `print-open`. |
| **Top of Page Links** | Completely removed per design decision, keeping content stages clean and unencumbered. |

---

## 3. AEM Deployment Methods

### Option A: AEM Client Library (`clientlib`) Configuration
If your team has deployment access to create an AEM clientlib:
1. Create a client library folder under `/apps/ircc/clientlibs/clientlib-prtd`:
   * **categories**: `[ircc.prtd]`
   * **dependencies**: `[wet-boew, gcweb]`
2. Package:
   * `css/prtd.css`
   * `js/prtd.js`

### Option B: Media Player Component (`mwsmediaplayer`) Injection (Standard Authoring Workflow)
In Government of Canada / IRCC AEM (Managed Web Services), standard authoring components (RTE, Generic HTML) aggressively sanitize `<style>` and `<script>` tags through AntiSamy XSS filters. 

To bypass this without a code deployment cycle, IRCC authoring teams standardly use the **Media Player component (`mwsmediaplayer section`)**:

```html
<div class="mwsmediaplayer section">
  <style>
    [Insert css/prtd.css content]
  </style>

  <script>
    [Insert js/prtd.js content]
  </script>
</div>
```

#### Essential Rules When Using Media Player Injection:
1. **AEM Touch UI Safety Guard**:
   `js/prtd.js` starts with:
   ```javascript
   if (window.Granite && window.Granite.author) {
     return;
   }
   ```
   This prevents the scrollspy listeners and DOM queries from interfering with AEM Touch UI authoring dialogs and drag-and-drop handles.
2. **DOM Readiness**:
   The script in `js/prtd.js` self-executes or listens to `DOMContentLoaded` / `window.onload` to ensure the HTML payload is fully rendered before binding stepper events.
3. **DAM Asset URL Remapping**:
   Because `css/prtd.css` and `index.html` use relative paths (e.g. `assets/figma/nav-chevron.svg`), when pasting into AEM, replace those relative paths with the absolute AEM DAM paths (e.g., `/content/dam/ircc/icons/prtd/nav-chevron.svg`).

---

## 4. Digital Asset Management (DAM) Mapping

All icons currently stored under `assets/figma/` must be imported into the AEM DAM:

| Local Prototype Path | Recommended AEM DAM Destination Path |
|---|---|
| `assets/figma/processing.svg` | `/content/dam/ircc/icons/prtd/processing.svg` |
| `assets/figma/fees.svg` | `/content/dam/ircc/icons/prtd/fees.svg` |
| `assets/figma/valid-for.svg` | `/content/dam/ircc/icons/prtd/valid-for.svg` |
| `assets/figma/how-apply.svg` | `/content/dam/ircc/icons/prtd/how-apply.svg` |
| `assets/figma/check.svg` | `/content/dam/ircc/icons/prtd/check.svg` |
| `assets/figma/help.svg` | `/content/dam/ircc/icons/prtd/help.svg` |
| `assets/figma/nav-chevron.svg` | `/content/dam/ircc/icons/prtd/nav-chevron.svg` |
| `assets/figma/nav-chevron-active.svg`| `/content/dam/ircc/icons/prtd/nav-chevron-active.svg` |
| `assets/figma/nav-arrow.svg` | `/content/dam/ircc/icons/prtd/nav-arrow.svg` |
| `assets/figma/nav-terminal.svg` | `/content/dam/ircc/icons/prtd/nav-terminal.svg` |

---

## 5. Bilingual Content (French Equivalents)

* In AEM, create the corresponding French page under `/content/ircc/fr/...` using the French WET page template.
* Translate all labels, step names, alt text, and aria-labels.
* Replace the language toggle link with the bi-directional AEM language switcher component.
