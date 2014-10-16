---
layout: post
title: Large Scale Enterprise Angular Applications - Part 1
public: true
---

When it comes to building applications with AngularJS it seems there are a plethera of resources for small site and simple applications. When it comes to larger applications or applications for enterprise resources seem to be lacking. Over the next few months, I hope to write about my experiences and shed some light on the large scale applications with Angular. With that said, keep in mind these writings are 100% based on the experience of myself and the team I work with. I plan to post about successes, failures, opinions, and suggestions. I hope that someone else can learn from our mistakes, challenges, and successes.

### UI Components

Our application, like most web applications, consit of a bunch of UI components. Our first task was understanding how to break these components out in to seperate modules that will allow for reusibility in our application and future applications. For this, we came up with a method to break each component into a "block". This block would consist of the source, test files, documentation, and a demo for the specific component. This block would then be uploaded into its own github repository in a shared github organization. Then we would register the repository with our private bower registry and it would now be avalible as a bower dependency for our and other Angular applications.

By using this "block" model we solved for keeping our components modular and still allowing them to be reused by other Angular applications.

### So, Whats Next?

I hope to write once or twice a week about the experience. I am by no means a great writer, just a web developer trying to share my knowledge and experience. Thanks for taking the time to read, and see you next time!