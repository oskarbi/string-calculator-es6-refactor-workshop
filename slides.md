# Software economics

The good stuff is here:

[![The good stuff](https://img.youtube.com/vi/wn_z9aV3Kzo/0.jpg)](https://www.youtube.com/watch?v=wn_z9aV3Kzo)

## Discover vs. deliver

| Discover | Deliver |
| -------- | ------- |
| pair/mob programming | remote work |
| ideas | features |
| divergent | convergent |
| iterate questions | iterate answers |
| options | actions |
| spike/prototype/rewrite | refactor/maintain |
| manual | automated |
| explore | bottlenecks |
| unknown unknowns | already done in production |
| less done, less waste | mode done, more value |
| bugs not important | bugs are critical |

## What does Business need?

|     |     |
| --- | --- |
| Early delivery of **value**, | ROI / Time to market<br>Risk reduction<br>Hypothesis validation<br>Stakeholders shared vision |
| with the lowest possible **cost**, |  |
| keeping options open, | So that **risk** is reduced<br>To face uncertainty with better odds |
| with **debt** under control | To avoid being unable to pay it off in the future |

- Speak the same language: economics
- Share a common goal
- Give options to change, abandon, postpone or grow

## Why so much effort on keeping cost under control?

![Cost, value, risk & debt](images/cost-value-risk-debt.png)

- Cost is not always the most important thing

## Waterfall vs iterative-incremental development

![Waterfall cost-value burnup](images/waterfall-cost-value-burnup.png)
![Iterative-incremental cost-value burnup](images/iterative-incremental-cost-value-burnup.png)

## Challenges - Code economics

- Vertical slicing

![First feature cost vs. last](images/first-feature-cost-vs-last.png)

The cost of software is the cost of evolving software

## Challenges - Testing

- Automatization

![Manual testing problem](images/manual-testing-problem.png)

## Design as an economic team activity

Some examples: 

|     |     |     |
| --- | --- | --- |
| Risk driven | - Architecture<br>- Knowledge sharing | Do we need a cache to face new users?<br>Only Jow knows about this. What if he leaves? |
| Debt driven | - Refactoring | We got to the demo, but this crap won't be easy to grow |
| Cost driven | - **Software Design**<br>- Delivery automation | We only need to add the aggregate total on screen, but changing that will require changing half the app |
| Value driven | - Discovering big impact features | This feature is what's going to get us ahead |

- Software design mainly lets us manage the **cost**

![Cost of coding](images/cost-of-coding.png)

- Tightly related to coupling and cohesion! 

![Economies of scale](images/economies-of-scale.png)

## Summary

- If you care about Business goals, you'll have to speak the same language and share the same goals: more value and less cost, debt and risk
- The only way to manage risk is by developing in an iterative-incremental fashion
- That will force you to change often your code base
- A bad design will make those changes expensive
- A good design supports change
 


