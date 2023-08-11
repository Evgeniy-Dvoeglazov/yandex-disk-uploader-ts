import './App.css';
import Header from '../Header/Header';
import Uploader from '../Uploader/Uploader';
import Footer from '../Footer/Footer';
import { apiDisk } from '../../utils/DiskApi';
import { useState } from 'react';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  function upload(data) {
    setIsLoading(true);
    const uploadfile = data.getAll('files');
    uploadfile.forEach((file) => {
      apiDisk.getUrl(file)
        .then((res) => {
          setIsLoading(true);
          apiDisk.uploadFiles(res.href, file)
            .then(() => {
              setIsUploadSuccess(true);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }

  function deleteSuccessInfo() {
    setIsUploadSuccess(false);
  }

  return (
    <div className='app'>
      <Header />
      <Uploader
        upload={upload}
        isLoading={isLoading}
        isUploadSuccess={isUploadSuccess}
        deleteSuccessInfo={deleteSuccessInfo}
      />
      <Footer />
    </div>
  );
}

export default App;
