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
        this.changeMessage();
    }
    coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
    }
    changeMessage() {
        let msgs = { PLAYER1: "White's turn.", PLAYER2: "Black's turn." };
        this.setMessage(msgs[this.game.getTurn()]);
    }
    play(evt) {
        let td = evt.currentTarget;
        if (this.origin) {
            this.innerPlay(this.origin, td, true);
        } else {
            this.origin = td;
            this.showPossibleMoves(td);
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
        this.innerPlay(this.origin, td, false);
    }
    innerPlay(beginCell, endCell, animation) {
        this.hidePossibleMoves();
        let begin = this.coordinates(beginCell);
        let end = this.coordinates(endCell);
        try {
            this.game.move(begin, end);
            const time = 1000;
            let image = beginCell.firstChild;
            let { x: or, y: oc } = begin;
            let { x: dr, y: dc } = end;
            let removeOpponentPiece = () => endCell.appendChild(image);
            if (animation) {
                let td = document.querySelector("td");
                let size = td.offsetWidth;
                let anim = image.animate([{ top: 0, left: 0 }, { top: `${(dr - or) * size}px`, left: `${(dc - oc) * size}px` }], time);
                anim.onfinish = removeOpponentPiece;
            } else {
                removeOpponentPiece();
            }
            if (Math.abs(or - dr) === 2) {
                let middleImage = document.querySelector(`tr:nth-child(${(or + dr) / 2 + 1}) td:nth-child(${(oc + dc) / 2 + 1}) img`);
                let anim = middleImage.animate([{ opacity: 1 }, { opacity: 0 }], time);
                anim.onfinish = () => middleImage.parentNode.removeChild(middleImage);
            }
            this.changeMessage();
        } catch (ex) {
            this.setMessage(ex.message);
        }
        this.origin = null;
    }
    showPossibleMoves(cell) {
        let coords = this.coordinates(cell);
        let moves = this.game.possibleMoves(coords);
        for (let move of moves) {
            move.forEach(({ x, y }) => {
                let tempCell = document.querySelector(`tr:nth-child(${x + 1}) td:nth-child(${y + 1})`);
                tempCell.className = 'selected';
            });
        }
        if (moves.length === 0) {
            this.setMessage("No possible moves for this piece. ");
        }
    }
    hidePossibleMoves() {
        let cells = document.querySelectorAll("td");
        cells.forEach(c => c.className = '');
    }
}
let gui = new GUI();
gui.init();