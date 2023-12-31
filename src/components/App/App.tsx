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
    YaAuthSuggest: any;
  }
}

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [tokenInfo, setTokenInfo] = useState<any | null>(null);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);

  function uploadFiles(data: FormData, tokenData: any): void {

    const uploadfile: any = data.getAll('files');

    uploadfile.forEach((file: File): void => {
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

  function upload(data: FormData): void {

    setIsLoading(true);
    if (!isAuth) {
      window.YaAuthSuggest.init(
        {
          client_id: 'facb906776434af78fc01e5cd8dabc53',
          response_type: 'token',
          redirect_uri: 'https://yandex-disk-uploader-ts.vercel.app/empty-page'
        },
        'https://yandex-disk-uploader-ts.vercel.app'
      )
        .then(({
          handler
        }: any) => handler())
        .then((tokenData: any) => {
          console.log('Сообщение с токеном', tokenData);
          uploadFiles(data, tokenData);
          setTokenInfo(tokenData);
          setIsAuth(true);
        })
        .catch((error: string) => {
          console.log('Обработка ошибки', error);
          setIsAuthError(true);
          setIsLoading(false);
        });
    }
    else {
      uploadFiles(data, tokenInfo);
    }
  }

  function deleteUploadInfo(): void {
    setIsUploadSuccess(false);
    setIsServerError(false);
    setIsAuthError(false);
  }

  function deleteAuthError(): void {
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
