import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VerifyCode from './pages/VerifyCode';
import ForgetPassword from './pages/ForgetPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import ChooseAccount from './pages/ChooseAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/confirm" element={<ConfirmAccount name="Hafis" />} />
        <Route path="/choose-account" element={<ChooseAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
