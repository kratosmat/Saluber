var args = arguments[0] || {};
var booking = args._booking;

var REST = require("rest");
var moment = require('moment');

Ti.API.info("booking: " + JSON.stringify(booking));

var doctor = null;
REST.findSpecializationById(booking.specializationId, function(specialization) {
	$.firstRow.text = "Visita	" + specialization.name;
});

REST.findDoctorById(booking.doctorId, function(doctor) {
	$.secondRow.text = "Medico	Dr.	" + doctor.firstName + ' ' + doctor.lastName;
});

REST.findPatientById(booking.patientId, function(patient) {
	$.thirdRow.text = "Paziente	Sig. " + patient.firstName + ' ' + patient.lastName;
});
var day = moment.unix(booking.dateStart);

$.fourthRow.text = "Data " + day.format("dddd, MMMM Do YYYY, h:mm:ss a");


/*
$.secondRow.text = "Los Angeles CA, America";
$.thirdRow.text = "N.Tel.: " + doctor.phone;

var filter = doctor.firstName + ", " + doctor.lastName;

if(OS_IOS) $.DoctorRow.filter = filter;
else if(OS_ANDROID) $.DoctorRow.title = filter;
*/
/*
addIcons();

function addIcons() {
	Ti.API.debug("addIcons booking.bookingState: " + booking.bookingState);
	var state = Alloy.createWidget("ti.ux.iconvalue", {
		icon : UTILS.getStateIcon(booking.bookingState),
		color : "blue"
	});
	$.iconsView.add(state.getView());
	
	if(booking.bookingType=="3") {
		var emergencyState = Alloy.createWidget("ti.ux.iconvalue", {
			icon : "fa-exclamation-triangle",
			color : "red"
		});
		$.iconsView.add(emergencyState.getView());
	}
}
*/

