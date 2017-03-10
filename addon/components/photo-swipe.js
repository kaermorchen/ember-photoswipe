/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Ember from 'ember';
import layout from '../templates/components/photo-swipe';

const {
  assign,
  getProperties,
  computed,
  isArray,
  isPresent,
  String: { classify }
} = Ember;

export default Ember.Component.extend({
  layout,

  concatenatedProperties: ['pswpOptions', 'pswpEvents', 'itemProperties'],

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

  pswpEvents: [
    'beforeChange',
    'afterChange',
    'imageLoadComplete',
    'resize',
    'gettingData',
    'mouseUsed',
    'initialZoomIn',
    'initialZoomInEnd',
    'initialZoomOut',
    'initialZoomOutEnd',
    'parseVerticalMargin',
    'close',
    'unbindEvents',
    'destroy',
    'updateScrollOffset',
    'preventDragEvent',
    'shareLinkClick',
  ],

  pswp: null,
  items: null,
  itemProperties: ['src', 'h', 'w'],

  options: computed(function () {
    const pswpOptions = this.get('pswpOptions');
    const options = {};

    pswpOptions.forEach((optionName) => {
      if (this.get(optionName) !== undefined) {
        options[optionName] = this.get(optionName);
      }
    });

    return options;
  }),

  usedPswpEvents: computed('pswpEvents', function () {
    return this.get('pswpEvents').filter((eventName) => {
      let actionName = 'on' + classify(eventName);

      return this.get(actionName) !== undefined;
    });
  }),

  _addEventListeners(pswp) {
    this.get('usedPswpEvents').forEach(eventName => {
      let actionName = 'on' + classify(eventName);

      pswp.listen(eventName, () => {
        this.sendAction(actionName, ...arguments);
      });
    });
  },

  willDestroyElement() {
    let pswp = this.get('pswp');

    if (isPresent(pswp)) {
      pswp.close();
      pswp = null;
      this.set('pswp', null);
    }

    this._super(...arguments);
  },

  actions: {
    open(arg1, arg2) {
      let items;
      let actionOptions;
      let pswp;
      let assignedOptions;
      const itemProperties = this.get('itemProperties');
      const pswpElement = this.$('.pswp')[0];
      const options = this.get('options');

      if (arguments.length === 2) {
        items = arg1;
        actionOptions = arg2;
      } else if (arguments.length === 1) {
        if (isArray(arg1)) {
          items = arg1;
        } else {
          items = this.get('items');
          actionOptions = arg1;
        }
      } else {
        items = this.get('items');
      }

      items = items.map(function(item) {
        return getProperties(item, itemProperties);
      });

      assignedOptions = assign({}, options, actionOptions);
      pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, assignedOptions);

      pswp.init();

      this.set('pswp', pswp);

      this._addEventListeners(pswp);
    }
  }
});
