import { apiUrl } from "./const";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getInitialCards() {
    return this._request({
      endPoint: 'cards',
      method: 'GET'
    });
  }

  postCard(name, link) {
    return this._request({
      endPoint: 'cards',
      body: {
        name: name,
        link: link,
      },
    });
  }

  deleteCard(id) {
    return this._request({
      endPoint: `cards/${id}`,
      method: "DELETE",
    });
  }

  changeLikeCardStatus(id, needLike) {
    return needLike ? this.addLike(id) : this.removeLike(id);
  }

  addLike(id) {
    return this._request({
      endPoint: `cards/${id}/likes`,
      method: "PUT",
    });
  }

  removeLike(id) {
    return this._request({
      endPoint: `cards/${id}/likes`,
      method: "DELETE",
    });
  }

  getUserInfo() {
    return this._request({
      endPoint: `users/me`,
      method: "GET",
    });
  }

  patchUserInfo(name, about) {
    return this._request({
      endPoint: `users/me`,
      method: "PATCH",
      body: {
        name: name,
        about: about,
      },
    });
  }

  patchUserAvatar(avatar) {
    return this._request({
      endPoint: `users/me/avatar`,
      method: "PATCH",
      body: {
        avatar: avatar,
      },
    });
  }

  _request({ endPoint, method = "POST", body }) {
    const token = localStorage.getItem('token');
    const config = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(!!token && { Authorization: `Bearer ${token}` }),
      },
      ...(!!body && { body: JSON.stringify(body) }),
    };
    return fetch(`${apiUrl}/${endPoint}`, config).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  };
}

export const api = new Api({ baseUrl: apiUrl });
