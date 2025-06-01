import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

import PlayerProfile from './components/player-profile';
import PlayersList from './components/players-list';
import NotFound from './components/not-found';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <header className="p-4 text-center">
            <Link to="/" className="text-2xl font-bold hover:underline">
              ♟ Chess Grandmasters
            </Link>
          </header>

          <Routes>
            <Route path="/" element={<PlayersList />} />
            <Route path="/player/:username" element={<PlayerProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
