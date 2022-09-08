import Cell from "./Cell.js";
import Player from "./Player.js";
import State from "./State.js";
import ConnectionType from "./ConnectionType.js";
import Piece from "./Piece.js";
import Winner from "./Winner.js";

class GUI {
    constructor() {
        this.ws = null;
        this.player = null;
        this.origin = null;
        this.closeCodes = { ENDGAME: { code: 4000, description: "End of game." }, ADVERSARY_QUIT: { code: 4001, description: "The opponent quit the game" } };
    }
    writeResponse(text) {
        let message = document.getElementById("message");
        message.innerHTML = text;
    }
    printBoard(board) {
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        let transMatrix = board;
        if (this.player === Player.PLAYER2) {
            transMatrix = Array(board.length).fill().map(() => Array(board[0].length).fill());
            for (let i = 0, rows = board.length; i < rows; i++) {
                for (let j = 0, cols = board[i].length; j < cols; j++) {
                    transMatrix[i][j] = board[rows - i - 1][cols - j - 1];
                }
            }
            board = transMatrix;
        }
        for (let i = 0; i < transMatrix.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < transMatrix[i].length; j++) {
                let td = document.createElement("td");
                if (transMatrix[i][j].state !== State.EMPTY) {
                    let img = document.createElement("img");
                    img.src = `images/${transMatrix[i][j].piece}_${transMatrix[i][j].state}.svg`;
                    td.appendChild(img);
                }
                td.onclick = this.play.bind(this);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }
    getTableData({ x, y }) {
        let table = document.querySelector("table");
        return table.rows[x].cells[y];
    }
    coordinates(tableData) {
        return new Cell(tableData.parentNode.rowIndex, tableData.cellIndex);
    }
    play(evt) {
        let td = evt.currentTarget;
        if (this.origin === null) {
            this.ws.send(JSON.stringify({ beginCell: this.getCorrectCell(this.coordinates(td)) }));
            this.origin = td;
        } else {
            this.ws.send(JSON.stringify({ beginCell: this.getCorrectCell(this.coordinates(this.origin)), endCell: this.getCorrectCell(this.coordinates(td)) }));
            this.origin = null;
            this.hidePossibleMoves();
        }
    }
    unsetEvents() {
        let cells = document.querySelectorAll("td");
        cells.forEach(td => td.onclick = undefined);
    }
    getCorrectCell(cell) {
        return this.player === Player.PLAYER1 ? cell : this.getRotatedCell(cell);
    }
    getRotatedCell({ x, y }) {
        return new Cell(8 - x - 1, 8 - y - 1);
    }
    showPossibleMoves(cells) {
        let moves = cells;
        if (this.player === Player.PLAYER2) {
            moves = cells.map(v => v.map(c => this.getRotatedCell(c)));
        }
        for (let positions of moves) {
            for (let cell of positions) {
                let td = this.getTableData(cell);
                td.className = "selected";
            }
        }
    }
    hidePossibleMoves() {
        let tds = document.querySelectorAll("td");
        tds.forEach(td => td.className = "");
    }
    endGame(closeObj, winner) {
        this.unsetEvents();
        this.ws.close(closeObj.code, closeObj.description);
        this.ws = null;
        this.setButtonText(true);
        this.writeResponse(`Game Over! ${(winner === Winner.DRAW) ? "Draw!" : (winner === this.player ? "You win!" : "You lose!")}`);
    }
    async onMessage(evt) {
        let data = JSON.parse(evt.data);
        console.log(data);
        let game = data.game;
        switch (data.type) {
            case ConnectionType.OPEN:
                this.player = data.turn;
                this.writeResponse("Waiting for opponent.");
                break;
            case ConnectionType.CREATE_BOARD:
                this.printBoard(game.board);
                this.writeResponse(this.player === game.turn ? "It's your turn." : "Wait for your turn.");
                break;
            case ConnectionType.SHOW_MOVES:
                this.showPossibleMoves(data.possibleMoves);
                break;
            case ConnectionType.MOVE_PIECE:
                const time = 1000;
                let positions = game.positions;
                for (let i = 1; i < positions.length; i++) {
                    let { x: or, y: oc } = this.getCorrectCell(positions[i - 1]);
                    let { x: dr, y: dc } = this.getCorrectCell(positions[i]);
                    await new Promise(resolve => {
                        if (Math.abs(or - dr) >= 2) {
                            let rdiff = dr > or ? 1 : -1, cdiff = dc > oc ? 1 : -1;
                            for (let i = 1; i < Math.abs(dr - or); i++) {
                                let middleImage = document.querySelector(`tr:nth-child(${or + rdiff * i + 1}) td:nth-child(${oc + cdiff * i + 1}) img`);
                                if (middleImage) {
                                    let anim = middleImage.animate([{ opacity: 1 }, { opacity: 0 }], time);
                                    anim.onfinish = () => middleImage.parentNode.removeChild(middleImage);
                                }
                            }
                        }
                        let image = document.querySelector(`tr:nth-child(${or + 1}) td:nth-child(${oc + 1}) img`);
                        let moveImage = () => {
                            let temp = this.getCorrectCell(positions[i]);
                            this.getTableData(temp).appendChild(image);
                            resolve(true);
                        };
                        let td = document.querySelector("td");
                        let size = td.offsetWidth;
                        let anim = image.animate([{ top: 0, left: 0 }, { top: `${(dr - or) * size}px`, left: `${(dc - oc) * size}px` }], time);
                        anim.onfinish = moveImage;
                    });
                }
                let end = positions[positions.length - 1];
                let { x, y } = this.getCorrectCell(end);
                let table = document.querySelector("table");
                let td = table.rows[x].cells[y];
                let endPiece = game.board[end.x][end.y];
                if (endPiece.piece === Piece.KING) {
                    td.innerHTML = `<img src="images/${endPiece.piece}_${endPiece.state}.svg" alt="" />`;
                }
                if (game.winner === Winner.NONE) {
                    this.writeResponse(this.player === game.turn ? `It's your turn.` : `Wait for your turn.`);
                } else {
                    this.endGame(this.closeCodes.ENDGAME, game.winner);
                }
                break;
            case ConnectionType.QUIT_GAME:
                this.endGame(1000, data.turn);
                break;
        }
    }
    startGame() {
        if (this.ws) {
            this.endGame(this.closeCodes.ADVERSARY_QUIT);
        } else {
            this.ws = new WebSocket(`ws://${document.location.host}${document.location.pathname}checkers`);
            this.ws.onmessage = this.onMessage.bind(this);
            this.setButtonText(false);
        }
    }
    setButtonText(on) {
        let button = document.querySelector("input[type='button']");
        button.value = on ? "Start" : "Quit";
    }
    init() {
        let button = document.querySelector("input[type='button']");
        button.onclick = this.startGame.bind(this);
        this.setButtonText(true);
    }
}
let gui = new GUI();
gui.init();