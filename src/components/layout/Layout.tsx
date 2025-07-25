import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BoltBadge from '../common/BoltBadge';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <BoltBadge />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;