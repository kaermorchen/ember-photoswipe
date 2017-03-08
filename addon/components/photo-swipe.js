/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Ember from 'ember';
import layout from '../templates/components/photo-swipe';

const { assign, computed, on, isPresent, isEmpty } = Ember;

export default Ember.Component.extend({
  layout,

  concatenatedProperties: ['pswpOptions'],

  pswpOptions: [
    'index',
    'getThumbBoundsFn',
    'showHideOpacity',
    'showAnimationDuration',
    'hideAnimationDuration',
    'bgOpacity',
    'spacing',
    'allowPanToNext',
    'maxSpreadZoom',
    'getDoubleTapZoom',
    'loop',
    'pinchToClose',
    'closeOnScroll',
    'closeOnVerticalDrag',
    'mouseUsed',
    'escKey',
    'arrowKeys',
    'history',
    'galleryUID',
    'galleryPIDs',
    'errorMsg',
    'preload',
    'mainClass',
    'getNumItemsFn',
    'focus',
    'isClickableElement',
    'modal',
  ],
  pswp: null,

  options: computed(function() {
    const pswpOptions = this.get('pswpOptions');
    const options = {};

    pswpOptions.forEach(optionName => {
      if (this.get(optionName) !== undefined) {
        options[optionName] = this.get(optionName);
      }
    });

    return options;
  }),

  destroyPswp: on('willDestroyElement', function() {
    const pswp = this.get('pswp');

    if (isPresent(pswp)) {
      pswp.close();
    }
  }),

  actions: {
    open(items, actionOptions) {
      if (isEmpty(items)) {
        return;
      }

      const pswpElement = this.$('.pswp')[0];
      const options = this.get('options');
      const assignedOptions = assign({}, options, actionOptions);
      const pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, assignedOptions);

      pswp.init();

      this.set('pswp', pswp);
    }
  }
});
