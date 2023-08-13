import './App.css';
import Header from '../Header/Header';
import UpLoader from '../UpLoader/UpLoader'
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import EmptyPage from '../EmptyPage/EmptyPage';
import { apiDisk } from '../../utils/DiskApi';
import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isServerError, setIsServerError] = useState(false);



  function upload(data) {
    setIsLoading(true);
    const uploadfile = data.getAll('files');
    uploadfile.forEach((file) => {
      window.YaAuthSuggest.init(
        {
          client_id: '7f347035f6f1453e910bd1e138b3e6f9',
          response_type: 'token',
          redirect_uri: 'https://evgeniy-dvoeglazov.github.io/yandex_disk_uploader/empty-page'
        },
        'https://evgeniy-dvoeglazov.github.io/yandex_disk_uploader'
      )
        .then(({
          handler
        }) => handler())
        .then(data => {
          console.log('Сообщение с токеном', data);
          apiDisk.getUrl(file, data)
            .then((res) => {
              apiDisk.uploadFiles(res.href, file)
                .then(() => {
                  setIsUploadSuccess(true);
                })
                .catch((err) => {
                  console.log(err);
                  setIsServerError(true);
                });
            })
            .catch((err) => {
              console.log(err);
              setIsServerError(true);
            });
        })
        .catch(error => console.log('Обработка ошибки', error))
        .finally(() => {
          setIsLoading(false);
        });
    })
  }

  function deleteUploadInfo() {
    setIsUploadSuccess(false);
    setIsServerError(false);
  }

  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;
