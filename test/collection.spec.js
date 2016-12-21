import { expect } from 'chai'
import { Collection } from '../src/collection'

describe('Collection', () => {

  let collection = new Collection()

  describe('#set()', () => {
    it('define year to be 2016', done => {
      collection.set('year', 2016)
      done()
    })
  })

  describe('#has()', () => {
    it('check if year exist', () => {
      expect(collection.has('year')).to.equal(true)
    })
  })

  describe('#typeof()', () => {
    it('check if year is number', () => {
      expect(collection.typeof('year')).to.equal('number')
    })
  })

  describe('#get()', () => {
    it('find value year into collection and check if to be equal to 2016', () => {
      expect(collection.get('year')).to.equal(2016)
    })
  })

})
