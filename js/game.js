var context;
var shape;
var board;
var score;
var theme;
var counter;
var cherryCatch;
var intervalNum;
var pac_color;
var end_time;
var interval;
var floor;
var tile;
var cherry;
var settings = {};
var start_angle = 0.15 * Math.PI;
var ending_angle = 1.85 * Math.PI;

function Start(values) {
    $(".settings").attr('hidden', true)
    $(".game").removeAttr('hidden')
    init();
    playPause(theme,"Play");
    settings = values;
    context = canvas.getContext('2d');
    board = new Array();
    lblPlayer.innerHTML = settings["user"];
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = settings["ballsnum"];
    var ball5points = Math.round(food_remain * 60 / 100);
    var ball15points = Math.round(food_remain * 30 / 100);
    var ball25points = food_remain - ball15points - ball5points;
    var pacman_remain = 1;
    end_time = settings["time"] * 1000;
    for (var i = 0; i < 20; i++) {
        board[i] = new Array();
        for (var j = 0; j < 20; j++) {
            if(checkWallDeploy(i,j)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 0.005 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                } else if (pacman_remain > 0 && randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    if(pacman_remain > 0){
        var emptyCell = findRandomEmptyCell(board);
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
        board[emptyCell[0]][emptyCell[1]] = 2;
        pacman_remain--;
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    console.log(board);
    deployDifferentBalls(ball15points, ball25points);
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
        e.preventDefault();
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
        e.preventDefault();
    }, false);
    interval = setInterval(UpdatePosition, 100);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 19) + 1);
    var j = Math.floor((Math.random() * 19) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 19) + 1);
        j = Math.floor((Math.random() * 19) + 1);
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[settings["up"]]) {
        return 1;
    }
    if (keysDown[settings["down"]]) {
        return 2;
    }
    if (keysDown[settings["left"]]) {
        return 3;
    }
    if (keysDown[settings["right"]]) {
        return 4;
    }
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.innerHTML = score;
    lblTime.innerHTML = timer();
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                context.beginPath();
                if (GetKeyPressed() === 1) {
                    start_angle = 1.75 * Math.PI;
                    ending_angle = 1.45 * Math.PI;
                }
                if (GetKeyPressed() === 2) {
                    start_angle = 0.65 * Math.PI;
                    ending_angle = 0.35 * Math.PI;
                }
                if (GetKeyPressed() === 3) {
                    start_angle = 1.15 * Math.PI;
                    ending_angle = 0.85 * Math.PI;
                }
                if (GetKeyPressed() === 4) {
                    start_angle = 0.15 * Math.PI;
                    ending_angle = 1.85 * Math.PI;
                }
                context.drawImage(floor, center.x - 30, center.y - 30, 60, 60);
                context.arc(center.x, center.y, 30, start_angle, ending_angle); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                if (start_angle === 1.75 * Math.PI || start_angle === 0.65 * Math.PI)
                    context.arc(center.x - 15, center.y - 7, 5, 0, 2 * Math.PI); // circle
                if (start_angle === 1.15 * Math.PI || start_angle === 0.15 * Math.PI)
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.drawImage(floor, center.x - 30, center.y - 30, 60, 60);
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = settings["ball5color"]; //color
                context.fill();

            } else if (board[i][j] === 12) {
                context.beginPath();
                context.drawImage(floor, center.x - 30, center.y - 30, 60, 60);
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                context.fillStyle = settings["ball15color"]; //color
                context.fill();

            } else if (board[i][j] === 13) {
                context.beginPath();
                context.drawImage(floor, center.x - 30, center.y - 30, 60, 60);
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = settings["ball25color"]; //color
                context.fill();

            } else if (board[i][j] === 4) {
                context.beginPath();
                context.drawImage(tile, center.x - 30, center.y - 30, 60, 60);

            } else if (board[i][j] === 5) {
                context.drawImage(floor, center.x - 30, center.y - 30, 60, 60);
                context.drawImage(cherry, center.x-30, center.y-30, 50, 50);
            }
            else if (board[i][j] === 0) {
                context.beginPath();
                context.drawImage(floor, center.x - 30, center.y - 30, 60, 60);
            }
        }
    }


}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    intervalNum++;
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < 19 & board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 19 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 1) {
        score = score + 5;
    }
    if (board[shape.i][shape.j] === 12) {
        score = score + 15;
    }
    if (board[shape.i][shape.j] === 13) {
        score = score + 25;
    }
    if(board[shape.i][shape.j] === 5){
        score = score + 50;
        cherryCatch++;
    }
    board[shape.i][shape.j] = 2;
    if(intervalNum === 20 && cherryCatch < 3){
        randomCherryDeploy();
        intervalNum = 0;
    }
    if(end_time === 0 && score < 150){
        playPause(theme,"Pause");
        window.clearInterval(interval);
        displayEndMsg("You can do better","again");
    }
    if(end_time === 0 && score >= 150){
        window.clearInterval(interval);
        playPause(theme,"Pause");
        displayEndMsg("We have a Winner!!!","win");
    }
    if (checkEndGame()) {
        Draw();
        window.clearInterval(interval);
        playPause(theme,"Pause");
        displayEndMsg("We have a Winner!!!","win");
    } else {
        Draw();
    }
}

function deployDifferentBalls(ball15points, ball25points) {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            var randomColor = Math.random();
            if (board[i][j] == 1) {
                if (ball15points > 0 && ball25points > 0) {
                    if (randomColor < 0.25) {
                        board[i][j] = 12
                        ball15points--;
                    }
                    if (randomColor >= 0.25 && randomColor < 0.4) {
                        board[i][j] = 13;
                        ball25points--;
                    }
                }
                else {
                    if (ball15points > 0) {
                        board[i][j] = 12;
                        ball15points--;
                    }
                    if (ball25points > 0) {
                        board[i][j] = 13;
                        ball25points--;
                    }
                }
            }
        }
    }
}

function checkEndGame() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            if (board[i][j] === 1 || board[i][j] === 12 || board[i][j] === 13)
                return false;
        }
    }
    return true;
}

function timer() {
    if (end_time <= 0) {
        clearInterval(counter);
        return;
    }
    end_time = end_time - 100;
    return (end_time / 1000);
}

function randomCherryDeploy(){
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            if(board[i][j] === 5)
                board[i][j] = 0;
        }
    }
    var emptyCell = findRandomEmptyCell(board)
    board[emptyCell[0]][emptyCell[1]] = 5;
}

// create a play / pause button
function playPause(elem,action) {
    // NOTE: audio is from the gloabl scope
    if (action == 'Play') {
        elem.play();
    } else {
        elem.pause();
    }
}
function checkWallDeploy(i,j){
    return ((i === 4 && j === 0) || (i === 5 && j === 0) || (i === 1 && j === 1) || (i === 8 && j === 1) || (i === 1 && j === 2) ||
    (i === 2 && j === 2) || (i === 3 && j === 2) || (i === 4 && j === 2) || (i === 6 && j === 2) || (i === 7 && j === 2) ||
    (i === 8 && j === 2) || (i === 4 && j === 3) || (i === 0 && j === 4) || (i === 7 && j === 4) || (i === 8 && j === 4) || (i === 9 && j === 4) ||
    (i === 0 && j === 5) || (i === 1 && j === 5) || (i === 3 && j === 5) || (i === 3 && j === 6) || (i === 6 && j === 6) || (i === 3 && j === 7) ||
    (i === 6 && j === 7) || (i === 2 && j === 8) || (i === 3 && j === 8) || (i === 4 && j === 8) || (i === 6 && j === 8) || (i === 7 && j === 8) || (i === 6 && j === 9)||
    (i === 14 && j === 0) || (i === 15 && j === 0) || (i === 11 && j === 1) || (i === 18 && j === 1) || (i === 11 && j === 2) ||
    (i === 12 && j === 2) || (i === 13 && j === 2) || (i === 14 && j === 2) || (i === 16 && j === 2) || (i === 17 && j === 2) ||
    (i === 18 && j === 2) || (i === 14 && j === 3) || (i === 10 && j === 4) || (i === 17 && j === 4) || (i === 18 && j === 4) || (i === 19 && j === 4) ||
    (i === 10 && j === 5) || (i === 11 && j === 5) || (i === 13 && j === 5) || (i === 13 && j === 6) || (i === 16 && j === 6) || (i === 13 && j === 7) ||
    (i === 16 && j === 7) || (i === 12 && j === 8) || (i === 13 && j === 8) || (i === 14 && j === 8) || (i === 16 && j === 8) || (i === 17 && j === 8) || (i === 16 && j === 9)||
    (i === 4 && j === 10) || (i === 5 && j === 10) || (i === 1 && j === 1) || (i === 8 && j === 1) || (i === 1 && j === 2) ||
    (i === 2 && j === 12) || (i === 3 && j === 12) || (i === 4 && j === 12) || (i === 6 && j === 12) || (i === 7 && j === 12) ||
    (i === 8 && j === 12) || (i === 4 && j === 13) || (i === 0 && j === 14) || (i === 7 && j === 14) || (i === 8 && j === 14) || (i === 9 && j === 14) ||
    (i === 0 && j === 15) || (i === 1 && j === 15) || (i === 3 && j === 15) || (i === 3 && j === 16) || (i === 6 && j === 16) || (i === 3 && j === 17) ||
    (i === 6 && j === 17) || (i === 2 && j === 18) || (i === 3 && j === 18) || (i === 4 && j === 18) || (i === 6 && j === 18) || (i === 7 && j === 18) || (i === 6 && j === 19)||
    (i === 12 && j === 12) || (i === 13 && j === 12) || (i === 14 && j === 12) || (i === 16 && j === 12) || (i === 17 && j === 12) ||
    (i === 18 && j === 12) || (i === 14 && j === 13) || (i === 10 && j === 14) || (i === 17 && j === 14) || (i === 18 && j === 14) || (i === 19 && j === 14) ||
    (i === 10 && j === 15) || (i === 11 && j === 15) || (i === 13 && j === 15) || (i === 13 && j === 16) || (i === 16 && j === 16) || (i === 13 && j === 17) ||
    (i === 16 && j === 17) || (i === 12 && j === 18) || (i === 13 && j === 18) || (i === 14 && j === 18) || (i === 16 && j === 18) || (i === 17 && j === 18) || (i === 16 && j === 19));
}

function init(){
    theme = new Audio('./sound/pacman_theme.m4a');
    shape = new Object();
    cherryCatch = 0;
    intervalNum = 0;
    floor = new Image();
    floor.src = "./img/floor.jpg";
    tile = new Image();
    tile.src = "./img/tile.png";
    cherry = new Image();
    cherry.src = "./img/cherry.png";
}

function displayEndMsg(msg, type){
    var imgurl;
    if(type === "win")
        imgurl = "./img/winning1.gif";
    if(type === "again")
        imgurl = "./img/again1.gif";
    setTimeout(Swal.fire({
        title: msg,
        width: 400,
        padding: '3em',
        background: '#fff url(./img/orangestrips.jpg)',
        showCancelButton: true,
        cancelButtonText: 'Quit',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'New Game',
        backdrop:`
          rgba(0,0,123,0.4)
          url(`+imgurl+`)
          center left
          no-repeat
        `
      }).then((result) => {
        if (result.value) {
            Start(settings);
        }
        else{
            $(".switchdiv:contains(Welcome)").click()
        }
      }),1000);
}