import React, { useState } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

function BeginnerChessLesson({ setOpen, open }) {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [history, setHistory] = useState([]);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) {
      alert("Illegal move!");
      return;
    }

    setFen(chess.fen());
    setHistory([...history, move]);
  };

  const undoMove = () => {
    chess.undo();
    setFen(chess.fen());
    setHistory(history.slice(0, -1));
  };

  const onSquareClick = (square) => {
    if (history.length > 0 && history[history.length - 1].to === square) {
      undoMove();
    }
  };

  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} open={open} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "silver" }}>
          Beginner Chess Lesson
        </h1>

        <h2 style={{color: "silver"}} >How Pieces Move</h2>
        <p style={{color: "silver"}}>
          Chess is a two-player board game where each player starts with 16
          pieces: 1 king, 1 queen, 2 rooks, 2 knights, 2 bishops, and 8 pawns.
          Each piece moves differently and understanding their movements is
          crucial to becoming a skilled chess player.
        </p>
        <ul>
          <li style={{color: "silver"}}>
            King: moves one square in any direction. The game ends when the king
            is in checkmate and cannot move to a safe square.
          </li>
          <li style={{color: "silver"}}>
            Queen: moves any number of squares diagonally, horizontally, or
            vertically.
          </li>
          <li style={{color: "silver"}}>
            Rook: moves any number of squares horizontally or vertically.
          </li>
          <li style={{color: "silver"}}>
            Bishop: moves any number of squares diagonally. A bishop can only
            move on squares of one color, so each player starts with two
            bishops, one on a white square and one on a black square.
          </li>
          <li style={{color: "silver"}}>
            Knight: moves in an L-shape, two squares in one direction and then
            one square perpendicular to the first direction.
          </li>
          <li style={{color: "silver"}}>
            Pawn: moves forward one square, but captures diagonally one square
            forward.
          </li>
        </ul>

        <h2 style={{color: "silver"}}>Game Rules</h2>
        <p style={{color: "silver"}}>
          The objective of the game is to checkmate your opponent's king, which
          means putting the king in a position where it is under attack (in
          check) and there is no way to move it to a safe square. The game can
          also end in a draw, which can happen in several ways, including stalemate (when a player is not in check but has no legal moves), threefold repetition (when the same position occurs three times with the same player to move), or if both players have insufficient material to checkmate (e.g., if only kings are left on the board).
        </p>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2 style={{color: "silver"}}>Interactive Chessboard</h2>
          <p style={{color: "silver"}}>Practice your chess skills with this interactive chessboard.</p>
          <Chessboard
            position={fen}
            onDrop={onDrop}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default BeginnerChessLesson;
