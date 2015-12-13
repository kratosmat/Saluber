var args = arguments[0] || {};
var REST = require("rest");

Ti.API.info(JSON.stringify($.mainWin));

$.specializaton.parent = $.mainWin;

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

$.specializaton.pickerValues = nSpecialization;

var booking = {
	patientId: Ti.App.Properties.getString("organization")
};

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
				booking.doctorId = e.selectedDoctor;
				REST.findDoctorById(e.selectedDoctor, function(_doctor) {
					$.doctor.setValueText("Dr." + _doctor.firstName + " " + _doctor.lastName);
					if($.specializaton.getValue()==null) $.specializaton.setValue(_doctor.specialization);
				});
				
			});
			wListDoctors.getView().open();
		}
		if(e.row.data.id=='location') {
			var stationWindow = Alloy.createController("StationWindow");
			stationWindow.on('selectedStation', function(e) {
				Ti.API.info("selectedStation: " + JSON.stringify(e));
				booking.stationId = e.selectedStation;
				REST.findStationById(e.selectedStation, function(_station) {
					$.location.setValueText(_station.name + " \n" + _station.completeAddress);
				});
				
			});
			stationWindow.getView().open();
		}
		if(e.row.data.id=='date') {
			if(booking.stationId==null) alert("Selezionare la station");
			else if(booking.doctorId==null) alert("Selezionare il medico");
			else {
				var availabilityAgenda = Alloy.createController("PatientAgendaWindow", {
					doctor: booking.doctorId,
					station: booking.stationId
				});
				Ti.API.info(JSON.stringify(availabilityAgenda));
				
				availabilityAgenda.on('selectedSlot', function(e) {
					Ti.API.info("selectedSlot: " + JSON.stringify(e));
					$.date.setValueText(e.selectedSlot.date);
					booking.doctorSlot = e.selectedSlot.slotDoctorId;
					booking.stationSlot = e.selectedSlot.slotStationId;
					booking.dateStart = e.selectedSlot.date;
					/*
					booking.stationId = e.selectedStation;
					REST.findStationById(e.selectedStation, function(_station) {
						$.location.setValueText(_station.name + " \n" + _station.completeAddress);
					});
					*/
				});
				availabilityAgenda.getView().open();
			}
		}
	}
});


function indietroWindow(){
	if (OS_IOS){
		$.nav.close();
	}
}

function send(e) {
	
	Ti.API.info("send: " + JSON.stringify(booking));
	
	if(typeof(booking.patientId) == undefined || booking.patientId == null) return;
	if(typeof(booking.doctorId) == undefined || booking.doctorId == null) return;
	if(typeof(booking.stationId) == undefined || booking.stationId == null) return;
	if(typeof(booking.doctorSlot) == undefined || booking.doctorSlot == null) return;
	if(typeof(booking.stationSlot) == undefined || booking.stationSlot == null) return;
	if(typeof(booking.dateStart) == undefined || booking.dateStart == null) return;
	if($.specializaton.getValue() == null) return;
	booking.specializationId = $.specializaton.getValue();
	
	Ti.API.info("send: " + JSON.stringify(booking));
	
	REST.saveBooking(booking, function(response) {
		alert(response);
		if (OS_IOS){
			$.nav.close();
		}
	});
}
