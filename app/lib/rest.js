//var ip = Ti.App.Properties.getString('ip');

//var url = "http://192.168.1.3:9080/saluber-services/";

var loadedBookings = [];
var loadedDoctors = [];
var loadedPatients = [];
var loadedHospitals = [];
var loadedMedicalTests = [];
var loadedSpecializations = [];

var saveNewSpecializations = getSaveNewSpecializations(true);

var getInfo = function(specificType, callback, idParameter, idValue, index) {
	//serve solo per le prove in locale
	index = (index === undefined)? -1 : index;
	idParameter = (idParameter === undefined) ? "" : idParameter;
	idValue = (idValue === undefined) ? "" : idValue;	
	
	if (index!=-1){
		Ti.API.debug("crud: getInfo index = "+index);
	}
	
	var httpClient = Titanium.Network.createHTTPClient();
	
	
	httpClient.onload = function(e){
		Ti.API.debug("crud: getInfo - risposta "+this.responseText);
		
		var response = JSON.parse(this.responseText);	
		if(index == -1){
			callback(response);
		}
		else{
			callback(response,index);
		}	
	};
	
	httpClient.onerror = function(e){
		Ti.API.error("crud: http error: " + e.source.status);
		Titanium.API.error("crud - getInfo errore mentre stavo servendo la richiesta " + _url);
		callback([]);
	};

	_url = Alloy.CFG.service_url + "/" + specificType +"?access_token="+ Ti.App.Properties.getString('access_token');
	
	if(idParameter !== "" && idValue !== ""){
		_url += "?" + idParameter + "=" + idValue;
		Ti.API.debug("crud: getInfo IdParameter = " + idParameter);
		Ti.API.debug("crud: getInfo IdValue = " + idValue);

	}
	else {
		Ti.API.debug("crud: richiesta senza oaut e senza parametri utente");
	}

	Ti.API.info("crud: getInfo - " + _url);
	httpClient.open("GET", _url);
	Ti.API.info("crud: getInfo - invocata get");
	httpClient.send(null);	
};


var getListBookings = function(callback) {
	Ti.API.info("crud: getListBookings LOADING.......");
	if(loadedBookings!=null && loadedBookings.length>0) callback(loadedBookings);
	else {
		getInfo("booking/list", function(listBookings) {
			loadedBookings = listBookings;
			callback(loadedBookings);
		});	
	}
	
};
exports.getListBookings = getListBookings;


var getListDoctors = function(callback) {
	
	if(loadedDoctors!=null && loadedDoctors.length>0) {
		Ti.API.info("crud: getListDoctors from memory .......");
		callback(loadedDoctors);
	}
	else {
		getInfo("doctor/list", function(results) {
			Ti.API.info("crud: getListDoctors from server .......");
			loadedDoctors = results;
			callback(loadedDoctors);
		});	
	}
	
};
exports.getListDoctors = getListDoctors;

var getListPatients = function(callback) {
	Ti.API.info("crud: getListPatients LOADING.......");
	if(loadedPatients!=null && loadedPatients.length>0) callback(loadedPatients);
	else {
		getInfo("patient/list", function(results) {
			loadedPatients = results;
			callback(loadedPatients);			
		});	
	}
	
};
exports.getListPatients = getListPatients;

var getListHospitals = function(callback) {
	Ti.API.info("crud: getListHospitals LOADING.......");
	if(loadedHospitals!=null && loadedHospitals.length>0) callback(loadedHospitals);
	else {
		getInfo("reference/hospitals", function(results) {
			loadedHospitals = results;
			callback(loadedHospitals);
		});	
	}
	
};
exports.getListHospitals = getListHospitals;

var getListSpecializations = function(callback) {
	Ti.API.info("crud: getListSpecializations LOADING.......");
	if(loadedSpecializations!=null && loadedSpecializations.length>0) callback(loadedSpecializations);
	else {	
		getInfo("reference/specializations", function(results) {
			loadedSpecializations = results;
			callback(loadedSpecializations);		
		});	
	}
};
exports.getListSpecializations = getListSpecializations;

var getListMedicalTests = function(callback) {
	Ti.API.info("crud: getListMedicalTests LOADING.......");
	if(loadedMedicalTests!=null && loadedMedicalTests.length>0) callback(loadedMedicalTests);
	else {
		getInfo("reference/medicaltests", function(results) {		
			loadedMedicalTests = results;
			callback(loadedMedicalTests);
		});	
	}
	
};
exports.getListMedicalTests = getListMedicalTests;


function getSaveNewSpecializations(empty) {
	if (empty == true) {
		saveNewSpecializations = {"id":-1, specialization:{"id":-1, "name":""}};
	}

	return saveNewSpecializations;
};
exports.getSaveNewSpecializations = getSaveNewSpecializations;
