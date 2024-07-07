interface Block {
  id: number;
  sessionId: number;
  piece: Piece;
  numOfSeconds: number;
  isCompleted: boolean;
  index: number;
}

interface Session {
  userId: number;
  id: number;
  blocks: Block[];
}
