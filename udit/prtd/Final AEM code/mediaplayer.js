 <link rel="stylesheet" href="https://cdn.design-system.canada.ca/@gcds-core/components@latest/dist/gcds/gcds.css">
<script type="module" src="https://cdn.design-system.canada.ca/@gcds-core/components@latest/dist/gcds/gcds.esm.js"></script>

  
             <script> 
                (function injectCSS() {
                const css = `




 
.journey-glance-band {
  background-color: #ebf2fc;
  padding: 36px 0 40px;
  margin-top: 28px;
}

.journey-glance-card {
  background-color: var(--gcds-bg-white, #ffffff);
  border: 1px solid #dcdee1;
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 0;
}

.journey-glance-boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.journey-glance-box {
  background-color: #ebf2fc;
  border: 0;
  border-radius: 15px;
  padding: 14px 16px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  height: 100%;
}

.journey-glance-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  margin-top: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gcds-color-blue-150, #c2d7f0);
  font-size: 32px;
  line-height: 1;
}

.journey-glance-content {
  flex: 1 1 auto;
  min-width: 0;
}

.journey-glance-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 4px;
  font-size: 1.125rem;
  line-height: 1.3;
  font-weight: 700;
  color: #424242;
  margin: 0 0 4px;
}

.journey-glance-title-group {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.journey-glance-help {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  padding: 0;
  margin: 0 0 0 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  vertical-align: middle;
  border-radius: 50%;
  line-height: 1;
  text-decoration: none;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.journey-glance-help:hover {
  opacity: 0.8;
  transform: scale(1.12);
}

.journey-glance-help:focus {
  outline: 2px solid #0535d2;
  outline-offset: 2px;
}

.journey-glance-help .fa-question-circle { display: inline-block; font-size: 16px; line-height: 1; color: #335075; vertical-align: middle; }

.journey-glance-desc {
  margin: 0;
  line-height: 1.4;
  color: var(--gcds-color-blue-650, #24568f);
  font-weight: 700;
}

.journey-glance-hr {
  display: block;
  width: 100%;
  margin: 24px 0;
  border: 0;
  border-top: 1px solid #d3d5d7;
}

.journey-glance-intro {
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 12px;
}

.journey-glance-band .well ul.list-unstyled li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.journey-glance-band .well ul.list-unstyled li:not(:last-child) {
  margin-bottom: 8px;
}

.journey-check-icon {
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  margin-top: 0.3em;
  color: var(--gcds-color-blue-muted, #26374a);
}

.journey-layout {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  position: relative;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
}

.journey-side {
  flex: 0 0 260px;
  width: 260px;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  z-index: 10;
  padding-right: 18px;
  padding-top: 4px;
  padding-bottom: 12px;
}

.journey-main {
  flex: 1 1 auto;
  max-width: 830px;
  min-width: 0;
}

.journey-subway-header {
  margin-bottom: 16px;
}

.journey-subway-title {
  font-weight: 700;
  color: var(--gcds-color-blue-muted, #26374a);
  margin: 0;
  line-height: 1.3;
}

.journey-stepper {
  background: transparent;
  border: none;
  padding: 0;
}

.journey-stepper-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.journey-step {
  position: relative;
}

.journey-step:last-child {
  padding-bottom: 24px;
}

.journey-step-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  position: relative;
  z-index: 1;
}

.journey-step-btn {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 16px;
  color: #6f6f6f;
  cursor: pointer;
  text-align: left;
  line-height: 1.3;
}

.journey-step-btn:focus-visible {
  outline: 2px solid #0535d2;
  outline-offset: 3px;
  border-radius: 3px;
}

.journey-step-title {
  flex: 1 1 auto;
  font-weight: 700;
}

.journey-step.is-active .journey-step-btn   { color: var(--gcds-color-blue-muted, #26374a); }
.journey-step.is-active .journey-step-title { font-weight: 700; }
.journey-step.is-done   .journey-step-btn   { color: #6f6f6f; }
.journey-step.is-done   .journey-step-title { font-weight: 700; }

.journey-step-chevron {
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  color: #6f6f6f;
}

.journey-step-btn[aria-expanded="true"] .journey-step-chevron::before {
  content: "\\f068";
}

.journey-step.is-active .journey-step-chevron {
  color: var(--gcds-color-blue-muted, #26374a);
}

.journey-step-body {
  padding-left: 0;
  padding-top: 4px;
  padding-bottom: 6px;
  position: relative;
  z-index: 1;
}

.journey-step-body[hidden] {
  display: none !important;
}

html.no-js .journey-step-body[hidden] {
  display: block !important;
}

.journey-sub-card {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: transparent;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 4px;
  text-decoration: none;
  color: #6f6f6f;
  font-size: 15px;
  line-height: 1.35;
}

.journey-sub-card:last-child {
  margin-bottom: 0;
}

.journey-sub-arrow {
  flex-shrink: 0;
  width: 13px;
  height: auto;
  color: var(--gcds-color-blue-muted, #26374a);
  opacity: 0;
  margin-top: 4px;
}

.journey-sub-card:hover,
.journey-sub-card:focus {
  background: transparent;
  text-decoration: none;
  color: #0535d2;
}

.journey-sub-card:hover .journey-sub-arrow,
.journey-sub-card:focus .journey-sub-arrow {
  opacity: 1;
  color: var(--gcds-color-blue-muted, #26374a);
}

.journey-sub-card.is-active,
.journey-sub-card.is-active:hover,
.journey-sub-card.is-active:focus {
  background: var(--gcds-color-blue-50, #ebf2fa);
  color: var(--gcds-color-blue-muted, #26374a);
  font-weight: 700;
}

.journey-sub-card.is-active .journey-sub-arrow {
  opacity: 1;
  color: var(--gcds-color-blue-muted, #26374a);
}

.journey-sub-card:focus-visible {
  outline: 2px solid #0535d2;
  outline-offset: 2px;
}

.journey-stepper-toggle {
  display: none;
  width: 100%;
  padding: 10px 14px;
  background-color: var(--gcds-bg-white, #ffffff);
  border: 1px solid #d3d5d7;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.journey-toggle-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  overflow: hidden;
}

.journey-toggle-parent {
  font-size: 14px;
  font-weight: 600;
  color: var(--gcds-text-secondary, #595959);
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.journey-toggle-label {
  font-size: 18px;
  font-weight: 700;
  color: var(--gcds-color-blue-muted, #26374a);
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.journey-stepper-toggle:hover {
  background-color: #f5f8fa;
  border-color: #284162;
}

.journey-stepper-toggle:focus-visible {
  outline: 2px solid #0535d2;
  outline-offset: 2px;
}

.journey-toggle-caret {
  font-size: 16px;
  color: #6f6f6f;
}

.journey-stepper.is-open .journey-toggle-caret,
.journey-stepper-toggle[aria-expanded="true"] .journey-toggle-caret {
  transform: rotate(180deg);
}

.journey-stage {
  border-bottom: 1px solid #bbbfc5;
  padding-bottom: 28px;
  margin-bottom: 28px;
}

.journey-stage:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.journey-stage > .journey-section:last-child,
.journey-stage > .journey-subsection:last-child {
  padding-bottom: 0;
  margin-bottom: 0;
}

.journey-section,
.journey-subsection {
  scroll-margin-top: 110px;
  padding-bottom: 16px;
  margin-bottom: 8px;
}

.journey-eyebrow,
h2.journey-eyebrow,
.journey-eyebrow.h3 {
  display: block;
  color: #24568f !important;
  margin-top: 0;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  text-transform: none;
}

.journey-stage-h {
  margin-top: 0;
  margin-bottom: 12px;
  color: var(--gcds-color-blue-muted, #26374a);
}

.journey-stage-h.h2 {
  font-size: 2.1875rem;
  line-height: 1.25;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--gcds-color-blue-muted, #26374a);
}

@media (max-width: 767px) {
  .journey-stage-h.h2 {
    font-size: 1.625rem;
    line-height: 1.25;
  }
}

.journey-section .journey-eyebrow + .journey-stage-h,
.journey-subsection .journey-eyebrow + .journey-stage-h,
.journey-section .journey-eyebrow + .journey-stage-h.h2,
.journey-subsection .journey-eyebrow + .journey-stage-h.h2 {
  margin-top: 0;
}

.journey-main .btn-default {
  background-color: transparent;
  border: 1px solid #284162;
  color: #284162;
}

.journey-main .btn-default:hover,
.journey-main .btn-default:focus {
  background-color: var(--gcds-color-blue-50, #ebf2fa);
  color: #284162;
  text-decoration: underline;
  outline: 2px solid #0535d2;
  outline-offset: 2px;
}

@media (max-width: 991px) {
  .journey-layout {
    display: block;
    gap: 0;
  }

  .journey-main {
    width: 100%;
  }

  .journey-subway-header {
    display: none;
  }

  .journey-side:not(.is-sticky) .journey-stepper {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    border: 3px solid var(--gcds-color-blue-muted, #26374a);
    border-radius: 8px;
    margin: 32px 0 24px 0;
    padding: 16px 16px 22px 26px;
    background: var(--gcds-bg-white, #ffffff);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .journey-side:not(.is-sticky)::after {
    content: "";
    display: block;
    width: 100%;
    border-bottom: 1px solid #d8dde3;
    margin: 0 0 32px 0;
  }

  .journey-side:not(.is-sticky) .journey-subway-header {
    display: block;
    position: absolute;
    top: -14px;
    left: -6px;
    background: var(--gcds-bg-white, #ffffff);
    padding: 0 14px 8px 0;
    max-width: calc(100% - 36px);
    z-index: 3;
    border-bottom: none;
  }

  .journey-side:not(.is-sticky) .journey-subway-title,
  .journey-subway-title {
    font-weight: 700;
    color: var(--gcds-color-blue-muted, #26374a);
    line-height: 1.3;
    margin: 0;
    display: block;
  }

  .journey-subway-header::after {
    display: none !important;
  }

  .journey-side {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    max-width: 100%;
    flex: none;
    height: auto;
    background: transparent;
    border: none;
    padding: 0 0 24px;
    max-height: none;
    overflow-y: visible;
  }

  .journey-side.is-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    background: var(--gcds-bg-white, #ffffff);
    border: none;
    border-bottom: 1px solid #d0d5dc;
    padding: 0;
    margin: 0;
    max-width: none;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .journey-side.is-sticky.is-open {
    border-bottom: none !important;
    box-shadow: none !important;
  }

  .journey-side.is-sticky .journey-stepper {
    position: relative;
    border: none;
    border-radius: 0;
    margin: 0;
    padding: 0;
    background: transparent;
  }

  .journey-stepper-toggle {
    display: none;
  }

  .journey-side.is-sticky .journey-stepper-toggle {
    display: flex;
    width: 100%;
    padding: 12px 16px;
    background: transparent;
    border: none;
    border-radius: 0;
    margin-bottom: 0;
    min-height: 52px;
    align-items: center;
    justify-content: space-between;
  }

  .journey-side.is-sticky .journey-stepper.is-open .journey-stepper-toggle {
    position: relative;
    z-index: 1002;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.18);
    border-bottom: none !important;
    background: var(--gcds-bg-white, #ffffff) !important;
    padding-bottom: 8px !important;
  }

  .journey-side.is-sticky .journey-stepper-toggle:hover {
    background-color: transparent;
  }

  #journey-steplist {
    display: block;
  }

  .journey-side:not(.is-sticky) #journey-steplist {
    clear: both;
    margin: 0;
    padding: 4px 0 0 0;
    list-style: none;
    border: none;
  }

  .journey-side.is-sticky #journey-steplist {
    display: none;
  }

  .journey-side.is-sticky .journey-stepper.is-open #journey-steplist {
    display: block !important;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--gcds-bg-white, #ffffff);
    border-top: none !important;
    border-bottom: 2px solid var(--gcds-color-blue-muted, #26374a);
    border-radius: 0 0 10px 10px;
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.2);
    
    clip-path: inset(0 -60px -60px);
    max-height: 65vh;
    overflow-y: auto;
    padding: 0 15px 12px 15px !important;
    z-index: 1001;
  }

.journey-side.is-sticky .journey-stepper.is-open .journey-step-row {
    min-height: 40px !important;
    padding: 5px 0 !important;
  }

  .journey-side.is-sticky .journey-stepper.is-open .journey-step-btn {
    min-height: 44px !important;
    font-size: 18px !important;
  }

  .journey-side.is-sticky .journey-stepper.is-open .journey-sub-card {
    min-height: 42px !important;
    padding: 8px 12px !important;
    margin-bottom: 3px !important;
    font-size: 17px !important;
    line-height: 1.4 !important;
  }

  .journey-side.is-sticky .journey-stepper.is-open .journey-step-body {
    padding-left: 0 !important;
    padding-top: 2px !important;
    padding-bottom: 4px !important;
  }

.journey-side.is-sticky .journey-stepper.is-open .journey-step-body:not([hidden]) {
    display: block !important;
  }

  .journey-side:not(.is-sticky) .journey-step {
    padding-bottom: 0;
    position: relative;
  }

  .journey-side:not(.is-sticky) .journey-step-row {
    padding: 8px 0;
    min-height: 44px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .journey-side:not(.is-sticky) .journey-step-btn {
    font-size: 18px;
    color: #6f6f6f;
    text-decoration: none;
    cursor: pointer;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    line-height: 1.35;
    background: transparent;
    border: none;
    padding: 0;
  }

  .journey-side:not(.is-sticky) .journey-step-btn:hover,
  .journey-side:not(.is-sticky) .journey-step-btn:focus {
    color: #0535d2;
    text-decoration: none;
  }

  .journey-side:not(.is-sticky) .journey-step.is-active .journey-step-btn {
    color: var(--gcds-color-blue-muted, #26374a);
    font-weight: 700;
    text-decoration: none;
  }

  .journey-side:not(.is-sticky) .journey-step-title {
    color: inherit;
    font-weight: 700;
    text-decoration: inherit;
  }

  .journey-side:not(.is-sticky) .journey-step-chevron {
    display: inline-flex !important;
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    color: #6f6f6f;
    cursor: pointer;
    margin-left: auto;
    padding: 3px;
  }

  .journey-side:not(.is-sticky) .journey-step.is-active .journey-step-chevron {
    color: var(--gcds-color-blue-muted, #26374a);
  }

  .journey-side:not(.is-sticky) .journey-step-body {
    display: none !important;
    padding-left: 0;
    padding-top: 4px;
    padding-bottom: 8px;
    position: relative;
    z-index: 1;
  }

  .journey-side:not(.is-sticky) .journey-step-body.is-expanded,
  .journey-side:not(.is-sticky) .journey-step.is-expanded .journey-step-body {
    display: block !important;
  }

  .journey-side:not(.is-sticky) .journey-sub-card {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: transparent;
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 3px;
    min-height: 42px;
    color: #6f6f6f;
    font-size: 17px;
    line-height: 1.4;
    text-decoration: none;
  }

  .journey-side:not(.is-sticky) .journey-sub-card:hover,
  .journey-side:not(.is-sticky) .journey-sub-card:focus {
    background: transparent;
    text-decoration: none;
    color: #0535d2;
  }

  .journey-side:not(.is-sticky) .journey-sub-arrow {
    display: inline-flex;
    flex-shrink: 0;
    width: 14px;
    height: auto;
    color: var(--gcds-color-blue-muted, #26374a);
    opacity: 0;
    margin-top: 4px;
  }

  .journey-side:not(.is-sticky) .journey-sub-card:hover .journey-sub-arrow,
  .journey-side:not(.is-sticky) .journey-sub-card:focus .journey-sub-arrow {
    opacity: 1;
  }

  .journey-side:not(.is-sticky) .journey-sub-card.is-active,
  .journey-side:not(.is-sticky) .journey-sub-card.is-active:hover,
  .journey-side:not(.is-sticky) .journey-sub-card.is-active:focus {
    background: var(--gcds-color-blue-50, #ebf2fa);
    color: var(--gcds-color-blue-muted, #26374a);
    font-weight: 700;
    text-decoration: none;
  }

  .journey-side:not(.is-sticky) .journey-sub-card.is-active .journey-sub-arrow {
    opacity: 1;
    color: var(--gcds-color-blue-muted, #26374a);
  }

  .journey-section,
  .journey-subsection {
    scroll-margin-top: 60px;
  }

  .journey-glance-band {
    padding: 24px 0 32px;
    margin-top: 24px;
  }

  .journey-glance-boxes {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .journey-glance-card {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .journey-glance-band {
    padding: 20px 0 28px;
  }

  .journey-glance-card {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 16px;
  }

  .journey-glance-boxes {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .journey-glance-box {
    padding: 12px 14px;
    border-radius: 12px;
    gap: 14px;
  }

  .journey-glance-hr {
    margin: 20px auto;
  }

  .journey-glance-band .well ul.list-unstyled li {
    gap: 10px;
  }

  .journey-stepper-toggle {
    min-height: 52px;
    padding: 12px 16px;
  }

  .journey-step-row {
    min-height: 48px;
    padding: 2px 0;
  }

  .journey-step-btn {
    min-height: 44px;
    padding: 2px 0;
  }

  .journey-sub-card {
    min-height: 42px;
    padding: 8px 12px;
    font-size: 17px;
    align-items: flex-start;
  }

  .journey-main {
    overflow-wrap: break-word;
  }
}

@media (min-width: 992px) {
  .journey-layout {
    margin-top: 39px;
  }

  .journey-stage:not(:last-child) {
    padding-bottom: 28px;
    margin-bottom: 28px;
  }

  .journey-section,
  .journey-subsection {
    padding-bottom: 24px;
    margin-bottom: 16px;
  }

  .journey-stage > .journey-section:last-child,
  .journey-stage > .journey-subsection:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .journey-glance-band {
    padding: 50px 0;
  }

  .journey-glance-card {
    display: grid;
    grid-template-columns: minmax(0, 504px) minmax(0, 543px);
    column-gap: 30px;
    row-gap: 14px;
    align-items: start;
    padding: 30px;
  }

  .journey-glance-intro {
    grid-column: 1;
    grid-row: 1;
    align-self: start;
    margin-bottom: 0;
    font-size: 20px;
    line-height: 33px;
  }

  .journey-glance-card > ul {
    grid-column: 1;
    grid-row: 2;
    align-self: start;
    font-size: 20px;
    line-height: 33px;
  }

  .journey-glance-boxes {
    grid-column: 2;
    grid-row: 1 / span 2;
    grid-template-columns: minmax(0, 323px) minmax(0, 195px);
    gap: 25px;
    align-content: start;
  }

  .journey-glance-box {
    min-height: 104px;
    padding: 20px;
    align-items: center;
    gap: 20px;
    background-color: #ebf2fc;
    border: 0;
    border-radius: 12px;
  }

  .journey-glance-content {
    order: 1;
  }

  .journey-glance-icon {
    order: 2;
    width: 58px;
    flex: 0 0 58px;
    margin: 0 0 0 auto;
    font-size: 60px;
  }

  .journey-glance-icon--clock {
    height: 60px;
  }

  .journey-glance-icon--check {
    height: 60px;
  }

  .journey-glance-icon--dollar {
    height: 60px;
  }

  .journey-glance-title {
    color: #424242;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 10px;
    white-space: nowrap;
    flex-wrap: nowrap;
  }

  .journey-glance-desc {
    color: #24568f !important;
    font-family: Lato, sans-serif;
    font-size: 29px;
    font-weight: 700;
    line-height: 1.15;
  }

  .journey-glance-hr {
    display: none;
  }

  .journey-layout::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 260px;
    border-left: 1px solid #bbbfc5;
    pointer-events: none;
  }

  .journey-step:last-child {
    padding-bottom: 0;
  }

  .journey-step-row {
    gap: 0;
  }

  .journey-step-chevron {
    display: none;
  }

  .journey-step-body {
    padding-left: 0;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .journey-glance-card {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 24px;
    padding: 24px 20px;
  }

  .journey-glance-boxes {
    grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
    gap: 12px;
  }

  .journey-glance-box {
    padding: 12px 10px;
    gap: 10px;
  }

  .journey-glance-title {
    font-size: 1.05rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html,
  .journey-side {
    scroll-behavior: auto;
  }

  .journey-glance-help {
    transition: none;
  }
}

@media print {
  .journey-side {
    display: none !important;
  }

  .journey-layout {
    display: block !important;
  }

  .journey-main {
    width: 100% !important;
  }

  .journey-glance-band {
    background-color: transparent !important;
    padding: 0 !important;
  }
}
      `;
                const style = document.createElement('style');
                style.textContent = css;
                document.head.appendChild(style);
                })();

                </script>

<script>
(function () {
  "use strict";

  if (window.Granite && window.Granite.author) {
    return;
  }

  document.documentElement.classList.remove("no-js");

  var stepItems = Array.prototype.slice.call(document.querySelectorAll(".journey-step"));

  function getDocTop(el) {
    if (!el) return 0;
    return el.getBoundingClientRect().top + window.scrollY;
  }

  var flat = [];
  stepItems.forEach(function (stepEl, mi) {
    var mainId = stepEl.dataset.target || "";
    var subCards = Array.prototype.slice.call(stepEl.querySelectorAll(".journey-sub-card"));

    if (subCards.length > 0) {
      subCards.forEach(function (card) {
        var href = card.getAttribute("href") || "";
        var id = href.replace(/^#/, "");
        flat.push({
          id: id,
          sec: document.getElementById(id),
          main: mi,
          navMain: stepEl,
          navCard: card
        });
      });
    } else {
      flat.push({
          id: mainId,
          sec: document.getElementById(mainId),
          main: mi,
          navMain: stepEl,
          navCard: null
      });
    }
  });

  var toggleParent = document.getElementById("journey-toggle-parent");
  var toggleLbl = document.getElementById("journey-toggle-label");
  var stepper = document.querySelector(".journey-stepper");
  var side = document.querySelector(".journey-side");
  var toggleBtn = document.getElementById("journey-stepper-toggle");
  var allSubCards = Array.prototype.slice.call(document.querySelectorAll(".journey-sub-card"));
  var currentFlat = -1;

  var reducedMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  function getScrollBehavior() {
    return reducedMotionQuery && reducedMotionQuery.matches ? "auto" : "smooth";
  }

  function scrollTargetIntoView(target) {
    if (!target) return;
    closeMenu();

    if (window.innerWidth < 992 && side) {
      side.classList.add("is-sticky");
    }

    var offset = 30;
    if (window.innerWidth < 992) {
      offset = 60;
    }

    var targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
    if (targetTop < 0) targetTop = 0;

    window.scrollTo({
      top: targetTop,
      behavior: getScrollBehavior()
    });
  }

function setActive(fi) {
    if (fi < 0) fi = 0;
    if (fi >= flat.length) fi = flat.length - 1;
    if (fi === currentFlat) return;
    currentFlat = fi;
    var act = flat[fi];
    if (!act) return;

    stepItems.forEach(function (s, i) {
      var isActive = (i === act.main);
      var isDone = (i < act.main);
      s.classList.toggle("is-active", isActive);
      s.classList.toggle("is-done", isDone);
    });

    allSubCards.forEach(function (card) {
      card.classList.remove("is-active");
      card.removeAttribute("aria-current");
    });
    if (act.navCard) {
      act.navCard.classList.add("is-active");
      act.navCard.setAttribute("aria-current", "location");
    }

    if (act.navMain) {
      var titleEl = act.navMain.querySelector(".journey-step-title");
      var stageName = titleEl ? titleEl.textContent.trim() : "";
      var subName = act.navCard ? act.navCard.textContent.trim() : stageName;

      if (toggleParent) {
        toggleParent.textContent = stageName;
      }
      if (toggleLbl) {
        toggleLbl.textContent = subName;
      }
    }

    if (window.innerWidth >= 992) {
      scrollActiveNavIntoView(act.navCard, act.navMain, act.main);
    }
  }

  function scrollActiveNavIntoView(activeCard, activeStepEl, actMain) {
    if (window.innerWidth < 992 || !side) return;

    if (actMain < 2 && side.clientHeight >= 300) {
      if (side.scrollTop > 0) {
        side.scrollTo({
          top: 0,
          behavior: getScrollBehavior()
        });
      }
      return;
    }

    if (actMain === 0) {
      if (side.scrollTop > 0) {
        side.scrollTo({
          top: 0,
          behavior: getScrollBehavior()
        });
      }
      return;
    }

    var sideRect = side.getBoundingClientRect();
    var cardRect = activeCard ? activeCard.getBoundingClientRect() : null;
    var stepRect = activeStepEl ? activeStepEl.getBoundingClientRect() : cardRect;

    if (!cardRect) return;

    var bottomOverflow = cardRect.bottom - (sideRect.bottom - 24);
    if (bottomOverflow > 0) {
      side.scrollBy({
        top: bottomOverflow,
        behavior: getScrollBehavior()
      });
      return;
    }

    var topBoundary = stepRect ? stepRect.top : cardRect.top;
    var topOverflow = (sideRect.top + 24) - topBoundary;
    if (topOverflow > 0) {
      side.scrollBy({
        top: -topOverflow,
        behavior: getScrollBehavior()
      });
    }
  }

  function ensureActiveStepExpandedInSticky() {

    stepItems.forEach(function (s) {
      var body = s.querySelector(".journey-step-body");
      var btn = s.querySelector(".journey-step-btn");
      if (!body || !btn) return;

      body.removeAttribute("hidden");
      body.classList.add("is-expanded");
      s.classList.add("is-expanded");
      btn.setAttribute("aria-expanded", "true");
    });
  }

  function closeMenu() {
    if (!stepper || !toggleBtn) return;
    stepper.classList.remove("is-open");
    if (side) side.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    if (window.innerWidth < 992) {
      collapseAllMobileSteps();
    }
  }

  var manualToggleScrollY = null;
  if (toggleBtn && stepper) {
    toggleBtn.addEventListener("click", function () {
      var open = stepper.classList.toggle("is-open");
      if (side) side.classList.toggle("is-open", open);
      this.setAttribute("aria-expanded", open ? "true" : "false");
      manualToggleScrollY = open ? window.scrollY : null;
      if (open) {
        ensureActiveStepExpandedInSticky();
      } else if (window.innerWidth < 992) {
        collapseAllMobileSteps();
      }
    });

    document.addEventListener("click", function (e) {
      if (stepper.classList.contains("is-open") && !stepper.contains(e.target)) {
        closeMenu();
        manualToggleScrollY = null;
      }
    });

    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.keyCode === 27) && stepper.classList.contains("is-open")) {
        closeMenu();
        manualToggleScrollY = null;
        toggleBtn.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) {
        closeMenu();
        if (side) side.classList.remove("is-sticky");
        initStepperState();
      } else {
        if (!side || !side.classList.contains("is-sticky") || !stepper.classList.contains("is-open")) {
          collapseAllMobileSteps();
        }
      }
    });
  }

  function collapseAllMobileSteps() {
    if (window.innerWidth < 992) {
      stepItems.forEach(function (stepEl) {
        var btn = stepEl.querySelector(".journey-step-btn");
        var body = stepEl.querySelector(".journey-step-body");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (body) {
          body.setAttribute("hidden", "");
          body.classList.remove("is-expanded");
        }
        stepEl.classList.remove("is-expanded");
      });
    }
  }

  function initStepperState() {
    if (window.innerWidth >= 992) {

      stepItems.forEach(function (stepEl) {
        var btn = stepEl.querySelector(".journey-step-btn");
        var body = stepEl.querySelector(".journey-step-body");
        if (btn) btn.setAttribute("aria-expanded", "true");
        if (body) {
          body.removeAttribute("hidden");
          body.classList.remove("is-expanded");
        }
        stepEl.classList.remove("is-expanded");
      });
    } else {
      collapseAllMobileSteps();
    }
  }

  initStepperState();

  stepItems.forEach(function (stepEl, mi) {
    var btn = stepEl.querySelector(".journey-step-btn");
    var body = stepEl.querySelector(".journey-step-body");
    if (!btn || !body) return;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = stepEl.dataset.target;

      if (window.innerWidth < 992) {
        var isExpanded = this.getAttribute("aria-expanded") === "true" || body.classList.contains("is-expanded");
        var nowOpen = !isExpanded;
        this.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        if (nowOpen) {
          body.removeAttribute("hidden");
          body.classList.add("is-expanded");
          stepEl.classList.add("is-expanded");
        } else {
          body.setAttribute("hidden", "");
          body.classList.remove("is-expanded");
          stepEl.classList.remove("is-expanded");
        }
        return;
      }

      if (targetId) {
        var target = document.getElementById(targetId);
        if (target) {
          closeMenu();
          scrollTargetIntoView(target);
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          for (var i = 0; i < flat.length; i++) {
            if (flat[i].id === targetId || flat[i].main === mi) {
              setActive(i);
              break;
            }
          }
          currentFlat = -1;
          setTimeout(onScroll, 400);
        }
      }
    });

  });

  function onScroll() {
    var isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
    var fi = 0;

    if (isAtBottom) {
      fi = flat.length - 1;
    } else {
      var probeOffset = (window.innerWidth < 992) ? 120 : 100;
      for (var i = flat.length - 1; i >= 0; i--) {
        var sec = flat[i].sec;
        if (sec) {
          var top = sec.getBoundingClientRect().top;
          if (top <= probeOffset) {
            fi = i;
            break;
          }
        }
      }
    }

    setActive(fi);

    if (window.innerWidth >= 992) {
      if (side && side.scrollTop > 0) {
        var firstSecEl = flat.length > 0 ? flat[0].sec : null;
        var firstSecTop = firstSecEl ? getDocTop(firstSecEl) : 800;
        if (window.scrollY < firstSecTop - 50) {
          side.scrollTo({ top: 0, behavior: getScrollBehavior() });
        }
      }
    }

    if (window.innerWidth < 992 && stepper && toggleBtn) {
      var firstSec = flat.length > 0 ? flat[0].sec : null;
      var collapseThreshold = firstSec ? (getDocTop(firstSec) - 60) : 600;

      if (window.scrollY >= collapseThreshold) {
        if (side) side.classList.add("is-sticky");
        if (manualToggleScrollY !== null) {
          if (Math.abs(window.scrollY - manualToggleScrollY) > 30) {
            manualToggleScrollY = null;
            closeMenu();
          }
        } else {
          closeMenu();
        }
      } else {
        if (side) {
          side.classList.remove("is-sticky");
          side.classList.remove("is-open");
        }
        manualToggleScrollY = null;
        closeMenu();
      }
    }
  }

  var subCardLinks = Array.prototype.slice.call(document.querySelectorAll(".journey-sub-card"));
  subCardLinks.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (!href || href === "#") return;
      var targetId = href.slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        closeMenu();
        scrollTargetIntoView(target);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        for (var i = 0; i < flat.length; i++) {
          if (flat[i].id === targetId) {
            setActive(i);
            break;
          }
        }
      }
    });
  });

  var ticking = false;
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onScroll);
  } else {
    onScroll();
  }
})();
</script>
