interface ApiConfig {
  baseUrl: string
}

const apiConfig: ApiConfig = {
  baseUrl: 'https://cloud-api.yandex.net/v1/disk/resources/upload'
}

class DiskApi {
  _url: string

  constructor(options: any) {
    this._url = options.baseUrl;
  }

  _checkResponse(res: any) {
    if (res.ok) {
      console.log('rabotaet');
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUrl(file: any, data: any) {
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

  uploadFiles(uploadUrl: string, data: any) {
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
