//Lista delle vie che si possono scegliere dopo aver inserito l'indirizzo nell'apposito textfield ctrl+shift+v per il file xml e ctrl+shift+s per il file tss
var args = arguments[0] || {};
var gps = require("geo");
var httpRequest = Ti.Network.createHTTPClient();

$.address.isShow = false;
httpRequest._isRequest = false;
Ti.API.info("address:  -> " + httpRequest._isRequest);

$.addressList.addEventListener("click", function(e) {
	var _locationInfo = e.row._info;
	Ti.API.info("address: click-> " + JSON.stringify(_locationInfo));
	//args.callback(e.row._info);
	$.addressList.setData([]);
	isShow(false);
	$.trigger('select', {locationInfo : _locationInfo});
	
	//gps.showUserAnnotations();
});

// PRIVATE FUNCTION
function isShow(pShow){
	$.address.isShow = pShow;	
};

var getPlaces = function(address) {
	try{
		//Ti.API.info("address: getPlaces -> " + httpRequest.isRequest);		
		if(httpRequest._isRequest === true){
			httpRequest._isRequest = false;
			httpRequest.abort();
		}
		//La stringa che verrà utilizzata per la query
		var request = "https://maps.googleapis.com/maps/api/geocode/json?components=country:IT&language=it&sensor=false&region=it&address=";
	
		//Prende la variabile dal TextField
		//var address = $.address.getValue();
		if (address !== undefined) {
			request += address/*.split(' ').join('+')*/ + "&key=AIzaSyBiL6gL3eGp6KaHlMF3N1A1za5CmjiRZaA";//??
		
			httpRequest.open("GET", request);
			httpRequest.send(null);
			httpRequest._isRequest = true;
			httpRequest.onload = function() {
	          try{ 
				var response = JSON.parse(this.responseText);
				Ti.API.info("geocoding response: " + response.status + " -> " + JSON.stringify(response));
				var result = response.results;
				//alert(response.status);
				if (response.status === "OK") {
					//Verifico se l'indirizzo è stato ababstanza esaustivo (Non ci sono altre città con quell'indirizzo) poi aggiungo l'utente
					if (result.length > 0) {
						var places = [];

						for (var i = 0; i < response.results.length; i++) {
							var singleResult = result[i];
							var row = Ti.UI.createTableViewRow({
								backgroundSelectedColor : 'white',
								rowIndex : i, // custom property, useful for determining the row during events
								height : 50,
								_info : singleResult
							});
	
							singleResult.typeOfChoice = "address";
	                        
 	                        row.add(Ti.UI.createLabel({
								height : Ti.UI.FILL,
								font : {
									fontFamily : 'Arial',
									fontWeight : 'bold'
								},
								color : "#000",
								text : singleResult.formatted_address,
								left : 5,
								right : 42,
							}));
	                        
	                       
							row.add(Ti.UI.createImageView({
								image : "right_arrow.png",
								right : 5,
								width : 32,
								height : 32
							}));
							places[i] = row;
						}
	
						$.addressList.data = places;

					} 
					else {
						//return response.results[0];
					}
				} 
				else {
					//alert("Attenzione, non è stato inserito un indirizzo valido");
				}
			}
			catch(excv){
		        Ti.API.info("address: errore durante il cricamento degli indirizzi nel for -> " + excv);
				
			}
		  };
		}
	}
	catch(exc){
		Ti.API.debug("errore durante il cricamento degli indirizzi -> " + exc);
	
	}
};
//END PRIVATE FUNCTION


//PUBLIC FUNCTION

//Effettua una ricerca ogni volta che il testo cambia all'interno del main
exports.fillList=function(value){
	
	if(value.length > 0){
		if($.address.isShow === false){
			isShow(true);
		}		
		getPlaces(value);		 
	}else{
		isShow(false);
	}
};

//Restituisce true se la view è mostrata nel main, false altrimenti
exports.isShow = function(){
	return $.address.isShow;
};
//END PUBLIC FUNCTION
