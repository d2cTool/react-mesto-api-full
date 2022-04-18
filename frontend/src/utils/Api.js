import { apiUrl } from "./const";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = headers.authorization;
  }

  getInitialCards() {
    return this._fetchRequest(`/cards`, { headers: this._headers });
  }

  postCard(name, link) {
    return this._fetchRequest(`/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._fetchRequest(`/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  changeLikeCardStatus(id, needLike) {
    return needLike ? this.addLike(id) : this.removeLike(id);
  }

  addLike(id) {
    return this._fetchRequest(`/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  removeLike(id) {
    return this._fetchRequest(`/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  getUserInfo() {
    return this._fetchRequest(`/users/me`, {
      headers: this._headers,
    });
  }

  patchUserInfo(name, about) {
    return this._fetchRequest(`/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  patchUserAvatar(avatar) {
    return this._fetchRequest(`/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  _fetchRequest(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }
}

export const api = new Api({
  baseUrl: apiUrl,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});
