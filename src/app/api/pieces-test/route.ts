import { db } from "@/db/db"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {
  const result = await db.query({
    text: 'SELECT * FROM pieces WHERE user_id = $1',
    values: [1]
  })

  return Response.json(result.rows)
}
