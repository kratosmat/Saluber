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
	$.secondRow.text = "Medico	Dr." + doctor.firstName + ' ' + doctor.lastName;
});

REST.findPatientById(booking.patientId, function(patient) {
	$.thirdRow.text = "Paziente	Sig.	" + patient.firstName + ' ' + patient.lastName;
});
var day = moment.unix(booking.dateStart/1000);
//Ti.API.info(booking.dateStart);
$.fourthRow.text = "Data	" + day.format("DD/MMM/YYYY");


