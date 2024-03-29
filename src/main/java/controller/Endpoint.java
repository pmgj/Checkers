package controller;

import java.io.IOException;
import java.util.List;

import jakarta.websocket.CloseReason;
import jakarta.websocket.EncodeException;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import model.Cell;
import model.Checkers;
import model.Player;
import model.games.BrazilianCheckers;

@ServerEndpoint(value = "/checkers", encoders = MessageEncoder.class, decoders = MoveMessageDecoder.class)
public class Endpoint {

    private static Session s1;
    private static Session s2;
    private static Checkers game;

    @OnOpen
    public void onOpen(Session session) throws IOException, EncodeException {
        if (s1 == null) {
            s1 = session;
            s1.getBasicRemote().sendObject(new Message(ConnectionType.OPEN, null, Player.PLAYER1, null));
        } else if (s2 == null) {
            game = new BrazilianCheckers();
            s2 = session;
            s2.getBasicRemote().sendObject(new Message(ConnectionType.OPEN, null, Player.PLAYER2, null));
            Message msg = new Message(ConnectionType.CREATE_BOARD, game, null, null);
            s1.getBasicRemote().sendObject(msg);
            s2.getBasicRemote().sendObject(msg);
        } else {
            session.close();
        }
    }

    @OnMessage
    public void onMessage(Session session, MoveMessage message) throws IOException, EncodeException {
        Cell beginCell = message.getBeginCell(), endCell = message.getEndCell();
        try {
            if (endCell == null) {
                Cell bCell = null;
                List<List<Cell>> pm = null;
                if (session == s1 && game.getTurn() == Player.PLAYER1) {
                    bCell = beginCell;
                    pm = game.showPossibleMoves(bCell);
                }
                if (session == s2 && game.getTurn() == Player.PLAYER2) {
                    bCell = beginCell;
                    pm = game.showPossibleMoves(bCell);
                }
                if (bCell != null) {
                    session.getBasicRemote().sendObject(new Message(ConnectionType.SHOW_MOVES, null, null, pm));
                }
                return;
            }
            game.move(session == s1 ? Player.PLAYER1 : Player.PLAYER2, beginCell, endCell);
            s1.getBasicRemote().sendObject(new Message(ConnectionType.MOVE_PIECE, game, null, null));
            s2.getBasicRemote().sendObject(new Message(ConnectionType.MOVE_PIECE, game, null, null));
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    @OnClose
    public void onClose(Session session, CloseReason reason) throws IOException, EncodeException {
        switch (reason.getCloseCode().getCode()) {
            case 1000, 4000 -> {
                if (session == s1) {
                    s1 = null;
                } else {
                    s2 = null;
                }
            }
            case 1001, 4001 -> {
                if (session == s1) {
                    s2.getBasicRemote().sendObject(new Message(ConnectionType.QUIT_GAME, null, Player.PLAYER2, null));
                    s1 = null;
                } else {
                    s1.getBasicRemote().sendObject(new Message(ConnectionType.QUIT_GAME, null, Player.PLAYER1, null));
                    s2 = null;
                }
            }
            default -> {
                System.out.println(String.format("Close code %d incorrect", reason.getCloseCode().getCode()));
            }
        }
    }
}
