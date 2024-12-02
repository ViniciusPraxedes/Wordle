var height = 6; //number of guesses
var width = 5;//length of the word

var row = 0; //current guess (attempt)
var col = 0;//current letter for that attempt

var gameOver = false;

//This is the word the player has to guess
var word = "SQUID";

window.onload = function(){
    initialize();
}

function initialize(){
    //Create the board
    for (let r = 0; r < height; r++){

        for(let c = 0; c < width; c++){

            //Creates <span> element
            let tile = document.createElement("span")

            //Adds id="0-0" to the span element
            tile.id = r.toString() + "-" + c.toString();

            //Adds class="tile" to the span element
            tile.classList.add("tile");

            //Adds the inner text to ""
            tile.innerText = "";
            
            //This will add the tiles to the "board" div in the HTML doc
            document.getElementById("board").appendChild(tile);
        }
    }

    //Keyup is fired when the user presses a key and (e) has the information about which key was pressed
    document.addEventListener("keyup", (e) => {
        
        //Ignore the input if game over is true
        if (gameOver) return;
        
        //Checks if the key pressed is between A and Z
        if("KeyA" <= e.code && e.code <= "KeyZ"){

            //Ensures that the player does not type in more than 5 words
            if(col < width) {

                //Gets the current tile
                let currentTile = document.getElementById(row.toString() + '-' + col.toString());

                //Checks if the tile is empty to make sure that the player does not overwrite existing letters
                if(currentTile.innerText == "") {

                    //Inserts the letter into the tile, the letter is taken from the (e)
                    currentTile.innerText = e.code[3];

                    //If it is empty then move to the next column
                    col += 1;
                }
            }
        }
        
        //When backspace is pressed, it deletes what you have just typed
        else if (e.code == "Backspace") {

            //Checks if there are letters to delete
            if (0 < col && col <= width) {

                //If true then move the cursor to the previous column
                col -=1;
            }

            //Finds the current tile
            let currentTile = document.getElementById(row.toString() + '-' + col.toString());

            //Delete the tile input by replacing it with an empty string
            currentTile.innerText = "";
        }
        
        //Submits the player input when he presses Enter
        else if (e.code == "Enter") {

            //Update the tile 
            update();
            
            //Advances to the next row after enter is pressed
            row += 1;

            //Moves the cursor to the begning of the new column
            col = 0; 
        }

        //If the player hasn't won the game and all the rows are full then end the game
        if(!gameOver && row == height) {

            //Ends the game
            gameOver = true;

            //Displays the correct word
            document.getElementById("answer").innerText = 'The correct word is: ' + word;
            alert("You lost!")
            document.getElementById("play-again").style.display = "block";
        }
    })
}

//Checks the players current guess and changes the color of the tile to display to the player if he guessed right or wrong
function update() {

    let correct = 0;

    //Loops through each tile in the row
    for (let c = 0; c < width; c++) {

        //Gets the current tile
        let currentTile = document.getElementById(row.toString() + '-' + c.toString());

        //Gets the letter the player input in the tile
        let letter = currentTile.innerText;

        //Checks if the object insite word equals the letter that was input
        if (word[c] == letter) {

            //If true then change the class of the current tile to "correct"
            currentTile.classList.add("correct");

            //Add 1 to the number of correct words
            correct += 1;
        } 
        
        //If the letter is in the word but not in the correct position
        else if (word.includes(letter)) {

            //Change the class of the current tile to "present"
            currentTile.classList.add("present");

        } 
        // If not in the word
        else {

            //Change the class to "absent"
            currentTile.classList.add("absent");
        }

        //If the number of correct word is the same as width, which is 5, then the game ends
        if (correct == width) {

            alert("You won!")
            gameOver = true;
            document.getElementById("play-again").style.display = "block";
        }

    }
}


function playAgain() {
    
    // Refresh the page to reset the game
    location.reload(); 
}
