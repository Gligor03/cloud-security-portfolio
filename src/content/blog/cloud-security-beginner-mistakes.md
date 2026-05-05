---
title: "Beginner Mistakes in Cloud Security"
date: "2026-01-18"
description: "A short list of sharp edges I stepped on early — and the habits that replaced them."
---

## Mistake: wide IAM policies "for now"

Temporary permissions have a habit of becoming permanent. I now default to **scoped actions and resources**, and I treat policy review as part of code review.

## Mistake: trusting the UI defaults

Defaults optimize for speed, not your threat model. I document **explicit choices** for encryption, public access blocks, and logging — even when the default looks fine.

## Mistake: monitoring without ownership

Dashboards without on-call ownership are wallpaper. Every alert should have a **named owner** and a **runbook link**.

## The habit that helped most

**Small, frequent hardening** beats rare "big bang" changes. Weekly 30-minute improvements compound.
