# PIE Framework Design Decisions

The goal of the PIE Framework is to provide a future-proof, user & developer friendly way to create, share and deliver assessment content that supports high levels of interactivity for formative or high-stakes purposes. 

More than just a format for defining assessment items, it is a framework for building re-usable question types and interactions, and a set of tools that do the work of packaging assessment items into runtime-ready and distributable units, and that deliver them to users.

We made a number of key design decisions in the framework to best support these goals, below is a discussion of some of these:


# HTML, Javascript & JSON
The presentation layer is assumed to be a standard browser engine. This provides great flexibility and power in terms of developing interactive and visually appealing experiences, across all device types. 

JSON is used as the data definition language. This is standard practice in Javascript-based environments, as the data format has builtin support in the language and is simple to work with. 


# NPM Packages for Dependencies and Defining PIEs as Independent Packages
NPM is the de-facto standard for packaging javascript libraries. PIEs themselves are defined in NPM packages and can also use the dependency definition mechanism of NPM to declare dependencies. This supports code re-use and code sharing among packages. The `PIE cli` tool embeds the capability to install PIEs and their dependencies using NPM packages. 

> While PIEs are defined as NPM packages, they are not required to be published to the public registry. Developers have the option of hosting them locally to their production environments or through a SCM system if they choose.


## Use Custom Elements

Custom Elements is a web standard, one of the set of standards known as Web Components.

It provides the ability for developers to define new Html Elements that the browser will render and manage.

PIE Framwork uses this as the entry point for the definition of a PIE's UI. It provides a clean browser-managed entry point and lifecycle methods for delivering componentized functionality. 

> In the longer term, even greater encapsulation will be provided by using the Shadow Dom standard as it becomes available in browsers. It is currently available in Chrome, but there isn't a pure Shadow Dom polyfill that is sufficiently performant to use in the framework [right now](https://www.polymer-project.org/1.0/blog/shadydom) 


## Provide a Packaging Tool and Transpiler

Packaging interactive html5 based items for delivery is a fairly complex task. By providing a canonical packaging tool and transpilation support we can make this functionality readiliy available while also providing support for next-generation development practices that greatly simplify creation of question types, interactions and tools.

- Development using ES6: This makes ES6 imports available, which when combined with NPM dependency resolution greatly facilitates development. It also affords the capability to implement tree-shacking packaging strategies to optimize the composition of transpiled/packaged items.
- Support for CSS imports
- Framework specific supports, to allow developers to use their framework of choice (Although component frameworks like React, Inferno or Vue are the most optimal) and to make PIE future-ready, to support any new frameworks.

> Some of the features provided here will eventually be natively supported in browsers. The PIE cli can evolve to provide an optimum runtime package as standards evolve.


# Javscript for Scoring & Controller Logic
We settled upon Javasript as the language for Scoring and Controllers for the following reasons:

- Anything beyond the most simple scoring logic is difficult to construct without the use of a programming langauge. 
- We wanted to make it possible for PIE assessment items to be capable of running fully client-side with no server required so the scoring and controller logic needed to be executable in a browser. 

For environements that will provide a server execution context for the Controller and Scoring logic, this will require that that context can support Javascript execution. Most major server language frameworks do provide a mechanism for executing Javascript. CoreSpring's existing system is JVM-based, and we use Javascript scoring functions for question types. 


