$(function() {
	$(document).ready(function() {
		let floatTtime = timeStringToFloat($("#toTime").val());
		let floatFtime = timeStringToFloat($("#fromTime").val());
		let overTime = floatTtime - floatFtime;
		if ((floatTtime - floatFtime) < 0) {
			overTime = null;
		} else if (floatFtime < 12 && floatTtime > 13) {
			overTime = overTime - 1;
		}
		$("#overTime").attr("value", overTime ? overTime.toFixed(2) : 0);
		/*$("#overTimeTbl").append("<span class=text-center>" + overTime + "</span>");*/
		$("#fromTime").change(function() {
			let floatTtime = timeStringToFloat($("#toTime").val());
			let floatFtime = timeStringToFloat($("#fromTime").val());
			let overTime = floatTtime - floatFtime;
			if ((floatTtime - floatFtime) < 0) {
				overTime = null;
			} else if (floatFtime < 12 && floatTtime > 13) {
				overTime = overTime - 1;
			}
			console.log(overTime);
			$("#overTime").attr("value", overTime ? overTime.toFixed(2) : 0);
		});
		$("#toTime").change(function() {
			let floatTtime = timeStringToFloat($("#toTime").val());
			let floatFtime = timeStringToFloat($("#fromTime").val());
			let overTime = floatTtime - floatFtime;
			if ((floatTtime - floatFtime) < 0) {
				overTime = null;
			} else if (floatFtime < 12 && floatTtime > 13) {
				overTime = overTime - 1;
			}
			console.log(overTime);
			$("#overTime").attr("value", overTime ? overTime.toFixed(2) : 0);
		});
		function timeStringToFloat(time) {
			var hoursMinutes = time.split(/[.:]/);
			var hours = parseInt(hoursMinutes[0], 10);
			var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
			return hours + minutes / 60;
		}
	});
});