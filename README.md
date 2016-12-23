Dotie
=====

tiny, powerful dependency injection container for node and browser inspired on angularJS

## Instalation

The installation of this package is very simple: In fact, it can be installed by just running:

````bash
$ npm install dotie # if using NodeJS
$ bower install dotie # if you want to use this package in the browser
````

## Reference

### API

````typescript
/**
 * create an new dependency into container
 * @param {string} name - name of dependency
 * @param {any} provider - dependence 
 * @returns {this}
 */
dotie.register(name, provider) /* or */ dotie.<name> = provider

/**
 * find and resolve dependencies and return then
 * @param {string} name - name of dependency
 * @returns {any} - registered provider instance
 */
dotie.resolve(name) /* or */ dotie.<name>
````

### Example

````typescript

// small sintax
dotie.q = () => $.Deferred() // dotie.<name> = dependence

// default sintax
dotie.register('http', function(q) {
  return (...params) => {
    $.ajax(...params)
      .success(data => q.resolve(data))
      .error(error => q.reject(error))
    return q.promise()    
  }
})

// using angular injection style (option 1)
dotie.register('user', ['http', http => {
  return {
    find: code => http(`localhost:2650/api/users/${code}`) 
  }
}])

// angular injection style (option 2)
function controller(model) {
  user.find(1)
    .then(user => console.log(user))
    .catch(error => console.log(error))
}

controller.$inject = [ 'user' ]

dotie.register('controller', controller) /* or */ dotie.controller = controller

````
