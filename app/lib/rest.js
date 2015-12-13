//var ip = Ti.App.Properties.getString('ip');

//var url = "http://192.168.1.3:9080/saluber-services/";

var loadedBookings = [];
var loadedDoctors = [];
var loadedPatients = [];
var loadedHospitals = [];
var loadedMedicalTests = [];
var loadedSpecializations = [];
var loadedStations = [];

var saveNewSpecializations = getSaveNewSpecializations(true);

var getInfo = function(specificType, callback, idParameter, idValue) {
	//serve solo per le prove in locale
	idParameter = (idParameter === undefined) ? "" : idParameter;
	idValue = (idValue === undefined) ? "" : idValue;	
	
	var httpClient = Titanium.Network.createHTTPClient();
	
	httpClient.onload = function(e){
		Ti.API.info("crud: getInfo - risposta " + this.responseText);
		try {
			var response = JSON.parse(this.responseText);	
			callback(response);
		}
		catch(e) {
			Ti.API.error(e);
			callback(this.responseText);
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

function post(valueObject, url, callback){
	Ti.API.info("post: " + valueObject);
	
	var requestHttp = Ti.Network.createHTTPClient({
		onload: function(e){
			try{
				Ti.API.info("post: this.status " + this.status);
				if (this.status === 200) {
				    Ti.API.info("booking: post response -> " + this.responseText);
				    callback(this.responseText);
			    } 
			    else {
			        Ti.API.info("post: Invalid response: " + this.status);
			        alert(L(this.responseText, 'Errore: ' + this.status));
			        callback(this.responseText);
		        }
		    }
		    catch(exc){
		   	    Ti.API.info("Invalid response" + exc);
		    }
	    },
	    onerror : function(e){
	    	Titanium.API.error('ondatastream called, readyState = '+this.readyState+'\r\nStatus: ' + this.status+'\r\nResponseText: ' + this.responseText+'\r\nconnectionType: ' + this.connectionType+'\r\nlocation: ' + this.location);
		    //alert(L(this.responseText,'Errore durante la creazione della prenotazione.\r\n Codice di errore '+this.responseText));
	    	callback(this.responseText);
	    },
	    onsendstream: function(e) {
			// function called as data is uploaded
			Ti.API.info('onsendstream called, readyState = ' + this.readyState);
			//callback(this.readyState);
	    }
	});
	//var url;
	//url = Alloy.CFG.service_url + "/calendar/save_month?access_token="+ Ti.App.Properties.getString('access_token');
    try{
		requestHttp.open("POST",url);
		requestHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		requestHttp.send(JSON.stringify(valueObject));
	}
	catch(excTcp) {
		Ti.API.info("exc  "+excTcp);		
	}
};
/* #################### */


var getListBookings = function(callback) {
	Ti.API.info("crud: getListBookings LOADING.......");
	//if(loadedBookings!=null && loadedBookings.length>0) callback(loadedBookings);
	//else {
		getInfo("booking/list", function(listBookings) {
			loadedBookings = listBookings;
			callback(loadedBookings);
		});	
	//}
	
};
exports.getListBookings = getListBookings;

var saveBooking = function(booking, callback) {
	var url = Alloy.CFG.service_url + "/booking/save?access_token="+ Ti.App.Properties.getString('access_token');
	post(booking, url, callback);
};
exports.saveBooking = saveBooking;


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

function findDoctorById(id, callback) {
	getListDoctors(function(doctors) {
		_doctors = _.where(doctors, {id: id});
		if(_doctors!=null && _doctors.length>0) callback(_doctors[0]);
		else callback(null);
	});
}
exports.findDoctorById = findDoctorById;

function findDoctorBySpecialization(specialization_id, callback) {
	Ti.API.info("findDoctorBySpecialization: " + specialization_id);
	if(typeof(specialization_id) == undefined || specialization_id==null) {
		getListDoctors(callback);
	}
	else {
		getListDoctors(function(doctors) {
			var specializedDoctors = [];
			_.each(doctors, function(doctor) {
				Ti.API.info("findDoctorBySpecialization: " + JSON.stringify(doctor));
				_.each(doctor.specializations, function(specialization) {
					if(specialization == specialization_id) {
						specializedDoctors.push(doctor);
					}
				});
			});
			callback(specializedDoctors);
		});
	}
}
exports.findDoctorBySpecialization = findDoctorBySpecialization;

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

function findPatientById(id, callback) {
	getListPatients(function(results) {
		_items = [];
		_.each(results, function(result) {
			if(result.id==id) _items.push(result);
		});
		Ti.API.info("findPatientById: " + id + " - " + JSON.stringify(_items));
		if(_items!=null && _items.length>0) callback(_items[0]);
		else callback(null);
	});
}
exports.findPatientById = findPatientById;

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

function findSpecializationById(id, callback) {
	getListSpecializations(function(results) {
		_items = _.where(results, {id: id});
		if(_items!=null && _items.length>0) callback(_items[0]);
		else callback(null);
	});
}
exports.findSpecializationById = findSpecializationById;

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

var getListStations = function(callback) {
	Ti.API.info("crud: getListStations LOADING.......");
	if(loadedStations!=null && loadedStations.length>0) callback(loadedStations);
	else {
		getInfo("station/list", function(results) {		
			loadedStations = results;
			callback(loadedStations);
		});	
	}
	
};
exports.getListStations = getListStations;

function findStationById(id, callback) {
	getListStations(function(stations) {
		_stations = _.where(stations, {id: id});
		if(_stations!=null && _stations.length>0) callback(_stations[0]);
		else callback(null);
	});
}
exports.findStationById = findStationById;

function getSaveNewSpecializations(empty) {
	if (empty == true) {
		saveNewSpecializations = {"id":-1, specialization:{"id":-1, "name":""}};
	}

	return saveNewSpecializations;
};
exports.getSaveNewSpecializations = getSaveNewSpecializations;

var getOrCreateMonth = function(year, month, callback) {
	Ti.API.info("crud: getOrCreateMonth LOADING.......");
	getInfo("calendar/month/" + year + "/" + month, function(results) {		
		callback(results);
	});	
};
exports.getOrCreateMonth = getOrCreateMonth;

var getAvailability = function(year, month, doctor, station, callback) {
	
	getInfo("calendar/month_availability/" + year + "/" + month + "/" + doctor + "/" + station, function(results) {		
		Ti.API.info("crud: getAvailability LOADING.......");
		callback(results);
	});	
};

exports.getAvailability = getAvailability;



function saveMonth(month, callback){
	var strMonth = JSON.stringify(month);
	Ti.API.info("saveMonth: saveMonth " + strMonth);
	
	var requestHttp = Ti.Network.createHTTPClient({
		onload: function(e){
			try{
				Ti.API.info("booking: createBooking this.status "+this.status);
				if (this.status === 200) {
				    Ti.API.debug("booking: createBooking HO EFFETTUATO LA RICHIESTA DI PRENOTAZIONE, QUESTO E' LA RISPOSTA CHE RITORNA -> " + this.responseText);
				    callback(this.responseText);
			    } 
			    else {
			        Ti.API.info("booking: createBooking Invalid " + this.status);
			        alert(L(this.responseText, 'Errore durante la ricerca disponibilita.\r\nStato ' + this.status));
			        callback(this.responseText);
		        }
		    }
		    catch(exc){
		   	    Ti.API.info("Invalid " + exc);
		    }
	    },
	    onerror : function(e){
	    	Titanium.API.error('ondatastream called, readyState = '+this.readyState+'\r\nStatus: ' + this.status+'\r\nResponseText: ' + this.responseText+'\r\nconnectionType: ' + this.connectionType+'\r\nlocation: ' + this.location);
		    alert(L(this.responseText,'Errore durante la creazione della prenotazione.\r\n Codice di errore '+this.responseText));
	    	callback(this.responseText);
	    },
	    onsendstream: function(e) {
			// function called as data is uploaded
			Ti.API.info('onsendstream called, readyState = '+this.readyState);
			callback(this.readyState);
	    }
	});
	var url;
	url = Alloy.CFG.service_url + "/calendar/save_month?access_token="+ Ti.App.Properties.getString('access_token');
    try{
		requestHttp.open("POST",url);
		requestHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		requestHttp.send(strMonth);
	}
	catch(excTcp){
		
    	Ti.API.info("exc  "+excTcp);		
	}
	
};
exports.saveMonth = saveMonth;