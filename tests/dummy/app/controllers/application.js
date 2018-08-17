import Controller from '@ember/controller';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';

const Item = EmberObject.extend({
  src: computed('id', 'w', 'h', function() {
    return `https://picsum.photos/${this.get('w')}/${this.get('h')}?random&id=${this.get('id')}`;
  })
});

export default Controller.extend({
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
