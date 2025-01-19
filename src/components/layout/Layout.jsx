import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import MobileNav from './MobileNav';

const Layout = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isAuthenticated && <Navbar />}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      {isAuthenticated && <MobileNav />}
    </div>
  );
};

export default Layout;
