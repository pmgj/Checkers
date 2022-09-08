import Player from '../Player.js';
import Cell from '../Cell.js';
import State from '../State.js';

export default class FlyingKingCapture {
    constructor(c) {
        this.checkers = c;
    }
    possibleMoves(currentCell, visitedCells = []) {
        let adversaryPlayer = (this.checkers.turn === Player.PLAYER1) ? State.PLAYER2 : State.PLAYER1;
        let { x: crow, y: ccol } = currentCell;
        let pos = [[-1, -1], [-1, 1], [1, -1], [1, 1]], coords = [], destinationCell;
        for (let [diffRow, diffCol] of pos) {
            let i = 1;
            let adv = false;
            do {
                destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                if (!this.checkers.onBoard(destinationCell) || visitedCells.find(c => c.equals(destinationCell))) {
                    break;
                } else if (this.checkers.getState(destinationCell) === adversaryPlayer) {
                    adv = true;
                    break;
                } else if (this.checkers.getState(destinationCell) === State.EMPTY) {
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
                    if (this.checkers.onBoard(destinationCell) && this.checkers.getPiece(destinationCell) === State.EMPTY) {
                        cells.push(destinationCell);
                        i++;
                    } else {
                        break;
                    }
                } while (true);
                if (cells.length > 0) {
                    cells.forEach(c => {
                        let moves = this.possibleMoves(c, visitedCells);
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
    }
}