var args = arguments[0] || {};

Ti.API.info("dettaglioArea: " + JSON.stringify(args));

var doctor = args.args.doctor;

//var crud = require(WPATH("crud"));
//var utils = require(WPATH("utils"));


/*
var callback = function(parkingArea) {	
	areaLocation = {
		latitude : parkingArea.latitude,
		longitude : parkingArea.longitude
	};
	Ti.API.debug("detailArea: callback nome "+parkingArea.parkingAreaDescription);
	Ti.API.debug("detailArea: dettaglio area "+JSON.stringify(parkingArea));
	
	
	areaName = parkingArea.parkingAreaDescription;
	
	$.areaName.add(Alloy.createWidget('ti.ux.title', {
		text : areaName
	}).getView());
	
	$.areaTimings.add(Alloy.createWidget('ti.ux.iconlabel', {
		class:"iconlabelRowWidget",
		text : utils.formatDateAsString(new Date(),true),
		icon: "fa-clock-o",
		height:"30",
		width: 300,
		color:"#666"
	}).getView());
	
	
	$.areaImage.add(Alloy.createWidget("ti.ux.image", {
		id:"img", 
		left:"0", 
		right:"0",
		zoomable:"true", 
		height:"150", 
		innerMargin:"80", 
		realTop:"40",
		image1:"/images/bleins.jpg",
		image:"http://www.andthesign.it/wp-content/uploads/et_temp/08_San-Giuliano_01_scheda-577891_960x480.jpg"
	}).getView());
	
	Ti.API.debug("dettaglioarea: callback enamil "+parkingArea.email);
	
	$.areaEmail.add(Alloy.createWidget('ti.ux.iconlabel', {
		class:"iconlabelRowWidget",
		text : parkingArea.email,
		icon: "fa-envelope-o",
		height:"30",
		width: 300,
		color:"#666"
	}).getView());
	
    //$.email.text=parkingArea.email; 
	Ti.API.debug("dettaglioarea: callback lon "+parkingArea.longitude+" lat "+parkingArea.latitude);
	//$.position.text = "lat "+parkingArea.latitude + "\r\nlon " + parkingArea.longitude;
    
   	$.areaLocation.add(Alloy.createWidget('ti.ux.iconlabel', {
		class:"iconlabelRowWidget",
		text : parkingArea.address + ", " + parkingArea.city+" - "+parkingArea.region,
		icon:"fa-globe",
		height:"35",
		color:"#669",
		width: 300,
		id:"locationLabel"
	}).getView());


	if(parkingArea.serviceTypes.length > 0){
		for (var i = 0; i < parkingArea.serviceTypes.length; i++) {
		   	var singleResult = parkingArea.serviceTypes[i];
		   	
		   	Ti.API.debug("dettaglioarea: singleResult: " + JSON.stringify(singleResult));
		   	
		   	Ti.API.debug("dettaglioarea: aggiungo servizio <"+singleResult.serviceDescription+"> per area <"+areaName+"> ");	
		   	
		   	var booVisible=true;
				
		    var isAutotrasportatore = Ti.App.Properties.getString('role')=='ROLE_ADA01';
	        var isGestore = Ti.App.Properties.getString('role')=='ROLE_GBS02';
	        
	        Ti.API.debug("dettaglioarea: addServiceRow ruolo utente "+Ti.App.Properties.getString('role') +" singleResult.serviceId "+singleResult.serviceId+ " isAutotrasportatore "+isAutotrasportatore);
			
			if (singleResult.flagBookable==0 || (isAutotrasportatore && singleResult.serviceId!=='1') || isGestore){
			    booVisible=false;
			}
				
		   	var index=0;
		   	crud.getServiceByIdForArea(singleResult.serviceId, parkingAreaId, function(service) {
			   	Ti.API.debug("dettaglioarea: crud.getServiceByIdForArea " + JSON.stringify(service));
				index=index+1;
				var serviceRow = Alloy.createWidget("ti.ux.rowitem", {
					title : singleResult.serviceDescription,
					count : ((service.iPrzUni!==undefined && service.iPrzUni!=null && service.iPrzUni!=="" && service.iPrzUni!==0) ? + service.iPrzUni+" €/h" : null),
					hasChildren: booVisible,
					_service : singleResult,
					_parkingArea : parkingArea
				});
				Ti.API.debug("dettaglioarea: crud.getServiceByIdForArea servicerow ["+index+"] view obj " + JSON.stringify(serviceRow.getView()));
				$.areaServices.add(serviceRow.getView());
			});
	   }
	}
};

if(parkingAreaId != null && typeof parkingAreaId != 'undefined') {
	//crud.getParkingDetailById(parkingAreaId, callback);	
	callback(_area);
}
*/
