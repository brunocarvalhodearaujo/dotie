import { Container } from './container'

if (typeof window !== 'undefined') {
  window.bridge = new Container()
}

export { Container }
export default new Container()
