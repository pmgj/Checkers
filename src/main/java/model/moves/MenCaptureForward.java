package model.moves;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import model.Cell;
import model.CellState;
import model.Checkers;
import model.Player;

public class MenCaptureForward extends Moves {

    public MenCaptureForward(Checkers c) {
        this.checkers = c;
    }

    @Override
    public List<List<Cell>> possibleMoves(Cell currentCell) {
        return this.possibleMoves(currentCell, new ArrayList<>());
    }

    private List<List<Cell>> possibleMoves(Cell currentCell, List<Cell> visitedCells) {        
        CellState adversaryPlayer;
        int[][] pos;
        if(checkers.getTurn() == Player.PLAYER1) {
            adversaryPlayer = CellState.PLAYER2;
            pos = new int[][]{{-1, -1}, {-1, 1}};
        } else {
            adversaryPlayer = CellState.PLAYER1;
            pos = new int[][]{{1, -1}, {1, 1}};
        }
        int crow = currentCell.getX(), ccol = currentCell.getY();
        List<List<Cell>> coords = new ArrayList<>();
        for (int[] po : pos) {
            int diffRow = po[0], diffCol = po[1];
            Cell destinationCell = new Cell(crow + 2 * diffRow, ccol + 2 * diffCol);
            Cell adversaryCell = new Cell(crow + diffRow, ccol + diffCol);
            if (!visitedCells.contains(adversaryCell) && checkers.onBoard(destinationCell) && checkers.getPiece(destinationCell) == CellState.EMPTY && checkers.getPiece(adversaryCell) == adversaryPlayer) {
                visitedCells.add(adversaryCell);
                List<List<Cell>> moves = possibleMoves(destinationCell, visitedCells);
                if (moves.isEmpty()) {
                    List<Cell> temp = new ArrayList<>();
                    temp.add(destinationCell);
                    coords.add(temp);
                } else {
                    moves.forEach(v -> v.add(destinationCell));
                    coords.addAll(moves);
                }
                visitedCells.remove(adversaryCell);
            }
        }
        int max = coords.stream().mapToInt(p -> p.size()).max().orElse(0);
        return coords.stream().filter(p -> p.size() == max).collect(Collectors.toList());
    }
}