'use server';

import { Values } from '@/app/pieces/add-modal';
import { db, deletePieceById } from '@/db/db';
import { revalidatePath } from 'next/cache';

export const addPiece = async (values: Values, category: string) => {
  try {
    await db.query({
      text: 'INSERT INTO pieces (user_id, category, title, composer, general_notes, created_at, updated_at) VALUES (1, $1, $2, $3, $4, $5, $5)',
      values: [
        category,
        values.title,
        values.composer,
        values.generalNotes,
        new Date(),
      ],
    });
    revalidatePath('/pieces')
  } catch (e) {
    console.error('err', e);
  }
};

export const deletePiece = async (id: number) => {
  try {
    await deletePieceById(id)
    revalidatePath('/pieces')
  } catch (e) {
    console.error('err', e);
  }
};
