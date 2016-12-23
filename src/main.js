import watch, { Injector } from './injector'

if (typeof window !== 'undefined') {
  window.dotie = watch
  // create an bridge for jquery
  if ('$' in window) {
    window.$.extend = { watch }
  }

}

export { Injector }
export default watch
