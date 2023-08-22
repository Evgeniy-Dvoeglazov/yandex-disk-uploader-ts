interface ApiConfig {
  baseUrl: string
}

const apiConfig: ApiConfig = {
  baseUrl: 'https://cloud-api.yandex.net/v1/disk/resources/upload'
}

class DiskApi {
  _url: string

  constructor(options: ApiConfig) {
    this._url = options.baseUrl;
  }

  _checkResponse(res: any): Promise<any> {
    console.log(res)
    if (res.ok) {
      console.log('rabotaet');
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUrl(file: any, data: any): Promise<any> {
    console.log(file)
    console.log(data)
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

  uploadFiles(uploadUrl: string, data: any): Promise<true> {
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

const apiDisk: DiskApi = new DiskApi(apiConfig);
export { apiDisk };
