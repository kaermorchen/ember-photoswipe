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
    src: 'https://unsplash.it/1024/768/?random&image1',
    w: 1024,
    h: 768,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.equal(this.$('.pswp__bg').css('opacity'), 0);
    done();
  });

  this.render(hbs`
    {{#photo-swipe history=false bgOpacity=0 onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
      <button {{action 'open' items target=photoSwipe}}>Aaaaaaaaaaaaand Open</button>
    {{/photo-swipe}}
  `);
  this.$('button').click();
});

test('should be trigger action', function (assert) {
  assert.expect(1);
  const done = assert.async();

  this.set('items', [{
    src: 'https://unsplash.it/1024/768/?random&image1',
    w: 1024,
    h: 768,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.ok(true, "onInitialZoomInEnd triggered");
    done();
  });

  this.render(hbs`
    {{#photo-swipe history=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoswipe|}}
      {{#each items as |item|}}
        <img src={{item.src}} {{action 'open' items target=photoswipe}} />
      {{/each}}
    {{/photo-swipe}}
  `);

  this.$('img').eq(0).click();
});

test('pass items only', function (assert) {
  assert.expect(1);
  const done = assert.async();

  this.set('items', [{
    src: 'https://unsplash.it/1024/768/?random&image1',
    w: 1024,
    h: 768,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.equal(this.$('img.pswp__img').length, this.get('items.length'));
    done();
  });

  this.render(hbs`
    {{#photo-swipe history=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoswipe|}}
      {{#each items as |item|}}
        <img src={{item.src}} {{action 'open' items target=photoswipe}} />
      {{/each}}
    {{/photo-swipe}}
  `);
  this.$('img').eq(0).click();
});

test('pass items and options', function (assert) {
  assert.expect(2);
  const done = assert.async();

  this.set('items', [{
    src: 'https://unsplash.it/1024/768/?random&image1',
    w: 1024,
    h: 768,
  },
  {
    src: 'https://unsplash.it/1024/768/?random&image2',
    w: 768,
    h: 1024,
  }]);

  this.set('onInitialZoomInEnd', () => {
    assert.equal(this.$('img.pswp__img').length, this.get('items.length'));
    assert.equal(this.$('.pswp__bg').css('opacity'), 0);
    done();
  });

  this.render(hbs`
    {{#photo-swipe history=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoswipe|}}
      {{#each items as |item|}}
        <img src={{item.src}} {{action 'open' items (hash bgOpacity=0) target=photoswipe}} />
      {{/each}}
    {{/photo-swipe}}
  `);
  this.$('img').eq(0).click();
});

test('pass options only', function (assert) {
  assert.expect(1);
  const done = assert.async();

  this.set('items', [{
    src: 'https://unsplash.it/1024/768/?random&image1',
    w: 1024,
    h: 768,
  },
  {
    src: 'https://unsplash.it/1024/768/?random&image2',
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
        <img src={{item.src}} {{action 'open' (hash bgOpacity=0) target=photoswipe}} />
      {{/each}}
    {{/photo-swipe}}
  `);
  this.$('img').eq(0).click();
});
