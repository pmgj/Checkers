package model.boards;

import model.CellState;

public class TenRowsColsBoard implements BoardSize {

    @Override
    public CellState[][] createBoard() {
        return new CellState[][]{
            {CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2},
            {CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY},
            {CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2},
            {CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY, CellState.MEN_PLAYER2, CellState.EMPTY},
            {CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY},
            {CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY},
            {CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1},
            {CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY},
            {CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1},
            {CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY, CellState.MEN_PLAYER1, CellState.EMPTY}};
    }
}
