import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import UpLoader from '../UpLoader/UpLoader'
import EmptyPage from '../EmptyPage/EmptyPage';
import { Routes, Route } from 'react-router-dom';
import { apiDisk } from '../../utils/DiskApi';
import { useState } from 'react';

declare global {
  interface Window {
    YaAuthSuggest:any;
  }
}

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [tokenInfo, setTokenInfo] = useState({});
  const [isAuthError, setIsAuthError] = useState(false);

  function uploadFiles(data: any, tokenData: any) {

    const uploadfile = data.getAll('files');

    uploadfile.forEach((file: any) => {
      setIsLoading(true);
      apiDisk.getUrl(file, tokenData)
        .then((res) => {
          setIsLoading(true);
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
          setIsLoading(false);
        })
    })
  }

  function upload(data: any) {

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
        } :any) => handler())
        .then((tokenData: any) => {
          console.log('Сообщение с токеном', tokenData);
          uploadFiles(data, tokenData);
          setTokenInfo(tokenData);
          setIsAuth(true);
        })
        .catch((error: any) => {
          console.log('Обработка ошибки', error);
          setIsAuthError(true);
          setIsLoading(false);
        });
    }
    else {
      uploadFiles(data, tokenInfo);
    }
  }

  function deleteUploadInfo() {
    setIsUploadSuccess(false);
    setIsServerError(false);
    setIsAuthError(false);
  }

  function deleteAuthError() {
    setIsAuthError(false);
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
              isAuthError={isAuthError}
              deleteAuthError={deleteAuthError}
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
