function EmptyPage() {

  window.YaSendSuggestToken(
    'https://evgeniy-dvoeglazov.github.io/yandex_disk_uploader/',
    {
      'kek': true
    }
  )
  return (
    <div></div>
  )
}

export default EmptyPage;
