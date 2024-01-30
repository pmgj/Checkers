import Cell from '../Cell.js';
import State from '../State.js';

export default class FlyingKingMove {
    constructor(c) {
        this.checkers = c;
    }
    possibleMoves({ x: crow, y: ccol }) {
        let pos = [[-1, -1], [-1, 1], [1, -1], [1, 1]], moves = [];
        for (let [diffRow, diffCol] of pos) {
            for (let i = 1; ; i++) {
                let destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                if (!this.checkers.onBoard(destinationCell) || this.checkers.getState(destinationCell) !== State.EMPTY) {
                    break;
                } else {
                    moves.push([destinationCell]);
                }
            }
        }
        return moves;
    }
}