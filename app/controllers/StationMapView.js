//View principale ctrl+shift+v per il file xml e ctrl+shift+s per il file tss

var args = arguments[0] || {};
var isMapSelected = true;
var tabSelected = 0;
var gps = require("geo");

var REST = require("rest");
var map = require("ti.map");
var filter = null;

var currentLat = -1;
var currentLon = -1;

var address = Alloy.createController("address");

address.on('select', function(_data) {
	var locationInfo = _data.locationInfo;
	Ti.API.info("onSelect: " + JSON.stringify(locationInfo));

	gps.showAnnotation({
		latitude : locationInfo.geometry.location.lat,
		longitude : locationInfo.geometry.location.lng,
		formatted_address: locationInfo.formatted_address
		
	}, "", "YES");
	currentLat = locationInfo.geometry.location.lat;
	currentLon = locationInfo.geometry.location.lng;
	
	$.addressView.remove(address.getView());
	$.search.value = "";
	$.addressView.height = 0;
});


var selectedStation = null;

$.mapview.addEventListener('click',function(e) {
	Ti.API.info("COSA HO CLICCATO SULLA MAPPA 1? -> " + JSON.stringify(e.clicksource));
	Ti.API.info("COSA HO CLICCATO SULLA MAPPA 2? -> " + e.annotation._areaId);	

	selectedStation = null;
	if(e.annotation && e.annotation._areaId){		
		if(!e.annotation.rightButton){
			e.annotation.rightButton = "right_arrow.png";
		}	
		if(OS_ANDROID) {
			if(e.annotation._areaId && (e.clicksource === "title" || e.clicksource === "rightPane" || e.clicksource === "infoWindow")){		
				/*
				Alloy.Globals.loading.show();
				crud.getParkingDetailById(e.annotation._areaId, function(_areaDetail) {
					Ti.API.info("parkingArea: " + JSON.stringify(_areaDetail.information));
					Ti.API.info("parkingArea: " + JSON.stringify(_areaDetail.information.serviceTypes));
					var windowDettaglioArea = Widget.createController('windowDettaglioArea', {
						parkingAreaId : e.annotation._areaId,
						parkingArea : _areaDetail.information
					});
					windowDettaglioArea.getView().open();			
				});
				*/
			}
		}
		else if(OS_IOS) {
			if(e.clicksource=='rightButton') {
				/*
				Alloy.Globals.loading.show();
				crud.getParkingDetailById(e.annotation._areaId, function(_areaDetail) {
					Ti.API.info("parkingArea: " + JSON.stringify(_areaDetail.information));
					Ti.API.info("parkingArea: " + JSON.stringify(_areaDetail.information.serviceTypes));
					var windowDettaglioArea = Widget.createController('windowDettaglioArea', {
						parkingAreaId : e.annotation._areaId,
						parkingArea : _areaDetail.information
					});
					windowDettaglioArea.getView().open();			
				});
				*/
				Ti.API.info("rightButton: " + JSON.stringify(e.annotation._areaId));
				selectedStation = e.annotation._areaId;
			}
		}	
	}
});

function onSearch(e) {
	address.fillList(e.value);

	//Se non è mostrato, lo si mostra
	if (address.isShow()) {
		$.addressView.add(address.getView());
		$.addressView.height = Ti.UI.FILL;
	} 
	else {
		$.addressView.remove(address.getView());
		$.addressView.height = 0;
	}

}

gps.setMapView($.mapview);


function reloadMap(){
	REST.getListStations(function(stations) {
		//gps.removeAllAnnotations();
		_.each(stations, function(station) {
			Ti.API.info("reloadMap: " + JSON.stringify(station));
			gps.showAnnotation({
				latitude : station.lat,
				longitude : station.lon,
				name: station.name,
				formatted_address: station.completeAddress,
				parkingAreaId: station.id
			}, "marker_parking.png", "NO");
			
		});
	});
}

reloadMap();

//Animazione
var animate = function(view, moveTo) {
	view.width = moveTo;
	view.animate({
		width : moveTo,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 400
	});
};


function clearTextField(e) {
	$.search.value = "";
	$.addressView.height = 0;
}

function deleteUserAnnotation(e) {
	gps.clearAnnotations();
}

function report(e) {
	Ti.API.info("Annotation " + e + " clicked, id: " + e.annotation.myid);
}

function closeWindow(){
	Ti.API.info("main: closeWindow fire CloseWin");
    Titanium.App.fireEvent('CloseWin');
    if (OS_IOS) {
       $.mainNavWin.close();
       
    } else {
       $.mainWin.close();
    }
}

$.getSelectedStation = function() {
	return (selectedStation);
};