package model.moves;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import model.Cell;
import model.CellState;
import model.Checkers;
import model.Player;

public class MenMoveForward extends Moves {
    
    public MenMoveForward(Checkers c) {
        this.checkers = c;
    }

    @Override
    public List<List<Cell>> possibleMoves(Cell currentCell) {
        int row = currentCell.getX(), col = currentCell.getY();
        List<List<Cell>> moves = new ArrayList<>();
        List<Cell> diags = (checkers.getTurn() == Player.PLAYER1) ? Arrays.asList(new Cell[]{new Cell(row - 1, col - 1), new Cell(row - 1, col + 1)}) : Arrays.asList(new Cell[]{new Cell(row + 1, col - 1), new Cell(row + 1, col + 1)});
        diags.forEach(pos -> {
            if (checkers.onBoard(pos) && checkers.getPiece(pos) == CellState.EMPTY) {
                List<Cell> temp = new ArrayList<>();
                temp.add(pos);
                moves.add(temp);
            }
        });
        return moves;
    }
}
