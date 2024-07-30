import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/my-profile">my profile</Link></li>
        <li><Link to="/daily-schedule">daily schedule</Link></li>
        <li><Link to="/speech-practice">speech practice</Link></li>
        <li><Link to="/stroke-centers">stroke centers</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
