import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Technology from './pages/Technology.jsx';
import Impact from './pages/Impact.jsx';
import Prototype from './pages/Prototype.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/prototype" element={<Prototype />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
