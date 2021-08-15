import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | photo-swipe', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<PhotoSwipe />`);

    assert.dom('.pswp').exists();
  });

  test('pswpOptions is passed', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [
      {
        src: 'https://picsum.photos/1024/768?random&id=0',
        w: 1024,
        h: 768,
      },
    ]);

    this.set('onInitialZoomInEnd', () => {
      assert.dom('.pswp').hasClass('test-class');
      done();
    });

    await render(hbs`
      <PhotoSwipe @items={{this.items}} @history={{false}} @mainClass="test-class" @onInitialZoomInEnd={{this.onInitialZoomInEnd}} as |photoSwipe|>
        <img class="preview" alt="Preview" role="button" src={{this.items.firstObject.src}} {{on 'click' photoSwipe.actions.open}} >
      </PhotoSwipe>
    `);

    await click('.preview');
  });

  test('pswpUIOptions is passed', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [
      {
        src: 'https://picsum.photos/1024/768?random&id=0',
        w: 1024,
        h: 768,
      },
    ]);

    this.set('onInitialZoomInEnd', () => {
      assert
        .dom('.pswp__button.pswp__button--close')
        .hasClass('pswp__element--disabled');
      done();
    });

    await render(hbs`
      <PhotoSwipe @items={{this.items}} @history={{false}} @closeEl={{false}} @onInitialZoomInEnd={{this.onInitialZoomInEnd}} as |photoSwipe|>
        <img class="preview" alt="Preview" role="button" src={{this.items.firstObject.src}} {{on 'click' photoSwipe.actions.open}} >
      </PhotoSwipe>
    `);

    await click('.preview');
  });

  test('should be trigger action', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [
      {
        src: 'https://picsum.photos/1024/768?random&id=0',
        w: 1024,
        h: 768,
      },
    ]);

    this.set('onInitialZoomInEnd', () => {
      assert.ok(true, 'onInitialZoomInEnd triggered');
      done();
    });

    await render(hbs`
      <PhotoSwipe @items={{this.items}} @history={{false}} @onInitialZoomInEnd={{this.onInitialZoomInEnd}} as |photoSwipe|>
        <img class="preview" alt="Preview" role="button" src={{this.items.firstObject.src}} {{on 'click' photoSwipe.actions.open}} >
      </PhotoSwipe>
    `);

    await click('.preview');
  });

  test('pass options', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    this.set('items', [
      {
        src: 'https://picsum.photos/1024/768?random&id=0',
        w: 1024,
        h: 768,
      },
      {
        src: 'https://picsum.photos/1024/768?random&id=1',
        w: 768,
        h: 1024,
      },
    ]);

    this.set('onInitialZoomInEnd', () => {
      assert.dom('.pswp__bg').hasAttribute('style', 'opacity: 0;');
      done();
    });

    await render(hbs`
      <PhotoSwipe @items={{this.items}} @history={{false}} @onInitialZoomInEnd={{this.onInitialZoomInEnd}} as |photoSwipe|>
        <img class="preview" alt="Preview" role="button" src={{this.items.firstObject.src}} {{on 'click' (fn photoSwipe.actions.open (hash bgOpacity=0))}} >
      </PhotoSwipe>
    `);

    await click('.preview');
  });

  test('pass title', async function (assert) {
    assert.expect(1);
    const done = assert.async();
    const title = 'Hello World';

    class Item {
      constructor(src, w, h, title) {
        this.src = src;
        this.w = w;
        this.h = h;
        this.title = title;
      }
    }

    this.set('items', [
      new Item('https://picsum.photos/1024/768?random&id=0', 1024, 768, title),
      new Item('https://picsum.photos/1024/768?random&id=1', 1024, 768, title),
    ]);

    this.set('onInitialZoomInEnd', () => {
      assert.dom('.pswp__caption__center').hasText(title);
      done();
    });

    await render(hbs`
      <PhotoSwipe @items={{this.items}} @history={{false}} @onInitialZoomInEnd={{this.onInitialZoomInEnd}} as |photoSwipe|>
        <img class="preview" alt="Preview" role="button" src={{this.items.firstObject.src}} {{on 'click' photoSwipe.actions.open}} >
      </PhotoSwipe>
    `);

    await click('.preview');
  });
});
