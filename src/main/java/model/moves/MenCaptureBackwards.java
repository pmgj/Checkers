package model.moves;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import model.Cell;
import model.Checkers;
import model.Player;
import model.State;

public class MenCaptureBackwards extends Moves {

    public MenCaptureBackwards(Checkers c) {
        this.checkers = c;
    }

    @Override
    public List<List<Cell>> possibleMoves(Cell currentCell) {
        return this.possibleMoves(currentCell, new ArrayList<>());
    }

    private List<List<Cell>> possibleMoves(Cell currentCell, List<Cell> visitedCells) {
        State adversaryPlayer = (checkers.getTurn() == Player.PLAYER1) ? State.PLAYER2 : State.PLAYER1;
        int crow = currentCell.x(), ccol = currentCell.y();
        int[][] pos = {{-1, -1}, {-1, 1}, {1, -1}, {1, 1}};
        List<List<Cell>> coords = new ArrayList<>();
        for (int[] po : pos) {
            int diffRow = po[0], diffCol = po[1];
            Cell destinationCell = new Cell(crow + 2 * diffRow, ccol + 2 * diffCol);
            Cell adversaryCell = new Cell(crow + diffRow, ccol + diffCol);
            if (!visitedCells.contains(adversaryCell) && checkers.onBoard(destinationCell) && checkers.getState(destinationCell) == State.EMPTY && checkers.getState(adversaryCell) == adversaryPlayer) {
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
