// // 메인 화면 
import { Route, Routes } from 'react-router-dom';
import './bootstrap.min.css' // bootstrap
import AppLayout from './components/AppLayout';
import Login from './pages/users/Login';
import Logout from './pages/users/Logout';
import Home from './pages/Home';
import Signup from './pages/users/Signup';
import User from './pages/User';
import BecomeHost from './pages/posts/BecomeHost';
import Ammenities from './pages/Ammenities';
import Room from './pages/Room';
import Uploaded from './pages/Uploaded';
import LoginRequiredRoute from './utils/LoginRequiredRoute';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<LoginRequiredRoute><User /></LoginRequiredRoute>} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="users/logout" element={<Logout />} />
        <Route path="/users/regist" element={<LoginRequiredRoute><BecomeHost /></LoginRequiredRoute>} />
        <Route path= "/users/regist/result" element= {<Ammenities />} />
        <Route path= "/users/regist/uploaded" element= {<Uploaded />} />
        <Route path= "/room" element ={<Room />} />
      </Routes>
    </AppLayout>
  )
}

export default App;
