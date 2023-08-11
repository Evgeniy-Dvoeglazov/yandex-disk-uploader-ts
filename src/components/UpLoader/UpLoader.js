import './Uploader.css';
import { useDropzone } from 'react-dropzone';

function UpLoader(props) {

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFiles: 2
  });

  const files = acceptedFiles.map(file => (
    <li className='uploader__file' key={file.path}>
      <p className='uploader__file-name'>{file.path}</p>
      <p className='uploader__file-size'>{(file.size / 1000000).toFixed(1)} Мб</p>
    </li>
  ));

  function onDrop() {

    const data = new FormData();
    acceptedFiles.map((file) => {
      data.append('files', file);
    });

    props.upload(data);
  }

  return (
    <section className='uploader'>
      <div {...getRootProps({
        className: `uploader__dropzone
      ${isDragAccept ? 'uploader__dropzone_acceptStyle' : ''}
      ${isDragReject ? 'uploader__dropzone_rejectStyle' : ''}`
      })}>
        <input {...getInputProps()} />
        <h2 className='uploader__dropzone-title'>Перетащите файлы в эту область или нажмите, чтобы выбрать их</h2>
        <em className='uploader__dropzone-rule'>(Максимальное количество файлов - 100)</em>
      </div>
      <button className={`uploader__button ${acceptedFiles.length !== 0 ? '' : 'uploader__button_disabled'}`} type='submit' onClick={onDrop}>Загрузить файлы на Я.Диск</button>
      <aside className='uploader__files'>
        {acceptedFiles.length === 0
          ?
          ''
          :
          <h3 className='uploader__files-title'>Список выбранных файлов</h3>
        }
        <ul className='uploader__filelist'>{files}</ul>
      </aside>
      {
        fileRejections.length === 0
          ?
          ''
          :
          <p className='uploader__error'>Ошибка. Превышено максимально количество файлов</p>
      }
    </section>
  );
}

export default UpLoader;
