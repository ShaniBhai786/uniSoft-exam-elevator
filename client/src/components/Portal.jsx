import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Portal() {
  return (
    <div className="container">
      <h2>Welcome to Institute Portal</h2>
      <p>Manage your students, staff, and reports here.</p>
      <div className="tools">
        <Link to="notes" className='servicesLinks'>Notes</Link>
        <Link to="events" className='servicesLinks'>UpComing Events</Link>
        <Link to="results" className='servicesLinks'>Results</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Portal;
