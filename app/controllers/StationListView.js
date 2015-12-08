var REST = require("rest");

var data = [];
var rowPerPage = 10;

function loadData() {

	REST.getListStations(function(_stations) {
		data = _stations;
		_.each(_stations, function(_station, index) {
			if(index<rowPerPage) $.list.appendRow(createRow(_station));
		});
		$.is.init($.list);
		$.is.load();
		
		$.ptr.hide();
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

function myRefresh(e) {
	Ti.API.info('refreshstart');
	loadData();
}

$.list.addEventListener("click", function(e) {	

	Ti.API.info(JSON.stringify("list: e.row. selezionata "+JSON.stringify(e.row)));
	/*
	var wDetail = Alloy.createController("WindowDoctorDetail", {
		doctor : e.row.doctor
	});
	
	wDoctorDetail.getView().open();
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