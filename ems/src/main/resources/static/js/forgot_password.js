var timerOn = true;
var urlPrefix = location.origin.concat(contextPath);

Array.from(document.getElementsByClassName('restricted')).forEach(elem => {
  elem.addEventListener('input', event => {
    event.target.value = event.target.value.replace(/[^0-9\.]/g, '');
  });
});

$(document).ready(function() {
    if($('#resend-timer').length) {
		showTimer($('#resend-timer').val());
	}
});

function showSpinner() {
  document.getElementById("overlay").style.display = "flex";
}

function hideSpinner() {
  document.getElementById("overlay").style.display = "none";
}

function showTimer(remaining) {
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;
  
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  document.getElementById('timer').innerHTML = m + ':' + s;
  remaining -= 1;
  
  if(remaining >= 0 && timerOn) {
    setTimeout(function() {
        showTimer(remaining);
    }, 1000);
    return;
  }

  if(!timerOn) {
    return;
  }
  
  $('.resend-otp').removeClass('d-none');
  $('#resend-timer-text').addClass('d-none');
}

function resendOTP() {
	showSpinner();
	$.ajax({
        'url': urlPrefix.concat('/resendOTP'),
        'type': 'POST',
        'contentType': "application/json;charset=utf-8",
        'data': $('#secureToken').val(),
        'success': function (data, status, xhr) {
            $('.err-msg,.resend-otp').addClass('d-none');
  			$('#resend-timer-text').removeClass('d-none');
  			$('.msg').addClass('text-success').html('<i class=\"fa fa-check-circle\"></i> ' + data);
  			showTimer($('#resend-timer').val());
  			hideSpinner();
        },
        'error': function (error, status, xhr) {
            $('.err-msg,.resend-otp,#resend-timer-text').addClass('d-none');
            $('.msg').addClass('text-danger').html('<i class=\"fa fa-exclamation-circle\"></i> ' + error.responseText);
            hideSpinner();
        }
    });
}