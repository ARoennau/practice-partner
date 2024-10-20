'use client';
import { categoryTextMap } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { Button, buttonVariants } from '@/components/button';
import { deletePiece } from '@/server-action-test/server-actions';
import Link from 'next/link';
import { NewAddModal } from './new-add-modal';
import { useState } from 'react';

interface ListProps {
  category: PieceCategory;
  pieces: Piece[]
}

export const List = ({ category, pieces }: ListProps) => {
  const { heading, subheading } = categoryTextMap[category];

  const filteredPieces = pieces.filter((p) => p.category === category);

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <NewAddModal category={category} isOpen={isOpen} updateIsOpen={setIsOpen} />
      )}
      <Card>
        <CardTitle>{heading}</CardTitle>
        <CardDescription>{subheading}</CardDescription>
        <div className='mt-5' />
        <CardContent>
          {filteredPieces.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[50%]'>Piece name</TableHead>
                  <TableHead className='w-[35%]'>Composer</TableHead>
                  <TableHead className='w-[15%]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPieces.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{p.composer ?? '-'}</TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Link className={buttonVariants({ variant: 'secondary' })} href={`pieces/${p.id}`}>View</Link>
                        <Button variant="destructive" onClick={() => deletePiece(p.id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No pieces in this category</div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsOpen(true)}>
            Add
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
