package controller;

import java.util.List;

import model.Cell;
import model.Checkers;
import model.Player;

public class Message {
    private ConnectionType type;
    private Checkers game;
    private Player turn;
    private List<List<Cell>> possibleMoves;
    private Cell beginCell;
    private Cell endCell;

    public Message() {

    }

    public Message(ConnectionType type, Player turn) {
        this.type = type;
        this.turn = turn;
    }

    public Message(ConnectionType type, Checkers game) {
        this.type = type;
        this.game = game;
    }

    public Message(ConnectionType type, List<List<Cell>> possibleMoves) {
        this.type = type;
        this.possibleMoves = possibleMoves;
    }

    public Message(ConnectionType type, Checkers game, Cell beginCell, Cell endCell) {
        this.type = type;
        this.game = game;
        this.beginCell = beginCell;
        this.endCell = endCell;
    }

    public ConnectionType getType() {
        return type;
    }

    public void setType(ConnectionType type) {
        this.type = type;
    }

    public Player getTurn() {
        return turn;
    }

    public void setTurn(Player turn) {
        this.turn = turn;
    }

    public Cell getBeginCell() {
        return beginCell;
    }

    public void setBeginCell(Cell beginCell) {
        this.beginCell = beginCell;
    }

    public Cell getEndCell() {
        return endCell;
    }

    public void setEndCell(Cell endCell) {
        this.endCell = endCell;
    }

    public Checkers getGame() {
        return game;
    }

    public void setGame(Checkers game) {
        this.game = game;
    }

    public void setPossibleMoves(List<List<Cell>> possibleMoves) {
        this.possibleMoves = possibleMoves;
    }

    public List<List<Cell>> getPossibleMoves() {
        return possibleMoves;
    }
}
