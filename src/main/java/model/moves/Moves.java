package model.moves;

import java.util.List;
import model.Cell;
import model.Checkers;

public abstract class Moves {
    protected Checkers checkers;

    abstract public List<List<Cell>> possibleMoves(Cell cell);
}
