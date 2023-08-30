import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import {
  Landing,
  LogIn,
  NotFound,
  SignUp,
  MyDecks,
  DeckCreation,
  DeckEdit,
  DeckDetail,
  Presentation,
  Referrals,
  ForgotPassword,
  ResetPassword,
} from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, UIProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/founder/decks" element={<MyDecks />} />
                <Route path="/founder/referrals" element={<Referrals />} />
                <Route path="/founder/deck/create" element={<DeckCreation />} />
                <Route path="/founder/deck/edit/:id" element={<DeckEdit />} />
                <Route path="/founder/deck/:id" element={<DeckDetail />} />
              </Route>
              <Route
                path="/preview/:customDeckLink"
                element={<Presentation />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
