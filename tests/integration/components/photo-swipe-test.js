import { alias } from '@ember/object/computed';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('photo-swipe', 'Integration | Component | photo swipe', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{photo-swipe}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#photo-swipe}}
      template block text
    {{/photo-swipe}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('pswpOptions is passed', function (assert) {
  assert.expect(1);
  const done = assert.async();

  this.set('items', [{
    src: 'http://lorempixel.com/1024/768/nature/1',
    w: 1024,
    h: 768,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.equal(this.$('.pswp__bg').css('opacity'), 0);
    done();
  });

  this.render(hbs`
    {{#photo-swipe items=items history=false bgOpacity=0 onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
      <button onclick={{action 'open' target=photoSwipe}}>Aaaaaaaaaaaaand Open</button>
    {{/photo-swipe}}
  `);
  this.$('button').click();
});

test('pswpUIOptions is passed', function (assert) {
  assert.expect(1);
  const done = assert.async();

  this.set('items', [{
    src: 'http://lorempixel.com/1024/768/nature/1',
    w: 1024,
    h: 768,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.ok(this.$('.pswp__button.pswp__button--close').hasClass('pswp__element--disabled'));
    done();
  });

  this.render(hbs`
    {{#photo-swipe items=items closeEl=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
      <button onclick={{action photoSwipe.actions.open}}>Aaaaaaaaaaaaand Open</button>
    {{/photo-swipe}}
  `);

  this.$('button').click();
});

test('should be trigger action', function (assert) {
  assert.expect(1);
  const done = assert.async();

  this.set('items', [{
    src: 'http://lorempixel.com/1024/768/nature/1',
    w: 1024,
    h: 768,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.ok(true, "onInitialZoomInEnd triggered");
    done();
  });

  this.render(hbs`
    {{#photo-swipe items=items history=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoswipe|}}
      {{#each items as |item|}}
        <img src={{item.src}} onclick={{action 'open' target=photoswipe}} />
      {{/each}}
    {{/photo-swipe}}
  `);

  this.$('img').eq(0).click();
});

test('pass options', function (assert) {
  assert.expect(1);
  const done = assert.async();

  this.set('items', [{
    src: 'http://lorempixel.com/1024/768/nature/1',
    w: 1024,
    h: 768,
  },
  {
    src: 'http://lorempixel.com/1024/768/nature/2',
    w: 768,
    h: 1024,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.equal(this.$('.pswp__bg').css('opacity'), 0);
    done();
  });

  this.render(hbs`
    {{#photo-swipe history=false items=items onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoswipe|}}
      {{#each items as |item|}}
        <img src={{item.src}} onclick={{action 'open' (hash bgOpacity=0) target=photoswipe}} />
      {{/each}}
    {{/photo-swipe}}
  `);
  this.$('img').eq(0).click();
});

test('pass items of Ember.Object', function (assert) {
  assert.expect(1);
  const done = assert.async();

  const Item = EmberObject.extend({
    src: alias('path')
  });

  this.set('items', [
    Item.create({
      path: 'http://lorempixel.com/1024/768/nature/1',
      w: 1024,
      h: 768,
    }),
    Item.create({
      path: 'http://lorempixel.com/1024/768/nature/2',
      w: 768,
      h: 1024,
    })
  ]);

  this.set('onInitialZoomInEnd', () => {
    assert.equal(this.get('pswp').items.length, this.get('items.length'));
    done();
  });

  this.render(hbs`
    {{#photo-swipe items=items history=false pswp=pswp onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoswipe|}}
      {{#each items as |item|}}
        <img src={{item.src}} onclick={{action 'open' target=photoswipe}} />
      {{/each}}
    {{/photo-swipe}}
  `);
  this.$('img').eq(0).click();
});
