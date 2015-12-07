function cancel(e) {
	// openItem($.buttonConfirmId.controller);
	$.selectDoctor.close();
}

function confirm(e) {
	Ti.App.Properties.setString('new-booking', 4);
	Titanium.API.log('doctor: ' + JSON.stringify($.selectDoctor.parent.id));
	$.selectDoctor.parent.initBookingCheck();
	$.selectDoctor.close();
}

function openItem(pag){
	
	// var view = Alloy.createController(pag).getView();
	var homeCtrl = Alloy.createController(pag).getView();

	
}
