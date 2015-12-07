var args = arguments[0] || {};
var doctor = args._doctor;

Ti.API.debug("doctorRow details: " + JSON.stringify(doctor));

$.firstName.text = "Nome: " + doctor.firstName;
$.lastName.text = "Cognome: " + doctor.lastName;
$.phone.text = "N.Tel.: " + doctor.phone;

var filter = doctor.firstName + ", " + doctor.lastName;

if(OS_IOS) $.DoctorRow.filter = filter;
else if(OS_ANDROID) $.DoctorRow.title = filter;

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

