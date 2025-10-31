import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Home from './pages/Home';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ensureInitialData, dailyResetIfNeeded } from './utils/storage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  useEffect(()=>{
    ensureInitialData();
    dailyResetIfNeeded();
  },[]);

  return (
    <div className="app-bg min-vh-100">
      <TopNav />
      <div className="container py-5">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/employee-login' element={<EmployeeLogin/>} />
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path="/admin/dashboard" element={
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
} />
        </Routes>
      </div>
    </div>
  );
}