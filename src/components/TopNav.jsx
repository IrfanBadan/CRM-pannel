import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNav(){
  const loc = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-glass">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">LooQue</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className={'nav-link '+(loc.pathname==='/'? 'active':'')} to="/">Home</Link></li>
            <li className="nav-item"><Link className={'nav-link '+(loc.pathname.startsWith('/employee')? 'active':'')} to="/employee-login">Employee</Link></li>
            <li className="nav-item"><Link className={'nav-link '+(loc.pathname.startsWith('/admin')? 'active':'')} to="/admin">Admin</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}