import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, LogIn, NotFound, SignUp } from './pages';
import { testService } from './services';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <LogIn title="Log In" /> },
  { path: '/signup', element: <SignUp title="Log In" /> },
  { path: '*', element: <NotFound /> },
]);

function App() {
  useEffect(() => {
    testService.testApi().then((data) => console.log('data: ', data));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
