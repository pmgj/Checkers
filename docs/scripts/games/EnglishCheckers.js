import Checkers from "../Checkers.js";
import Player from "../Player.js";
import EightRowsColsBoard from "../boards/EightRowsColsBoard.js";
import MenMoveForward from "../moves/MenMoveForward.js";
import MenCaptureForward from "../moves/MenCaptureForward.js";
import KingMoveBackwards from "../moves/KingMoveBackwards.js";
import MenCaptureBackwards from "../moves/MenCaptureBackwards.js";

export default class EnglishCheckers extends Checkers {
    constructor() {
        super("English Checkers");
        this.board = new EightRowsColsBoard().createBoard();
        this.rows = this.board.length;
        this.cols = this.board[0].length;
        this.turn = Player.PLAYER2;
        this.menMove = new MenMoveForward(this);
        this.menCapture = new MenCaptureForward(this);
        this.kingMove = new KingMoveBackwards(this);
        this.kingCapture = new MenCaptureBackwards(this);
    }
}
