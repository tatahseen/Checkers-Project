// Checkers 

// Create 8x8 board
/* 
   x r x r x r x r
   r x r x r x r x
   x r x r x r x r
   o x o x o x o x
   x o x o x o x o
   b x b x b x b x
   x b x b x b x b
   b x b x b x b x
*/
// Set r to red pieces 
// Set b to black pieces
// x cannot be changed
// o are possible moves

//Logic:

// Create global array containing possible moves
// Global variable to determine whether a piece must be removed from the board


// The code below is used to determine if there is a winner

// First check to see if any moves can be made at all by the current user on the board
    // If so, check to see if the score of the current user is 12
        // If so, the current user wins,
        // Otherwise continue the game
// Otherwise the other player wins


// If the player clicks on a piece run this bit of code. This will check the selected piece
// is valid and if a move can be made.

// Make sure the player selected their own piece && not a blank spot
    // If the piece is valid, check if it is a moveable piece 

        // First check if it is a king
            // If yes, check if it can move in any of the four diagonal directions 
                // If the opponent user has a piece in one of these places, check if the space
                // after in the same direction is an open space
                    // If not, the move is not valid
                    // If so, the move is valid and the user can eliminate the opponent piece
                        // Add this to the moves array
                        // Set global opponent value to true
                // Highlight the piece and the possible moves
                // Add any possible moves to moves array

        // Otherwise check if it can move in either of the two forward diagonal directions
            // If so, highlight the piece and the possible moves
             // If the opponent user has a piece in one of these places, check if the space
                // after in the same direction is an open space
                    // If not, the move is not valid
                    // If so, the move is valid and the user can eliminate the opponent piece
                        // Add this to the moves array
                        // Set global opponent value to true
            // Add possible moves to moves array

        // If not, output that the piece is unmovable
//




// After ensuring the the piece is moveable, we need to check to see if the selected space to 
// move to is valid

// Using the moves array, check to see if the selected space to move to is included in that array
    // If not, return invalid move
    // If yes, make the move
//



// The code below will call other functions to ensure that a valid is being made and then will 
// make the move


// If the move is valid and the selected space is valid
    // Check if there is an opponent piece to remove,
        // If so, move the current player's piece first to the space after the opponent piece
        // Remove opponent piece from board
        // Increment the current player's score

    // Otherwise, just move the piece to the selected space using the index values
    // Move the piece to the selected space using the index values
    // Check if the moved piece has reached the other side of the board
        // If so, make it into a king

    // Clear the global array containing possible moves

    // Check if the player has won
//



