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

// function addBorder() {
//     selected.style.border = "3px solid lime";
//     console.log();
// }
// function removeBorders() {
//     for(let i = 0; i < pinkPieces.length; i++){
//         pinkPieces[i].style.border = "none"
//     }
// }

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

        // Check if element is a king
        // if(table.rows[rowIndex].cells[colIndex].firstElementChild.classList.contains("king")){
        //     // Check if it can move in the diagonal directions
        // }
        // else{
        //     // Check if it can move in the two forward directions
        //     getSpaces()
        //     console.log(possibleMoves)
        //     console.log("NOT A KING")
        //     // addBorder()
        // }
        console.log(selectedPiece);
        //if(selectedPiece.class)
       // if(isKing() == true){
        //    checkFourMoves(selectedPiece)
        //}
       // else{
           // checkForwardMoves(selectedPiece)
       // }
        console.log("VALID")
    }
 //   console.log(selectedPiece)
}

function makeMove(){

}


function addEvents() {
    if(pinkTurn == true){
        for(let i = 0; i < pinkPieces.length; i++){
            pinkPieces[i].addEventListener('click', () => {
            possibleMoves = []
            selected = pinkPieces[i];
            getMoves(pinkPieces[i])
            console.log(possibleMoves);
            makeMove();
            // removeBorders();
            
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

// function getPieces() {
//     if(pinkTurn == true){
//         currPieces = pinkPieces;
//         console.log("PINK SELECTED")
//     }
//     else{
//         currPieces = orangePieces
//         console.log("ORANGE SELECTED")
//     }
// }

// function updateTurn(){
//     if(pinkTurn == true){
//         pinkTurn = false;
//         orangeTurn = true;
//         currentPlayer.innerHTML = "Current Turn:  Player 2"
//     }
//     else{
//         orangeTurn = false;
//         pinkTurn = true;
//         currentPlayer.innerHTML = "Current Turn:  Player 1"
//     }
// }

// function addEventListeners(){
//     if(pinkTurn == true){
//         for(let i = 0; i < pinkPieces.length; i++){
//             pinkPieces[i].addEventListener('click', () => getPieces());
//         }
       
//     }
//     else{
//         for(let i = 0; i < orangePieces.length; i++){
//             orangePieces[i].addEventListener('click', () => getPieces());
//         }
//     }
//}


//;addEventListeners();
//updateTurn();




