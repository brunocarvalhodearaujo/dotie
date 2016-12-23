import watch, { Injector } from './injector'

if (typeof window !== 'undefined') {
  window.dotie = watch
}

export { Injector }
export default watch
