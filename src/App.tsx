import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

import PlayerProfile from './components/player-profile';
import PlayersList from './components/players-list';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <header className="p-4">
            <h1 className="text-2xl font-bold text-center">
              ♟ Chess Grandmasters
            </h1>
          </header>

          <Routes>
            <Route path="/" element={<PlayersList />} />
            <Route path="/player/:username" element={<PlayerProfile />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
