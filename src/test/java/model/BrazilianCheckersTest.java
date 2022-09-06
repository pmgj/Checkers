package model;

import model.games.BrazilianCheckers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

public class BrazilianCheckersTest {

    @Test
    public void testMove() {
        Checkers c = new BrazilianCheckers();
        Winner m;

        try {
            m = c.move(Player.PLAYER1, new Cell(5, 0), new Cell(4, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 1), new Cell(3, 2));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 1), new Cell(3, 0));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 2), new Cell(4, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 0), new Cell(3, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(9, 0), new Cell(8, 1));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 1), new Cell(5, 0));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 3), new Cell(3, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 6), new Cell(4, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 4), new Cell(5, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 7), new Cell(6, 7));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 7), new Cell(4, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 5), new Cell(3, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 3), new Cell(5, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 0), new Cell(2, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(1, 1), new Cell(2, 1));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 2), new Cell(4, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 6), new Cell(4, 7));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 5), new Cell(5, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(4, 7), new Cell(6, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(7, 4), new Cell(5, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(7, 4), new Cell(5, 5));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 4), new Cell(2, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 6), new Cell(4, 7));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 1), new Cell(3, 0));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 3), new Cell(2, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 5), new Cell(3, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 5), new Cell(2, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 2), new Cell(3, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 4), new Cell(4, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 0), new Cell(1, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 3), new Cell(2, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 6), new Cell(3, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(7, 2), new Cell(6, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(0, 5), new Cell(1, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 1), new Cell(5, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 7), new Cell(3, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 7), new Cell(4, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 2), new Cell(2, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(7, 6), new Cell(6, 7));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(0, 3), new Cell(1, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(7, 0), new Cell(6, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 1), new Cell(3, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 3), new Cell(0, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(0, 1), new Cell(1, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(0, 3), new Cell(3, 0));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 6), new Cell(2, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(3, 0), new Cell(4, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 5), new Cell(3, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 7), new Cell(5, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(0, 7), new Cell(1, 6));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 2), new Cell(4, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 4), new Cell(7, 0));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 1), new Cell(0, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(7, 0), new Cell(3, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(0, 5), new Cell(2, 7));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 4), new Cell(6, 7));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 0), new Cell(4, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(6, 7), new Cell(4, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(2, 7), new Cell(7, 2));
            Assertions.assertSame(Winner.PLAYER1, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
    }
}
