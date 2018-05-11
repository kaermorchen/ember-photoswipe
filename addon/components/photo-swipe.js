/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Component from '@ember/component';

import { A } from '@ember/array';
import { assign } from '@ember/polyfills';
import { computed, getProperties } from '@ember/object';
import { classify } from '@ember/string';
import { isPresent } from '@ember/utils';
import layout from '../templates/components/photo-swipe';

export default Component.extend({
  layout,

  concatenatedProperties: ['pswpOptions', 'pswpUIOptions', 'pswpEvents', 'itemProperties'],

  pswpOptions: [ // eslint-disable-line
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

  pswpUIOptions: [ // eslint-disable-line
    'barsSize',
    'timeToIdle',
    'timeToIdleOutside',
    'loadingIndicatorDelay',
    'addCaptionHTMLFn',
    'closeEl',
    'captionEl',
    'fullscreenEl',
    'zoomEl',
    'shareEl',
    'counterEl',
    'arrowEl',
    'preloaderEl',
    'tapToClose',
    'tapToToggleControls',
    'clickToCloseNonZoomable',
    'closeElClasses',
    'indexIndicatorSep',
    'shareButtons',
    'getImageURLForShare',
    'getPageURLForShare',
    'getTextForShare',
    'parseShareButtonOut',
  ],

  pswpEvents: [ // eslint-disable-line
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
  itemProperties: ['src', 'h', 'w'], // eslint-disable-line

  init() {
    this._super(...arguments);

    if (!this.get('items')) {
      this.set('items', A([]));
    }

    this.set('actions', {
      open: this.open.bind(this)
    });
  },

  options: computed(function () {
    const pswpOptions = this.get('pswpOptions');
    const pswpUIOptions = this.get('pswpUIOptions');
    const options = {};

    pswpOptions.forEach(optionName => {
      if (this.get(optionName) !== undefined) {
        options[optionName] = this.get(optionName);
      }
    });

    pswpUIOptions.forEach(optionName => {
      if (this.get(optionName) !== undefined) {
        options[optionName] = this.get(optionName);
      }
    });

    return options;
  }),

  usedPswpEvents: computed('pswpEvents', function () {
    return this.get('pswpEvents').filter(eventName => {
      let actionName = 'on' + classify(eventName);

      return this.get(actionName) !== undefined;
    });
  }),

  _addEventListeners(pswp) {
    this.get('usedPswpEvents').forEach(eventName => {
      let actionName = 'on' + classify(eventName);

      pswp.listen(eventName, () => {
        const action = this.get(actionName);

        if (action) {
          action(...arguments);
        }
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

  open(actionOptions) {
    const itemProperties = this.get('itemProperties');
    const pswpElement = this.get('element').querySelector('.pswp');
    const options = this.get('options');
    let items = this.get('items');
    let assignedOptions;
    let pswp;

    items = items.map(function(item) {
      return getProperties(item, itemProperties);
    });

    assignedOptions = assign({}, options, actionOptions);
    pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, assignedOptions);

    pswp.init();

    this.set('pswp', pswp);

    this._addEventListeners(pswp);
  }
});
