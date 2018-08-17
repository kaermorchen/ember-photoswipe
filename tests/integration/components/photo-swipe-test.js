import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { alias } from '@ember/object/computed';

module('Integration | Component | photo swipe', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{photo-swipe}}`);

    assert.dom('.pswp').exists();
  });

  test('pswpOptions is passed', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [{
      src: 'https://picsum.photos/1024/768?image=0',
      w: 1024,
      h: 768,
    }]);

    this.set('onInitialZoomInEnd', () => {
      assert.dom('.pswp').hasClass('test-class');
      done();
    });

    await render(hbs`
      {{#photo-swipe items=items history=false mainClass="test-class" onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
        <img class="preview" src={{items.firstObject.src}} onclick={{action photoSwipe.actions.open}}>
      {{/photo-swipe}}
    `);

    await click('.preview');
  });

  test('pswpUIOptions is passed', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [{
      src: 'https://picsum.photos/1024/768?image=0',
      w: 1024,
      h: 768,
    }]);

    this.set('onInitialZoomInEnd', () => {
      assert.dom('.pswp__button.pswp__button--close').hasClass('pswp__element--disabled');
      done();
    });

    await render(hbs`
      {{#photo-swipe items=items history=false closeEl=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
        <img class="preview" src={{items.firstObject.src}} onclick={{action photoSwipe.actions.open}}>
      {{/photo-swipe}}
    `);

    await click('.preview');
  });

  test('should be trigger action', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [{
      src: 'https://picsum.photos/1024/768?image=0',
      w: 1024,
      h: 768,
    }]);

    this.set('onInitialZoomInEnd', () => {
      assert.ok(true, "onInitialZoomInEnd triggered");
      done();
    });

    await render(hbs`
      {{#photo-swipe items=items history=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
        <img class="preview" src={{items.firstObject.src}} onclick={{action photoSwipe.actions.open}}>
      {{/photo-swipe}}
    `);

    await click('.preview');
  });

  test('pass options', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [{
      src: 'https://picsum.photos/1024/768?image=0',
      w: 1024,
      h: 768,
    }, {
      src: 'https://picsum.photos/768/1024/nature/2',
      w: 768,
      h: 1024,
    }]);

    this.set('onInitialZoomInEnd', () => {
      assert.dom('.pswp__bg').hasAttribute('style', 'opacity: 0;');
      done();
    });

    await render(hbs`
      {{#photo-swipe items=items history=false onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
        <img class="preview" src={{items.firstObject.src}} onclick={{action photoSwipe.actions.open (hash bgOpacity=0)}}>
      {{/photo-swipe}}
    `);

    await click('.preview');
  });

  test('pass items of Ember.Object', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    const Item = EmberObject.extend({
      src: alias('path')
    });

    this.set('items', [
      Item.create({
        path: 'https://picsum.photos/1024/768?image=0',
        w: 1024,
        h: 768,
      }),
      Item.create({
        path: 'https://picsum.photos/1024/768/nature/2',
        w: 768,
        h: 1024,
      })
    ]);

    this.set('onInitialZoomInEnd', () => {
      assert.equal(this.get('pswp.items.length'), this.get('items.length'));
      done();
    });

    await render(hbs`
      {{#photo-swipe items=items history=false pswp=pswp onInitialZoomInEnd=(action onInitialZoomInEnd) as |photoSwipe|}}
        <img class="preview" src={{items.firstObject.src}} onclick={{action photoSwipe.actions.open (hash bgOpacity=0)}}>
      {{/photo-swipe}}
    `);

    await click('.preview');
  });
});
