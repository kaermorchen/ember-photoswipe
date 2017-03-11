import Ember from 'ember';

const { A, computed } = Ember;

const Item = Ember.Object.extend({
  src: computed('id', 'w', 'h', function() {
    return `https://unsplash.it/${this.get('w')}/${this.get('h')}/?random&image${this.get('id')}`;
  })
});

export default Ember.Controller.extend({
  items: A([
    Item.create({
      id: 1,
      w: 1024,
      h: 768,
    }),
    Item.create({
      id: 2,
      w: 1024,
      h: 768,
    }),
    Item.create({
      id: 3,
      w: 1024,
      h: 768,
    }),
    Item.create({
      id: 4,
      w: 1024,
      h: 768,
    }),
    Item.create({
      id: 5,
      w: 1024,
      h: 768,
    }),
  ])
});
