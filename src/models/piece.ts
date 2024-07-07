type PieceCategory = 'warm_up' | 'exercise' | 'current' | 'refresh' | 'past';

interface Piece {
  userId: number;
  id: number;
  title: string;
  composer?: string;
  category: PieceCategory;
  generalNotes?: string;
}
