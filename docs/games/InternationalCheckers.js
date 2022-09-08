import Checkers from "../Checkers.js";
import Player from "../Player.js";
import TenRowsColsBoard from "../boards/TenRowsColsBoard.js";
import MenMoveForward from "../moves/MenMoveForward.js";
import MenCaptureBackwards from "../moves/MenCaptureBackwards.js";
import FlyingKingMove from "../moves/FlyingKingMove.js";
import FlyingKingCapture from "../moves/FlyingKingCapture.js";

export default class InternationalCheckers extends Checkers {
    constructor() {
        super("International Checkers");
        this.board = new TenRowsColsBoard().createBoard();
        this.rows = this.board.length;
        this.cols = this.board[0].length;
        this.turn = Player.PLAYER1;
        this.menMove = new MenMoveForward(this);
        this.menCapture = new MenCaptureBackwards(this);
        this.kingMove = new FlyingKingMove(this);
        this.kingCapture = new FlyingKingCapture(this);
    }
}
