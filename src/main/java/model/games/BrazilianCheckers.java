package model.games;

import model.Checkers;
import model.Player;
import model.boards.EightRowsColsBoard;
import model.moves.FlyingKingMove;
import model.moves.FlyingKingCapture;
import model.moves.MenCaptureBackwards;
import model.moves.MenMoveForward;

public class BrazilianCheckers extends Checkers {
    public BrazilianCheckers() {
        this.board = new EightRowsColsBoard().createBoard();
        this.turn = Player.PLAYER1;
        this.menMove = new MenMoveForward(this);
        this.menCapture = new MenCaptureBackwards(this);
        this.kingMove = new FlyingKingMove(this);
        this.kingCapture = new FlyingKingCapture(this);
    }
}
