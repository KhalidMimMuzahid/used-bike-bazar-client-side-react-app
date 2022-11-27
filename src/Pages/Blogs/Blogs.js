import React from "react";

const Blogs = () => {
  return (
    <div className="">
      <div className="">
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 mb-8 dark:text-gray-400 text-xl font-bold">
                Here are the some question for your betterr understanding.
              </p>
            </div>
            <div className="space-y-4">
              <details className="w-full border rounded-lg">
                <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400  text-lg font-bold">
                  What are the different ways to manage a state in a React
                  application?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                  There are several other ways to manage states in React,
                  including the use of: Hooks React Context API Apollo Link
                  State
                  <ul>
                    <li>
                      <span className=" text-lg font-bold">Hooks</span>
                    </li>
                    <li>
                      <span className="text-lg font-bold">
                        React Context API
                      </span>
                    </li>
                    <li>
                      <span className="text-lg font-bold">
                        Apollo Link State
                      </span>
                    </li>
                  </ul>
                </p>
              </details>
              <details className="w-full border rounded-lg">
                <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 text-lg font-bold">
                  How does prototypical inheritance work?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                  Simply put, prototypical inheritance refers to the ability to
                  access object properties from another object. We use a
                  JavaScript prototype to add new properties and methods to an
                  existing object constructor. We can then essentially tell our
                  JS code to inherit properties from a prototype. Prototypical
                  inheritance allows us to reuse the properties or methods from
                  one JavaScript object to another through a reference pointer
                  function.
                </p>
              </details>
              <details className="w-full border rounded-lg">
                <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 text-lg font-bold">
                  What is a unit test? Why should we write unit tests?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                  <ol>
                    <li>
                      <span className="font bold">What?</span>A unit test is a
                      way of testing a unit - the smallest piece of code that
                      can be logically isolated in a system. In most programming
                      languages, that is a function, a subroutine, a method or
                      property. The isolated part of the definition is
                      important. In his book "Working Effectively with Legacy
                      Code", author Michael Feathers states that such tests are
                      not unit tests when they rely on external systems: “If it
                      talks to the database, it talks across the network, it
                      touches the file system, it requires system configuration,
                      or it can't be run at the same time as any other test."
                    </li>
                    <li>
                      <span className="font bold">why?</span>
                      In his book, Real Time Business Systems, Robert V. Head
                      says "Frequently, unit testing is considered part of the
                      programming phase, with the person that wrote the
                      program...unit testing". That isn't because programmers
                      hold the secret sauce to unit testing, it's because it
                      makes sense. The programmer that wrote the prod code will
                      likely know how to access the parts that can be tested
                      easily and how to mock objects that can't be accessed
                      otherwise. It's a time trade off.
                    </li>
                  </ol>
                </p>
              </details>
              <details className="w-full border rounded-lg">
                <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 text-lg font-bold">
                  React vs. Angular vs. Vue?
                </summary>
                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
                  <ul>
                    <li>
                      <h1 className="font-bold">
                        <u>Angular vs React</u>{" "}
                      </h1>
                      <p>
                        If the choice you’re making is based on Angular vs React
                        alone, then you’ll simply need to consider the pros and
                        cons discussed for those libraries in this post. But
                        overall, keep in mind that both libraries can be used
                        for mobile and web apps, while Angular is generally
                        better for more complex apps that are enterprise-ready.
                        React often requires extra modules and components, which
                        keeps the core library small, but means there’s extra
                        work involved when incorporating outside tools. Angular,
                        on the other hand, is more of a full-fledged solution
                        that doesn’t require extras like React often does,
                        though it does have a steeper learning curve for its
                        core compared to React. React is more suitable for
                        intermediate to advanced JavaScript developers who are
                        familiar with concepts from ES6 and up, while Angular
                        favors those same developers who are also familiar with
                        TypeScript.
                      </p>
                    </li>
                    <li>
                      <h1 className="font-bold">
                        <u>React vs Vue</u>
                      </h1>
                      <p>
                        The choice between React vs Vue is often debated and
                        it’s not an easy one. Vue has a vibrant and ever-growing
                        community and has taken over popularity vs. React in
                        many respects. React developers are still churning out
                        lots of new components and extras, so there’s no sign
                        that React is on the decline either. Vue is generally
                        more suited to smaller, less complex apps and is easier
                        to learn from scratch compared to React. Vue can be
                        easier to integrate into new or existing projects and
                        many feel its use of HTML templates along with JSX is an
                        advantage. Overall, Vue might be the best choice if
                        you’re a newer developer and not as familiar with
                        advanced JavaScript concepts, while React is quite well
                        suited for experienced programmers and developers who
                        have worked with object-oriented JavaScript, functional
                        JavaScript, and similar concepts.
                      </p>
                    </li>
                    <li>
                      <h1 className="font-bold">
                        <u>Angular vs Vue</u>
                      </h1>
                      <p>
                        In most cases, you probably wouldn’t be deciding between
                        only Angular and Vue. They are vastly different
                        libraries with very different feature sets and learning
                        curves. Vue is the clear choice for less experienced
                        developers, and Angular would be preferred for those
                        working on larger apps. A large library like Angular
                        would require more diligence in keeping up with what’s
                        new, while Vue would be less demanding in this regard
                        and the fact that the two most recent major releases of
                        Vue are in separate repositories helps. It should also
                        be noted that Vue was created by a developer who
                        formerly worked on Angular for Google, so that’s another
                        thing to keep in mind, though that wouldn’t have a huge
                        impact on your decision.
                      </p>
                    </li>
                  </ul>
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
