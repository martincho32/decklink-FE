import { Link } from 'react-router-dom';
import { MainLayout } from '../../components';

export default function ErrorPage() {
  return (
    <MainLayout>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
      <Link to="/">GO HOME</Link>
    </MainLayout>
  );
}
