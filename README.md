# Ember PhotoSwipe

An [ember-cli](http://www.ember-cli.com) addon for using [PhotoSwipe](http://photoswipe.com/) in Ember applications.

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

```
// app/controller/application.js
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
```

```
// app/templates/application.hbs
{{#photo-swipe as |photoswipe|}}
  {{#each attachments as |attachment|}}
    <img class="preview" src={{attachment.src}} {{action 'open' attachments options target=photoswipe}} />
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
