export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(cardData) {
    if (this._nameElement) {
      this._nameElement.textContent = cardData.name;
    }
    if (this._jobElement) {
      this._jobElement.textContent = cardData.about;
    }
    if (this._avatarElement) {
      this._avatarElement.src = cardData.avatar;
    }
  }
}
