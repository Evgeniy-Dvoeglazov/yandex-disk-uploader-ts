const apiConfig = {
  baseUrl: 'https://cloud-api.yandex.net/v1'
}

class DiskApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUrl(file) {
    return fetch(`${this._url}/disk/resources/upload?path=${file.name}&overwrite=true`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'OAuth y0_AgAAAABrGBkdAApJ9QAAAADpXos-LxSBIU4QQiyaWVXhq15HGTaiWI8'
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
