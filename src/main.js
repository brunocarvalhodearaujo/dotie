import { Container } from './container'

if (typeof window !== 'undefined') {

  window.dotie = new Container()

  // create an bridge with jquery
  if ('$' in window) {
    window.$.dotie = (name, constructor) => {
      if (constructor) {
        window.dotie.register(name, constructor)
      } else {
        return window.dotie.resolve(name)
      }
    }
  }

}

export { Container }
export default Container
