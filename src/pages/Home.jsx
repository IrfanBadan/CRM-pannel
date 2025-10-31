import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <div className="text-center text-white mb-5">
        <h1 className="display-5 fw-bold text-primary">Welcome to LooQue CRM Panel</h1>
        <p className="lead text-muted">Attendance + Monthly reports — powerd by looQue.</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card luxury-card shadow-lg h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <div className="display-6 me-3"><i className="bi bi-person-badge" /></div>
                  <div>
                    <h5 className="card-title mb-0">Employee</h5>
                    <small className="text-muted">Login and mark your attendance</small>
                  </div>
                </div>
                <p className="card-text text-muted">Employees login with your appropriate ID</p>
              </div>
              <div className="mt-3"><Link to="/employee-login" className="btn btn-outline-light btn-sm">Go to Employee</Link></div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card luxury-card shadow-lg h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <div className="display-6 me-3"><i className="bi bi-people-fill" /></div>
                  <div>
                    <h5 className="card-title mb-0">Admin</h5>
                    <small className="text-muted">View reports & calculate salary</small>
                  </div>
                </div>
                <p className="card-text text-muted">Admin can view daily and monthly attendance and compute salary.</p>
              </div>
              <div className="mt-3"><Link to="/admin" className="btn btn-outline-light btn-sm">Go to Admin</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}