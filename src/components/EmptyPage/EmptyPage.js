function EmptyPage() {

  window.YaSendSuggestToken(
    'https://yandex-disk-uploader.vercel.app',
    {
      'kek': true
    }
  )
  return (
    <div></div>
  )
}

export default EmptyPage;
