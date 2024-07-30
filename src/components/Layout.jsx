import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <Navigation />
      <div className="content-container">
        {children}
      </div>
      <Footer />
    </div>
    
  );
}

export default Layout;
