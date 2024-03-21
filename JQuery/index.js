$('body').css('backgroundColor', 'green');
$('p').css("color","red");
$('button').css("backgroundColor", "purple");
$(".container").css("width", "50%");
$(".container").css("backgroundColor", "red");
$('a').attr('href', 'https://www.gasore.tech');

$('button').hover(function (){
    $('p').css('color', "white");
    setTimeout(function () {
        $("p").css("color","red");
    },1000)
})

$(document).keypress(function (event){
    $('p').text(event.key);
})