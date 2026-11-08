---
layout: ../../layouts/PostLayout.astro
title: Turning SRE Workflows into Agent Skills
description: Three reusable agent skills for incident investigation, infrastructure security reviews, and right-sizing—with evidence at the center.
date: "2026-10-20"
category: Reliability
---

I recently created three agent skills for work that comes up repeatedly in SRE: investigating incidents, reviewing infrastructure security, and figuring out whether resources are sized correctly.

The skills are called `investigate`, `harden`, and `right-size`. Each lives in a directory with a `SKILL.md` file that describes when to use it, what evidence to collect, how to evaluate that evidence, and what the final report should contain.

The interesting part is deciding what an agent needs to check before it can make a useful recommendation.

## Encoding the workflow

A prompt like “investigate this alert” leaves a lot of decisions open. Which environment? What time window? Is the previous day a useful baseline? Does the current cluster state tell us anything about an incident that happened last week?

A skill makes those decisions explicit and reusable. It gives the agent a sequence to follow, including the cases where the correct answer is “I couldn't verify that.”

All three skills start by discovering the available tools and confirming access. They are written around operations—query metrics, inspect configuration, retrieve instance specifications—rather than assuming one particular vendor. AWS and Kubernetes examples provide concrete starting points, while the workflow allows equivalent tools on other platforms.

That portability is a design goal. The actual coverage of a run still depends on the tools, permissions, and data available in that environment.

## Investigate: build a timeline before a theory

`investigate` takes an alert, dashboard link, incident channel, or plain description and works toward a UTC timeline with ranked hypotheses.

An example invocation, using a fictional service:

```text
/investigate Why did checkout latency spike around 14:20 UTC today?
```

The workflow establishes scope, checks known issues, and gathers evidence from metrics, logs, orchestration state, deploy history, cloud services, and incident discussions where available.

Several details matter:

- **Use the alert's actual query.** Metric names and labels should come from discovery, not guesses.
- **Check the baseline.** Yesterday may have had the same incident. A recurring symptom changes the investigation.
- **Separate historical evidence from current state.** Healthy pods now do not establish that there were no restarts during the incident.
- **Treat chat explanations as hypotheses.** A responder's theory needs to be checked against the data.

The skill also asks whether a problem follows one particular release or the rollout process itself. If bursts occur across different application versions, connection churn, cold starts, or scaling behavior may deserve attention before a code diff.

The output includes evidence for and against each hypothesis, plus the checks that could not be completed. It gathers evidence and suggests next steps; it does not restart workloads or roll back deployments.

## Harden: verify findings in context

`harden` reviews infrastructure security across network exposure, identity, cloud configuration, Kubernetes, hosts, images, dependencies, secrets, and CI/CD.

```text
/harden Review this cluster's security posture
```

Its default is passive, read-only inspection of authorized infrastructure. It starts with available provider findings and configuration checks, then uses scanners where available. Active probing requires explicit approval.

The important step comes after collecting candidates: verification.

A security group with an open database port deserves investigation, but is it attached to anything? Does the resource have an internet route? Is a bucket intended to serve public assets? Is a privileged pod an application workload or an expected system component?

Those distinctions affect the finding and its priority. The skill asks the agent to check compensating controls, de-duplicate reports from different tools, and rank findings by exposure, impact, and exploitability.

Each finding should identify the evidence, the recommended fix, and where that change belongs in infrastructure-as-code. Unclear intent becomes an owner-confirmation question. Reports stay local, and secret values are redacted.

## Right-size: low CPU is only the beginning

`right-size` compares provisioned capacity with historical utilization across compute instances, databases, caches, and Kubernetes resources.

```text
/right-size Are our production databases oversized?
```

It defaults to a 30-day lookback and requires at least 14 days of data. It examines p95, p99, and maximum utilization, with attention to workload cycles and peaks outside the observed window.

CPU is only one dimension. A smaller instance may also have less memory, lower network bandwidth, lower storage throughput, or fewer available database connections. A recommendation has to account for those constraints together.

The workflow also checks failover responsibilities and financial commitments. An idle standby may need to carry the full production load. A lower on-demand price may not translate into immediate savings if a reservation remains committed.

Instance specifications and prices must come from retrieved data. Missing memory metrics mean “not measured.” Missing prices mean “price not retrieved.” If a necessary dimension is unavailable, the verdict is insufficient data.

The final report recommends changes and identifies where to make them, with under-provisioned resources prioritized ahead of potential savings.

## The shared design

Across all three skills, the same structure keeps showing up:

1. Discover the tools and confirm the scope.
2. Gather observations before drawing conclusions.
3. Verify the important candidates against context.
4. Report evidence, recommendations, and gaps together.

An empty query result is a good example of why this matters. It might mean nothing happened. It might also mean the wrong account, expired credentials, missing labels, or expired retention. The skills explicitly ask the agent to check those possibilities.

These instructions do not guarantee a correct result. They do make the expected reasoning and evidence easier to inspect. A useful report should let another engineer trace a recommendation back to the observations that support it—and see where the investigation stopped.

That's the goal of these skills: make the repeatable parts of SRE work explicit enough for an agent to follow, and concrete enough for an engineer to review.
