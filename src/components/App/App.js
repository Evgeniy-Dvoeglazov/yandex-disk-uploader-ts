import './App.css';
import Header from '../Header/Header';
import Uploader from '../Uploader/Uploader';
import Footer from '../Footer/Footer';
import { apiDisk } from '../../utils/DiskApi';

function App() {

  function upload(data) {
    const uploadfile = data.getAll('files');
    uploadfile.forEach((file) => {
      apiDisk.getUrl(file)
        .then((res) => {
          apiDisk.uploadFiles(res.href, file)
            .then(() => {
              console.log(file);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }

  return (
    <div className='app'>
      <Header />
      <Uploader
        upload={upload}
      />
      <Footer />
    </div>
  );
}

export default App;
