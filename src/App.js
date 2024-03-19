// 페이지 등록 
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/users/Login';
import Logout from './pages/users/Logout';
import MyPage from './pages/users/MyPage';
import Home from './pages/Home';
import Signup from './pages/users/Signup';
import UploadPhoto from './pages/photos/UploadPhoto';
import InferResult from './pages/photos/InferResult';
import SubmitPost from './pages/posts/SubmitPost';
import LoginRequiredRoute from './utils/LoginRequiredRoute';
import SearchPostResult from './pages/posts/SearchPostResult';
import PostDetail from './pages/posts/PostDetail';
import SortedPostResult from './pages/posts/SortedPostResult';
import GuestReservations from './pages/users/guests/GuestReservations';
import HostReservations from './pages/users/hosts/HostReservations';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<LoginRequiredRoute><MyPage /></LoginRequiredRoute>} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/logout" element={<LoginRequiredRoute><Logout /></LoginRequiredRoute>} />
        <Route path="/users/guests/reservations" element={<LoginRequiredRoute><GuestReservations /></LoginRequiredRoute>} />
        <Route path="/users/hosts/reservations" element={<LoginRequiredRoute><HostReservations /></LoginRequiredRoute>} />

        <Route path="/photos/upload" element={<LoginRequiredRoute><UploadPhoto /></LoginRequiredRoute>} />
        <Route path="/photos/result" element={<LoginRequiredRoute><InferResult /></LoginRequiredRoute>} />

        <Route path="/posts/submit" element={<LoginRequiredRoute><SubmitPost /></LoginRequiredRoute>} />
        <Route path="/posts/search" element={<SearchPostResult />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/posts/sort" element={<SortedPostResult />} />
      </Routes>
    </AppLayout>
  )
}

export default App;
