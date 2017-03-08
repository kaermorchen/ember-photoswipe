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
  this.set('pswp', null);
  this.set('items', [{
    src: 'https://unsplash.it/1024/768/?random&image1',
    w: 1024,
    h: 768,
  }]);

  this.render(hbs`
    {{#photo-swipe history=false pswp=pswp as |photoSwipe|}}
      <button {{action 'open' items target=photoSwipe}}>Aaaaaaaaaaaaand Open</button>
    {{/photo-swipe}}
  `);
  this.$('button').click();

  assert.equal(this.get('pswp.options.history'), false);
});
