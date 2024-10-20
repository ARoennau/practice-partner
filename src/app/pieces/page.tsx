import { Metadata } from 'next';
import { List } from './pieces';
import { getPieces } from '@/db/db';

export const metadata: Metadata = {
  title: 'Piece Lists',
  description: 'List of your pieces',
};


export default async function Page() {
  const pieces = await getPieces()

  return (
    <div className='min-h-screen flex flex-col gap-5 p-10 w-auto bg-whiteish'>
      <h1 className='font-bold  text-4xl w-auto'>My Pieces</h1>
      <List category='warm_up' pieces={pieces} />
      <List category='exercise' pieces={pieces} />
      <List category='current' pieces={pieces} />
      <List category='refresh' pieces={pieces} />
      <List category='past' pieces={pieces} />
    </div>
  );
}
