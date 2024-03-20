// Function to get computer's choice
function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  
  // Function to play a single round of the game
  function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let result;
  
    if (playerSelection === computerSelection.toLowerCase()) {
      result = "It's a tie!";
    } else if (
      (playerSelection === "rock" && computerSelection === "Scissors") ||
      (playerSelection === "paper" && computerSelection === "Rock") ||
      (playerSelection === "scissors" && computerSelection === "Paper")
    ) {
      result = `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
      result = `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
  
    return result;
  }
  
  // Function to play a 5 round game
  function game() {
    let playerScore = 0;
    let computerScore = 0;
  
    for (let round = 1; round <= 5; round++) {
      const playerSelection = prompt(
        "Enter your choice (Rock, Paper, or Scissors):"
      );
      const computerSelection = getComputerChoice();
      const roundResult = playRound(playerSelection, computerSelection);
  
      console.log(`Round ${round}: ${roundResult}`);
  
      if (roundResult.includes("win")) {
        playerScore++;
      } else if (roundResult.includes("lose")) {
        computerScore++;
      }
    }
  
    if (playerScore > computerScore) {
      console.log("Congratulations! You win the game!");
    } else if (playerScore < computerScore) {
      console.log("Sorry! You lose the game!");
    } else {
      console.log("It's a tie! The game ends in a draw.");
    }
  }
  
  // Start the game
  game();