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
