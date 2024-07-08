export default class Section {
  constructor({ renderer }, elementSelector) {
    this._renderer = renderer;
    //this._renderedItems = items;
    this._element = document.querySelector(elementSelector);
  }

  //constructor({ items, renderer }, elementSelector) {

  // renderItems() {
  //   this._renderedItems.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  renderItems(items) {
    items.reverse().forEach((item) => this._renderer(item));
  }

  addItems(item) {
    this._element.prepend(item);
  }
}
