export default class Section {
  constructor({ items, renderer }, elementSelector) {
    this._renderer = renderer;
    this._renderedItems = items;
    this._element = document.querySelector(elementSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItems(item) {
    this._element.prepend(item);
  }
}
