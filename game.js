var color = ["blue" , "green" , "red" , "yellow"];
var compPattern = []; //system generated pattern got stored 
var userPattern = []; //user clicked pattern got stored
var result = true; //if user doing it right or wrong
var level = 1; //current level of user
var start = false;

$(".block").click(function(event){
    var clickedId = $(this).attr("id");
    userPattern.push(clickedId);
    // alert(clickedId);
    var clickedMusic = "sounds/" + clickedId + ".mp3";
    $("#" + clickedId).addClass("clicked");
    setTimeout(function(){
        $("#" + clickedId).removeClass("clicked");
    },200);
    playSound(clickedMusic);
    compare();
});

$(".btn button").click(function(event) {
    if(!start){
        pattern();
        start = true;
        $(".header h1").text("Level " + level) ;
        $(".header h2").hide();
        $(".btn button").hide();
    }
})

function playSound(music){
    var sound = new Audio(music);
    sound.play();
}

function pattern(){  //creates the computer generated pattern
    var randNum = Math.floor(Math.random()*4);
    var randId = color[randNum];
    compPattern.push(randId);
    // alert(randId);
    $("#" + randId).addClass("clicked");
    setTimeout(function(){
        $("#" + randId).removeClass("clicked")
    },300);
    var randMusic = "sounds/" + randId + ".mp3";
    playSound(randMusic);
}

function winner(){
    $(".header h1").text("Winner...");
    $(".header h2").show();
}

function restart(){
    level = 1;
    start = false;
    compPattern = [];
    userPattern = [];
    $(".btn button").show();
}

function compare(){
    var length = (userPattern.length) - 1;
    if(userPattern[length] === compPattern[length]){
        if(userPattern.length === compPattern.length){
            if(level === 15){
                winner();
                restart();
            }
            else{
                level++;
                $(".header h1").text("Level " + level) ;
                setTimeout(function(){
                    pattern();
                } , 300);
                userPattern = [];
            }
        }
    }
    else{
        $(".header h1").text("Game-Over!!") ;
        restart();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over") ;
        } , 100);
        playSound("sounds/wrong.mp3");
    }
}
