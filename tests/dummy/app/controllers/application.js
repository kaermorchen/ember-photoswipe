import Ember from 'ember';

const Item = Ember.Object.extend({
  src: Ember.computed.alias('path')
});

export default Ember.Controller.extend({
  isShown: true,

  items: [
    Item.create({
      path: 'https://unsplash.it/1024/768/?random&image1',
      w: 1024,
      h: 768,
    }),
    Item.create({
      path: 'https://unsplash.it/768/1024/?random&image2',
      w: 768,
      h: 1024,
    }),
    Item.create({
      path: 'https://unsplash.it/768/768/?random&image3',
      w: 768,
      h: 768,
    }),
    Item.create({
      path: 'https://unsplash.it/768/1024/?random&image4',
      w: 768,
      h: 1024,
    }),
  ],

  actions: {
    toggleIsShown() {
      this.toggleProperty('isShown');
    }
  }
});
