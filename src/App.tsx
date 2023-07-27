import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Landing,
  LogIn,
  NotFound,
  SignUp,
  MyDecks,
  DeckCreation,
} from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/founder/deck" element={<DeckCreation />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/founder/decks" element={<MyDecks />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
