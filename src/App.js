import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/users/Login';
import Logout from './pages/users/Logout';
import Home from './pages/Home';
import Signup from './pages/users/Signup';
import UploadPhoto from './pages/posts/UploadPhoto';
import InferenceResult from './pages/posts/InferenceResult';
import SubmitPost from './pages/posts/SubmitPost';
import LoginRequiredRoute from './utils/LoginRequiredRoute';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="users/logout" element={<LoginRequiredRoute><Logout /></LoginRequiredRoute>} />
        <Route path="/users/regist" element={<LoginRequiredRoute><UploadPhoto /></LoginRequiredRoute>} />
        <Route path= "/users/regist/result" element= {<LoginRequiredRoute><InferenceResult /></LoginRequiredRoute>} />
      </Routes>
    </AppLayout>
  )
}

export default App;
