# HL7 Search
## Using AngularJS, Browserify and Gulp

## Useage:

- `git clone https://github.com/rfender/HL7-Search-Angular-Browserify.git HL7-Searchinator`
- `cd HL7-Searchinator`
- `npm install` (use `sudo npm install` if you get errors)
- `gulp`
- navigate to [http://localhost:8080](http://localhost:8080)

## Includes:

  - uses Browserify to build the client code from the `client` to the `public` folder
  - uses **$stateProvider** for the routing
  - uses **SASS** as pre processor
  - uses a **.jshintrc** to keep you honest
  - uses **Gulp** as the task-runner:
  	- compile views
  	- convert sass to css
  	- browserify stuff
  	- clean build directory
  	- jshinting the code
  - uses Express as local web and api server 

## Demonstrates:
 - use of Angular
   + model(s)
   + views/partials/templates
   + directives
   + services (specifically making a POST call and handling the return)
 - use of responsive CSS (Bootstrap in this case)
 - displaying and using HL7 data (node simple-hl7)

## Justification:

The reasoning behind using [Browserify](http://browserify.org/) is to allow the use of CommonJS modules using require() to open up a world of possibilities in the npm repository. Specifically to use an HL7 parser. This was my first foray into node.js/CommonJS style of architecting an AngularJS application. Not sure what I think about it yet.