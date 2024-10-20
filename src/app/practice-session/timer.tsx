import { useEffect, useMemo, useRef, useState } from 'react';

interface TimerProps {
  totalSeconds: number;
  isCountingUp?: boolean;
  isRunning?: boolean;
  onComplete?: () => void;
  isLargeFont?: boolean;
}

// SOUND https://freesound.org/people/isaac32767/sounds/485978/
// SOUND HOOK https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/

export const Timer = ({
  totalSeconds,
  isCountingUp = false,
  isRunning,
  isLargeFont = false,
  onComplete = () => { },
}: TimerProps) => {
  const [seconds, setSeconds] = useState(totalSeconds);
  const timer = useRef<NodeJS.Timeout>();
  const toString = (time: number) =>
    `${time < 10 ? '0' : ''}${time.toString()}`;

  const timerSeconds = useMemo(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${toString(hours)}:${toString(minutes)}:${toString(sec)}`;
  }, [seconds]);

  const startTimer = () => {
    if (!timer.current) {
      timer.current = setInterval(
        () => setSeconds((prev) => prev + (isCountingUp ? 1 : -1)),
        1000,
      );
    }
  };

  const clearTimer = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };

  const endCondition = useMemo(
    () => (isCountingUp ? seconds >= 60 * 60 * 9 + 59 * 60 + 59 : seconds <= 0),
    [isCountingUp, seconds],
  );

  useEffect(() => {
    if (endCondition && timer.current) {
      clearTimer();
      onComplete();
      return;
    }
  }, [endCondition]);

  useEffect(() => {
    if (isRunning && !timer.current && !endCondition) {
      startTimer();
    }

    if (!isRunning && timer.current) {
      clearTimer();
    }
  }, [isRunning, startTimer, endCondition]);

  return (
    <h1
      className={`text-primary ${isLargeFont ? 'text-6xl font-extrabold' : 'text-2xl font-bold'
        }`}
    >
      {timerSeconds}
    </h1>
  );
};
