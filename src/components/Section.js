export default class Section {
  constructor({ renderer }, elementSelector) {
    this._renderer = renderer;
    this._element = document.querySelector(elementSelector);
  }

  renderItems(items) {
    items.reverse().forEach((item) => this._renderer(item));
  }

  addItems(item) {
    this._element.prepend(item);
  }
}
