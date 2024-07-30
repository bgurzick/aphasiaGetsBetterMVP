import React from 'react';
import Header from './Header';
import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <Navigation />
      <div className="content-container">
        {children}
      </div>
    </div>
  );
}

export default Layout;
