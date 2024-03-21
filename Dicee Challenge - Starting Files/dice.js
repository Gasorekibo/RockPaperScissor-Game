
var randomIndex1 = Math.floor((Math.random()* 6)+ 1);
var randomIndex2 = Math.floor((Math.random()* 6)+ 1);
var diceImage1 = 'dice'+randomIndex1+'.png';
var diceImage2 = 'dice'+randomIndex2+'.png';
var imagesSource1 = "images/"+diceImage1;
var imagesSource2 = "images/"+diceImage2;
document.querySelector(".img1").setAttribute('src', imagesSource1);
document.querySelector(".img2").setAttribute('src', imagesSource2);

if (randomIndex1 > randomIndex2){
    document.querySelector('h1').innerHTML = "Player 1 wins";
} else if (randomIndex1 < randomIndex2) {
    document.querySelector('h1').innerHTML = 'Player 2 wins';
}else {
    document.querySelector('h1').innerHTML = 'All players have the same chances';
}
