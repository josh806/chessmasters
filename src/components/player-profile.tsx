import { Link, useParams } from 'react-router-dom';
import { useGetCountry, useGetPlayer } from '../hooks/use-player';
import useElapsedTimeSince from '../hooks/use-elapsed-time-since';

const BackBtn = (
  <Link to="/" className="text-blue-500 underline mb-4 inline-block">
    ← Back to list
  </Link>
);

const PlayerProfile = () => {
  const { username = '' } = useParams();
  const { player, isLoading, error } = useGetPlayer(username);
  const { countryData } = useGetCountry(player?.country || '');
  const elapsed = useElapsedTimeSince(player?.last_online);

  if (isLoading) return <div className="text-center">Loading profile...</div>;
  if (error || !player)
    return (
      <div data-testid="player-error" className="text-center">
        <div className="text-red-500 mb-2">{error || 'Player not found'}</div>
        {BackBtn}
      </div>
    );

  return (
    <>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 data-testid="username" className="text-xl font-bold mb-2">
          {player.username}
        </h2>

        <p data-testid="country">
          <strong>Country:</strong> {countryData?.name || 'Unknown'}
        </p>
        <p data-testid="status">
          <strong>Status:</strong> {player.status}
        </p>
        <p>
          <strong>Joined:</strong>{' '}
          {new Date(player.joined * 1000).toLocaleDateString()}
        </p>
        <p className="mt-4 font-mono">⏱ Last online: {elapsed}</p>
      </div>
      <div className="max-w-xl mx-auto mt-6">{BackBtn}</div>
    </>
  );
};

export default PlayerProfile;
