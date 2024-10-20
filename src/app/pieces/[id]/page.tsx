import { Card, CardContent, CardTitle } from "@/components/card"
import { getPieceById } from "@/db/db"

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const piece = await getPieceById(id)
  return (
    <div className="p-10">
      <Card>
        <CardTitle>Title</CardTitle>
        <CardContent>
          <div>{piece ? (<pre>{JSON.stringify(piece, null, 2)}</pre>) : 'Piece not found'}</div>
        </CardContent>
      </Card>
    </div>
  )
}
