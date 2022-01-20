let possibleMoves = [];
let move;
let pinkTurn = true;
let orangeTurn = false;
let pinkScore = 0;
let orangeScore = 0;

const win = document.querySelector(".title")
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


playerScore1.innerHTML = `Score: ${orangeScore}`;
playerScore2.innerHTML = `Score: ${pinkScore}`;

currentPlayer.innerHTML = "Current Turn:  Player 2"

function updatePlayerTurn(){
    if(pinkTurn == true){
        pinkTurn = false;
        orangeTurn = true;
        currentPlayer.innerHTML = "Current Turn:  Player 1"
        addEvents()
    }
    else if(pinkTurn == false){
        pinkTurn = true;
        orangeTurn = false;
        currentPlayer.innerHTML = "Current Turn:  Player 2"
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

function makeKing(piece) {
    if(pinkTurn){
        for(let i = 56; i < 64; i++){
            if(squares[i].hasChildNodes() && squares[i].firstChild.classList.contains("pink"))
                squares[i].firstChild.classList.add("king")
        }
    }
    else if (orangeTurn){
        for(let i = 0; i < 8; i++){
            if(table.rows[0].cells[i].id == piece.id && piece.classList.contains("orange"))
                piece.classList.add("king")
        }
    }
}

function checkWin() {
    let body = document.querySelector("body")
    if(orangeScore == 12){
        win.innerHTML = "Player 1 Wins!"
        body.classList.add("game-over");
    }
    else if(pinkScore == 12) {
        win.innerHTML = "Player 2 Wins!"
        body.classList.add("game-over");
    }
}

function getSpaces(){
    let isKing = selected.classList.contains("king")
    let left;
    let right;
    let backLeft;
    let backRight;

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
        }
    }
    if(right != null && right.classList.contains("o") ) {
        if(pinkTurn || (orangeTurn && isKing)) {
            possibleMoves.push(right);
        }
    }
    if(backLeft != null && backLeft.classList.contains("o") ) {
        if(orangeTurn || (pinkTurn && isKing)) {
            possibleMoves.push(backLeft);
        }
    }
    if(backRight != null && backRight.classList.contains("o") ) {
        if(orangeTurn || (pinkTurn && isKing)) {
            possibleMoves.push(backRight);
        }
    }
}

function getJumps() {
    let isKing = selected.classList.contains("king")
    let left;
    let right;
    let backLeft;
    let backRight;
    let jumpLeft;
    let jumpRight;
    let jumpBackLeft;
    let jumpBackRight;

    if(rowIndex > 0){
        if(colIndex > 0){
            backLeft = table.rows[rowIndex-1].cells[colIndex-1]
        }
        if(colIndex < 7) {
            backRight = table.rows[rowIndex-1].cells[colIndex+1]
        }
    }

    if(rowIndex > 1){
        if(colIndex > 1){
            jumpBackLeft = table.rows[rowIndex-2].cells[colIndex-2]
        }
        if(colIndex < 6) {
            jumpBackRight = table.rows[rowIndex-2].cells[colIndex+2]
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

    if(rowIndex < 6) {
        if(colIndex > 1){
            jumpLeft = table.rows[rowIndex+2].cells[colIndex-2];
        }
        if(colIndex < 6) {
            jumpRight = table.rows[rowIndex+2].cells[colIndex+2] 
        }
    }



    if(left != null && left.hasChildNodes() && jumpLeft != null && jumpLeft.classList.contains("o")) {
        if((pinkTurn && left.firstChild.classList.contains("orange")) || (orangeTurn && isKing && left.firstChild.classList.contains("pink")) ) {
            possibleMoves.push(jumpLeft)
        }
    }

    if(right != null && right.hasChildNodes() && jumpRight != null && jumpRight.classList.contains("o")){
        if((pinkTurn && right.firstChild.classList.contains("orange")) || (orangeTurn && isKing && right.firstChild.classList.contains("pink")) ) {
            possibleMoves.push(jumpRight)
        }
    }
    
    if(backLeft != null && backLeft.hasChildNodes() && jumpBackLeft != null && jumpBackLeft.classList.contains("o")) {
        if((orangeTurn && backLeft.firstChild.classList.contains("pink")) || (pinkTurn && isKing && backLeft.firstChild.classList.contains("orange")) ) {
            possibleMoves.push(jumpBackLeft)
        }
    }
    if(backRight != null && backRight.hasChildNodes() && jumpBackRight != null && jumpBackRight.classList.contains("o")) {
        if((orangeTurn && backRight.firstChild.classList.contains("pink")) || (pinkTurn && isKing && backRight.firstChild.classList.contains("orange")) ) {
            possibleMoves.push(jumpBackRight)
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
        getJumps()
    }

    else if(orangeTurn == true && selectedPiece.id > 12){
        // Get row and index and update the page
        updateSelectedPiece(selectedPiece);

        // Get possible spaces
        getSpaces();

        getJumps();
    }
}

function removePiece() {
    for(let i = 0; i < squares.length; i++){
        if(squares[i].classList.contains("remove")){
            if(squares[i].firstChild.classList.contains("pink")){
                orangeScore++;
                playerScore1.innerHTML = `Score: ${orangeScore}`;
            }
            else if(squares[i].firstChild.classList.contains("orange")){
                pinkScore++;
                playerScore2.innerHTML = `Score: ${pinkScore}`;
            }
            squares[i].classList.remove("remove")
            squares[i].classList.add("o");
            squares[i].removeChild(squares[i].firstChild)
        }
    }

}

function removeEventsBlank() {
    for(let i = 0; i < possibleMoves.length; ++i){
        possibleMoves[i].style.border = "none";
        let c = possibleMoves[i];
        possibleMoves[i].removeEventListener('click', makeMove)
    }
}

function checkRemovePiece(move) {


    if(rowIndex > 1){
        if(colIndex < 6 && move == table.rows[rowIndex-2].cells[colIndex+2]){
            let piece = table.rows[rowIndex-1].cells[colIndex + 1]
            piece.classList.add("remove");
        }
        if(colIndex > 1 && move == table.rows[rowIndex-2].cells[colIndex-2]) {
            let piece = table.rows[rowIndex-1].cells[colIndex-1]
            piece.classList.add("remove")
        }
    }
    if(rowIndex < 6){
        if(colIndex < 6 && move == table.rows[rowIndex+2].cells[colIndex+2]){
            let piece = table.rows[rowIndex+1].cells[colIndex+1]
            piece.classList.add("remove");
    
        }

        if(colIndex > 1 && move == table.rows[rowIndex+2].cells[colIndex-2]) {
            let piece = table.rows[rowIndex+1].cells[colIndex-1]
            piece.classList.add("remove");
        }
    }
}

function makeMove(){
    moveChoice = this;
    let parent = selected.parentElement;
    let curId = selected.id;
    let isKing = selected.classList.contains("king");
    
    checkRemovePiece(moveChoice)
    removePiece()
   
    if(isKing){
        selected.classList.remove("king")
    }
    if(pinkTurn){
        selected.classList.remove("pink");
    }
    else {
        selected.classList.remove("orange");
    }
    parent.removeChild(selected);
    parent.classList.add("o");

    let newChild = document.createElement("span");
    
    if(pinkTurn){
        newChild.classList.add("pink");
    }
    else {
        newChild.classList.add("orange");
    }

    if(isKing){
        newChild.classList.add("king");
    }

 
    newChild.setAttribute('id', curId);
    moveChoice.classList.remove("o")
    moveChoice.appendChild(newChild);

    newChild.addEventListener('click', (e) => {
        removeEventsBlank();
        possibleMoves = []
        e.stopImmediatePropagation()
        selected = newChild;
        getMoves(newChild)
        addEventsBlank()
    })

    removeEventsBlank()
    possibleMoves = [];
    makeKing(newChild);
    updatePlayerTurn();
    checkWin();

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
                selected = pinkPieces[i];
                getMoves(pinkPieces[i])
                addEventsBlank()
                checkWin();
            
            })
        }
    }
    else{
        for(let i = 0; i < orangePieces.length; i++){
            orangePieces[i].addEventListener('click', (e) => {
                removeEventsBlank();
                possibleMoves = []
                e.stopImmediatePropagation()
                selected = orangePieces[i];
                getMoves(orangePieces[i])
                addEventsBlank()
            })
        }
    }
}

addEvents()






