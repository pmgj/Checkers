package model.moves;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import model.Cell;
import model.CellState;
import model.Checkers;

public class FlyingKingMove extends Moves {

    public FlyingKingMove(Checkers c) {
        this.checkers = c;
    }

    @Override
    public List<List<Cell>> possibleMoves(Cell currentCell) {
        int crow = currentCell.getX(), ccol = currentCell.getY();
        int[][] pos = {{-1, -1}, {-1, 1}, {1, -1}, {1, 1}};
        List<List<Cell>> moves = new ArrayList<>();
        for (int[] po : pos) {
            int diffRow = po[0], diffCol = po[1], i = 1;
            do {
                Cell destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                if (!checkers.onBoard(destinationCell) || checkers.getPiece(destinationCell) != CellState.EMPTY) {
                    break;
                } else {
                    List<Cell> temp = new ArrayList<>();
                    temp.add(destinationCell);
                    moves.add(temp);
                }
                i++;
            } while (true);
        }
        moves.forEach(l -> Collections.reverse(l));
        return moves;
    }
}
