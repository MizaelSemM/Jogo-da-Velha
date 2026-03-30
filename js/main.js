//dados
let board = {
    a1: "", a2: "", a3: "",
    b1: "", b2: "", b3: "",
    c1: "", c2: "", c3: ""
}

let turn = "x";
let playing = true;


//eventos
let box = document.querySelectorAll(".block");
let msg = document.querySelector(".stage");
msg.innerHTML = turn;
let warning = document.querySelector(".warning");


//funções
function resetGame() {

    box.forEach((element) => {
        element.style.backgroundColor = "";
    })

    board = {
        a1: "", a2: "", a3: "",
        b1: "", b2: "", b3: "",
        c1: "", c2: "", c3: ""
    }

    playing = true;
    warning.innerHTML = "";

    boardRender()
    toggle()
}

function toggle() {
    turn = turn === "x" ? "o" : "x";

    msgRender();
}

function msgRender() {
    msg.innerHTML = turn;
}


box.forEach((item) => {
    item.addEventListener("click", (e) => {
        let block = e.target.closest(".block");

        if (!playing) return;
        if (!block) return;

        let info = block.getAttribute("data-item")

        if (board[info] !== "") return;

        board[info] = turn;

        boardRender()
        boardWinner()

        if (playing) {
            toggle();
        }

    })
})

function boardRender() {
    for (let key in board) {
        let block = document.querySelector(`[data-item=${key}]`);
        block.innerHTML = board[key];
    }
}

function boardWinner() {
    let boardWins = [
        ["a1", "a2", "a3"],
        ["b1", "b2", "b3"],
        ["c1", "c2", "c3"],

        ["a1", "b1", "c1"],
        ["a2", "b2", "c2"],
        ["a3", "b3", "c3"],

        ["a1", "b2", "c3"],
        ["c1", "b2", "a3"]
    ]

    let veryWin;
    let winnerCombo = null;

    for (let subArray of boardWins) {
        veryWin = subArray.every(win => board[win] === turn);

        if (veryWin) {
            warning.innerHTML = `${turn} Venceu!`;
            playing = false;
            winnerCombo = subArray;
            highlight(winnerCombo)
            return;
        }
    }
    veryNull(veryWin)
}

function highlight(winnerCombo) {
    for (let pos of winnerCombo) {
        let styleWinBox = document.querySelector(`[data-item=${pos}]`);

        styleWinBox.style.backgroundColor = "green";
    }

}

function veryNull(item) {

    let veryFullboard = Object.values(board);

    let very = veryFullboard.every(value => value !== "");

    if (item === false && very === true) {
        warning.innerHTML = "O JOGO EMPATOU"
        playing = false;
    }

}
