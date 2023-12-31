import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import UserDetailsProvider from './context/UserDetailsProvider'
function App() {
  return (
    <div className="App ">
      <UserDetailsProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword/:resetPasswordToken' element={<ResetPassword />} />
        </Routes>
      </UserDetailsProvider>
    </div>
  );
}

export default App;
