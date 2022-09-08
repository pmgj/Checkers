import CellState from './CellState.js';
import State from './State.js';
import Piece from './Piece.js';

export default class Checkers {
    constructor() {
        this.board = [
            [new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN)],
            [new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY)],
            [new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER2, Piece.MEN)],
            [new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY)],
            [new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY), new CellState(State.EMPTY)],
            [new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY)],
            [new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN)],
            [new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY), new CellState(State.PLAYER1, Piece.MEN), new CellState(State.EMPTY)]
        ];
    }
    getBoard() {
        return this.board;
    }
}