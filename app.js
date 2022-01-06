let possibleMoves = [];
let pieceRemove = false;
let pinkTurn = true;
let orangeTurn = false;

const table = document.querySelector("table");
const squares = document.querySelectorAll("td");
const pinkPieces = document.querySelectorAll(".pink");
const orangePieces = document.querySelectorAll(".orange");
let playerScore1 = document.querySelector("#score1");
let playerScore2 = document.querySelector("#score2");
let currentPlayer = document.querySelector("#cur-move");
let outputSelected = document.querySelector("#selected");
let movePiece = document.querySelector("#move");

let selected;
let rowIndex;
let colIndex;
let currPieces;

let board = [-1, 1, -1, 2, -1, 3, -1, 4, 
              5, -1, 6, -1, 7, -1, 8, -1,
             -1, 9, -1, 10, -1, 11, -1, 12, 
              0, -1, 0, -1, 0, -1, 0, -1, 
              -1, 0, -1, 0, -1, 0, -1, 0,
            ]


// Set initial score
playerScore1.innerHTML += "0";
playerScore2.innerHTML += "0";

currentPlayer.innerHTML = "Current Turn:  Player 2"


function updateSelectedPiece(curr) {
    for(let i = 0; i < squares.length; i++){
        if(squares[i].children.length > 0 && squares[i].firstChild.id == curr.id){
            rowIndex = squares[i].parentElement.rowIndex;
            colIndex = squares[i].cellIndex;
            outputSelected.innerHTML = `Selected Piece: ${rowIndex}, ${colIndex}`

        }
    }
}

function getSpaces(){
    let isKing = selected.classList.contains("king")
    let left = table.rows[rowIndex+1].cells[colIndex-1];
    let right = table.rows[rowIndex+1].cells[colIndex+1] 
    let backLeft = table.rows[rowIndex-1].cells[colIndex-1]
    let backRight = table.rows[rowIndex-1].cells[colIndex+1]
    console.log(table.rows[3].cells[0]);
    if(left != null && left.classList.contains("o") ) {
        if(pinkTurn || (orangeTurn && isKing)) {
            possibleMoves.push(left);
            console.log("POSSIBLE SPACE")
        }
    }
    if(right != null && right.classList.contains("o") ) {
        if(pinkTurn || (orangeTurn && isKing)) {
            possibleMoves.push(right);
            console.log("POSSIBLE SPACE")
        }
    }
    if(backLeft != null && backLeft.classList.contains("o") ) {
        if(orangeTurn || (pinkTurn && isKing)) {
            possibleMoves.push(backLeft);
            console.log("POSSIBLE SPACE")
        }
    }
    if(backRight != null && backRight.classList.contains("o") ) {
        if(orangeTurn || (pinkTurn && isKing)) {
            possibleMoves.push(backRight);
            console.log("POSSIBLE SPACE")
        }
    }
}

function getMoves(selectedPiece) {
    // Make sure if player selected correct piece
    if(pinkTurn == true && selectedPiece.id < 13) {
        // Get row and index and update the page
        updateSelectedPiece(selectedPiece);

        // Get possible spaces
        getSpaces();

        //getJumps();
        console.log(selectedPiece);
   
        console.log("VALID")
    }
}

function makeMove(moveChoice){
    let parent = selected.parentElement;
    let curId = selected.id;
    moveChoice.style.border = "none";
    selected.classList.remove("pink");
    selected.parentElement.removeChild(selected);
    console.log(parent)
    parent.classList.add("o");
    console.log(parent.classList)


    console.log(moveChoice)
    let newChild = document.createElement("span");
    newChild.classList.add("pink");
    newChild.setAttribute('id', curId);
    moveChoice.appendChild(newChild);
    console.log(moveChoice)
}

function addEventsBlank() {
    for(let i = 0; i < possibleMoves.length; ++i){
        possibleMoves[i].style.border = "1px solid red";
        possibleMoves[i].addEventListener('click', () => {
            makeMove(possibleMoves[i]);
        })

    }

}

function addEvents() {
    if(pinkTurn == true){
        for(let i = 0; i < pinkPieces.length; i++){
            pinkPieces[i].addEventListener('click', () => {
                selected = pinkPieces[i];
                getMoves(pinkPieces[i])
                addEventsBlank()
                console.log(possibleMoves);
            
            })
        }
    }
    else{
        for(let i = 0; i < orangePieces.length; i++){
            orangePieces[i].addEventListener('click', getMoves() )
        }
    }
}

addEvents()





