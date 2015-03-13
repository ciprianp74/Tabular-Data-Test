# Tabular Data Test

## Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

The app uses a number of node.js tools for initialization and testing. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

## Get the Code

Either clone this repository or fork it on GitHub and clone your fork:

```
git clone https://github.com/ciprianp74/tabular-data-test.git
cd vcast-test
```

## Install Dependencies

There are two kinds of dependencies in this project: tools and angular framework code.  

* The tools are dowloaded via `npm`, the [node package manager][npm].
* The angular code is downloaded via `bower`, a [client-side code package manager][bower].

The development process uses the Node.js build tool [Grunt.js](gruntjs.com). 

To install all the dependencies run:

```
npm install
```

Behind the scenes this will also call `bower install`.  Two new folders will be created in the project:

* `node_modules` - contains the npm packages for the tools we need
* `bower_components` - contains the angular framework files

## Run the Application
The project is preconfigured with a simple development web server (a node.js tool called [http-server]). Use grunt to start the app and launch the default browser.

```
grunt serve
```

The default browser will be launched with the following address: `http://127.0.0.1:3000/`.

## Create production build
Build a release version of the app, with minified files. The javascript, css and html files are merged into `dist` directory.

```
grunt build
```


### Folders structure

* `app` contains application's sources
* `bower_components` contains the angular framework files
* `dist` contains build results
* `node_modules` contains build tasks for Grunt along with other, user-installed, Node packages

## Additional info


[AngularJS]: http://angularjs.org/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[grunt]: http://gruntjs.com
