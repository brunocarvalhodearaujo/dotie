import { Container } from './container'

if (typeof window !== 'undefined') {
  window.bridge = new Container()
}

export default new Container()
