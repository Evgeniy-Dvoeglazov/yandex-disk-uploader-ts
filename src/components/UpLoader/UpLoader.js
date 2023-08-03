import './UpLoader.css';
import { useDropzone } from 'react-dropzone';

function UpLoader() {

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 2
  });


  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <h2>Перетащите файлы в эту область или нажмите, чтобы выбрать их</h2>
        <em>(Максимальное количество файлов - 100)</em>
      </div>
      {
        fileRejections.length === 0
          ?
          ''
          :
          <p>Ошибка. Превышено максимально количество файлов</p>
      }

    </section>
  );
}

export default UpLoader;
