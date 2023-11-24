import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='/' element={<>
          <a className='m-3' href="http://localhost:3000/register">Register</a>
          <a className='m-3' href="http://localhost:3000/login">Login</a>
          <a className='m-3' href="http://localhost:3000/forgotpassword">Forgot Password</a>
          <a className='m-3' href="http://localhost:3000/resetpassword/:id">Reset Password</a>
        </>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:id' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
