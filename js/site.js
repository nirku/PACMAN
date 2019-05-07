
//dictionary for regristed users 
var logins = [{ key: 'a', value: 'a' }];
var loggedOn;

$(document).ready(function () {

  $('#datepicker').datepicker();

  $(".switchdiv").on('click', function (e) {
    $(".settings").attr('hidden',true)
    $(".welcome").attr('hidden', true)
    $(".Sign-Up").attr('hidden', true)
    $(".limiter").attr('hidden', true)
    if($('.game').is(':visible')){
      stopGame();
      $(".game").attr('hidden', true)
    }
    if (e.currentTarget.text == "Welcome")
      $(".welcome").removeAttr('hidden')
    if (e.currentTarget.text == "Sign-Up"){
      $("#formsubmit").trigger('reset');
      $(".Sign-Up").removeAttr('hidden')
    }
    if (e.currentTarget.text == "Sign-In"){
      $("#login").trigger('reset');
      $(".limiter").removeAttr('hidden')
    }
  })
  //validation function for sign up form
  $("#formsubmit").on('submit', function (e) {
    var checkValid = true;
    var passwordValue = $("input[name='psw']").val();
    var usernameValue = $("input[name='username']").val();
    var fnameValue = $("input[name='firstname']").val();
    var lnameValue = $("input[name='lastname']").val();
    var emailValue = $("input[name='email']").val();
    var passRegex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/);
    if (passwordValue.length < 8 || !passRegex.test(passwordValue)) {
      checkValid = false;
      showAlert("Your password is incorrect - Make sure your password length is minimum 8 and contains letters and numbers",'Oops..','error')
    }
    if (/\d/.test(fnameValue) || /\d/.test(lnameValue)) {
      checkValid = false;
      showAlert("First and last name cannot contain numbers","Oops..","error");
    }
    if (!validateEmail(emailValue)) {
      checkValid = false;
      showAlert("Email address is not valid - Must be in the format xxx@xxx.xxx","Oops..","error");
    }
    if (!checkValid) {
      e.preventDefault();
    }
    else {
      logins.push({
        key: usernameValue,
        value: passwordValue
      });
      e.preventDefault();
      showAlert("Successfuly Signed Up!","Cool","success");
      $(".switchdiv:contains(Welcome)").click()
    }
  })
  //login validation
  $("#login").on('submit', function (e) {
    var check = true;
    var usernameValue = $("input[name='loginusername']").val();
    var passwordValue = $("input[name='pass']").val();
    var target = logins.find(temp => temp.key === usernameValue)

    if (!target) {
      check = false;
      showAlert("Username is incorrect","Oops..","error");
    }
    else {
      if (target.value != passwordValue) {
        check = false;
        showAlert("Password is incorrect","Oops..","error");
      }
    }
    if (check) {
      showAlert("enjoy your game!","Cool",'success');
      loggedOn = usernameValue;
      $(".limiter").attr('hidden', true)
      $(".settings").removeAttr('hidden')
    }
    e.preventDefault();
  }
  );

  $("#welcome-reg").on("click",function(){
    $(".switchdiv:contains(Sign-Up)").click()
  })

  $("#welcome-log").on("click",function(){
    $(".switchdiv:contains(Sign-In)").click()
  })

  $("#about").on("click", function () {
    $("#aboutmodal").modal('show');
  })
  
  $("#reg_log").on("click",function(){
    $(".switchdiv:contains(Sign-In)").click()
  })
});

//validation function for email adress format
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function showAlert(msg,header,alertType){
  Swal.fire({
    type: alertType,
    title: header,
    text: msg,
  })
}

function getLoggedUser(){
  return loggedOn;
}

