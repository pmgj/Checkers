package model.boards;

import model.CellState;
import model.Piece;
import model.State;

public class EightRowsColsBoard implements BoardSize {

    @Override
    public CellState[][] createBoard() {
        return new CellState[][]{
            {new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN)},
            {new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null)},
            {new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER2, Piece.MEN)},
            {new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null)},
            {new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null), new CellState(State.EMPTY, null)},
            {new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null)},
            {new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN)},
            {new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY, null)}};
    }
}
