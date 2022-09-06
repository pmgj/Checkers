package model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.function.BiFunction;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import model.moves.Moves;

public abstract class Checkers {

    protected Player turn = Player.PLAYER1;
    protected CellState[][] board;
    protected Moves menMove;
    protected Moves kingMove;
    protected Moves menCapture;
    protected Moves kingCapture;
    private Winner winner = Winner.NONE;
    private List<Cell> positions;

    public Player getTurn() {
        return turn;
    }

    public CellState[][] getBoard() {
        return board;
    }

    public Winner getWinner() {
        return winner;
    }

    public List<Cell> getPositions() {
        return positions;
    }

    public CellState getPiece(Cell cell) {
        switch (board[cell.getX()][cell.getY()]) {
            case MEN_PLAYER1:
            case KING_PLAYER1:
                return CellState.PLAYER1;
            case MEN_PLAYER2:
            case KING_PLAYER2:
                return CellState.PLAYER2;
            default:
                return CellState.EMPTY;
        }
    }

    private long countPieces(CellState piece) {
        Stream<CellState> stream = Arrays.stream(board).flatMap(x -> Arrays.stream(x));
        return stream.filter(c -> c == piece).count();
    }

    private List<List<Cell>> getMandatoryCaptureMoves() {
        List<List<Cell>> moves = new ArrayList<>();
        int maxLength = 0;
        boolean capture = false;
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                Cell currentCell = new Cell(i, j);
                CellState currentPiece = getPiece(currentCell);
                if ((currentPiece == CellState.PLAYER1 && turn == Player.PLAYER1)
                        || (currentPiece == CellState.PLAYER2 && turn == Player.PLAYER2)) {
                    List<List<Cell>> pm = showPossibleMoves(currentCell);
                    if (!pm.isEmpty()) {
                        List<Cell> temp = pm.get(0);
                        if (temp.size() > maxLength) {
                            moves = new ArrayList<>();
                            maxLength = temp.size();
                        }
                        if (temp.size() == maxLength) {
                            if (Math.abs(temp.get(0).getX() - temp.get(1).getX()) >= 2) {
                                capture = true;
                            }
                            moves.addAll(pm);
                        }
                    }
                }
            }
        }
        if (capture) {
            List<List<Cell>> temp = moves.stream().filter(m -> Math.abs(m.get(0).getX() - m.get(1).getX()) >= 2)
                    .collect(Collectors.toList());
            if (temp != null) {
                moves = temp;
            }
        }
        return moves;
    }

    public boolean onBoard(Cell cell) {
        BiFunction<Integer, Integer, Boolean> inLimit = (value, limit) -> value >= 0 && value < limit;
        return (inLimit.apply(cell.getX(), board.length) && inLimit.apply(cell.getY(), board[0].length));
    }

    public void move(Player player, Cell beginCell, Cell endCell) throws Exception {
        if (this.winner != Winner.NONE) {
            throw new Exception("This game is already finished.");
        }
        int or = beginCell.getX(), oc = beginCell.getY(), dr = endCell.getX(), dc = endCell.getY();
        /* É a sua vez de jogar? */
        if (player != turn) {
            throw new Exception("It's not your turn.");
        }
        /* Origem e destino devem ser diferentes */
        if (beginCell.equals(endCell)) {
            throw new Exception("Origin and destination cells must be different.");
        }
        /* Origem e destino estão no tabuleiro */
        if (!onBoard(beginCell) || !onBoard(endCell)) {
            throw new Exception("Origin or destination cell is not on board.");
        }
        /* Origem possui uma peça? */
        if (getPiece(beginCell) == CellState.EMPTY) {
            throw new Exception("Origin cell is empty.");
        }
        /* Destino deve estar vazio */
        if (getPiece(endCell) != CellState.EMPTY) {
            throw new Exception("Destination cell must be empty.");
        }
        /* A jogada é possível? */
        List<List<Cell>> moves = getMandatoryCaptureMoves();
        if (!moves.stream().anyMatch(z -> z.get(0).equals(beginCell) && z.get(z.size() - 1).equals(endCell))) {
            throw new Exception("This move is invalid.");
        }
        CellState currentPiece = getPiece(beginCell);
        this.positions = moves.stream()
                .filter(z -> z.get(0).equals(beginCell) && z.get(z.size() - 1).equals(endCell)).findFirst()
                .orElse(new ArrayList<>());
        int a = or, b = oc;
        for (Cell e : this.positions) {
            int x = e.getX(), y = e.getY();
            board[x][y] = board[a][b];
            int rdiff = x > a ? 1 : -1, cdiff = y > b ? 1 : -1;
            for (int i = 0; i < Math.abs(x - a); i++) {
                board[a + rdiff * i][b + cdiff * i] = CellState.EMPTY;
            }
            a = x;
            b = y;
        }
        /* Criar Dama */
        if (currentPiece == CellState.PLAYER1 && dr == 0) {
            board[dr][dc] = CellState.KING_PLAYER1;
        } else if (currentPiece == CellState.PLAYER2 && dr == board.length - 1) {
            board[dr][dc] = CellState.KING_PLAYER2;
        }
        turn = (turn == Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1;
        /* Verificar fim de jogo */
        this.winner = endOfGame();
    }

    private Winner endOfGame() {
        /* Se um jogador não tem mais peças, perde o jogo */
        long numP1 = countPieces(CellState.MEN_PLAYER1) + countPieces(CellState.KING_PLAYER1);
        long numP2 = countPieces(CellState.MEN_PLAYER2) + countPieces(CellState.KING_PLAYER2);
        if (numP1 == 0 && numP2 == 0) {
            return Winner.DRAW;
        } else if (numP1 == 0) {
            return Winner.PLAYER2;
        } else if (numP2 == 0) {
            return Winner.PLAYER1;
        }
        /* Se o jogador da vez não pode movimentar nenhuma peça, perde o jogo */
        List<List<Cell>> moves = getMandatoryCaptureMoves();
        if (moves.isEmpty()) {
            if (turn == Player.PLAYER1) {
                return Winner.PLAYER2;
            } else {
                return Winner.PLAYER1;
            }
        }
        return Winner.NONE;
    }

    public List<List<Cell>> showPossibleMoves(Cell cell) {
        int row = cell.getX(), col = cell.getY();
        List<List<Cell>> moves = new ArrayList<>();
        switch (board[row][col]) {
            case MEN_PLAYER1:
            case MEN_PLAYER2:
                moves = this.menCapture.possibleMoves(cell);
                if (moves.isEmpty()) {
                    moves = this.menMove.possibleMoves(cell);
                }
                break;
            case KING_PLAYER1:
            case KING_PLAYER2:
                moves = this.kingCapture.possibleMoves(cell);
                if (moves.isEmpty()) {
                    moves = this.kingMove.possibleMoves(cell);
                }
                break;
            default:
                break;
        }
        moves.forEach(x -> {
            x.add(cell);
            Collections.reverse(x);
        });
        return moves;
    }

    public void printBoard() {
        for (int i = 0; i <= board.length * 4; i++) {
            System.out.print("-");
        }
        System.out.println("");
        for (CellState[] b : board) {
            for (CellState c : b) {
                System.out.print("| ");
                switch (c) {
                    case MEN_PLAYER1:
                        System.out.print("\u25CB");
                        break;
                    case MEN_PLAYER2:
                        System.out.print("\u25CF");
                        break;
                    case KING_PLAYER1:
                        System.out.print("\u2655");
                        break;
                    case KING_PLAYER2:
                        System.out.print("\u265B");
                        break;
                    case EMPTY:
                        System.out.print(" ");
                        break;
                    default:
                        break;
                }
                System.out.print(" ");
            }
            System.out.println("|");
            for (int i = 0; i <= board.length * 4; i++) {
                System.out.print("-");
            }
            System.out.println("");
        }
    }
}
