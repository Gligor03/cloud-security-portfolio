---
title: "How I Built a Secure AWS VPC"
date: "2026-03-12"
description: "A practical walkthrough of subnets, routing, and the controls that actually matter on day one."
---

## Why VPC design is security design

A VPC is not just networking — it is the blast-radius boundary for most AWS workloads. I start from **data classification** and **trust zones**, then map subnets and security groups to those zones.

## What I optimized for

- **Least exposure**: Only what must be on the internet gets a public path.
- **Operational access**: Prefer SSM Session Manager over wide-open SSH.
- **Egress control**: Private subnets with NAT (or alternatives) so outbound traffic is intentional.

## Lessons I keep reusing

1. **Security groups are stateful friends** — but they are not a replacement for application authorization.
2. **Tags pay rent** — cost and ownership tags make incidents less painful.
3. **Diagrams are contracts** — if the diagram and Terraform disagree, Terraform wins — and production hurts.

This foundation makes later additions (ALB, ECS, RDS) much safer because the defaults are already conservative.
