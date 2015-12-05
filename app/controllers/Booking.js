var args = arguments[0] || {};

$.tableViewBookingSection.getRows()[2].addEventListener('click', function(e){
  openBookingItem(e);
});
$.tableViewBookingSection.getRows()[4].addEventListener('click', function(e){
  openBookingItem(e);
});


	
var REST = require("rest");

initBookingCheck();

var nSpecialization = [];
REST.getListSpecializations(function(results) {
	Titanium.API.log('igi:2: viene chiamato due volte!!');
	nSpecialization = [];
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

function initBookingCheck() {
	Titanium.API.log('initBookingCheck');
		
	var numero = Ti.App.Properties.getInt('new-booking');
	Titanium.API.log('booking step:' + numero);
	
	for (i = 0; i <= numero; i=i+2) {
		$.tableViewBookingSection.getRows()[i].setTouchEnabled(true);
		//$.tableViewBookingSection.getRows()[i].setBackgroundColor('#B7DBFF');		
		
		var currRecow = 'recordRow_' + i;
		//$[currRecow].titleLbl.left = 40;			
		if (numero != i) {
			//$[currRecow].icon.setIcon("fa-check-square-o");
		}
	}
	
	for (i = (numero + 2); i <= 4; i=i+2) {
		$.tableViewBookingSection.getRows()[i].setTouchEnabled(false);
		//$.tableViewBookingSection.getRows()[i].setBackgroundColor('green');
		
		var currRecow = 'recordRow_' + i;
		//$[currRecow].icon.setIcon("fa-times");
		//$[currRecow].titleLbl.left = 40;
	}
		
}

function openBookingItem(e){
	Titanium.API.log('openBookingItem');
	
	initBookingCheck();
	var newWin;

	if(!e.row) return;
	
//	if (e.row.data && e.row.data.controller && e.row.getTouchEnabled()) {
	if (e.row.data && e.row.data.controller) {
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
