var args = arguments[0] || {};

var patientAvailability = Alloy.createController("PatientAgendaView",  {
	doctor: args.doctor,
	station: args.station
});

$.mainWin.add(patientAvailability.getView());

function indietroWindow() {
	Ti.API.info("indietroWindow: " + JSON.stringify(patientAvailability.getSelectedSlot()));
	if(patientAvailability.getSelectedSlot()!=null) {
		$.trigger('selectedSlot', {
			selectedSlot: patientAvailability.getSelectedSlot()
		});
	}
	if (OS_IOS) {
		$.nav.close();
	}
	
}