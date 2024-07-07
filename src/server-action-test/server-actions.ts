'use server';

import { Values } from '@/app/pieces/add-modal';
import { db } from '@/db/db';

export const addPiece = async (values: Values, category: string) => {
  try {
    db.query({
      text: 'INSERT INTO pieces (user_id, category, title, composer, general_notes, created_at, updated_at) VALUES (1, $1, $2, $3, $4, $5, $5)',
      values: [
        category,
        values.title,
        values.composer,
        values.generalNotes,
        new Date(),
      ],
    });
  } catch (e) {
    console.error('err', e);
  }
};
