/**
 * @description manage collections of items
 */
export class Collection {

  constructor() {
    this.data = {}
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    this.data[key] = value
  }

  /**
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return this.data.hasOwnProperty(key)
  }

  /**
   * @description get typeof item
   * @param {string} key
   * @returns {string}
   */
  typeof(key) {
    const elem = this.get(key)
    return Array.isArray(elem) ? 'array' : typeof elem
  }

  /**
   * @param {string} key
   * @param {any} or
   * @returns {any}
   */
  get(key, or = null) {
    return this.has(key) ? this.data[key] : or
  }

}
