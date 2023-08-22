import './UpLoader.css';
import { useDropzone } from 'react-dropzone';
import preloader from '../../images/preloader.gif'
import { useState, useEffect } from 'react';

interface UpLoaderProps {
  upload: (data: any) => void
  isLoading: boolean
  isUploadSuccess: boolean
  deleteUploadInfo: () => void
  isServerError: boolean
  isAuthError: boolean
  deleteAuthError: () => void
}

interface File {
  path: string
  size: number
}

function UpLoader(props: UpLoaderProps) {

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  }: {
    acceptedFiles: globalThis.File[]
    getRootProps: any
    getInputProps: any
    isDragAccept: boolean
    isDragReject: boolean
  } = useDropzone();

  const maxFiles: number = 100;

  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [isMaxFiles, setIsMaxFiles] = useState<boolean>(false);

  const files: JSX.Element[] = selectedFiles.map((file: File) => {

    function handleDeleteFile(): void {
      deleteFile(file);
    }

    return (
      <li className='uploader__file' key={file.path}>
        <div className='uploader__file-info'>
          <p className='uploader__file-name'>{file.path}</p>
          <p className='uploader__file-size'>{(file.size / 1000000).toFixed(3)} Мб</p>
        </div>
        <button className={`uploader__delete-btn ${props.isLoading ? 'uploader__delete-btn_invisible' : ''}`} type='button' aria-label='delete-btn' onClick={handleDeleteFile}></button>
      </li>
    )
  });

  useEffect(() => {
    if ((props.isServerError || props.isUploadSuccess || props.isAuthError) && acceptedFiles.length === 0) {
      props.deleteUploadInfo();
    }
  }, [acceptedFiles.length])

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      setSelectedFiles((currentFiles) => currentFiles.concat([...acceptedFiles]).filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.path === value.path))))
    }
  }, [acceptedFiles])

  useEffect(() => {
    if (selectedFiles.length <= maxFiles || selectedFiles.length === 0) {
      setIsMaxFiles(false);
    } else {
      setIsMaxFiles(true);
    }
  }, [selectedFiles.length])

  useEffect(() => {
    if (props.isUploadSuccess) {
      setSelectedFiles([]);
    }
  }, [props.isUploadSuccess])

  function onSubmit(): void {
    props.deleteAuthError();
    const data: FormData = new FormData();

    selectedFiles.map((file: string) => {
      data.append('files', file);
    });
    props.upload(data);
  }

  function deleteFile(file: File): void {
    setSelectedFiles((currentFiles) => currentFiles.filter((currentFile: File) => currentFile.path !== file.path));
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
      {props.isLoading
        ?
        <img className='uploader__preloader' src={preloader} alt='иконка загрузки' />
        :
        <button className={
          `uploader__button
        ${(selectedFiles.length !== 0 && selectedFiles.length <= maxFiles && !props.isUploadSuccess) ? '' : 'uploader__button_disabled'}`
        } type='submit' onClick={onSubmit}>Загрузить файлы на Я.Диск</button>
      }
      {props.isUploadSuccess && <p className='uploader__success-text'>Файлы успешно загружены</p>}
      {props.isServerError && <p className='uploader__error'>Что-то пошло не так</p>}
      {props.isAuthError && <p className='uploader__error'>Ошибка авторизации</p>}
      {!props.isUploadSuccess &&
        <aside className='uploader__files'>
          {
            selectedFiles.length === 0
              ?
              ''
              :
              <h3 className='uploader__files-title'>Список выбранных файлов</h3>
          }
          <ul className='uploader__filelist'>{files}</ul>
        </aside>
      }
      {
        !isMaxFiles
          ?
          ''
          :
          <p className='uploader__error'>Ошибка. Превышено максимально количество файлов</p>
      }
    </section>
  );
}

export default UpLoader;
