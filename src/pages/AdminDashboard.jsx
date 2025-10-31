import React, { useEffect, useState } from 'react';
import {
  getEmployees,
  getAttendanceForDate,
  getMonthlyReport,
  markAllAbsentForDate,
  togglePresentForId
} from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Add this line

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
    <div className="admin-container">
      <div className="header-bar glass-card">
        <h3>Admin Dashboard</h3>
        <div className="d-flex gap-2">
          <button className="glass-btn danger" onClick={handleMarkAllAbsent}>
            Mark All Absent
          </button>
          <button className="glass-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      {showToast && (
        <div className="toast-glass">{toastMsg}</div>
      )}

      <div className="filters glass-card">
        <div>
          <label>View</label>
          <select value={view} onChange={e => setView(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {view === 'daily' ? (
          <div>
            <label>Select Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        ) : (
          <div>
            <label>Select Month</label>
            <input type="month" value={month} onChange={e => setMonth(e.target.value)} />
          </div>
        )}

        <div>
          <label>Per-day Rate (₹)</label>
          <input
            type="number"
            value={perDayRate}
            onChange={e => setPerDayRate(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      {view === 'daily' && (
        <div className="glass-card">
          <h5>Daily Attendance - {date}</h5>
          <table className="glass-table">
            <thead>
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
                      <span className={`status-badge ${present ? 'present' : 'absent'}`}>
                        {present ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td>
                      <button className="glass-btn small" onClick={() => toggle(e.id)}>
                        {present ? 'Mark Absent' : 'Mark Present'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {view === 'monthly' && (
        <div className="glass-card">
          <h5>Monthly Report - {month}</h5>
          <table className="glass-table">
            <thead>
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
        </div>
      )}
    </div>
  );
}
