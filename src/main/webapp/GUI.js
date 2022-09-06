import Cell from "./Cell.js";
import Player from "./Player.js";

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
                if (transMatrix[i][j] !== "EMPTY") {
                    let img = document.createElement("img");
                    img.src = `images/${transMatrix[i][j]}.svg`;
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
        this.writeResponse(`Game Over! ${(winner === "DRAW") ? "Draw!" : (winner === this.player ? "You win!" : "You lose!")}`);
    }
    onMessage(evt) {
        let data = JSON.parse(evt.data);
        console.log(data);
        let game = data.game;
        switch (data.type) {
            case "OPEN":
                this.player = data.turn;
                this.writeResponse("Waiting for opponent.");
                break;
            case "CREATE_BOARD":
                this.printBoard(game.board);
                this.writeResponse(this.player === game.turn ? "It's your turn." : "Wait for your turn.");
                break;
            case "SHOW_MOVES":
                this.showPossibleMoves(data.possibleMoves);
                break;
            case "MOVE_PIECE":
                const time = 1000;
                let moveImage = (destinationCell, piece) => {
                    destinationCell.innerHTML = "";
                    destinationCell.appendChild(piece);
                };
                let animatePiece = (startPosition, endPosition) => {
                    let startCell = this.getCorrectCell(startPosition);
                    let endCell = this.getCorrectCell(endPosition);
                    let bTD = this.getTableData(startCell);
                    let eTD = this.getTableData(endCell);
                    let piece = bTD.firstChild;
                    let { x: a, y: b } = startCell;
                    let { x: c, y: d } = endCell;
                    let td = document.querySelector("td");
                    let size = td.offsetWidth;
                    let anim = piece.animate([{ top: 0, left: 0 }, { top: `${(c - a) * size}px`, left: `${(d - b) * size}px` }], time);
                    anim.onfinish = () => moveImage(eTD, piece);
                };
                animatePiece(data.beginCell, data.endCell);
                let endCell = this.getCorrectCell(data.endCell);
                let eTD = this.getTableData(endCell);
                let opponentImage = eTD.firstChild;
                if (opponentImage) {
                    opponentImage.animate([{ opacity: 1 }, { opacity: 0 }], time);
                }
                if (game.winner === "NONE") {
                    this.writeResponse(this.player === game.turn ? `It's your turn.` : `Wait for your turn.`);
                } else {
                    this.endGame(this.closeCodes.ENDGAME, game.winner);
                }
                break;
            case "QUIT_GAME":
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