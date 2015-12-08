var REST = require("rest");

var stationsData = [];
var rowPerPage = 10;

function loadStations() {

	REST.getListStations(function(_stations) {
		stationsData = _stations;
		_.each(_stations, function(_station, index) {
			if(index<rowPerPage) $.listStations.appendRow(createRow(_station));
		});
		$.is.init($.listStations);
		$.is.load();
		
		$.ptr.hide();
	});
};

function createRow(station) {
	Ti.API.debug("createRow: " + JSON.stringify(station));
	var row = Alloy.createController("StationRow", {
		_station : station
	});
	return row.getView();		
}

loadStations();

var selectedRowIndex = -1;

function myRefresh(e) {
	Ti.API.info('refreshstart');
	loadStations();
}

$.listStations.addEventListener("click", function(e) {	

	Ti.API.info(JSON.stringify("listStations: e.row. selezionata "+JSON.stringify(e.row)));
	
	var wStationDetail = Alloy.createController("WindowStationDetail", {
		station : e.row.station
	});
	wStationDetail.getView().open();
});


function myLoader(e) {
	//Ti.API.info("myLoader: " + JSON.stringify(e));
	
	var ln = stationsData.length;
	var nPages =  (ln % rowPerPage)==0 ? (ln - (ln % rowPerPage)) /rowPerPage : ((ln - (ln % rowPerPage)) /rowPerPage)+1;
	
	if(ln>0) {
		var nRows = $.listStations.data[0].rows.length;
		//TODO attenzione qui
		var nPagesLoaded = (nRows/rowPerPage);
	
		var lastRow = ((nPagesLoaded*rowPerPage)+rowPerPage) < ln ? (nPagesLoaded*rowPerPage)+rowPerPage : ln;

		Ti.API.info("rowPerPage: " + rowPerPage + ", arrayLn: " + ln + ", nPages: " + nPages + ", nRows: " + nRows + ", nPagesLoaded: " + nPagesLoaded + ", lastRow: " + lastRow);

		for(var i=(nPagesLoaded*rowPerPage); i<lastRow; i++) {
			Ti.API.info("load a row: " + JSON.stringify(stationsData[i]));
			$.listStations.appendRow(createRow(stationsData[i]));
		}
		e.done();		
	}
	else {
		e.error();
	}
}
