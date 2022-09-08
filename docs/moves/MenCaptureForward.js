import Player from '../Player.js';
import Cell from '../Cell.js';
import State from '../State.js';

export default class MenCaptureForward {
    constructor(c) {
        this.checkers = c;
    }
    possibleMoves(currentCell, visitedCells = []) {
        let adversaryPlayer, pos;
        if (this.checkers.getTurn() === Player.PLAYER1) {
            adversaryPlayer = State.PLAYER2;
            pos = [[-1, -1], [-1, 1]];
        } else {
            adversaryPlayer = State.PLAYER1;
            pos = [[1, -1], [1, 1]];
        }
        let { x: crow, y: ccol } = currentCell;
        let coords = [];
        for (let [diffRow, diffCol] of pos) {
            let destinationCell = new Cell(crow + 2 * diffRow, ccol + 2 * diffCol);
            let adversaryCell = new Cell(crow + diffRow, ccol + diffCol);
            if (!visitedCells.find(c => c.equals(adversaryCell)) && this.checkers.onBoard(destinationCell) && this.checkers.getState(destinationCell) === State.EMPTY && this.checkers.getState(adversaryCell) === adversaryPlayer) {
                visitedCells.push(adversaryCell);
                let moves = this.possibleMoves(destinationCell, visitedCells);
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
    }
}