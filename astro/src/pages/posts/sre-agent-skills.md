---
layout: ../../layouts/PostLayout.astro
title: SRE Agent Skills
description: Reusable agent workflows for incident investigation, security reviews, and right-sizing.
date: "2026-10-20"
category: Reliability
---

I put three recurring SRE workflows into reusable agent skills:

- [**investigate**](https://github.com/jpenagg/sre-agent-skills/tree/main/investigate) — Gather incident evidence, build a timeline, and rank possible causes.
- [**harden**](https://github.com/jpenagg/sre-agent-skills/tree/main/harden) — Review infrastructure security and prioritize findings with remediation guidance.
- [**right-size**](https://github.com/jpenagg/sre-agent-skills/tree/main/right-size) — Compare resource usage with provisioned capacity and recommend sizing changes.

Each skill is a `SKILL.md` file that tells an agent what to check, what evidence to collect, and how to report the results. They use the available tools and data, call out what couldn't be verified, and recommend changes rather than apply them.

The full workflows and setup instructions are on GitHub:

[**View SRE Agent Skills on GitHub ↗**](https://github.com/jpenagg/sre-agent-skills)
