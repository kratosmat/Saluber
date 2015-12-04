function getLocationForAndroid() {
    Ti.API.debug("geo: getLocationForAndroid ---- servizio di geolocalizzazione abilitato");
    Ti.Geolocation.purpose = "Get current location";
    Ti.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error("geo: getLocationForAndroid Error:" + e);
            lon = longitude = -1;
            lat = latitude = -1;
        } else {
            Ti.API.info(e.coords);
            try {
                lon = e.coords.longitude;
                lat = e.coords.latitude;
            } catch (e) {
                Ti.API.error("geo: getLocationForAndroid error nel la identificazione della posizione " + e);
                lat = -1;
                lon = -1;
            }
        }
        Ti.API.debug("geo: getLocationForAndroid LAT pos corrente-> " + lat);
        Ti.API.debug("geo: getLocationForAndroid LON pos corrente-> " + lon);
    });
}

function ordina(latitude, longitude, response) {
    var distances = [];
    var areas = [];
    for (var i = 0; i < response.length; i++) {
        var singleResult = response[i].information;
        var distanceDbl = 9999999;
        try {
            Ti.API.debug("geo: ordina - LAT area " + singleResult.parkingAreaDescription + "-> " + singleResult.latitude);
            Ti.API.debug("geo: ordina - LON area " + singleResult.parkingAreaDescription + "-> " + singleResult.longitude);
            var lat1 = singleResult.latitude;
            var lon1 = singleResult.longitude;
            var lat2 = latitude;
            var lon2 = longitude;
            if (-1 != lat2) {
                var R = 6371;
                var dLat = toRad(lat2 - lat1);
                var dLon = toRad(lon2 - lon1);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                distanceDbl = parseFloat(d).toFixed(2);
            }
        } catch (e) {
            Ti.API.error("geo: ordina - error nel calcolo della distanza ");
        }
        distances[i] = distanceDbl;
        areas[i] = singleResult;
        Ti.API.debug("geo: ordina -  tra posizione corrente e area " + areas[i].parkingAreaDescription + "=" + distanceDbl);
    }
    Ti.API.debug("geo: ordina -  ---- RIORDINA DISTANZA -> ");
    var n = distances.length;
    for (var i = 0; n > i; i++) {
        var flag = false;
        for (var j = 0; n - 1 > j; j++) if (parseFloat(distances[j]) > parseFloat(distances[j + 1])) {
            Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza distances[j]>distances[j+1] scambio tra " + distances[j] + " " + distances[j + 1]);
            var k = distances[j];
            distances[j] = distances[j + 1];
            distances[j + 1] = k;
            var tempObj = areas[j];
            areas[j] = areas[j + 1];
            areas[j + 1] = tempObj;
            flag = true;
        }
    }
    var result = [];
    result[0] = distances;
    result[1] = areas;
    return result;
}

function toDeg(value) {
    return 180 * value / Math.PI;
}

function toRad(value) {
    return value * Math.PI / 180;
}

var mapView;

var isPlaceChoosen = false;

var lastUserAnnotation = null;

var map = require("ti.map");

var address = {
    format: "",
    isFormat: false
};

var lat = -1;

var lon = -1;

exports.startGpsProvider = function() {
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.API.debug("geo: startGpsProvider ---- servizio di geolocalizzazione abilitato");
        getLocationForAndroid();
    } else {
        Ti.API.debug("geo: startGpsProvider ---- servizio di geolocalizzazione da abilitare!");
        alert("Abilitare il servizio di localizzazione");
    }
};

exports.setMapView = function(pMapView) {
    mapView = pMapView;
};

exports.getMapView = function() {
    return pMapView;
};

exports.getDirection = function() {
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (void 0 == e.error) {
            ({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude
            });
        }
    });
};

exports.getCurrentPosition = function(callback) {
    Titanium.Geolocation.getCurrentPosition(function(e) {
        callback(e.coords);
    });
};

var latCittaSelezionata = -1;

var lonCittaSelezionata = -1;

exports.clearAnnotations = function() {
    latCittaSelezionata = -1;
    lonCittaSelezionata = -1;
    Ti.API.info("geo: clearAnnotations " + JSON.stringify(lastUserAnnotation));
    if (null !== lastUserAnnotation) {
        mapView.removeAnnotation(lastUserAnnotation);
        Ti.API.info("geo: clearAnnotations resettata");
    }
};

exports.showUserAnnotations = function() {
    if (-1 != latCittaSelezionata && -1 != lonCittaSelezionata) {
        Ti.API.info("geo: showUserAnnotations resettata anche eventuale selezione utente e aggiunta quella selezionata " + JSON.stringify(lastUserAnnotation));
        mapView.removeAnnotation(lastUserAnnotation);
        mapView.addAnnotation(lastUserAnnotation);
    }
};

exports.removeAllAnnotations = function() {
    Ti.API.info("geo: removeAllAnnotations resettata annotazioni ");
    mapView.removeAllAnnotations();
};

exports.showAnnotation = function(locationInfo, imagePath, user) {
    var address;
    address = map.createAnnotation("" !== imagePath ? {
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
        title: locationInfo.formatted_address,
        image: imagePath,
        animate: true
    } : {
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
        title: locationInfo.formatted_address,
        pincolor: map.ANNOTATION_RED,
        animate: true
    });
    if ("YES" == user) {
        null !== lastUserAnnotation && mapView.removeAnnotation(lastUserAnnotation);
        lastUserAnnotation = address;
        Ti.API.info("geo: showAnnotation, aggiunta annotation per ricerca utente -> " + address);
        latCittaSelezionata = locationInfo.latitude;
        lonCittaSelezionata = locationInfo.longitude;
        Ti.API.debug("geo: showAnnotation LAT latCittaSelezionata-> " + latCittaSelezionata);
        Ti.API.debug("geo: showAnnotation LON lonCittaSelezionata-> " + lonCittaSelezionata);
    } else {
        address._areaId = locationInfo.parkingAreaId;
        Ti.API.debug("geo: showAnnotation aggiunta annotation per area sosta -> " + address + " address._areaId " + address._areaId);
    }
    mapView.addAnnotation(address);
};

exports.getArrayAreeOrdinatePerDistanza = function(response) {
    var result = [];
    try {
        Ti.API.info("geo: getArrayAreeOrdinatePerDistanza ---- VALUTA DISTANZE area -> ");
        var longitude = -1;
        var latitude = -1;
        Ti.API.info("geo: getArrayAreeOrdinatePerDistanza ---- Ti.Platform.model -> " + Ti.Platform.model);
        if ("Simulator" == Ti.Platform.model) {
            Ti.API.info("geo: getArrayAreeOrdinatePerDistanza ---- e' una simulazione");
            if (-1 != latCittaSelezionata) {
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza ---- ma ho le coordinate della citta selezionata quindi posso calcolare le distanze");
                latitude = latCittaSelezionata;
                longitude = lonCittaSelezionata;
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LAT posizione citta selezionata-> " + latitude);
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LON posizione citta selezionata-> " + longitude);
            } else {
                longitude = -1;
                latitude = -1;
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LAT pos corrente simulato per ios-> " + latitude);
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LON pos corrente simulato per ios-> " + longitude);
            }
            result = ordina(latitude, longitude, response);
        } else {
            if (-1 !== latCittaSelezionata) {
                latitude = latCittaSelezionata;
                longitude = lonCittaSelezionata;
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LAT posizione citta selezionata-> " + latitude);
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LON posizione citta selezionata-> " + longitude);
            } else {
                latitude = lat;
                longitude = lon;
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LAT posizione corrente -> " + latitude);
                Ti.API.debug("geo: getArrayAreeOrdinatePerDistanza LON posizione corrente -> " + longitude);
            }
            result = ordina(latitude, longitude, response);
        }
    } catch (excv) {
        Ti.API.error("geo: getArrayAreeOrdinatePerDistanza exc " + excv);
        latitude = -1;
        longitude = -1;
        result = ordina(latitude, longitude, response);
    }
    return result;
};