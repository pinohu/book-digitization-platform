# Suggested Playbook: 90-Day Launch (Non-binding)

## Week 1: Foundation (Days 1-7)
*Goal: Transition from "Foundation" (Manual) to a deployable, demo-ready state.*

* **Day 1: User Onboarding Implementation:** Build and integrate `onboard.html` (or equivalent Next.js route) to guide users from auth to first upload. Map flow to `src/app/[locale]/(auth)/dashboard/page.tsx`.
* **Day 2: Data Readiness:** Execute existing seed scripts to populate the environment for demoing. Verify data integrity against `docs/DATA-MODEL.md`.
* **Day 3: Quality Assurance:** Run the full test suite (referencing "Has tests: yes") to ensure `backend/main.py` and frontend components are production-stable.
* **Day 4: Identity & Infrastructure:** Finalize branding and domain mapping. Configure production `.env` based on `.env.example`. Verify `backend/Dockerfile` and `docker-compose.yml` for cloud deployment.
* **Day 5: Communication Setup:** Configure professional email and domain-based messaging as outlined in `BUSINESS-SYSTEM.md`.
* **Day 6: Soft Launch (Internal):** Deploy to a staging environment. Perform manual "smoke tests" on the digitization pipeline.
* **Day 7: Soft Launch (Beta):** Invite 5-10 trusted testers to use the platform; monitor logs for immediate `FAILURE-MODES.md` triggers.

## Weeks 2-4: Validation (Days 8-28)
*Goal: Validate the $5/book transactional model and collect qualitative feedback.*

* **User Acquisition:** Execute the initial phase of the social media calendar defined in `GTM-PLAYBOOK.md`.
* **Analytics Deployment:** Integrate tracking in `src/app/layout.tsx` to monitor conversion from `src/templates/Hero.tsx` to successful digitization.
* **Integration Verification:** Test the "Standard Integrations" (currently deferred) to ensure the API remains compliant with `docs/API-CONTRACTS.md`.
* **Feedback Loop:** Implement a direct feedback mechanism. Cross-reference user complaints with `FAILURE-MODES.md` to identify product gaps.
* **Manual Provisioning Audit:** Track how much time is spent on manual "Foundation" tasks to calculate true margin per book (target: $5/book).

## Weeks 5-8: Growth (Days 29-56)
*Goal: Generate first revenue and optimize conversion.*

* **Revenue Activation:** Enable the transactional payment gateway. Monitor volume against `REVENUE-MODEL.md`.
* **Module Activation:** Begin implementing "Deferred Modules" identified in `ROADMAP.md` (e.g., advanced OCR or bulk processing).
* **Conversion Optimization (A/B Testing):** Test different value propositions in `src/templates/Hero.tsx` and `src/templates/Pricing.tsx` to lower Customer Acquisition Cost (CAC).
* **Social Proof Accumulation:** Capture testimonials from Week 2-4 users to update `src/app/[locale]/(marketing)/page.tsx`.
* **SEO Foundation:** Optimize metadata and content structure based on `docs/KB-OUTLINES.md` to drive organic traffic.

## Weeks 9-12: Scale (Days 57-90)
*Goal: Prepare for Enterprise tier ($9,997) and automate operations.*

* **Enterprise Readiness:** Prepare documentation and sales collateral for the $9,997 tier as outlined in `INVESTOR-READINESS.md` and `SBA-BUSINESS-PLAN.md`.
* **Automation Transition:** Move from manual provisioning to auto-provisioning by leveraging the `AGENT-SYSTEM.md` and `AGENTS.md` logic.
* **Hiring Signals:** If volume exceeds manual capacity, trigger hiring workflows defined in `SBA-BUSINESS-PLAN.md`.
* **Tier Upgrade Triggers:** Identify high-volume transactional users for conversion to Enterprise capacity.
* **90-Day Retrospective:** Review actual vs. projected revenue from `REVENUE-MODEL.md` and update `ROADMAP.md` for the next quarter.

## Key Files Reference

| Action Item | Specific Repo File / URL |
| :--- | :--- |
| **Onboarding Flow** | `src/app/[locale]/(auth)/dashboard/page.tsx` & `onboard.html` |
| **Go-To-Market Strategy** | `GTM-PLAYBOOK.md` |
| **Feature Roadmap** | `ROADMAP.md` |
| **Revenue/Pricing Logic** | `REVENUE-MODEL.md` & `src/templates/Pricing.tsx` |
| **Technical Architecture** | `DESIGN.md` & `docs/DATA-MODEL.md` |
| **API/Integration Specs** | `docs/API-CONTRACTS.md` |
| **Risk/Error Management** | `FAILURE-MODES.md` |
| **Business Scaling/Hiring** | `SBA-BUSINESS-PLAN.md` |
| **Automation Logic** | `AGENT-SYSTEM.md` & `AGENTS.md` |

## Upgrade Triggers

* **Volume Trigger:** When a single user/entity exceeds 200 books/month (potential Enterprise candidate).
* **Integration Trigger:** When users request "Standard Integrations" that are currently listed as "Deferred" in `ROADMAP.md`.
* **Complexity Trigger:** When users require custom workflows that deviate from `SPEC.md`, requiring the $9,997 Enterprise capacity.
* **Operational Trigger:** When manual provisioning time exceeds 15% of total weekly labor (signals need for `AGENT-SYSTEM.md` automation).