<h1 align="center">Ember PhotoSwipe</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/ember-photoswipe"><img src="https://img.shields.io/npm/v/ember-photoswipe.svg?style=flat-square&colorB=44cc11" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/ember-photoswipe"><img src="https://img.shields.io/npm/dm/ember-photoswipe.svg?style=flat-square" alt="npm monthly downloads"></a>
  <a href="https://emberobserver.com/addons/ember-photoswipe"><img src="https://emberobserver.com/badges/ember-photoswipe.svg" alt="Ember Observer Score"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT"></a>
</p>

An [ember-cli](https://www.ember-cli.com) addon for using [PhotoSwipe](http://photoswipe.com/) in Ember applications.

## [Demo](https://kaermorchen.github.io/ember-photoswipe/)

## Compatibility
* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above

## Getting Started

Install in ember-cli application

```bash
ember install ember-photoswipe
```

Then include the following in your `app.scss` file:

```scss
@import 'ember-photoswipe';
```

## Usage

```js
// Controller
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  items = [
    {
      src: 'https://picsum.photos/1024/768?random&id=0',
      w: 1024,
      h: 768,
    },
    {
      src: 'https://picsum.photos/1024/768?random&id=1',
      w: 1024,
      h: 768,
    },
    {
      src: 'https://picsum.photos/1024/768?random&id=2',
      w: 1024,
      h: 768,
    },
  ];
}
```

```hbs
<!-- Template -->
<PhotoSwipe @items={{this.items}} as |photoSwipe|>
  {{#each this.items as |item index|}}
    <img src={{item.src}} {{on 'click' (fn photoSwipe.actions.open (hash index=index))}} >
  {{/each}}
</PhotoSwipe>
```

### Photoswipe options

You can pass items and photoswipe options directly into photo-swipe component. All list of options is available [here](https://photoswipe.com/documentation/options.html).

### Event

Phowo-swipe sends actions based on the corresponding photoswipe [events](https://photoswipe.com/documentation/api.html).

```hbs
<PhotoSwipe @items={{this.items}} @history={{false}} @onInitialZoomInEnd={{this.onInitialZoomInEnd}} as |photoSwipe|>
  <img src={{this.items.firstObject.src}} {{on 'click' photoSwipe.actions.open}} >
</PhotoSwipe>
```

## Configuration

### Custom variables and theme

You can use custom PhotoSwipe variables.

```scss
//We use $pswp__assets-path because images of default-skin stored in assets/images folder
$pswp__assets-path: 'images/';
@import 'ember-photoswipe/main.scss';
@import 'ember-photoswipe/default-skin/default-skin.scss';
```

### System-wide config

If you want to apply some options to all your photo-swipe components, you need create the `photo-swipe` component and apply options inside it:

```js
import PhotoSwipeComponent from 'ember-photoswipe/components/photo-swipe';

export default class extends PhotoSwipeComponent {
  history = false;
  bgOpacity = 0.7;
};
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

ember-photoswipe is released under the MIT License. See the bundled [LICENSE](LICENSE.md) file for details.
