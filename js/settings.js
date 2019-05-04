var values = {};

$(document).ready(function () {

    // listen to key down on input and record the key to the input
$(".keys").on("keydown",function(e){
   this.value = e.originalEvent.key;
});

// Random generator for settings form in input fields
$("#btn_rand").on('click',function(){
    $("form#settingform :input").each(function(){
        var input = $(this);
        if(input[0].name=="up")
            this.value = 'ArrowUp'
        if(input[0].name=="down")
            this.value = 'ArrowDown'
        if(input[0].name=="left")
            this.value = 'ArrowLeft'
        if(input[0].name=="right")
            this.value = 'ArrowRight'
        if(input[0].name=="ballsnum")
            this.value = getRandomInt(50,90)
        if(input[0].name=="ball5color")
            this.value = hexGenerator()
        if(input[0].name=="ball15color")
            this.value = hexGenerator()
        if(input[0].name=="ball25color")
            this.value = hexGenerator()
        if(input[0].name=="time")
            this.value = getRandomInt(60,360)
        if(input[0].name=="monstersnum")
            this.value = getRandomInt(1,3)
})
})

$("#settingform").on('submit', function (e) {
    var keysVal = [];
    keys = $(".keys")
    keys.each(i => {
        keysVal.push(keys[i].value);
    });
    if(!checkIfArrayIsUnique(keysVal)){
        alert("Cannot define 2 or more keys with the same value");
    }
    var $inputs = $('#settingform :input');

    // get an associative array of the values
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    Start(values);
});
});

function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomHex() {
    var hexNumbers = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
]

    // picking a random item of the array
  return hexNumbers[Math.floor(Math.random() * hexNumbers.length)];
}


// Genarates a Random Hex color
function hexGenerator() {
    hexValue = ['#'];
    for (var i = 0; i < 6; i += 1) {
        hexValue.push(randomHex());
    }

    return hexValue.join('');
}
