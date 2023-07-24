import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Home,
  LogIn,
  MyDecksFounderPart,
  MyDecksVCPart,
  NotFound,
  SignUp,
} from './pages';
import { testService } from './services';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/founder/decks', element: <MyDecksFounderPart /> },
  { path: '/vc/decks', element: <MyDecksVCPart /> },
  { path: '*', element: <NotFound /> },
]);

function App() {
  useEffect(() => {
    testService.testApi().then((data) => console.log('data: ', data));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
