//  ************************************ CHECKING FOR BUTTON CLICK ********************************************

// bellow code will help to iterate on all class and add event listener to each using anonymous function we declared.

var numberOfDrumButton = document.querySelectorAll(".drum").length;
for (var i = 0; i < numberOfDrumButton; i++) {
    var allButton = document.querySelectorAll(".drum")[i];
    allButton.addEventListener('click', function() {

    var buttonInnerHTML = this.innerHTML;
    // bellow function will add sounds and animation depending on key that trigger an event once clicked.

    checkingSound(buttonInnerHTML);
    buttonAnnimation(buttonInnerHTML);
    })
}
// *************************** CHECKING FOR KEYBOARD PRESS *********************************************

//  the bellow line of code will add sound and annimation depending on the key that trigger an event once pressed.

document.addEventListener("keypress", function(event){
    checkingSound(event.key);
    buttonAnnimation(event.key);
})

// this function is used to play a sound respective to the button clicked or keyboard press

function checkingSound (keyValue) {
    switch (keyValue) {
        case "a":
            var tom1 = new Audio('sounds/tom-1.mp3');
            tom1.play();
        break;
        case "s":
            var tom2 = new Audio('sounds/tom-2.mp3');
            tom2.play();
        break;
        case "d":
            var tom3 = new Audio('sounds/tom-3.mp3');
            tom3.play();
        break;
        case "f":
            var tom4 = new Audio('sounds/tom-4.mp3');
            tom4.play();
        break;
        case "j":
            var crash = new Audio('sounds/crash.mp3');
            crash.play();
        break;
        case "k":
            var kick = new Audio('sounds/kick-bass.mp3');
            kick.play();
        break;
        case "l":
            var snare = new Audio('sounds/snare.mp3');
            snare.play();
        break;
    
        default:
            console.log(buttonInnerHTML);
    }
}

//  function that add animation on the keys after pressed or clicked and remove it after 100 milisecond after clicked.

function buttonAnnimation(currentKey) {
   var buttonClicked =  document.querySelector("."+currentKey);
   buttonClicked.classList.add("pressed");
   
//    removing a class added after 100 milisecond after key clicked or pressed.
   setTimeout(function() {
        buttonClicked.classList.remove("pressed");
   }, 100)
}