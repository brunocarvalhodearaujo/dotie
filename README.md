Dotie
=====

tiny, powerful dependency injection container for node and browser

## Instalation

The installation of this package is very simple: In fact, it can be installed by just running:


````bash
$ npm install dotie # if using NodeJS
````

````bash
$ bower install dotie # if you want to use this package in the browser
````

* note this package uses a version compiled by [Babel](http://babeljs.io/)

## Usage

* NodeJS (CommonJS/Browserify)

`````js
const dotie = require('dotie') // default style
import { Container } from 'dotie' // es6 style
````

* Script tag:

`````html
<script language="javascript" src="bower_components/dotie/dist/dotie.js"></script>
`````

# API

create an new dependence into dotie container

````js
dotie
  .register('q', () => $.Deferred()) // 
  .register('http', q => { // or [ 'q', (q) => {} ] if need minify code
    return (...params) => {
      $.ajax(params)
        .done((...data) => q.resolve(data))
        .error((...error) => q.reject(error))
      return q.promise()
    }
  })
````

retrieve an dependence into an container

````js
const $http = dotie.resolve('http')

$http('https://npmjs.com')
  .then(data => console.log(data))
  .error(error => console.log(error))
````

- this example of register|resolve consider uses browser and jquery
