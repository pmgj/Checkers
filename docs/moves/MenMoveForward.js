import Player from '../Player.js';
import Cell from '../Cell.js';
import State from '../State.js';

export default class MenMoveForward {
    constructor(c) {
        this.checkers = c;
    }
    possibleMoves({ x, y }) {
        let diags = (this.checkers.turn === Player.PLAYER1) ? [new Cell(x - 1, y - 1), new Cell(x - 1, y + 1)] : [new Cell(x + 1, y - 1), new Cell(x + 1, y + 1)];
        return diags.map(pos => (this.checkers.onBoard(pos) && this.checkers.getState(pos) === State.EMPTY) ? [pos] : null).filter(v => v);
    }
}