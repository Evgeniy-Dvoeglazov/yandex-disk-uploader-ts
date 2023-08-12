const apiConfig = {
  baseUrl: 'https://cloud-api.yandex.net/v1/disk/resources/upload'
}

class DiskApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUrl(file, data) {
    return fetch(`${this._url}?path=${file.name}&overwrite=true`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `OAuth ${data.access_token}`
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  uploadFiles(uploadUrl, data) {
    return fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data
    })
      .then((res) => {
        if (res.ok) {
          return true;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

const apiDisk = new DiskApi(apiConfig);
export { apiDisk };
