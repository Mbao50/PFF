import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Clubs from './pages/Clubs';
import Players from './pages/Players';
import Rankings from './pages/Rankings';
import Admin from './pages/Admin';
import ClubDetail from './pages/ClubDetail';
import PlayerDetail from './pages/PlayerDetail';
import MatchDetail from './pages/MatchDetail';
import NewsDetail from './pages/NewsDetail';
import SearchScreen from './pages/SearchScreen';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/players" element={<Players />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/clubs/:id" element={<ClubDetail />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/matches/:id" element={<MatchDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;