'use client';

import { Button } from '@nextui-org/button';
import { Timer } from './timer';
import { useContext, useState } from 'react';
import { SessionContext } from './session';

export default function Header() {
  const { current, isRunning, setIsRunning } = useContext(SessionContext);

  return (
    <div className="sticky border-b-3 border-solid border-midblue w-full p-4 pl-10 pr-10 flex z-10 bg-whiteish top-16 justify-between items-center">
      <div className="flex justify-between flex-col items-start">
        <h1 className="font-bold text-4xl">Practice Session</h1>
        <div className="flex items-center gap-1">
          <h1 className="font-bold text-xl">Time elapsed:</h1>
          <Timer totalSeconds={0} isCountingUp isRunning={isRunning} />
        </div>
      </div>
      {current ? (
        <Button
          size="lg"
          color="primary"
          onPress={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
