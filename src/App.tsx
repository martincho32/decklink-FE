import { useEffect } from 'react';
import { HashRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { testService } from './services';
import { Home, NotFound } from './pages';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';

const router = createBrowserRouter([
  { path: '/', element: <Home />},
  { path: '/login', element: <LogIn title="Log In" />},
  { path: '/signup', element: <SignUp title="Log In" />},
  { path: '*', element: <NotFound />},
])

function App() {
  useEffect(() => {
    testService.testApi().then((data) => console.log('data: ', data));
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

function WrappedApp() {
  return (
    <App />
  );
}

export default WrappedApp;
