import React from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import HolidayPopup from './components/ui/HolidayPopup';
import CookieConsent from './components/ui/CookieConsent';
import BackToTop from './components/ui/BackToTop';

// Pages
import Home from './pages/Home';
import ServicesHub from './pages/ServicesHub';
import ServiceDetail from './pages/ServiceDetail';
import Realizations from './pages/Realizations';
import Contact from './pages/Contact';
import About from './pages/About';
import OchranaOsobnychUdajov from './pages/OchranaOsobnychUdajov';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <HolidayPopup />
      <CookieConsent />
      <BackToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sluzby" element={<ServicesHub />} />
          
          {/* Dynamic Service Routes */}
          <Route path="/eventy-a-priestory" element={<ServiceDetail />} />
          <Route path="/it-servis" element={<ServiceDetail />} />
          <Route path="/marketing-a-reklama" element={<ServiceDetail />} />
          <Route path="/sluzby/:id" element={<ServiceDetail />} />

          <Route path="/realizacie" element={<Realizations />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/ochrana-osobnych-udajov" element={<OchranaOsobnychUdajov />} />
          
          {/* 404 Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
