package model.moves;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import model.Cell;
import model.Checkers;
import model.Player;
import model.State;

public class FlyingKingCapture extends Moves {

    public FlyingKingCapture(Checkers c) {
        this.checkers = c;
    }

    @Override
    public List<List<Cell>> possibleMoves(Cell currentCell) {
        return this.possibleMoves(currentCell, new ArrayList<>());
    }

    private List<List<Cell>> possibleMoves(Cell currentCell, List<Cell> visitedCells) {
        State adversaryPlayer = (checkers.getTurn() == Player.PLAYER1) ? State.PLAYER2 : State.PLAYER1;
        List<List<Cell>> coords = new ArrayList<>();
        int crow = currentCell.getX(), ccol = currentCell.getY();
        int[][] pos = {{-1, -1}, {-1, 1}, {1, -1}, {1, 1}};
        Cell destinationCell;
        for (int[] po : pos) {
            int diffRow = po[0], diffCol = po[1], i = 1;
            boolean adv = false;
            do {
                destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                if (!checkers.onBoard(destinationCell) || visitedCells.contains(destinationCell)) {
                    break;
                } else if (checkers.getState(destinationCell) == adversaryPlayer) {
                    adv = true;
                    break;
                } else if (checkers.getState(destinationCell) == State.EMPTY) {
                    i++;
                } else {
                    break;
                }
            } while (true);
            if (adv) {
                visitedCells.add(destinationCell);
                Cell tempCell = destinationCell;
                List<Cell> cells = new ArrayList<>();
                i++;
                do {
                    destinationCell = new Cell(crow + i * diffRow, ccol + i * diffCol);
                    if (checkers.onBoard(destinationCell) && checkers.getState(destinationCell) == State.EMPTY) {
                        cells.add(destinationCell);
                        i++;
                    } else {
                        break;
                    }
                } while (true);
                if (!cells.isEmpty()) {
                    cells.forEach(c -> {
                        List<List<Cell>> moves = possibleMoves(c, visitedCells);
                        if (moves.isEmpty()) {
                            List<Cell> temp = new ArrayList<>();
                            temp.add(c);
                            coords.add(temp);
                        } else {
                            Cell temp = c;
                            moves.forEach(v -> v.add(temp));
                            coords.addAll(moves);
                        }
                    });
                }
                visitedCells.remove(tempCell);
            }
        }
        int max = coords.stream().mapToInt(p -> p.size()).max().orElse(0);
        return coords.stream().filter(p -> p.size() == max).collect(Collectors.toList());
    }
}
