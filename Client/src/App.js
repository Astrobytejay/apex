import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './views/auth/signIn';
import SignUp from './views/auth/signUp';
import AdminLayout from './layouts/admin';
import UserLayout from './layouts/user';
import { ToastContainer } from 'react-toastify';

function App() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <ToastContainer />
      <Routes>
        {token && user?.role ? (
          user.role === 'user' ? (
            <Route path="/*" element={<UserLayout />} />
          ) : user.role === 'superAdmin' ? (
            <Route path="/*" element={<AdminLayout />} />
          ) : null
        ) : (
          <>
            {/* Public routes for unauthenticated users */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
