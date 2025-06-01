import { Link } from 'react-router-dom';
import {
  FixedSizeGrid as Grid,
  type GridChildComponentProps,
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useGetAllPlayers } from '../hooks/use-player';

const COLUMN_WIDTH = 250;
const ROW_HEIGHT = 72;

const PlayersList = () => {
  const { players, isLoading, error } = useGetAllPlayers();

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">{String(error)}</div>;
  if (!players || !players.length)
    return <div className="text-center text-red-500">No players :(</div>;

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.max(1, Math.floor(width / COLUMN_WIDTH));
          const rowCount = Math.ceil(players.length / columnCount);

          const Cell = ({
            columnIndex,
            rowIndex,
            style,
          }: GridChildComponentProps) => {
            const index = rowIndex * columnCount + columnIndex;
            if (index >= players.length) return null;

            const username = players[index];

            return (
              <div style={style} className="p-[8px]">
                <Link
                  to={`/player/${username}`}
                  className="block h-full w-full bg-white rounded shadow hover:shadow-lg transition p-4"
                >
                  <div className="font-semibold">{username}</div>
                </Link>
              </div>
            );
          };

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={Math.floor(width / columnCount)}
              height={height}
              rowCount={rowCount}
              rowHeight={ROW_HEIGHT}
              width={width}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default PlayersList;
