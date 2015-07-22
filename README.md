# HL7 Search
## Using AngularJS, Browserify and Gulp

## Installation

- git clone https://github.com/rfender/HL7-Search-Angular-Browserify.git HL7-Searchinator
- cd HL7-Searchinator
- npm install
- gulp

That's it. Now visit [http://localhost:8080](http://localhost:8080) and profit.

## What's in the box

A sensible default app that ..

  - uses Browserify to build the client code from the `client` to the `public` folder
  - uses **$stateProvider** for the (HTML5 PushState supported) routing
  - uses **SASS** as pre processor
  - uses a **.jshintrc**
  - uses **Gulp** as build tool that does:
  	- view compiling
  	- sass conversion
  	- browserify-ing all teh things
  	- cleaning the build folder
  	- jshinting your beautiful code

It comes with an example controller, service, directive and two states using stateprovider so you can see how things work together.