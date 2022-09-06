package model.games;

import model.Checkers;
import model.Player;
import model.boards.EightRowsColsBoard;
import model.moves.KingMoveBackwards;
import model.moves.MenCaptureBackwards;
import model.moves.MenCaptureForward;
import model.moves.MenMoveForward;

public class EnglishCheckers extends Checkers {
    public EnglishCheckers() {
        this.board = new EightRowsColsBoard().createBoard();
        this.turn = Player.PLAYER2;
        this.menMove = new MenMoveForward(this);
        this.menCapture = new MenCaptureForward(this);
        this.kingMove = new KingMoveBackwards(this);
        this.kingCapture = new MenCaptureBackwards(this);
    }
}
