var args = arguments[0] || {};
var REST = require("rest");

$.tableViewBookingSection.getRows()[2].addEventListener('click', function(e){
  openBookingItem(e);
});
$.tableViewBookingSection.getRows()[4].addEventListener('click', function(e){
  openBookingItem(e);
});

initBookingCheck();

var nSpecialization = [];
REST.getListSpecializations(function(results) {
	_.each(results, function(result) {
    	var nSpec = { 
    		id: result.id,
    		value: result.name
    	};		
    	nSpecialization.push(nSpec);
	});
});		
$.recordRow_0.selectedValues = null;
$.recordRow_0.pickerValues = nSpecialization;

function changeSpecialization(e) {
	var booking = REST.getSaveNewSpecializations(false);
	booking.specialization.id = e.key;
	booking.specialization.name = e.value;

	Ti.App.Properties.setString('new-booking', 2);
	
	initBookingCheck();
}

//$.recordRow_0.on('change', function(e) {
	
//});

function initBookingCheck() {
	Titanium.API.log('initBookingCheck: ');
		
	var numero = Ti.App.Properties.getInt('new-booking');
	if (numero == "0") {
		REST.getSaveNewSpecializations(true);
	}
	
	for (i = 0; i <= numero; i=i+2) {
		$.tableViewBookingSection.getRows()[i].setTouchEnabled(true);
		$.tableViewBookingSection.getRows()[i].setBackgroundColor('#B7DBFF');		
		
		var currRecow = 'recordRow_' + i;
		$[currRecow].titleLbl.left = 40;			
		if (numero != i) {
			$[currRecow].icon.setIcon("fa-check-square-o");
		} else {
			$[currRecow].icon.setIcon("");
		}
	}
	
	for (i = (numero + 2); i <= 4; i=i+2) {
		$.tableViewBookingSection.getRows()[i].setTouchEnabled(false);
		$.tableViewBookingSection.getRows()[i].setBackgroundColor('green');
		
		var currRecow = 'recordRow_' + i;
		$[currRecow].icon.setIcon("fa-times");
		$[currRecow].titleLbl.left = 40;
	}
		
}

function openBookingItem(e){
	Titanium.API.log('openBookingItem');
	
	// initBookingCheck();
	var newWin;

	if(!e.row) return;
	
	if (e.row.data && e.row.data.controller && e.row.getTouchEnabled()) {
		newWin = Alloy.createController(e.row.data.controller).getView();
	} else {
		alert('non ancora abilitato..');
	}
	
	
	if(OS_IOS && newWin){
		Alloy.Globals.navWindow.openWindow(newWin);
	}
	
	if(OS_ANDROID && newWin){
		newWin.open();
	}
}
