# Ember PhotoSwipe

[![npm version](https://badge.fury.io/js/ember-photoswipe.svg)](https://github.com/kaermorchen/ember-photoswipe)
[![npm monthly downloads](https://img.shields.io/npm/dm/ember-photoswipe.svg)](https://github.com/kaermorchen/ember-photoswipe)
[![Ember Observer Score](https://emberobserver.com/badges/ember-photoswipe.svg)](https://emberobserver.com/addons/ember-photoswipe)
[![Build Status](https://travis-ci.org/kaermorchen/ember-photoswipe.svg?branch=master)](https://travis-ci.org/kaermorchen/ember-photoswipe)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An [ember-cli](http://www.ember-cli.com) addon for using [PhotoSwipe](http://photoswipe.com/) in Ember applications.

## Demo

[Demo](https://kaermorchen.github.io/ember-photoswipe/)
[![Ember PhotoSwipe Demo](https://kaermorchen.github.io/ember-photoswipe/assets/images/demo-preview.png)](https://kaermorchen.github.io/ember-photoswipe/)

## Getting Started

Install in ember-cli application

```
ember install ember-photoswipe
```

Then include the following in your `app.scss` file:

```
@import "ember-photoswipe";
```

## Usage

We have array of javascript objects, but you can use array of Ember.Objects too. Inside photo-swipe all required properties will be to take through getProperties.

```
// app/controller/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  items: [
    {
      src: 'http://lorempixel.com/1024/768/nature/1',
      w: 1024,
      h: 768,
    },
    {
      src: 'http://lorempixel.com/768/1024/nature/2',
      w: 768,
      h: 1024,
    },
    {
      src: 'http://lorempixel.com/768/768/nature/3',
      w: 768,
      h: 768,
    },
  ]
});
```

### Photoswipe options

You can pass items and photoswipe options directly into photo-swipe component

```
// app/templates/application.hbs
{{#photo-swipe items=items history=false as |photoswipe|}}
  {{#each items as |item index|}}
    <img class="preview" src={{item.src}} {{action photoswipe.actions.open (hash index=index)}} />
  {{/each}}
{{/photo-swipe}}
```

All list of options is available [here](http://photoswipe.com/documentation/options.html).

### Event

Phowo-swipe sends actions based on the corresponding photoswipe [events](http://photoswipe.com/documentation/api.html).

```
{{#photo-swipe onInitialZoomInEnd=(action "onInitialZoomInEnd") as |photoswipe|}}
  {{#each items as |item index|}}
    <img class="preview" src={{item.src}} {{action photoswipe.actions.open items (hash index=index) target=photoswipe}} />
  {{/each}}
{{/photo-swipe}}
```

## Configuration

### Custom variables and theme

You can use custom PhotoSwipe variables.

```
//We use $pswp__assets-path becouse images of default-skin stored in assets/images folder
$pswp__assets-path: 'images/';
@import "ember-photoswipe/main.scss";
@import "ember-photoswipe/default-skin/default-skin.scss";
```

## License
ember-photoswipe is released under the MIT License. See the bundled [LICENSE](LICENSE.md) file for details.
