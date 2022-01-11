let possibleMoves = [];
let move;
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

let selected;
let rowIndex;
let colIndex;
let currPieces;


// Set initial score
playerScore1.innerHTML += "0";
playerScore2.innerHTML += "0";

currentPlayer.innerHTML = "Current Turn:  Player 2"

function updatePlayerTurn(){
    if(pinkTurn == true){
        pinkTurn = false;
        orangeTurn = true;
        addEvents()
    }
    else if(pinkTurn == false){
        pinkTurn = true;
        orangeTurn = false;
        addEvents()
    }
}

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
    let left;
    let right;
    let backLeft;
    let backRight;

    // Absolute value
    if(rowIndex > 0){
        if(colIndex > 0){
            backLeft = table.rows[rowIndex-1].cells[colIndex-1]
        }
        if(colIndex < 7) {
            backRight = table.rows[rowIndex-1].cells[colIndex+1]
        }
    }

    if(rowIndex < 7) {
        if(colIndex > 0){
            left = table.rows[rowIndex+1].cells[colIndex-1];
        }
        if(colIndex < 7) {
            right = table.rows[rowIndex+1].cells[colIndex+1] 
        }
    }

    if(left != null && left.classList.contains("o") ) {
        if(pinkTurn || (orangeTurn && isKing)) {
            possibleMoves.push(left);
            console.log("MOVE DOWN LEFT: ", left);
            
        }
    }
    if(right != null && right.classList.contains("o") ) {
        if(pinkTurn || (orangeTurn && isKing)) {
            possibleMoves.push(right);
            console.log("MOVE DOWN RIGHT: ", right)
        }
    }
    if(backLeft != null && backLeft.classList.contains("o") ) {
        if(orangeTurn || (pinkTurn && isKing)) {
            possibleMoves.push(backLeft);
            console.log("MOVE UP LEFT: ", backLeft)
        }
    }
    if(backRight != null && backRight.classList.contains("o") ) {
        if(orangeTurn || (pinkTurn && isKing)) {
            possibleMoves.push(backRight);
            console.log("MOVE UP RIGHT: ", backRight)
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

    else if(orangeTurn == true && selectedPiece.id > 12){
        // Get row and index and update the page
        updateSelectedPiece(selectedPiece);

        // Get possible spaces
        getSpaces();

            //getJumps();
            console.log(selectedPiece);
   
            console.log("VALID")
    }
}

function removeEventsBlank() {
    for(let i = 0; i < possibleMoves.length; ++i){
        possibleMoves[i].style.border = "none";
        let c = possibleMoves[i];
        console.log(possibleMoves[i]);
        possibleMoves[i].removeEventListener('click', makeMove)
    }
}

function makeMove(){
    moveChoice = this;
    console.log("POSSIBLE MOVES: ",possibleMoves)
    let parent = selected.parentElement;
    console.log("SELECTED MOVE: ",selected);
    console.log("LOCATION TO MOVE TO: ", moveChoice);
    let curId = selected.id;

  

    console.log(squares)
    if(pinkTurn){
        selected.classList.remove("pink");
    }
    else {
        selected.classList.remove("orange");
    }
    parent.removeChild(selected);
    console.log(parent)
    parent.classList.add("o");
    console.log(parent.classList)


    console.log(moveChoice)
    let newChild = document.createElement("span");
    
    if(pinkTurn){
        newChild.classList.add("pink");
    }
    else {
        newChild.classList.add("orange");
    }

 
    newChild.setAttribute('id', curId);
    moveChoice.classList.remove("o")
    moveChoice.appendChild(newChild);
    newChild.addEventListener('click', (e) => {
        removeEventsBlank();
        possibleMoves = []
        e.stopImmediatePropagation()
        console.log(squares)
        selected = newChild;
        getMoves(newChild)
        addEventsBlank()
    })
    console.log(moveChoice)
    removeEventsBlank()
    possibleMoves = [];
    updatePlayerTurn();

}

function addEventsBlank() {
    for(let i = 0; i < possibleMoves.length; ++i){
        possibleMoves[i].style.border = "1px solid red";
        possibleMoves[i].addEventListener('click', makeMove)
    }

}

function addEvents() {
    if(pinkTurn == true){
        for(let i = 0; i < pinkPieces.length; i++){
            pinkPieces[i].addEventListener('click', (e) => {
                removeEventsBlank();
                possibleMoves = []
                e.stopImmediatePropagation()
                console.log(squares)
                selected = pinkPieces[i];
                getMoves(pinkPieces[i])
                addEventsBlank()
            
            })
        }
    }
    else{
        for(let i = 0; i < orangePieces.length; i++){
            orangePieces[i].addEventListener('click', (e) => {
                removeEventsBlank();
                possibleMoves = []
                e.stopImmediatePropagation()
                console.log(squares)
                selected = orangePieces[i];
                getMoves(orangePieces[i])
                addEventsBlank()
            })
        }
    }
}

addEvents()






