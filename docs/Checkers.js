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
        this.positions = null;
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
    getPositions() {
        return this.positions;
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
        let captureMove = ({ x: crow, y: ccol }, visitedCells = []) => {
            let adversaryPlayer = this.turn === Player.PLAYER1 ? State.PLAYER2 : State.PLAYER1;
            let pos = [[-1, -1], [-1, 1], [1, -1], [1, 1]], coords = [];
            for (let [diffRow, diffCol] of pos) {
                let destinationCell = new Cell(crow + 2 * diffRow, ccol + 2 * diffCol);
                let adversaryCell = new Cell(crow + diffRow, ccol + diffCol);
                if (!visitedCells.find(c => c.equals(adversaryCell)) && this.onBoard(destinationCell) && this.getState(destinationCell) === State.EMPTY && this.getState(adversaryCell) === adversaryPlayer) {
                    visitedCells.push(adversaryCell);
                    let moves = captureMove(destinationCell, visitedCells);
                    if (moves.length === 0) {
                        coords.push(destinationCell);
                    } else {
                        moves.forEach(v => v.push(destinationCell));
                        coords.push(moves);
                    }
                    visitedCells.pop();
                }
            }
            let poss = coords.flat().map(p => p instanceof Cell ? [p] : p);
            let max = Math.max(...poss.map(p => p.length));
            return poss.filter(p => p.length === max);
        };
        let normalMove = ({ x, y }) => {
            let diags = this.turn === Player.PLAYER1 ? [new Cell(x - 1, y - 1), new Cell(x - 1, y + 1)] : [new Cell(x + 1, y - 1), new Cell(x + 1, y + 1)];
            return diags.map(pos => (this.onBoard(pos) && this.getState(pos) === State.EMPTY) ? [pos] : null).filter(v => v);
        };
        let captureMoveKing = (currentCell, visitedCells = []) => {
            let adversaryPlayer = (this.turn === Player.PLAYER1) ? State.PLAYER2 : State.PLAYER1;
            let { x: crow, y: ccol } = currentCell;
            let pos = [[-1, -1], [-1, 1], [1, -1], [1, 1]], coords = [], destinationCell;
            for (let [diffRow, diffCol] of pos) {
                let i = 1;
                let adv = false;
                do {
                    destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                    if (!this.onBoard(destinationCell) || visitedCells.find(c => c.equals(destinationCell))) {
                        break;
                    } else if (this.getState(destinationCell) === adversaryPlayer) {
                        adv = true;
                        break;
                    } else if (this.getState(destinationCell) === State.EMPTY) {
                        i++;
                    } else {
                        break;
                    }
                } while (true);
                if (adv) {
                    visitedCells.push(destinationCell);
                    let cells = [];
                    i++;
                    do {
                        destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                        if (this.onBoard(destinationCell) && this.getState(destinationCell) === State.EMPTY) {
                            cells.push(destinationCell);
                            i++;
                        } else {
                            break;
                        }
                    } while (true);
                    if (cells.length > 0) {
                        cells.forEach(c => {
                            let moves = captureMoveKing(c, visitedCells);
                            if (moves.length === 0) {
                                coords.push(c);
                            } else {
                                moves.forEach(v => v.push(c));
                                coords.push(moves);
                            }
                        });
                    }
                    visitedCells.pop();
                }
            }
            let poss = coords.flat().map(p => p instanceof Cell ? [p] : p);
            let max = Math.max(...poss.map(p => p.length));
            return poss.filter(p => p.length === max);
        };
        let normalMoveKing = ({ x: crow, y: ccol }) => {
            let pos = [[-1, -1], [-1, 1], [1, -1], [1, 1]], moves = [];
            for (let [diffRow, diffCol] of pos) {
                for (let i = 1; ; i++) {
                    let destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                    if (!this.onBoard(destinationCell) || this.getState(destinationCell) !== State.EMPTY) {
                        break;
                    } else {
                        moves.push([destinationCell]);
                    }
                }
            }
            return moves;
        };
        let currentPiece = this.getState(cell);
        let moves = [];
        if ((this.turn === Player.PLAYER1 && currentPiece === State.PLAYER1) || (this.turn === Player.PLAYER2 && currentPiece === State.PLAYER2)) {
            switch (this.board[row][col].piece) {
                case Piece.MEN:
                    moves = captureMove(cell);
                    if (moves.length === 0)
                        moves = normalMove(cell);
                    break;
                case Piece.KING:
                    moves = captureMoveKing(cell);
                    if (moves.length === 0)
                        moves = normalMoveKing(cell);
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
}