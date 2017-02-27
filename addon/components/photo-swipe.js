/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Ember from 'ember';
import layout from '../templates/components/photo-swipe';

export default Ember.Component.extend({
  layout,

  actions: {
    open(items, options) {
      const pswpElement = this.$('.pswp')[0];

      new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options).init();
    }
  }
});
