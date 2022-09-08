import CellState from './CellState.js';
import State from './State.js';
import Piece from './Piece.js';
import Player from './Player.js';
import Cell from './Cell.js';

export default class Checkers {
    constructor() {
        this.rows = 8;
        this.cols = 8;
        this.turn = Player.PLAYER1;
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
    getTurn() {
        return this.turn;
    }
    move(beginCell, endCell) {
        let { x: or, y: oc } = beginCell;
        let { x: dr, y: dc } = endCell;
        if (!beginCell || !endCell) {
            throw new Error("The value of one of the cells does not exist.");
        }
        let currentPiece = this.getState(beginCell);
        if ((currentPiece === State.PLAYER1 && this.turn === Player.PLAYER2) || (currentPiece === State.PLAYER2 && this.turn === Player.PLAYER1)) {
            throw new Error("It's not your turn.");
        }
        if (beginCell.equals(endCell)) {
            throw new Error("Origin and destination must be different.");
        }
        if (!this.onBoard(beginCell) || !this.onBoard(endCell)) {
            throw new Error("Origin or destination are not in the board.");
        }
        if (currentPiece === State.EMPTY) {
            throw new Error("Origin does not have a piece.");
        }
        if (this.getState(endCell) !== State.EMPTY) {
            throw new Error("Destination must be empty.");
        }
        let moves = this.possibleMoves(beginCell);
        if (!moves.some(z => z.equals(endCell))) {
            throw new Error("This move is invalid.");
        }
        if (Math.abs(or - dr) === 1) {
            this.board[dr][dc] = this.board[or][oc];
            this.board[or][oc] = new CellState(State.EMPTY);
        }
        if (Math.abs(or - dr) === 2) {
            this.board[dr][dc] = this.board[or][oc];
            this.board[or][oc] = new CellState(State.EMPTY);
            this.board[(or + dr) / 2][(oc + dc) / 2] = new CellState(State.EMPTY);
        }
        this.turn = this.turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
    }
    getState({ x, y }) {
        return this.board[x][y].state;
    }
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return (inLimit(x, this.rows) && inLimit(y, this.cols));
    }
    possibleMoves(cell) {
        let { x: row, y: col } = cell;
        let moves = [];
        let diags = (this.turn === Player.PLAYER1) ? [new Cell(row - 1, col - 1), new Cell(row - 1, col + 1)] : [new Cell(row + 1, col - 1), new Cell(row + 1, col + 1)];
        diags.forEach(pos => {
            if (this.onBoard(pos) && this.getState(pos) === State.EMPTY) {
                moves.push(pos);
            }
        });
        let adversaryPlayer = (this.turn === Player.PLAYER1) ? State.PLAYER2 : State.PLAYER1;
        let pos = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (let [diffRow, diffCol] of pos) {
            let destinationCell = new Cell(row + 2 * diffRow, col + 2 * diffCol);
            let adversaryCell = new Cell(row + diffRow, col + diffCol);
            if (this.onBoard(destinationCell) && this.getState(destinationCell) === State.EMPTY && this.getState(adversaryCell) === adversaryPlayer) {
                moves.push(destinationCell);
            }
        }
        return moves;
    }
}