import './App.css';
import Header from '../Header/Header';
import UpLoader from '../UpLoader/UpLoader'
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import EmptyPage from '../EmptyPage/EmptyPage';
import { apiDisk } from '../../utils/DiskApi';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [dataToken, setDataToken] = useState({});

  function uploadFiles(data, tokenData) {

    const uploadfile = data.getAll('files');

    uploadfile.forEach((file) => {

      setIsLoading(true);
      apiDisk.getUrl(file, tokenData)
        .then((res) => {
          apiDisk.uploadFiles(res.href, file)
            .then(() => {
              setIsUploadSuccess(true);
            })
            .catch((err) => {
              console.log(err);
              setIsServerError(true);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setIsServerError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })
  }

  function upload(data) {

    setIsLoading(true);
    if (!isAuth) {
      window.YaAuthSuggest.init(
        {
          client_id: '7f347035f6f1453e910bd1e138b3e6f9',
          response_type: 'token',
          redirect_uri: 'https://yandex-disk-uploader.vercel.app/empty-page'
        },
        'https://yandex-disk-uploader.vercel.app'
      )
        .then(({
          handler
        }) => handler())
        .then(tokenData => {
          console.log('Сообщение с токеном', tokenData);
          uploadFiles(data, tokenData);
          setDataToken(tokenData);
          setIsAuth(true);
        })
        .catch(error => console.log('Обработка ошибки', error));
    }
    else {
      console.log(dataToken);
      uploadFiles(data, dataToken);
    }
  }

  function deleteUploadInfo() {
    setIsUploadSuccess(false);
    setIsServerError(false);
  }

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <UpLoader
              upload={upload}
              isLoading={isLoading}
              isUploadSuccess={isUploadSuccess}
              deleteUploadInfo={deleteUploadInfo}
              isServerError={isServerError}
            />
            <Footer />
          </>
        } />
        <Route path='/empty-page' element={
          <EmptyPage />
        } />
        <Route path='*' element={
          <NotFoundPage />
        } />
      </Routes>
    </div>
  );
}

export default App;
