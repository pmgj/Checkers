import State from './State.js';
import Checkers from './Checkers.js';
import Cell from './Cell.js';

class GUI {
    constructor() {
        this.game = new Checkers();
        this.origin = null;
    }
    init() {
        let tab = this.game.getBoard();
        let tbody = document.querySelector("tbody");
        for (let i = 0; i < tab.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < tab[i].length; j++) {
                let td = document.createElement("td");
                if (tab[i][j].state !== State.EMPTY) {
                    let img = document.createElement("img");
                    img.src = `images/${tab[i][j].piece}_${tab[i][j].state}.svg`;
                    img.ondragstart = this.drag.bind(this);
                    td.appendChild(img);
                }
                td.onclick = this.play.bind(this);
                td.ondragover = this.allowDrop.bind(this);
                td.ondrop = this.drop.bind(this);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }
    coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
    }
    changeMessage() {
        let msgs = {PLAYER1: "White's turn.", PLAYER2: "Black's turn."};
        this.setMessage(msgs[this.game.getTurn()]);
    }
    play(evt) {
        let td = evt.currentTarget;
        if (this.origin === null) {
            this.origin = td;
        } else {
            this.innerPlay(this.origin, td);
        }
    }
    drag(evt) {
        let td = evt.currentTarget;
        this.origin = td.parentNode;
    }
    allowDrop(evt) {
        evt.preventDefault();
    }
    drop(evt) {
        let td = evt.currentTarget;
        evt.preventDefault();
        this.innerPlay(this.origin, td);
    }
    innerPlay(beginCell, endCell) {
        let begin = this.coordinates(beginCell);
        let end = this.coordinates(endCell);
        try {
            this.game.move(begin, end);
            let image = beginCell.firstChild;
            endCell.appendChild(image);
            this.changeMessage();
        } catch (ex) {
            this.setMessage(ex.message);
        }
        this.origin = null;
    }
}
let gui = new GUI();
gui.init();