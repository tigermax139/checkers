const {EventEmitter} = require('events');

const SIDE = {
    BLACK: 'black',
    WHITE: 'white',
}

class Game extends EventEmitter {
    constructor() {
        super();
    }
}

class Cell {
    constructor({
                    x, y,
                    isLocked, chess, desk,
                }) {
        this.x = x;
        this.y = y;
        this.isLocked = isLocked;
        this.chess = chess;
        this.desk = desk;
    }

    get siblings() {
        const siblings = [];

        for (let i = -1; i < 2; i++) {
            siblings[i + 1] = [];
            for (let j = -1; j < 2; j++) {
                siblings[i + 1][j + 1] = this.desk[this.x + i] && !(i === 0 && j === 0) // same cell
                    ? this.desk[this.x + i][this.y + j] || null
                    : null;
            }
        }

        return siblings;
    }

    toString() {
        return this.isLocked ? 'white' : 'black';
    }
}


class CheckersGame extends Game {
    constructor({size = 8, checkersCount = 12}) {
        super();
        this.desk = CheckersGame.initDesk(size);
    }

    static initDesk(size) {
        const desk = [];
        const checkersRows = size / 2 - 1;
        // const hasChess = new Array(checkersRows).map(_, i => i);

        for (let x = 0; x < size; x++) {
            desk[x] = [];

            for (let y = 0; y < size; y++) {
                const isLocked = (y + x + 1) % 2;
                const side = x < size / 2 ? SIDE.WHITE : SIDE.WHITE;
                // todo make generic
                const hasChess = [0, 1, 2, 5, 6, 7].includes(x) && !isLocked;

                const chess = hasChess ? {side} : null;

                desk[x][y] = new Cell({
                    x,
                    y,
                    isLocked,
                    chess,
                    desk,
                });
            }
        }
        return desk;
    }

    moveChess() {
        // todo
    }
}

const game = new CheckersGame({size: 8});
console.table(game.desk[0][0].siblings);
console.log('----');
console.table(game.desk[1][1].siblings);
