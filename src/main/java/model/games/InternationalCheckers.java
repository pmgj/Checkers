package model.games;

import model.Checkers;
import model.Player;
import model.boards.TenRowsColsBoard;
import model.moves.FlyingKingMove;
import model.moves.FlyingKingCapture;
import model.moves.MenCaptureBackwards;
import model.moves.MenMoveForward;

public class InternationalCheckers extends Checkers {
    public InternationalCheckers() {
        this.board = new TenRowsColsBoard().createBoard();
        this.turn = Player.PLAYER1;
        this.menMove = new MenMoveForward(this);
        this.menCapture = new MenCaptureBackwards(this);
        this.kingMove = new FlyingKingMove(this);
        this.kingCapture = new FlyingKingCapture(this);        
    }
}
