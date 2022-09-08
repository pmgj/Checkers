import Cell from './Cell.js';
import BrazilianCheckers from './games/BrazilianCheckers.js';
import CanadianCheckers from './games/CanadianCheckers.js';
import EnglishCheckers from './games/EnglishCheckers.js';
import InternationalCheckers from './games/InternationalCheckers.js';
import Player from './Player.js';
import State from './State.js';

class GUI {
    constructor() {
        this.game = null;
        this.origin = null;
        this.RULES = [BrazilianCheckers, CanadianCheckers, EnglishCheckers, InternationalCheckers];
    }
    init() {
        let option = document.querySelector("#config");
        this.game = new (this.RULES[option.selectedIndex])();
        let tab = this.game.getBoard();
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
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
    changeMessage(m) {
        let objs = { DRAW: "Draw!", PLAYER2: "Black's win!", PLAYER1: "White's win!" };
        if (objs[m]) {
            this.setMessage(`Game Over! ${objs[m]}`);
        } else {
            let msgs = { PLAYER1: "White's turn.", PLAYER2: "Black's turn." };
            this.setMessage(msgs[this.game.getTurn()]);
        }
    }
    play(evt) {
        let td = evt.currentTarget;
        if (this.origin) {
            this.innerPlay(this.origin, td, true);
        } else {
            this.origin = td;
            this.showMandatoryCaptureMoves(td);
        }
    }
    drag(evt) {
        let td = evt.currentTarget;
        this.origin = td.parentNode;
        this.showMandatoryCaptureMoves(this.origin);
    }
    allowDrop(evt) {
        evt.preventDefault();
    }
    drop(evt) {
        let td = evt.currentTarget;
        evt.preventDefault();
        this.innerPlay(this.origin, td, false);
    }
    async innerPlay(beginCell, endCell, animation) {
        this.hidePossibleMoves();
        let begin = this.coordinates(beginCell);
        let end = this.coordinates(endCell);
        try {
            this.game.move(begin, end);
            let positions = this.game.getPositions();
            const time = 1000;
            for (let i = 1; i < positions.length; i++) {
                let { x: or, y: oc } = positions[i - 1];
                let { x: dr, y: dc } = positions[i];
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
                        this.getTableData(positions[i]).appendChild(image);
                        resolve(true);
                    };
                    if (animation) {
                        let td = document.querySelector("td");
                        let size = td.offsetWidth;
                        let anim = image.animate([{ top: 0, left: 0 }, { top: `${(dr - or) * size}px`, left: `${(dc - oc) * size}px` }], time);
                        anim.onfinish = moveImage;
                    } else {
                        moveImage();
                    }
                });
            }
            let table = document.querySelector("table");
            let td = table.rows[end.x].cells[end.y];
            if (this.game.getTurn() === Player.PLAYER2 && end.x === 0) {
                td.innerHTML = `<img src="images/KING_PLAYER1.svg" alt="" />`;
                td.firstChild.ondragstart = this.drag.bind(this);
            } else if (this.game.getTurn() === Player.PLAYER1 && end.x === this.game.getBoard().length - 1) {
                td.innerHTML = '<img src="images/KING_PLAYER2.svg" alt="" />';
                td.firstChild.ondragstart = this.drag.bind(this);
            }
            this.changeMessage(this.game.getWinner());
        } catch (ex) {
            this.setMessage(ex.message);
        }
        this.origin = null;
    }
    showPossibleMoves(cell) {
        let moves = this.game.possibleMoves(cell);
        for (let move of moves) {
            move.forEach(({ x, y }, index, array) => {
                let tempCell = document.querySelector(`tr:nth-child(${x + 1}) td:nth-child(${y + 1})`);
                if (tempCell.className !== 'endPath') {
                    tempCell.className = (index === 0) ? 'selected' : (index === array.length - 1) ? 'endPath' : 'middlePath';
                }
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
    getTableData({ x, y }) {
        let table = document.querySelector("table");
        return table.rows[x].cells[y];
    }
    showMandatoryCaptureMoves(cell) {
        let currentCell = this.coordinates(cell);
        let cells = this.game.getMandatoryCaptureMoves();
        if (cells.some(elem => elem[0].equals(currentCell))) {
            this.showPossibleMoves(currentCell);
        } else {
            this.setMessage('Select the piece that captures most adversary pieces!');
            let { x, y } = cells[0][0];
            document.querySelector("table").rows[x].cells[y].className = 'selected';
        }
    }
    registerEvents() {
        let start = document.querySelector("#start");
        start.onclick = this.init.bind(this);
        let select = document.querySelector("#config");
        select.onchange = this.init.bind(this);
        for (let g of this.RULES) {
            let o = document.createElement("option");
            o.textContent = new g();
            select.appendChild(o);
        }
        this.init();
    }
}
let gui = new GUI();
gui.registerEvents();