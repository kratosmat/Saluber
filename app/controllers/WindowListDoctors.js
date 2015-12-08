var REST = require("rest");
//var bookingLib = require(WPATH("booking"));

var doctorsData = [];
var rowPerPage = 10;

function loadDoctors() {

	REST.getListDoctors(function(_doctors) {
		doctorsData = _doctors;
		_.each(_doctors, function(_doctor, index) {
			if(index<rowPerPage) $.listDoctors.appendRow(createRow(_doctor));
		});
		$.is.init($.listDoctors);
		$.is.load();
		
		$.ptr.hide();
	});
};

function createRow(doctor) {
	Ti.API.debug("createRow: " + JSON.stringify(doctor));
	var row = Alloy.createController("doctorRow", {
		_doctor : doctor
	});
	return row.getView();		
}

loadDoctors();

var selectedRowIndex = -1;

function myRefresh(e) {
	Ti.API.info('refreshstart');
	loadBookings();
}

$.listDoctors.addEventListener("click", function(e) {	

	Ti.API.info(JSON.stringify("listDoctors: e.row. selezionata "+JSON.stringify(e.row)));
	
	Ti.API.info(JSON.stringify("listDoctors: e.row. selezionata "+JSON.stringify(e.row)));
	
	var wDoctorDetail = Alloy.createController("WindowDoctorDetail", {
		doctor : e.row.doctor
	});
	wDoctorDetail.getView().open();
});


function myLoader(e) {
	//Ti.API.info("myLoader: " + JSON.stringify(e));
	
	var ln = doctorsData.length;
	var nPages =  (ln % rowPerPage)==0 ? (ln - (ln % rowPerPage)) /rowPerPage : ((ln - (ln % rowPerPage)) /rowPerPage)+1;
	
	if(ln>0) {
		var nRows = $.listDoctors.data[0].rows.length;
		//TODO attenzione qui
		var nPagesLoaded = (nRows/rowPerPage);
	
		var lastRow = ((nPagesLoaded*rowPerPage)+rowPerPage) < ln ? (nPagesLoaded*rowPerPage)+rowPerPage : ln;

		Ti.API.info("rowPerPage: " + rowPerPage + ", arrayLn: " + ln + ", nPages: " + nPages + ", nRows: " + nRows + ", nPagesLoaded: " + nPagesLoaded + ", lastRow: " + lastRow);

		for(var i=(nPagesLoaded*rowPerPage); i<lastRow; i++) {
			Ti.API.info("load a row: " + JSON.stringify(doctorsData[i]));
			$.listDoctors.appendRow(createRow(doctorsData[i]));
		}
		e.done();		
	}
	else {
		e.error();
	}
}

function indietroWindow(){
	if (OS_IOS){
		$.nav.close();
	}
}
