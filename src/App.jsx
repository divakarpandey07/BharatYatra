import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import StatePage from './pages/StatePage';
import DistrictPage from './pages/DistrictPage';
import PlacesPage from './pages/PlacesPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/states" element={<StatePage />} />
              <Route path="/state/:stateId" element={<DistrictPage />} />
              <Route path="/district/:stateId/:districtId" element={<PlacesPage />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
