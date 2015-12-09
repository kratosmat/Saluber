var args = arguments[0] || {};
var REST = require("rest");

Ti.API.info(JSON.stringify($.mainWin));

$.specializaton.parent = $.mainWin;

var stalloSelezionato;
var nSpecialization = [];
REST.getListSpecializations(function(results) {
	nSpecialization.push({ 
		id: null,
		value: "Nessuna Specializzazione"
	});
	_.each(results, function(result) {
    	var nSpec = { 
    		id: result.id,
    		value: result.name
    	};		
    	nSpecialization.push(nSpec);
	});
});	

$.specializaton.selectedValues = ((stalloSelezionato == null) ? [null] : [stalloSelezionato.cTipStl]);
$.specializaton.pickerValues = nSpecialization;

$.newCheckTableId.addEventListener("click", function(e) {
	Ti.API.info("newCheckTableId: " + JSON.stringify(e));
	Ti.API.info("pickerSpecialization: " + $.specializaton.getValue());
	if(e.row.data!=null) {
		Ti.API.info(JSON.stringify(e.row.data));
		if(e.row.data.id=='doctor') {
			var wListDoctors = Alloy.createController("WindowListDoctors", {
				_specialization_id: $.specializaton.getValue()
			});
			wListDoctors.on('selectedDoctor', function(e) {
				Ti.API.info("selectedDoctor: " + JSON.stringify(e));
				REST.findDoctorById(e.selectedDoctor, function(_doctor) {
					$.doctor.setValueText("Dr." + _doctor.firstName + " " + _doctor.lastName);
				});
				
			});
			wListDoctors.getView().open();
		}
		if(e.row.data.id=='location') {
			var stationWindow = Alloy.createController("StationWindow");
			stationWindow.on('selectedStation', function(e) {
				Ti.API.info("selectedStation: " + JSON.stringify(e));
				REST.findStationById(e.selectedStation, function(_station) {
					$.location.setValueText(_station.name + " \n" + _station.completeAddress);
				});
				
			});
			stationWindow.getView().open();
		}
		if(e.row.data.id=='date') {
			
		}
	}
});


function indietroWindow(){
	if (OS_IOS){
		$.nav.close();
	}
}

function send(e) {
	
}
