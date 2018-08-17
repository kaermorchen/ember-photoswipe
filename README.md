<h1 align="center">Ember PhotoSwipe</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/ember-photoswipe"><img src="https://img.shields.io/npm/v/ember-photoswipe.svg?style=flat-square&colorB=44cc11" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/ember-photoswipe"><img src="https://img.shields.io/npm/dm/ember-photoswipe.svg?style=flat-square" alt="npm monthly downloads"></a>  
  <a href="https://travis-ci.org/kaermorchen/ember-photoswipe"><img src="https://img.shields.io/travis/kaermorchen/ember-photoswipe.svg?style=flat-square" alt="Build Status"></a>
  <a href="https://emberobserver.com/addons/ember-photoswipe"><img src="https://emberobserver.com/badges/ember-photoswipe.svg" alt="Ember Observer Score"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT"></a>
</p>

An [ember-cli](https://www.ember-cli.com) addon for using [PhotoSwipe](http://photoswipe.com/) in Ember applications.

## [Demo](https://kaermorchen.github.io/ember-photoswipe/)

## Getting Started

Install in ember-cli application

```bash
ember install ember-photoswipe
```

Then include the following in your `app.scss` file:

```scss
@import "ember-photoswipe";
```

## Usage

We have array of javascript objects, but you can use array of Ember.Objects too. Inside photo-swipe all required properties will be to take through getProperties.

```js
// app/controller/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  items: [
    {
      src: 'https://picsum.photos/1024/768?image=42',
      w: 1024,
      h: 768,
    },
    {
      src: 'https://picsum.photos/768/1024?image=80',
      w: 768,
      h: 1024,
    },
    {
      src: 'https://picsum.photos/768/768?image=108',
      w: 768,
      h: 768,
    },
  ]
});
```

### Photoswipe options

You can pass items and photoswipe options directly into photo-swipe component

```mustache
// app/templates/application.hbs
{{#photo-swipe items=items history=false as |photoswipe|}}
  {{#each items as |item index|}}
    <img src={{item.src}} {{action photoswipe.actions.open (hash index=index)}} />
  {{/each}}
{{/photo-swipe}}
```

All list of options is available [here](https://photoswipe.com/documentation/options.html).

### Event

Phowo-swipe sends actions based on the corresponding photoswipe [events](https://photoswipe.com/documentation/api.html).

```mustache
{{#photo-swipe items=items onInitialZoomInEnd=(action "onInitialZoomInEnd") as |photoswipe|}}
  {{#each items as |item index|}}
    <img src={{item.src}} {{action photoswipe.actions.open (hash index=index)}} />
  {{/each}}
{{/photo-swipe}}
```

## Configuration

### Custom variables and theme

You can use custom PhotoSwipe variables.

```scss
//We use $pswp__assets-path becouse images of default-skin stored in assets/images folder
$pswp__assets-path: 'images/';
@import "ember-photoswipe/main.scss";
@import "ember-photoswipe/default-skin/default-skin.scss";
```

### System-wide config
If you want to apply some options to all your photo-swipe components, you need create the `photo-swipe` component and apply options inside it:

```js
import PhotoSwipe from 'ember-photoswipe/components/photo-swipe';

export default PhotoSwipe.extend({
  // Place here your preferences
  itemProperties: ['name'],
  history: false,
  bgOpacity: 0.7
});
```

## License
ember-photoswipe is released under the MIT License. See the bundled [LICENSE](LICENSE.md) file for details.
