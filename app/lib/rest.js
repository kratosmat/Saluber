//var ip = Ti.App.Properties.getString('ip');

var url = "http://192.168.58.1:8080/saluber-services/";

var loadedBookings = [];
var loadedDoctors = [];
var loadedPatients = [];
var loadedHospitals = [];
var loadedMedicalTests = [];
var loadedSpecializations = [];


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

//	var url ="";
	
//	if (getToken()==="-1"){
//    	Ti.API.debug("crud - getInfo non si sta utilizzando oauth per la send della richiesta ");
    	_url = url + specificType;
		
		if(idParameter !== "" && idValue !== ""){
			url += "?" + idParameter + "=" + idValue;
			Ti.API.debug("crud: getInfo IdParameter = " + idParameter);
			Ti.API.debug("crud: getInfo IdValue = " + idValue);

		}
		else {
			Ti.API.debug("crud: richiesta senza oaut e senza parametri utente");
		}
/*
    }
    else {	
    	Ti.API.debug("crud - getInfo con parametri oauth per la send della richiesta ");
		url = ip + "abs-service-rest-web/restapi/api/configurations/" + specificType+"?access_token="+getToken()+"&user="+getUsername();
		
		if(idParameter !== "" && idValue !== ""){
			url += "&" + idParameter + "=" + idValue;
			Ti.API.debug("crud: getInfo - IdParameter = " + idParameter);
			Ti.API.debug("crud: getInfo - IdValue = " + idValue);
		}else {
			Ti.API.debug("crud: getInfo - Richiesta senza parametri utente");
		}
	}
*/		
	Ti.API.info("crud: getInfo - " + _url);
	httpClient.open("GET", _url);
	Ti.API.info("crud: getInfo - invocata get");
	httpClient.send(null);	
};


var getListBookings = function(callback) {
	Ti.API.info("crud: getListBookings LOADING.......");
	if(loadedBookings!=null && loadedBookings.length>0) callback(loadedBookings);
	
	getInfo("booking/list", function(listBookings) {
		loadedBookings = listBookings;
		callback(loadedBookings);
	});	
};
exports.getListBookings = getListBookings;


var getListDoctors = function(callback) {
	Ti.API.info("crud: getListDoctors LOADING.......");
	if(loadedDoctors!=null && loadedDoctors.length>0) callback(loadedDoctors);
	
	getInfo("doctor/list", function(results) {
		loadedDoctors = results;
		callback(loadedDoctors);
	});	
};
exports.getListDoctors = getListDoctors;

var getListPatients = function(callback) {
	Ti.API.info("crud: getListPatients LOADING.......");
	if(loadedPatients!=null && loadedPatients.length>0) callback(loadedPatients);
	
	getInfo("patient/list", function(results) {
		loadedPatients = results;
		callback(loadedPatients);			
	});	
};
exports.getListPatients = getListPatients;

var getListHospitals = function(callback) {
	Ti.API.info("crud: getListHospitals LOADING.......");
	if(loadedHospitals!=null && loadedHospitals.length>0) callback(loadedHospitals);
	
	getInfo("reference/hospitals", function(results) {
		loadedHospitals = results;
		callback(loadedHospitals);
	});	
};
exports.getListHospitals = getListHospitals;

var getListSpecializations = function(callback) {
	Ti.API.info("crud: getListSpecializations LOADING.......");
	if(loadedSpecializations!=null && loadedSpecializations.length>0) callback(loadedSpecializations);
	
	getInfo("reference/specializations", function(results) {
		loadedSpecializations = results;
		callback(loadedSpecializations);
	});	
};
exports.getListSpecializations = getListSpecializations;

var getListMedicalTests = function(callback) {
	Ti.API.info("crud: getListMedicalTests LOADING.......");
	if(loadedMedicalTests!=null && loadedMedicalTests.length>0) callback(loadedMedicalTests);
	
	getInfo("reference/medicaltests", function(results) {
		loadedMedicalTests = results;
		callback(loadedMedicalTests);
	});	
};
exports.getListMedicalTests = getListMedicalTests;