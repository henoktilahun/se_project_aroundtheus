export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        this._handleResponse(res);
        // if (res.ok) {
        //   return res.json();
        // }
        // // if the server returns an error, reject the promise
        // return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }
  //GET https://around-api.en.tripleten-services.com/v1/users/me

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me

  editProfile() {}

  //POST https://around-api.en.tripleten-services.com/v1/cards

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  //PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  addLike() {}

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  removeLike() {}

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
  updateAvatar() {}
}
