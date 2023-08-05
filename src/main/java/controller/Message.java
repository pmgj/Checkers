package controller;

import java.util.List;

import model.Cell;
import model.Checkers;
import model.Player;

public record Message(ConnectionType type, Checkers game, Player turn, List<List<Cell>> possibleMoves) {

}