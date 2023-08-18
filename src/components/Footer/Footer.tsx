import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Двоеглазов Евгений</h2>
      <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer;
