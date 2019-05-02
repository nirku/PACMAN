
//dictionary for regristed users 
var logins = [{ key: 'a', value: 'a' }];

$(document).ready(function () {

  $('#datepicker').datepicker({
    startView: 0,
    forceParse: false,
    autoclose: true,
    startDate: null,
    format: "dd/mm/yyyy",
    daysOfWeekDisabled: [0, 6]
  }).on('changeDate', function (selected) {
    var minDate = new Date(selected.date.valueOf());
  });

  $(".switchdiv").on('click', function (e) {
    console.log(e)
    $(".welcome").attr('hidden', true)
    $(".Sign-Up").attr('hidden', true)
    $(".limiter").attr('hidden', true)
    if (e.currentTarget.text == "Welcome")
      $(".welcome").removeAttr('hidden')
    if (e.currentTarget.text == "Sign-Up")
      $(".Sign-Up").removeAttr('hidden')
    if (e.currentTarget.text == "Sign-In")
      $(".limiter").removeAttr('hidden')

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
      alert("Your password is incorrect - Make sure your password length is minimum 8 and contains letters and numbers")
    }
    if (/\d/.test(fnameValue) || /\d/.test(lnameValue)) {
      checkValid = false;
      alert("First and last name cannot contain numbers");
    }
    if (!validateEmail(emailValue)) {
      checkValid = false;
      alert("Email address is not valid - Must be in the format xxx@xxx.xxx")
    }
    if (!checkValid) {
      e.preventDefault();
    }
    else {
      logins.push({
        key: usernameValue,
        value: passwordValue
      });
      alert("Successfuly Signed Up!")
      console.log(logins);
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
      alert("Username is incorrect")
    }
    else {
      if (target.value != passwordValue) {
        check = false;
        alert("Password is incorrect")
      }
    }
    if (check) {
      alert("enjoy your game!")
      $(".limiter").attr('hidden', true)
      $(".settings").removeAttr('hidden')
    }
    e.preventDefault();
  }
  );

  $("#about").on("click", function () {
    $("#aboutmodal").modal('show');
  })

  

});

//validation function for email adress format
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


