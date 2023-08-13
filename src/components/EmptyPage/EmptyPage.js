function EmptyPage() {

  window.YaSendSuggestToken(
    'https://yandex-disk-uploader.vercel.app',
    {
      flag: true
    }
  )
  return (
    <></>
  )
}

export default EmptyPage;
