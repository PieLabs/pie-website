# PIE Framework Community 

These are some notes on community process and structure for the PIE Framework. A bare minimum is defined at this stage, it is expected the process and structure will evolve based on continuing input and review by the key contributors. 

We believe the best path forward for the project in the near term is to engage with a small set of organizations & contributors who are focused on building working solutions for real-world needs, and gradually evolve and expand the community over time. These core contributing organizations will help us define the best processes and structure.


## PIE Framework Community-Maintained Components

There are multiple software projects that will make up the framework, the process outlined here is intended to cover all key shared components that will be maintained under the Pielabs and PieElements codebases:

- PIE cli: the tool that provides packaging and development support for PIE framework 
- PIE Player(s): the component that provides a runtime API to external users of PIE content
- PIEs*: A core suite of Open Source Interactions and Tools that use the framework, including authoring components
- PIE catalog: A repository for reusable PIE interactions where PIEs can be published so that users can browse, preview and use them.
- PIE Test Delivery: Reference systems and libraries that will provide support for implementors to create summative/secure delivery systems
- PIE Tools/Custom Elements: Reusable UI elements that generally support the use cases, and that may be re-purposed in multiple PIEs
- PIE Documentation: the projects above define the APIs and specification through their implementation. The documentation is a support for users in understanding and working with the framework.


> * the nature of the framework is such that any developer or organization can create sets of PIE interactions. It is possible that these sets of interactions could fall completely outside of the PIE Framework itself, but we retain an aspiration to maintain a canonical set of re-usable interactions as part of the framework that will be of general use to a broad audience.

### Definition: Contributors

A contributor is anyone that makes a contribution to PIE. This does not necessarily mean code contributions, it could mean any of the following:

- Code fixes, improvements and new features
- Documentation fixes, improvements and new features
- Translating documentation into other languages
- Code reviews in GitHub
- Raising, triaging and adding additional information to help resolve issues
- Taking part in design and feature discussions on mailing lists or in chat channels


### Definition: Integrators

An integrator is anyone with write access to the source code and documentation of the PIE projects.

Integrator status will be offered to contributors who have made substantial contributions, and who are exemplars of best practices as established by the community.

The current and initial integrators are the contributors from the CoreSpring team, the intention is to convert key contributors to integrators.


## Decision Making

Decisions in the PIE project fall in two broad categories:

- Implementation decisions. This includes whether a pull request is up to standard to be merged, how a feature or improvement should be implemented.
- Design and housekeeping. This includes major design decisions, road maps, release schedules, decisions about how the project should be run and managed, what tools should be used, etc.

### Implementation Decisions

Implementation decisions primarily happen in pull requests. They are initiated by the pull request itself, and through reviews and iteration, a consensus is formed for how the given change should be implemented.

All interested parties are encouraged to involve themselves in reviewing pull requests and contributing to review discussions.

The amount of consensus required for whether a pull request is merged or not depends on how much impact the pull request has. 

Whether a pull request is merged or not depends on many factors, including:

- Appropriate level of test coverage and documentation, where necessary
- Adherence to coding standards and other code quality factors


### Design and Housekeeping

A mailing list and Gitter or Slack chat channel will be created to discuss the project. As necessary, video/audio conferences may be held. Where possible, face to face meetings of key contributors may also be held.

The aim of the discussions are to reach an understanding on whether a task will be done, and when and how it will be done. Interested parties are encouraged to comment with their affirmation or concerns.

CoreSpring will endeavor to help the decision making process by reaching a consensus in the community.


## Community Stewardship

CoreSpring Inc 501(c)3 is proposed as the organization through which stweardship of the project is provided. 

The following are some Stewardship Responsibilities:

- Manage Community Process & Engagement, Drive decision-making
- Github Organization, Repositories, Releases and Builds
- Maintain PIE Catalog (website for Open Source PIE Elements, where users can see docs and demos. Similar in principle to webcomponents.org)
- Maintain Public Website for PIE Framework


> Much of this work could and should be done by general community contributors and integrators. So it shouldn't be assumed that only CoreSpring team members can provide these functions. 

### Advocacy, Sponsorship, Fundraising 

In the initial stages the assumption is that a small number of focused organizations will grow, adopt and refine the framework for use in their systems as part of their operational work. 

However for the benefit of all concerned, broad adoption of the framework by the education community and long-term, stable maintenance of the project is a goal.

To support this we intend to look at fundraising and sponsorship structures that will allow advocacy, development and maintenance to be provided on an ongoing basis and to the greatest extent possible.