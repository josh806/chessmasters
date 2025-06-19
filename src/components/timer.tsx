const Timer = ({timeElapsed}: {timeElapsed: string}) => {
  return <p className="mt-4 font-mono">⏱ Last online: {timeElapsed}</p>;
}

export default Timer;