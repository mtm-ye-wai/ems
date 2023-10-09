$(document).ready(function() {
	addPlaceholderByBankAccType();
});

$('#bankAccount').keypress(function(event) {
	var bankAccType = $("#bankAccountType").val();
	if (bankAccType == 1 || bankAccType == 3) {
		var num = $(this).val().replace(/ /g, "");
		var ch = String.fromCharCode(event.which);
		if (!(/[0-9]/.test(ch)) || num.length == 16) {
			event.preventDefault();
		}
	}
	if (bankAccType == 2) {
		var num = $(this).val();
		var ch = String.fromCharCode(event.which);
		if (!(/[0-9]/.test(ch)) || num.length == 16) {
			event.preventDefault();
		}
	}
	if (bankAccType == 4) {
		var num = $(this).val();
		var ch = String.fromCharCode(event.which);
		if (!(/[0-9]/.test(ch)) || num.length == 17) {
			event.preventDefault();
		}
	}
});


$('#bankAccount').keyup(function() {
	var bankAccType = $("#bankAccountType").val();
	if (bankAccType == 1 || bankAccType == 3) {
		var num = $(this).val().replace(/ /g, "");
		$(this).val(num.replace(/\B(?=(\d{4})+(?!\d))/g, " "));
	}
});

$('#bankAccount').change(function() {
	addPlaceholderByBankAccType();
});

$('#bankAccountType').on('change', function() {
	$('#bankAccount').val("");
	addPlaceholderByBankAccType();
});

$('#macAddress').keypress(function(event) {
	var ch = String.fromCharCode(event.which);
	if (ch == " ") {
		event.preventDefault();
	}
});

$("#macAddress").keyup(function() {
	var num = $(this).val().replace(/-/gi, "");
	$(this).val(addDash(num));
});

function addDash(x) {
	var parts = x.toString().split(",");
	for (i = 0; i < parts.length; i++) {
		parts[i] = parts[i].replace(/\B(?=(.{2})+(?!.))/g, "-");
	}
	return parts.join(",");
}

function addPlaceholderByBankAccType() {
	let accountType = $('#bankAccountType').val();
	switch (accountType) {
		case "1":
		case "3":
			$('#bankAccount').attr('placeholder', "1234 1234 1234 1234");
			break;
		case "2":
			$('#bankAccount').attr('placeholder', "Enter bank account with 16 digits");
			break;
		case "4":
			$('#bankAccount').attr('placeholder', "Enter bank account with 17 digits");
			break;
		default:
			$('#bankAccount').removeAttr('placeholder');
			break;
	}
}

if ($('#user').val() == "admin") {
	if ($('#oldPhone').val() != $('#phone').val()) {
		$('#phone').addClass("b-color");
	}
	if ($('#oldEmail').val() != $('#email').val()) {
		$('#email').addClass("b-color");
	}
	if ($('#oldOfficeEmail').val() != $('#officeEmail').val()) {
		$('#officeEmail').addClass("b-color");
	}
	if ($('#oldBankAccType').val() != $('#bankAccountType option:selected').text()) {
		$('#bankAccountType').addClass("b-color");
	}
	if ($('#oldBankAcc').val() != $('#bankAccount').val()) {
		$('#bankAccount').addClass("b-color");
	}
	if ($('#oldContactName').val() != $('#contactPerson').val()) {
		$('#contactPerson').addClass("b-color");
	}
	if ($('#oldContactPhone').val() != $('#contactPhone').val()) {
		$('#contactPhone').addClass("b-color");
	}
	if ($('#oldRelation').val() != $('#relation').val()) {
		$('#relation').addClass("b-color");
	}
	if ($('#oldMACAdd').val() != $('#macAddress').val()) {
		$('#macAddress').addClass("b-color");
	}
	if ($('#oldPcNo').val() != $('#pcNo').val()) {
		$('#pcNo').addClass("b-color");
	}
	if ($('#oldPcPass').val() != $('#pcPassword').val()) {
		$('#pcPassword').addClass("b-color");
	}
	if ($('#oldGraUni').val() != $('#graduateUniversity').val()) {
		$('#graduateUniversity').addClass("b-color");
	}
	if ($('#oldGraDeg').val() != $('#graduateDegree').val()) {
		$('#graduateDegree').addClass("b-color");
	}
	if ($('#oldReligion').val() != $('#religion').val()) {
		$('#religion').addClass("b-color");
	}
	if ($('#oldJlpt').val() != $('#jlpt').val()) {
		$('#jlpt').addClass("b-color");
	}
	if ($('#oldNrc').val() != $('#nrc').val()) {
		$('#nrc').addClass("b-color");
	}
	if ($('#oldDob').val() != $('#dateOfBirth').val()) {
		$('#dateOfBirth').addClass("b-color");
	}
	if ($('#oldNrcDob').val() != $('#nrcDob').val()) {
		$('#nrcDob').addClass("b-color");
	}
	if ($('#oldMaritalStatus').val() != $('#maritalStatus').val()) {
		$('#maritalStatus').addClass("b-color");
	}
}