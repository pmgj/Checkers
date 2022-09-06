package model.games;

import model.Checkers;
import model.Player;
import model.boards.TwelveRowsColsBoard;
import model.moves.FlyingKingMove;
import model.moves.FlyingKingCapture;
import model.moves.MenCaptureBackwards;
import model.moves.MenMoveForward;

public class CanadianCheckers extends Checkers {
    public CanadianCheckers() {
        this.board = new TwelveRowsColsBoard().createBoard();
        this.turn = Player.PLAYER1;
        this.menMove = new MenMoveForward(this);
        this.menCapture = new MenCaptureBackwards(this);
        this.kingMove = new FlyingKingMove(this);
        this.kingCapture = new FlyingKingCapture(this);        
    }
}
