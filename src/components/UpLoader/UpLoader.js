import './Uploader.css';
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

function UpLoader(props) {

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    margin: '0 40px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const focusedStyle = {
    borderColor: '#2196f3'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

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
      {file.path} - {(file.size / 1000000).toFixed(1)} Мб
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
        className: `dropzone

      ${isDragAccept ? 'dropzone_acceptStyle' : ''}
      ${isDragReject ? 'dropzone_rejectStyle' : ''}`
      })}>
        <input {...getInputProps()} />
        <h2 className='uploader__title'>Перетащите файлы в эту область или нажмите, чтобы выбрать их</h2>
        <em className='uploader__rule'>(Максимальное количество файлов - 100)</em>
      </div>
      <button className='uploader__button' onClick={onDrop}>Button</button>
      <aside className='uploader__files'>
        <h3 className='uploader__files-title'>Список выбранных файлов</h3>
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
