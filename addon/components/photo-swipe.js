/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { classify } from '@ember/string';
import { getProperties } from '@ember/object';
import { guidFor } from '@ember/object/internals';

const pswpOptions = [
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
];

const pswpUIOptions = [
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
];

const pswpEvents = [
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
];

export default class PhotoSwipeComponent extends Component {
  @tracked pswp;
  @tracked itemProperties = ['src', 'h', 'w', 'title'];
  pswpId = guidFor(this);
  actions = {
    open: this.open.bind(this),
  };

  get options() {
    const options = {};
    const fn = (optionName) => {
      if (this.args[optionName] !== undefined) {
        options[optionName] = this.args[optionName];
      }
    };

    pswpOptions.forEach(fn);
    pswpUIOptions.forEach(fn);

    return options;
  }

  get usedPswpEvents() {
    return pswpEvents.filter((eventName) => {
      let actionName = 'on' + classify(eventName);

      return this.args[actionName] !== undefined;
    });
  }

  open(actionOptions) {
    const pswpElement = document.getElementById(this.pswpId);
    const assignedOptions = Object.assign({}, this.options, actionOptions);
    const items = this.args.items.map((item) => {
      return getProperties(item, this.itemProperties);
    });

    this.pswp = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUI_Default,
      items,
      assignedOptions
    );

    this.pswp.init();

    this.usedPswpEvents.forEach((eventName) => {
      let actionName = 'on' + classify(eventName);

      if (this.args[actionName]) {
        this.pswp.listen(eventName, this.args[actionName]);
      }
    });
  }

  willDestroy() {
    super.willDestroy(...arguments);
    if (this.pswp) {
      this.pswp.close();
      this.pswp = null;
    }
  }
}
