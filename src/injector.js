import { Collection } from './collection'
import { annotate } from './util'

export class Injector {

  constructor() {
    this.providers = new Collection()
  }

  /**
   * @description add an dependence to injector
   * @param {string} name
   * @param {Array|Function} provider
   * @returns {this}
   */
  register(name, provider) {
    if (this.modules.hasOwnProperty(name)) {
      throw new Error(`${name} always exist`)
    }
    this.providers.set(name, provider)
    return this
  }

  /**
   * @description retrieve an dependence with injections
   * @param {string} name
   * @returns {any}
   */
  resolve(name) {
    if (!this.providers.has(name)) {
      throw new Error(`Unknown dependence: ${name}`)
    }
    var provider = this.providers.get(name)
    if (this.providers.typeof(name) === 'function') {
      provider = [
        ...(provider.hasOwnProperty('$inject') ? provider.$inject : annotate(provider)),
        provider
      ]
    }
    if (Array.isArray(provider)) {
      provider = provider[ provider.length - 1 ]
        .apply(this, provider.slice(0, -1).map(annotation => this.resolve(annotation)))
    }
    return provider
  }

}

// proxy for get/set intercept
export default new Proxy(new Injector(), {

  get(target, name) {
    if (!(name in target) && !target.providers.has(name)) {
      throw new ReferenceError(`Unknown property: ${name}`)
    }
    return (name in target) ? target[name] : target.resolve(name)
  },

  set(target, prop, value) {
    target.register(prop, value)
    return true
  }

})
