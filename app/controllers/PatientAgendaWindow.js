var args = arguments[0] || {};

var patientAvailability = Alloy.createController("PatientAgendaView",  {
	doctor: args.doctor,
	station: args.station
});

$.mainWin.add(patientAvailability.getView());

function indietroWindow() {
	if (OS_IOS) {
		$.nav.close();
	}
}

function next() {
	Ti.API.info("indietroWindow: " + JSON.stringify(patientAvailability.getSelectedSlot()));
	if(patientAvailability.getSelectedSlot()!=null) {
		$.trigger('selectedSlot', {
			selectedSlot: patientAvailability.getSelectedSlot()
		});
		if (OS_IOS) {
			$.nav.close();
		}
	}
	else {
		alert(L('SELECT_A_DAY'));
	}

}