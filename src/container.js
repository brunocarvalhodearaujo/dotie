import { Collection } from './collection'
import { annotate } from './util'

export class Container {

  constructor() {
    this.dependencies = new Collection()
  }

  /**
   * @description add an dependence to injector
   * @param {string} name
   * @param {Array|Function}
   */
  register(name, constructor) {
    if (typeof constructor === 'function') {
      constructor = [ ...annotate(constructor), constructor ]
    }
    this.dependencies.set(name, constructor)
  }

  /**
   * @description retrieve an dependence with injections
   * @param {string} name
   * @returns {any}
   */
  resolve(name) {
    if (!this.dependencies.has(name)) {
      throw new Error(`Can't resolve ${name}`)
    }
    if (this.dependencies.typeof(name) !== 'array') {
       return this.dependencies.get(name)
    }
    const dependence = this.dependencies.get(name)
    return dependence[ dependence.length - 1 ]
      .apply(undefined, dependence.slice(0, -1).map(annotation => this.resolve(annotation)))
  }

}
