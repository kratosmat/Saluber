var args = arguments[0] || {};

var REST = require("rest");
var moment = require('moment');

Ti.API.info("PatientProfile: " + Ti.App.Properties.getString('organization'));

REST.findPatientById(Ti.App.Properties.getString('organization'), function(patient) {
	Ti.API.info("PatientProfile: " + JSON.stringify(patient));
//	$.img.image = "images/patient-" + patient.id + ".img";

	$.title.add(Alloy.createWidget('ti.ux.title', {
		text : patient.firstName + " " + patient.lastName
	}).getView());
	
	var date = moment.unix(patient.bod/1000);
	$.bod.add(Alloy.createWidget('ti.ux.iconlabel', {
		text: date.format('DD/MMM/YYYY'),
		icon: "fa-clock-o",
		height:"30",
		color:"#666",
		left: 10
	}).getView());
	
	$.phone.add(Alloy.createWidget('ti.ux.iconlabel', {
		text: patient.phone,
		icon: "fa-phone",
		height:"30",
		color:"#666",
		left: 10
	}).getView());
	
	$.sanitary.add(Alloy.createWidget('ti.ux.iconlabel', {
		text: patient.sanitaryId,
		icon: "fa-medkit",
		height:"30",
		color:"#666",
		left: 10
	}).getView());
});

$.mainTable.addEventListener("click", function(e) {	
	Ti.API.info(JSON.stringify(e));
	if(e.row!=null) {
		var w = Alloy.createController("charts/" + e.row.id);
		w.getView().open();
	}
});
