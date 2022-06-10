var color = ["blue" , "green" , "red" , "yellow"];
var compPattern = []; //system generated pattern got stored 
var userPattern = []; //user clicked pattern got stored
var result = true; //if user doing it right or wrong
var level = 1; //current level of user
var start = false;

function playSound(music){
    var sound = new Audio(music);
    sound.play();
}

function pattern(){  //creates the computer generated pattern
    var randNum = Math.floor(Math.random()*4);
    var randId = color[randNum];
    compPattern.push(randId);
    alert(randId);
    // $(randId).addClass("clicked");
    // setTimeout(function(){
    //     $(randId).removeClass("clicked")
    // },100)
    var randMusic = "sounds/" + randId + ".mp3";
    playSound(randMusic);
}

$(".block").click(function(event){
    var clickedId = $(this).attr("id");
    userPattern.push(clickedId);
    alert(clickedId);
    var clickedMusic = "sounds/" + clickedId + ".mp3";
    // $(clickedId).addClass("clicked");
    // setTimeout(function(){
    //     $(clickedId).removeClass("clicked");
    // },100);
    playSound(clickedMusic);
    compare();
});

function compare(){
    for(var i = 0 ; i < level ; i++){
        if(userPattern[i] != compPattern[i]){
            var music = new Audio("sounds/wrong.mp3");
            music.play();
            alert("yes");
            level = 1;
            compPattern = [];
            result = false;
            start = false;
            $(".header h1").text("Press any key to Restart..") ;
        }
    }
    if (result === true){
        level++;
        $(".header h1").text("Level " + level) ;
        pattern();
    }
    userPattern = [];
}

$("body").keypress(function(event) {
    if(!start){
        pattern();
        start = true;
        $(".header h1").text("Level " + level) ;
    }
})