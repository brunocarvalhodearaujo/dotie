import { Container } from './container'

if (typeof window !== 'undefined') {
  window.bridge = window.bridge || new Container()
} else {
  module.exports = new Container()
}
