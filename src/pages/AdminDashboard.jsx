import React, { useEffect, useState } from 'react';
import {
  getEmployees,
  getAttendanceForDate,
  getMonthlyReport,
  markAllAbsentForDate,
  togglePresentForId
} from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminDashboard() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [view, setView] = useState('daily');
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [perDayRate, setPerDayRate] = useState(500);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setEmployees(getEmployees()), []);
  useEffect(() => setAttendance(getAttendanceForDate(date)), [date]);

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const handleMarkAllAbsent = () => {
    markAllAbsentForDate(date);
    setAttendance(getAttendanceForDate(date));
  };

  const showToastMessage = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggle = (id) => {
    togglePresentForId(id, date);
    setAttendance(getAttendanceForDate(date));
    const emp = employees.find(e => e.id === id);
    const status = attendance[id] ? 'Absent' : 'Present';
    showToastMessage(`Marked ${emp?.name || id} as ${status}`);
  };

  const monthly = getMonthlyReport(month);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center glass-card p-3 mb-4">
        <h3 className="text-center text-md-start mb-3 mb-md-0 fw-bold text-primary">Admin Dashboard</h3>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger" onClick={handleMarkAllAbsent}>
            Mark All Absent
          </button>
          <button className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
      </div>

      {showToast && (
        <div className="toast-glass">{toastMsg}</div>
      )}

      {/* Filters */}
      <div className="glass-card p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">View</label>
            <select className="form-select" value={view} onChange={e => setView(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            {view === 'daily' ? (
              <>
                <label className="form-label fw-semibold">Select Date</label>
                <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} />
              </>
            ) : (
              <>
                <label className="form-label fw-semibold">Select Month</label>
                <input type="month" className="form-control" value={month} onChange={e => setMonth(e.target.value)} />
              </>
            )}
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Per-day Rate (₹)</label>
            <input
              type="number"
              className="form-control"
              value={perDayRate}
              onChange={e => setPerDayRate(Number(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="glass-card p-3 table-responsive">
        {view === 'daily' ? (
          <>
            <h5 className="mb-3 text-primary">Daily Attendance - {date}</h5>
            <table className="table table-bordered align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(e => {
                  const present = !!attendance[e.id];
                  return (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>
                        <span className={`badge ${present ? 'bg-success' : 'bg-danger'}`}>
                          {present ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => toggle(e.id)}>
                          {present ? 'Mark Absent' : 'Mark Present'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h5 className="mb-3 text-primary">Monthly Report - {month}</h5>
            <table className="table table-bordered align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Present Days</th>
                  <th>Total Days</th>
                  <th>Salary (₹)</th>
                </tr>
              </thead>
              <tbody>
                {monthly.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.presentDays}</td>
                    <td>{row.totalDays}</td>
                    <td>{row.presentDays * perDayRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
