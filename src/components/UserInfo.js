export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(cardData) {
    if (this._nameElement) {
      this._nameElement.textContent = cardData.title;
    }
    if (this._jobElement) {
      this._jobElement.textContent = cardData.subtitle;
    }
  }
}
