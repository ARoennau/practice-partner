import { Pool } from 'pg';
export const db = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  port: 5432,
});

export async function getPieces() {
  const result = await db.query<Piece>({
    text: 'SELECT * FROM pieces WHERE user_id = $1',
    values: [1]
  })

  return result.rows
}

export async function getPieceById(id: string) {
  const result = await db.query<Piece>({
    text: 'SELECT * FROM pieces WHERE user_id = $1 and id = $2',
    values: [1, id]
  })

  return result.rows.length ? result.rows[0] : undefined
}

export async function deletePieceById(id: number) {
  await db.query<Piece>({
    text: 'DELETE FROM pieces WHERE user_id = $1 and id = $2',
    values: [1, id]
  })
}
