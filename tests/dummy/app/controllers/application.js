import Ember from 'ember';

export default Ember.Controller.extend({
  options: {
    history: false
  },

  attachments: [
    {
      src: 'https://unsplash.it/1024/768/?random&image1',
      w: 1024,
      h: 768,
    },
    {
      src: 'https://unsplash.it/768/1024/?random&image2',
      w: 768,
      h: 1024,
    },
    {
      src: 'https://unsplash.it/768/768/?random&image3',
      w: 768,
      h: 768,
    },
  ]
});
