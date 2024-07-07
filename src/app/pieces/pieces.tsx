'use client';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { AddModal } from './add-modal';
import { useDisclosure } from '@nextui-org/modal';
import { pieces } from '../pieces';

interface ListProps {
  category: PieceCategory;
}

const categoryTextMap: Record<
  PieceCategory,
  { heading: string; subheading: string }
> = {
  warm_up: {
    heading: 'Warm Ups',
    subheading: 'Your standard warm ups',
  },
  exercise: {
    heading: 'Exercises/Etudes',
    subheading: 'Any exercises/etudes you are currently working on',
  },
  current: {
    heading: 'Current Pieces',
    subheading: 'Your main pieces that you are currently working on',
  },
  refresh: {
    heading: 'Refresh Pieces',
    subheading: 'Pieces you have learned but want to keep fresh',
  },
  past: {
    heading: 'Past Pieces',
    subheading:
      'Pieces you have worked on in the past and are no longer working on',
  },
};

export const List = ({ category }: ListProps) => {
  const { heading, subheading } = categoryTextMap[category];

  const filteredPieces = pieces.filter((p) => p.category === category);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {isOpen && (
        <AddModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          category={category}
        />
      )}
      <div className="flex flex-col gap-5 text-black border-solid border-1 border-midblue shadow-sm shadow-midblue rounded p-5 w-auto">
        <div className="flex flex-col gap-0">
          <h2 className="font-bold text-xl">{heading}</h2>
          <h5 className="font-bold text text-primary">{subheading}</h5>
        </div>
        <Divider orientation="horizontal" />
        {filteredPieces.length > 0 ? (
          <>
            <div className="flex flex-col gap-1 w-auto">
              {filteredPieces.map((p) => (
                <div
                  key={p.id}
                  className="hover:bg-midblue hover:text-whiteish pl-2 pt-1 pb-2 rounded cursor-pointer inline-block"
                >
                  {`${p.title}${p.composer ? ` - ${p.composer}` : ''}`}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>No pieces in this category</div>
        )}
        <div className="w-auto">
          <Button size="md" color="primary" onPress={onOpen}>
            Add
          </Button>
        </div>
      </div>
    </>
  );
};
