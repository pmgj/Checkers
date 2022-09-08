import Checkers from "../Checkers.js";
import Player from "../Player.js";
import EightRowsColsBoard from "../boards/EightRowsColsBoard.js";
import MenMoveForward from "../moves/MenMoveForward.js";
import MenCaptureBackwards from "../moves/MenCaptureBackwards.js";
import FlyingKingMove from "../moves/FlyingKingMove.js";
import FlyingKingCapture from "../moves/FlyingKingCapture.js";

export default class BrazilianCheckers extends Checkers {
    constructor() {
        super("Brazilian Checkers");
        this.board = new EightRowsColsBoard().createBoard();
        this.rows = this.board.length;
        this.cols = this.board[0].length;
        this.turn = Player.PLAYER1;
        this.menMove = new MenMoveForward(this);
        this.menCapture = new MenCaptureBackwards(this);
        this.kingMove = new FlyingKingMove(this);
        this.kingCapture = new FlyingKingCapture(this);
    }
}
