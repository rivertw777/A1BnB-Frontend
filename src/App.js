// 페이지 등록 
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/users/Login';
import Logout from './pages/users/Logout';
import Home from './pages/Home';
import Signup from './pages/users/Signup';
import UploadPhoto from './pages/posts/UploadPhoto';
import InferResult from './pages/posts/InferResult';
import SubmitPost from './pages/posts/SubmitPost';
import LoginRequiredRoute from './utils/LoginRequiredRoute';
import SearchPostResult from './pages/posts/SearchPostResult';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="users/logout" element={<LoginRequiredRoute><Logout /></LoginRequiredRoute>} />
        <Route path="/posts/upload" element={<LoginRequiredRoute><UploadPhoto /></LoginRequiredRoute>} />
        <Route path="/posts/result" element={<LoginRequiredRoute><InferResult /></LoginRequiredRoute>} />
        <Route path="/posts/submit" element={<LoginRequiredRoute><SubmitPost /></LoginRequiredRoute>} />
        <Route path="/posts/search" element={<SearchPostResult />} /> 
      </Routes>
    </AppLayout>
  )
}

export default App;
