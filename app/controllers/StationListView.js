var REST = require("rest");

var data = [];
var rowPerPage = 10;

function loadData() {
	$.list.setData([]);
	REST.getListStations(function(_stations) {
		data = _stations;
		_.each(_stations, function(_station, index) {
			if(index<rowPerPage) $.list.appendRow(createRow(_station));
		});
		$.is.init($.list);
		$.is.load();
		
		//$.ptr.hide();
	});
};

function createRow(item) {
	Ti.API.debug("createRow: " + JSON.stringify(item));
	var row = Alloy.createController("StationRow", {
		_station : item
	});
	return row.getView();		
}

loadData();

var selectedRowIndex = -1;

/*
function myRefresh(e) {
	Ti.API.info('refreshstart');
	loadData();
}
*/
var selectedStation = null;
$.list.addEventListener("click", function(e) {	

	Ti.API.info(JSON.stringify("listStations: e selezionata "+JSON.stringify(e)));
	Ti.API.info(JSON.stringify("listStations: e.row selezionata "+JSON.stringify(e.row)));
	Ti.API.info(JSON.stringify("listStations: e.source.id selezionata "+JSON.stringify(e.source.id)));
	Ti.API.info(JSON.stringify("listStations: e.row._info selezionata "+JSON.stringify(e.row._info)));
	var source = e.source.id;
	var station = e.row._info;
	
//	if(source=="iconLbl") {
		if(typeof(e.row.selected)!=undefined && (e.row.selected==true)) {
			e.row.selected = false;
			e.row.backgroundColor = "white";
			selectedStation = null;
			Ti.API.info("listStations: unselected");
		}
		else if(selectedStation==null) {
			e.row.selected = true;
			selectedStation = station.id;
			e.row.backgroundColor = "#D3D3D3";
			Ti.API.info("listStations: selected");
		}
/*
	}
	else {
		var wDoctorDetail = Alloy.createController("WindowDoctorDetail", {
			doctor : doctor
		});
		wDoctorDetail.getView().open();
	}
*/
});


function myLoader(e) {
	//Ti.API.info("myLoader: " + JSON.stringify(e));
	
	var ln = data.length;
	var nPages =  (ln % rowPerPage)==0 ? (ln - (ln % rowPerPage)) /rowPerPage : ((ln - (ln % rowPerPage)) /rowPerPage)+1;
	
	if(ln>0) {
		var nRows = $.list.data[0].rows.length;
		//TODO attenzione qui
		var nPagesLoaded = (nRows/rowPerPage);
	
		var lastRow = ((nPagesLoaded*rowPerPage)+rowPerPage) < ln ? (nPagesLoaded*rowPerPage)+rowPerPage : ln;

		Ti.API.info("rowPerPage: " + rowPerPage + ", arrayLn: " + ln + ", nPages: " + nPages + ", nRows: " + nRows + ", nPagesLoaded: " + nPagesLoaded + ", lastRow: " + lastRow);

		for(var i=(nPagesLoaded*rowPerPage); i<lastRow; i++) {
			Ti.API.info("load a row: " + JSON.stringify(data[i]));
			$.list.appendRow(createRow(data[i]));
		}
		e.done();		
	}
	else {
		e.error();
	}
}

$.getSelectedStation = function() {
	return (selectedStation);
};