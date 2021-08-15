import Controller from '@ember/controller';

class Item {
  constructor(id, w, h) {
    this.id = id;
    this.w = w;
    this.h = h;
  }

  get src() {
    return `https://picsum.photos/${this.w}/${this.h}?random&id=${this.id}`;
  }
}

export default class ApplicationController extends Controller {
  items = [
    new Item(1, 1024, 768),
    new Item(2, 1024, 768),
    new Item(3, 1024, 768),
    new Item(4, 1024, 768),
    new Item(5, 1024, 768),
  ]

  get firstObject() {
    return this.items[0];
  }
}
