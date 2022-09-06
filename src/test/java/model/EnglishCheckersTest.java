package model;

import model.games.EnglishCheckers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

public class EnglishCheckersTest {

    @Test
    public void testMove() {
        Checkers c = new EnglishCheckers();

        Winner m;

        try {
            m = c.move(Player.PLAYER2, new Cell(2, 1), new Cell(3, 0));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 7), new Cell(3, 6));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 4), new Cell(4, 3));
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
            m = c.move(Player.PLAYER1, new Cell(5, 2), new Cell(4, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 0), new Cell(5, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 3), new Cell(6, 3));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER1, new Cell(6, 3), new Cell(4, 1));
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
            m = c.move(Player.PLAYER1, new Cell(8, 0), new Cell(7, 1));
            Assertions.fail();
        } catch (Exception ex) {

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
            m = c.move(Player.PLAYER1, new Cell(4, 1), new Cell(3, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 2), new Cell(4, 1));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER2, new Cell(2, 3), new Cell(4, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 0), new Cell(4, 1));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER1, new Cell(5, 0), new Cell(3, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 4), new Cell(2, 3));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(3, 2), new Cell(1, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(0, 5), new Cell(2, 3));
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
            m = c.move(Player.PLAYER2, new Cell(0, 3), new Cell(1, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(4, 7), new Cell(0, 3));
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
            m = c.move(Player.PLAYER1, new Cell(0, 7), new Cell(1, 6));
            Assertions.fail();
        } catch (Exception ex) {

        }
        try {
            m = c.move(Player.PLAYER1, new Cell(0, 3), new Cell(2, 5));
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
            m = c.move(Player.PLAYER1, new Cell(2, 5), new Cell(0, 7));
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
            m = c.move(Player.PLAYER1, new Cell(0, 7), new Cell(1, 6));
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
            m = c.move(Player.PLAYER1, new Cell(1, 6), new Cell(2, 5));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(1, 2), new Cell(2, 3));
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
            m = c.move(Player.PLAYER2, new Cell(2, 1), new Cell(3, 2));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(2, 5), new Cell(1, 4));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER2, new Cell(3, 2), new Cell(4, 1));
            Assertions.assertSame(Winner.NONE, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
        try {
            m = c.move(Player.PLAYER1, new Cell(1, 4), new Cell(5, 0));
            Assertions.assertSame(Winner.PLAYER1, m);
        } catch (Exception ex) {
            Assertions.fail();
        }
    }
}
