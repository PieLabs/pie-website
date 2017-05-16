# PIE: Portable Interactions and Elements


-------------------------


Portable Interactions and Elements \(PIE\) is an Open Source framework for building, distributing and rendering re-usable UI elements and interactions that can capture a user's response, analyze a user's response, and report an outcome and learning activity from the user interaction.

It supports the development of highly interactive questions and assessment interactions that can be shared and distributed to run on any web-based platform, fully preserving their design and functionality.


### What is it For?

Currently, it is quite difficult to author assessments that:

- Look and behave in the same way as the author intended, regardless of which system they are used in 
- Support more advanced interactions that are engaging and effective for assessing knowledge
- Are simple to share between authors and learning systems while preserving support for the above 2 goals
- Use more advanced scoring algorithms


The PIE framework addresses this by providing:

- A framework and tools for developing re-usable assessment interactions and UI elements 
- An Open Source Player, for rendering assessments that use PIEs
- An Open Source format and tools, for sharing assessments in a 'binary' format that preserves the exact behaviour and design of the Assessment Item.
- A suite of Open Source PIEs including a variety of question types and tools 


### How Does it Work?

The PIE framework takes the approach that web-standards should be adopted wherever possible, and web development best practices should be used to make development as simple as possible.

In Summary, the PIE Framework:

- uses [Custom Elements](https://www.w3.org/TR/custom-elements/) to define re-usable UI Elements
- uses JSON data to configure questions/interactions
- uses Javascript Modules (ES6 preferred, CommonJs Supported)
- uses NPM packages for the definition of reusable PIEs and for dependency resolution
- uses module bundling and packing techniques to create optimized shareable 'binary' bundles for rendering items


### Does it Support Education Technology Standards?

PIE itself is not a standard, it is a working Open Source implementation. It is designed to provide a full-stack solution to an existing problem. It provides tools for developing, packaging and rendering Assessment Items that use PIE interactions and elements. Interactions that are developed and packaged using the tools provided in this framework will render correctly - on any modern web system.

We have great respect for the standards process and standards bodies in the education field. If at some time there is interest in making the format/API definitions used by this technology a standard we would welcome this. 

##### Caliper / Tin Can / CMI5
PIE supports exporting activity events during the lifecycle of user interaction with PIEs. Support for IMS Caliper/ ADLnet Tin Can/CMI5 is possible using this model.

##### IMS LTI
PIE is just a system for rendering the interactions and questions, and as such can be wrapped in any page that may use an LTI Launch. Similarly, outcomes from user interaction could be returned through LTI outcomes.

##### IMS QTI
PIE Format does not replace QTI 2, but QTI items can be converted into PIE format and 'compiled' and as such can be distributed with the full visual rendering and behavior included. 

### What is the Origin of PIE?

The PIE Framework is based on several years of work by CoreSpring.org in the field of building authoring and rendering tools for assessment interactions.

We developed this technology to help fulfill our philanthropic mission of making high-quality, inexpensive & free assessment content available to educators.

We believe this challenge of creating and sharing assessment items with advanced interactions with high-fidelity is shared across the education industry. 

We agree with the problem description and approach suggested by Smarter Balanced in the [ARI](http://www.smarterapp.org/ARI/) proposal and found that our existing technology was very compatible with delivering on this vision.

We decided to make a new version of our solution to this problem available as an Open Source project in the hope that it will ultimately help educators have better access to high-quality and more interactive assessment interactions.
