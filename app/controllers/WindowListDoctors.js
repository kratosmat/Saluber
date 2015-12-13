var args = arguments[0] || {};
var specialization_id = args._specialization_id;

var REST = require("rest");
//var bookingLib = require(WPATH("booking"));

var doctorsData = [];
var rowPerPage = 10;

function loadDoctors() {

	//REST.getListDoctors(function(_doctors) {
	REST.findDoctorBySpecialization(specialization_id, function(_doctors) {
		doctorsData = _doctors;
		_.each(_doctors, function(_doctor, index) {
			if(index<rowPerPage) $.listDoctors.appendRow(createRow(_doctor));
		});
		$.is.init($.listDoctors);
		$.is.load();
		
		//$.ptr.hide();
	});
};

function createRow(doctor) {
	Ti.API.debug("createRow: " + JSON.stringify(doctor));
	var row = Alloy.createController("DoctorRow", {
		_doctor : doctor
	});
	return row.getView();		
}

loadDoctors();

var selectedRowIndex = -1;

/*
function myRefresh(e) {
	Ti.API.info('refreshstart');
	loadBookings();
}
*/
var selectedDoctor = null;

$.listDoctors.addEventListener("click", function(e) {	
	Ti.API.info(JSON.stringify("listDoctors: e selezionata "+JSON.stringify(e)));
	Ti.API.info(JSON.stringify("listDoctors: e.row selezionata "+JSON.stringify(e.row)));
	Ti.API.info(JSON.stringify("listDoctors: e.source.id selezionata "+JSON.stringify(e.source.id)));
	Ti.API.info(JSON.stringify("listDoctors: e.row._info selezionata "+JSON.stringify(e.row._info)));
	var source = e.source.id;
	var doctor = e.row._info;
	
	if(source=="iconLbl") {
		if(typeof(e.row.selected)!=undefined && (e.row.selected==true)) {
			e.row.selected = false;
			//$.removeClass(e.row, 'rowSelectedClass');
			//$.addClass(e.row, 'rowUnselectedClass');
			e.row.backgroundColor = "#E74F1E";
			selectedDoctor = null;
			Ti.API.info("listDoctors: unselected");
		}
		else if(selectedDoctor==null) {
			e.row.selected = true;
			e.row.backgroundColor = "#D3D3D3";
			selectedDoctor = doctor.id;
			//$.addClass(e.row, 'rowSelectedClass');
			//$.removeClass(e.row, 'rowUnselectedClass');
			Ti.API.info("listDoctors: selected");
		}
	}
	/*
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

function indietroWindow() {
	//FIXME: questo su android non funziona
	if(selectedDoctor!=null) {
		$.trigger('selectedDoctor', {
			selectedDoctor: selectedDoctor
		});
	}
	if (OS_IOS){
		$.nav.close();
	}
}
