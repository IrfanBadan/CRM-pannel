import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, markPresentById } from '../utils/storage';

export default function EmployeeLogin(){
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!id.trim()) return setName('');
    const emp = getEmployees().find(e=>e.id===id.trim().toUpperCase());
    setName(emp? emp.name : '');
  },[id]);

  function handleSubmit(e){
    e.preventDefault();
    if(!id.trim()){ setMessage('Enter Employee ID'); return; }
    const ok = markPresentById(id.trim().toUpperCase());
    if(ok) setMessage(`Welcome ${name||id}! You are marked present.`);
    else setMessage('Invalid Employee ID');
    setTimeout(()=>setMessage(''),3000);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card luxury-card p-4 shadow-lg">
          <h4 className="mb-3">Employee Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Employee ID</label>
              <input value={id} onChange={e=>setId(e.target.value)} className="form-control form-control-lg" placeholder="e.g. E001" />
            </div>

            <div className="mb-3">
              <label className="form-label">Name (auto-fill)</label>
              <input value={name} readOnly className="form-control" />
            </div>

            <button className="btn btn-primary w-100" type="submit">Mark Present</button>
          </form>

          {message && <div className="alert alert-info mt-3">{message}</div>}

        </div>
      </div>
    </div>
  );
}