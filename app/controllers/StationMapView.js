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

//$.clear_user_selection.setBackgroundImage(WPATH("images/ic_menu_close_clear_cancel.png"));

var address = Alloy.createController("address");
/*
, {
	callback : function(locationInfo) {
		Ti.API.info("main: create controller address -> " + JSON.stringify(locationInfo));
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
	}
});
*/

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

$.mapview.addEventListener('click',function(e) {
	Ti.API.info("COSA HO CLICCATO SULLA MAPPA 1? -> " + JSON.stringify(e.clicksource));
	Ti.API.info("COSA HO CLICCATO SULLA MAPPA 2? -> " + e.annotation._areaId);	

	if(e.annotation && e.annotation._areaId){		
		if(!e.annotation.rightButton){
			e.annotation.rightButton = "right_arrow.png";
		}	
		if(OS_ANDROID) {
			if(e.annotation._areaId && (e.clicksource === "title" || e.clicksource === "rightPane" || e.clicksource === "infoWindow")){		
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
			}
		}
		else if(OS_IOS) {
			if(e.clicksource=='rightButton') {
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
		
		//gps.showUserAnnotations();
	});
}

reloadMap();

//exports.reloadMap = reloadMap;

//Animazione
var animate = function(view, moveTo) {
	view.width = moveTo;
	view.animate({
		width : moveTo,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 400
	});
};

/*
var dialog = Ti.UI.createOptionDialog();

dialog.addEventListener('click', function(e) {
	var mapType;
	//Se il valore dell'index è maggiore o uguale a 0 allora è stato cliccato un valore della lista
	if (e.index >= 0) {
		switch(e.source.options[e.index].toLowerCase()) {
		case "normal":
			mapType = map.NORMAL_TYPE;
			break;

		case "satellite":
			mapType = map.SATELLITE_TYPE;
			break;

		case "terrain":
			mapType = map.TERRAIN_TYPE;
			break;

		case "hybrid":
			mapType = map.HYBRID_TYPE;
			break;
		}
	}

	$.mapviewtab.setMapType(mapType);
});

function chooseLayer() {

	var opts = {
		options : ['Normal', 'Satellite', 'Terrain', 'Hybrid'],
		title : 'Choose Layer'
	};

	dialog.setOptions(opts.options);
	dialog.setTitle(opts.title);

	dialog.show();
}
*/
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

/*
if (!OS_IOS) {
	Ti.API.info("main:cleanTablePrenotazioni main win "+$.mainWind);
    $.mainWind.addEventListener('android:back',function (e){
	var dialog = Ti.UI.createAlertDialog({
	      cancel: 1,
	      buttonNames: [L("CONFIRM"),L("CANCEL")],
	      message: L("EXIT_THE_APP"),
	      title: L("CONFIRM_EXIT")
	    });
	dialog.addEventListener('click', function(e){
	      Ti.API.info('main e.cancel: ' + e.cancel);
	      Ti.API.info('main e.source.cancel: ' + e.source.cancel);
	      Ti.API.info('main e.index: ' + e.index);
	      if (e.index == e.source.cancel){
	          Ti.API.info('main: l utente non conferma uscita da APP');
	      }else {
              $.mainWind.close();
              Ti.API.info('main: l utente conferma uscita da APP');
	          
	      }
	      
	    });
	    dialog.show();
   });
}
*/
