/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Ember from 'ember';
import layout from '../templates/components/photo-swipe';

const { on, isPresent, isEmpty } = Ember;

export default Ember.Component.extend({
  layout,

  pswp: null,

  destroyPswp: on('willDestroyElement', function() {
    const pswp = this.get('pswp');

    if (isPresent(pswp)) {
      pswp.destroy();
      this.set('pswp', null);
    }
  }),

  actions: {
    open(items, options) {
      if (isEmpty(items)) {
        return;
      }

      const pswpElement = this.$('.pswp')[0];
      const pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

      pswp.init();

      this.set('pswp', pswp);
    }
  }
});
