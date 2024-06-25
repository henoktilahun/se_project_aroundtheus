export default class Section {
  constructor({ items, renderer }, elementSelector) {
    this._renderer = renderer;
    this._renderedItems = items;
    this._element = document.querySelector(elementSelector);
  }

  renderItems(items) {
    //use this._renderer to render the data into this._element
    //this.clear();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItems(item) {
    //take itm and render it into this._element
    this._element.append(item);
  }
}
