import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, LogIn, NotFound, SignUp, MyDesks, DeckDetail } from './pages';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute user={{}} />}>
          <Route path="/founder/decks" element={<MyDesks />} />
          <Route path="/deck/:id" element={<DeckDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
