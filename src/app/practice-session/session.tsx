'use client';

import { createContext, useMemo, useState } from 'react';
import { pieces } from '../pieces';
import Header from './header';
import { Timer } from './timer';

export const SessionContext = createContext<{
  current: Block | undefined;
  completeCurrent: () => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}>({
  current: undefined,
  completeCurrent: () => {},
  isRunning: false,
  setIsRunning: () => {},
});

export default function Session() {
  pieces;
  const session: Session = {
    userId: 1,
    id: 1,
    blocks: [
      {
        sessionId: 1,
        id: 1,
        index: 0,
        isCompleted: false,
        numOfSeconds: 3,
        piece: {
          userId: 1,
          id: 1,
          category: 'warm_up',
          title: 'Scales + Arpeggios',
          generalNotes: 'Do the thing',
        },
      },
      {
        sessionId: 1,
        id: 2,
        index: 1,
        isCompleted: false,
        numOfSeconds: 300,
        piece: {
          userId: 1,
          id: 4,
          category: 'exercise',
          title: 'Czerny',
          composer: 'Czerny',
          generalNotes: `
            This is a longer note. 
            seriously this note is long.
            And Repetitive
            Here is a longer line.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            This is a longer note. 
            seriously this note is long.
            And Repetitive
            Here is a longer line.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            This is a longer note. 
            seriously this note is long.
            And Repetitive
            Here is a longer line.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            This is a longer note. 
            seriously this note is long.
            And Repetitive
            Here is a longer line.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            This is a longer note. 
            seriously this note is long.
            And Repetitive
            Here is a longer line.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            This is a longer note. 
            seriously this note is long.
            And Repetitive
            Here is a longer line.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          `,
        },
      },
      {
        sessionId: 1,
        id: 3,
        index: 2,
        isCompleted: false,
        numOfSeconds: 300,
        piece: {
          userId: 1,
          id: 5,
          category: 'current',
          title: 'Sonatina in C',
          composer: 'Clementi',
        },
      },
      {
        sessionId: 1,
        id: 4,
        index: 3,
        isCompleted: false,
        numOfSeconds: 300,
        piece: {
          userId: 1,
          id: 6,
          category: 'current',
          title: 'Invention no 8',
          composer: 'JS Bach',
        },
      },
      {
        sessionId: 1,
        id: 5,
        index: 4,
        isCompleted: false,
        numOfSeconds: 300,
        piece: {
          userId: 1,
          id: 5,
          category: 'current',
          title: 'Sonatina in C',
          composer: 'Clementi',
        },
      },
      {
        sessionId: 1,
        id: 6,
        index: 5,
        isCompleted: false,
        numOfSeconds: 300,
        piece: {
          userId: 1,
          id: 6,
          category: 'current',
          title: 'Invention no 8',
          composer: 'JS Bach',
        },
      },
      {
        sessionId: 1,
        id: 7,
        index: 6,
        isCompleted: false,
        numOfSeconds: 300,
        piece: {
          userId: 1,
          id: 7,
          category: 'current',
          title: 'Dragonborn',
          composer: 'Skyrim',
        },
      },
      {
        sessionId: 1,
        id: 8,
        index: 7,
        isCompleted: false,
        numOfSeconds: 300,
        piece: {
          userId: 1,
          id: 8,
          category: 'refresh',
          title: 'Arietta',
          composer: 'Grieg',
        },
      },
    ],
  };

  const [current, setCurrent] = useState<Block | undefined>(session.blocks[0]);
  const [isRunning, setIsRunning] = useState(false);

  const completeCurrent = () => {
    if (!current) return;
    current.isCompleted = true;
    if (current.index < session.blocks.length - 1) {
      setCurrent(session.blocks[current.index + 1]);
    }
  };

  const totalSeconds = useMemo(() => {
    return current?.numOfSeconds ?? 0;
  }, [current]);

  return (
    <SessionContext.Provider
      value={{ current, completeCurrent, isRunning, setIsRunning }}
    >
      <Header />
      {current && (
        <div className="flex flex-col mt-16 items-center w-full pl-10 pr-10 gap-10">
          <p className="font-bold text-6xl">{current.piece.title}</p>
          {current?.piece.composer && (
            <p className="font-bold text-3xl">{current.piece.composer}</p>
          )}
          <Timer
            key={totalSeconds}
            totalSeconds={totalSeconds}
            isRunning={isRunning}
            onComplete={completeCurrent}
            isLargeFont
          />
          {current?.piece.generalNotes && (
            <div className="flex flex-col gap-3 max-w-full items-center">
              <p className="font-bold text-xl">Notes</p>
              <div
                className="b max-w-full border-solid border-2 rounded p-3 bg-gray"
                style={{ width: 1200 }}
              >
                {current.piece.generalNotes}
              </div>
            </div>
          )}
        </div>
      )}
    </SessionContext.Provider>
  );
}
