import { Metadata } from 'next';
import { List } from './pieces';
import { Divider } from '@nextui-org/divider';

export const metadata: Metadata = {
  title: 'Piece Lists',
  description: 'List of your pieces',
};

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col gap-5 p-10 w-auto bg-whiteish'>
      <h1 className='font-bold  text-4xl w-auto'>My Pieces</h1>
      <Divider orientation='horizontal' />
      <List category='warm_up' />
      <List category='exercise' />
      <List category='current' />
      <List category='refresh' />
      <List category='past' />
    </div>
  );
}
