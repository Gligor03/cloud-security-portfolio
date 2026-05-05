---
title: "Lessons from My First Security Audit"
date: "2026-02-02"
description: "What surprised me, what I would do again, and how I communicate risk without drowning the team."
---

## The goal is shipped fixes

My first instinct was to document *everything*. That creates noise. I learned to **tier findings** and tie each item to a user story or abuse scenario engineers can recognize.

## What worked

- **Repro steps over theory** — short screen recordings and minimal HTTP transcripts.
- **Pairing on fixes** — a 30-minute session resolves ambiguous issues faster than long comment threads.
- **Retest discipline** — closing a finding only after verifying the fix in the environment where it was found.

## What I would improve next time

- Earlier **threat modeling** on the two or three workflows that actually move money or sensitive data.
- Clearer **SLAs** for critical vs informational issues so prioritization is obvious.

Audits are a collaboration. The best outcome is not a long PDF — it is a safer release cadence.
