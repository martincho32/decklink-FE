import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, LogIn, NotFound, SignUp, MyDesks, DeckDetail } from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/founder/decks" element={<MyDesks />} />
          </Route>
          <Route path="/deck/:id" element={<DeckDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
