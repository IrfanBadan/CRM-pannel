import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

export default function AdminLogin(){
  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');
  const [err,setErr] = useState('');
  const nav = useNavigate();



  useEffect(() => {
  if(localStorage.getItem('adminLoggedIn') === 'true'){
    nav('/admin/dashboard');
  }
}, []);


  function submit(e){
  e.preventDefault();
  if(user === ADMIN_USER && pass === ADMIN_PASS){
    localStorage.setItem('adminLoggedIn', 'true'); // ✅ persist login
    nav('/admin/dashboard');
  } else {
    setErr('Invalid credentials');
  }
}


  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card luxury-card p-4 shadow-lg">
          <h4 className="mb-3">Admin Login</h4>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input value={user} onChange={e=>setUser(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-outline-light w-100">Login</button>
          </form>
          {err && <div className="alert alert-danger mt-3">{err}</div>}
        </div>
      </div>
    </div>
  );
}