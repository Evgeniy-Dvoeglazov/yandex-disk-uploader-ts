function EmptyPage() {

  window.YaSendSuggestToken(
    'https://yandex-disk-uploader.vercel.app/empty-page',
    {
      'kek': true
    }
  )
  return (
    <div></div>
  )
}

export default EmptyPage;
