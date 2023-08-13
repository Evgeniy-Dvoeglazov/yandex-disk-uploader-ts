import './NotFoundPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className='notFoundPage'>
      <div className='notFoundPage__container'>
        <h2 className='notFoundPage__title'>404</h2>
        <p className='notFoundPage__description'>Страница не&nbsp;найдена</p>
        <Link to='/' className='notFoundPage__link'>Назад</Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
