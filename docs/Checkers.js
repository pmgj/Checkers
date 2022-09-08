import CellState from './CellState.js';
import State from './State.js';
import Piece from './Piece.js';
import Player from './Player.js';
import Cell from './Cell.js';
import Winner from './Winner.js';

export default class Checkers {
    constructor() {
        this.name = name;
        this.rows = 8;
        this.cols = 8;
        this.turn = Player.PLAYER1;
        this.positions = null;
        this.winner = Winner.NONE;
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
    toString() {
        return this.name;
    }
    getBoard() {
        return this.board;
    }
    getTurn() {
        return this.turn;
    }
    getPositions() {
        return this.positions;
    }
    getWinner() {
        return this.winner;
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
        let moves = this.getMandatoryCaptureMoves();
        if (!moves.some(z => z[0].equals(beginCell) && z[z.length - 1].equals(endCell))) {
            throw new Error("This move is invalid.");
        }
        let a = or, b = oc;
        this.positions = moves.find(z => z[0].equals(beginCell) && z[z.length - 1].equals(endCell));
        this.positions.forEach(({ x, y }) => {
            this.board[x][y] = this.board[a][b];
            let rdiff = x > a ? 1 : -1, cdiff = y > b ? 1 : -1;
            for (let i = 0; i < Math.abs(x - a); i++) {
                this.board[a + rdiff * i][b + cdiff * i] = new CellState(State.EMPTY);
            }
            a = x, b = y;
        });
        if (currentPiece === State.PLAYER1 && dr === 0) {
            this.board[dr][dc] = new CellState(State.PLAYER1, Piece.KING);
        } else if (currentPiece === State.PLAYER2 && dr === this.rows - 1) {
            this.board[dr][dc] = new CellState(State.PLAYER2, Piece.KING);
        }
        this.turn = this.turn === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;
        this.winner = this.endOfGame();
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
        let currentPiece = this.getState(cell);
        let moves = [];
        if ((this.turn === Player.PLAYER1 && currentPiece === State.PLAYER1) || (this.turn === Player.PLAYER2 && currentPiece === State.PLAYER2)) {
            switch (this.board[row][col].piece) {
                case Piece.MEN:
                    moves = this.menCapture.possibleMoves(cell);
                    if (moves.length === 0)
                        moves = this.menMove.possibleMoves(cell);
                    break;
                case Piece.KING:
                    moves = this.kingCapture.possibleMoves(cell);
                    if (moves.length === 0)
                        moves = this.kingMove.possibleMoves(cell);
                    break;
            }
        }
        moves.map(x => {
            x.push(cell);
            x.reverse();
        });
        return moves;
    }
    getMandatoryCaptureMoves() {
        let moves = [], maxLength = 0, capture = false;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let currentCell = new Cell(i, j);
                let currentPiece = this.getState(currentCell);
                if ((currentPiece === State.PLAYER1 && this.turn === Player.PLAYER1) || (currentPiece === State.PLAYER2 && this.turn === Player.PLAYER2)) {
                    let pm = this.possibleMoves(currentCell);
                    if (pm.length > 0) {
                        if (pm[0].length > maxLength) {
                            moves = [];
                            maxLength = pm[0].length;
                        }
                        if (pm[0].length === maxLength) {
                            let temp = pm[0];
                            if (Math.abs(temp[0].x - temp[1].x) >= 2) {
                                capture = true;
                            }
                            pm.forEach(p => moves.push(p));
                        }
                    }
                }
            }
        }
        if (capture) {
            let temp = moves.filter(m => Math.abs(m[0].x - m[1].x) >= 2);
            if (temp) {
                moves = temp;
            }
        }
        return moves;
    }
    endOfGame() {
        let numP1 = this.countPieces(Piece.PLAYER1);
        let numP2 = this.countPieces(Piece.PLAYER2);
        if (numP1 === 0 && numP2 === 0) {
            return Winner.DRAW;
        } else if (numP1 === 0) {
            return Winner.PLAYER2;
        } else if (numP2 === 0) {
            return Winner.PLAYER1;
        }
        let moves = this.getMandatoryCaptureMoves();
        if (moves.length === 0) {
            return this.turn === Player.PLAYER1 ? Winner.PLAYER2 : Winner.PLAYER1;
        }
        return Winner.NONE;
    }
    countPieces(player) {
        return this.board.flat().filter(a => a.piece === player).length;
    }
}