import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/my-profile">my profile</Link></li>
        <li><Link to="/daily-schedule">daily schedule</Link></li>
        <li><Link to="/speech-practice">Speech Practice</Link></li>
        <li><Link to="/stroke-centers">Stroke Centers</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
