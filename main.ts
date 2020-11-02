let letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let digits: string[] = [];
let gameState: string = "ukladanie";
let tableP: HTMLTableElement = <HTMLTableElement>document.getElementById("playerTable");
let tableComputer: HTMLTableElement = <HTMLTableElement>document.getElementById("computerTable");
let playerShips: Ship[] = [];

class Cell {
    id: string;
    x: number;
    y: number;
    state: string;

    constructor(id: string, x: number, y: number, state: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.state = state;
    }
}

class Ship {
    startId: number;
    horizontal: boolean;
    length: number;
    x: number;
    y: number;
    constructor(id: number, x: number, y: number) {
        this.startId = id;
        this.x = x;
        this.y = y;
    }
    public check(x: number, y: number, isHorizontal: boolean, length: number): boolean {
        if (isHorizontal) {
            if (+x + +length < 11) {
                for (var i = 0; i < length; i++) {
                    if (checkCells(x, y)) {
                        playerBoard.forEach(c => {
                            if (c.x == (+x + +i) && c.y == y) {
                                c.state = "ship";
                            }
                        });
                    }


                }
                return true;
            }
        }
    }
}

function checkCells(x: number, y: number): boolean {
    let cells: Cell[] = playerBoard.filter(c => {
        c.x == x - 1 || c.x == x + 1 || c.y == y - 1 || c.y == y + 1;
    });

    var l = cells.filter(c => {
        c.state == "ship";
    }).length;
    alert(l);
    if (l > 0) return false;
    return true;
}



let playerBoard: Cell[] = [];
let computerBoard: Cell[] = [];
let position: string = "none";
let shipsLength = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let actualShip = 0;
let isHorizontal = false;

// function klik(param: number, source: string) {
//     let ids: number[] = [];
//     placeShip(param, isHorizontal);
//     if (playerBoard[+param - 1].state == "ship") {
//         position = "horizontal";
//     }
//     else if (playerBoard[+param + 1].state == "ship") {
//         position = "horizontal";
//     }
//     else if (playerBoard[+param - 10].state =="ship"){
//         position ="vertical";
//     }
//     else if (playerBoard[+param + +10].state =="ship"){
//         position ="vertical";
//     }
//     else {
//         position = "none";
//     }
//     if (param == 0) {
//     }
//     else if (param % 10 != 0 && param < 90 && param > 10 && param != 0) {
//         let i: number = param;
//         playerBoard.forEach(element => {
//             if (element.state == "green") element.state = "";
//         });

//         if (position == "vertical" || position == "none") {
//             if (playerBoard[+param - 10].state != "ship") {
//                 playerBoard[+param - 10].state = "green";
//             }
//             if (playerBoard[+param + +10].state != "ship") {
//                 playerBoard[+param + +10].state = "green";
//             }

//         }
//         if(position == "horizontal" || position == "none"){
//             if (playerBoard[+param + +1].state != "ship") {
//                 playerBoard[+param + +1].state = "green";
//             };

//             if (playerBoard[+param - 1].state != "ship") {
//                 playerBoard[+param - 1].state = "green";
//             }
//         }
//         ids.push(i - 1);
//         ids.push(+i + +1);
//         ids.push(+i - +10);
//         ids.push(+i + +10);
//         reloadScreen();
//     }
// }
let actualShipLength = 3;
function klik(x: number, y: number, source: string) {

    placeShip(1234, x, y, true);

}


function reloadScreen(reload: boolean) {
    if (reload) {
        playerBoard.forEach(cell => {
            // if (cell.getState() == "green") {
            //     document.getElementById(cell.id.toString()).setAttribute("onclick", "klik(\"" + cell.x + "," + cell.y + "\", \"p\")");
            //     document.getElementById(cell.id.toString()).setAttribute("class", "shipGreen");
            // }

            if (cell.state == "ship") {
                document.getElementById(cell.x.toString() + cell.y.toString()).setAttribute("onclick", undefined);
                document.getElementById(cell.x.toString() + cell.y.toString()).setAttribute("class", "ship");
            }
            // else {
            //     alert(111);
            //     document.getElementById(cell.id.toString()).setAttribute("onclick", undefined);
            //     document.getElementById(cell.id.toString()).setAttribute("class", "");
            // }
        })
    }

}

function checkGameState() {
    return gameState;
}

function placeShip(id: number, x: number, y: number, horizontal: boolean) {
    let tempShip: Ship = new Ship(id, x, y);
    tempShip.length = 4;
    if (tempShip.check(x, y, horizontal, shipsLength[actualShip])) {
        alert("check ok");
        reloadScreen(true);
        actualShip++;
    }

}


init();

function logDebug(param: string) {
    console.log(console.log(param));
}


function init() {
    for (let i = 1; i <= 10; i++) {
        digits.push(i.toString());
    }

    let row = tableP.insertRow();
    let rowC = tableComputer.insertRow();

    let cellX = row.insertCell();
    let cellXC = rowC.insertCell();
    for (let a = 0; a < 10; a++) {
        let cell = row.insertCell();
        cell.innerText = letters[a];
        let cellC = rowC.insertCell();
        cellC.innerText = letters[a];

    }

    for (var j = 0; j < 10; j++) {
        let row = tableP.insertRow();
        let rowComputer = tableComputer.insertRow();

        let cell = row.insertCell();
        cell.innerText = digits[j];
        let cellC = rowComputer.insertCell();
        cellC.innerText = digits[j];
        for (var i = 0; i < 10; i++) {
            let cell = row.insertCell();
            cell.setAttribute("name", "td");
            cell.setAttribute("id", + i + "" + j);
            cell.setAttribute("x", i.toString());
            cell.setAttribute("y", j.toString());

            cell.setAttribute("onclick", "klik(\"" + i + "\",\"" + j + "\",\"p\")");
            let cellComputer = rowComputer.insertCell();
            cellComputer.setAttribute("id", i + "" + j)
            cellComputer.setAttribute("onclick", "klik(\"" + i + "," + j + "\", \"c\")");
            console.log(i + " " + j);
            playerBoard.push(new Cell(i + "" + j, i, j, "new"));
            computerBoard.push(new Cell(i + "" + j, i, j, "new"));
        }
    }

    // playerBoard.forEach(element => {
    //     console.log(element.id);
    // });
    // computerBoard.forEach(element => {
    //     console.log(element.id);
    // });

}