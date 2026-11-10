---
layout: ../../layouts/PostLayout.astro
title: What is Site Reliability Engineering?
description: A concise overview of SRE, responsibilities, and useful resources.
date: "2020-02-01"
category: Reliability
---

Site Reliability Engineering applies software engineering to running reliable services. The work includes defining reliability targets, making deployments safer, responding to incidents, and reducing repetitive operational work.

## Core principles

SRE is about creating reliability through engineering. That usually means:

- **Service level indicators (SLIs) and objectives (SLOs)** to measure user-facing reliability and set targets
- **Error budgets** to use those targets to guide release and reliability decisions
- **Reducing toil** to eliminate repetitive operational work through engineering
- **Learning from incidents** to improve systems and processes without blaming individuals

## Common responsibilities

Responsibilities vary by team, but commonly include:

- Designing and maintaining resilient systems
- Observability (metrics, logs, tracing) and actionable alerting
- Incident response and post‑incident reviews
- Capacity planning and performance optimization
- Improving developer experience and deployment safety

## Further reading

- [Introduction to SRE — Ben Treynor Sloss](https://sre.google/sre-book/introduction/) — origins and core practices.
- [Implementing SLOs](https://sre.google/workbook/implementing-slos/) — reliability targets and error budgets.
- [Designing Data-Intensive Applications — Martin Kleppmann](https://dataintensive.net/) — distributed systems and reliability trade-offs.
- [Systems Performance — Brendan Gregg](https://www.brendangregg.com/systems-performance-2nd-edition-book.html) — diagnosing performance problems and bottlenecks.
- [Amazon Builders’ Library](https://aws.amazon.com/builders-library/) — technical articles on retries, timeouts, overload, and operating distributed systems.
