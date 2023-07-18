import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { testService } from './services';
import { Home } from './pages';

function App() {
  useEffect(() => {
    testService.testApi().then((data) => console.log('data: ', data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
