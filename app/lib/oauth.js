
var usernameCRUD="";
var passwordCRUD="";
var userRole="";

var token="-1";//se non vuoi usare la login perchè stai usando il 193.221...
token="";

var role=-1;//se non puoi usare il servizio che restituisce il ruolo, inserisci qui il ruolo 
role=0; //decommenta se vuoi invocare il servizio rest che ti restituisce il ruolo

var tokenValidity=-1;//-1 PER ORA NON USATO. LASCIA COSI. solo se non vuoi attivare il refreshautomatico del token prima della scadenza altrimento 2000
var refreshToken="";


var isFirstTime=true;

exports.getOAuth = function(callback, username, password, isRefresh) {
    if(Titanium.Network.online) {
        usernameCRUD=username;
        passwordCRUD=password;
        Ti.API.info("crud - getOAuth password= "+password);
        Ti.API.info("crud - getOAuth username= "+username);
        //password = Titanium.Utils.sha256(password);
        //Ti.API.debug("crud - getOAuth password cript sha= "+password);
            
    	var url = Alloy.CFG.base_url + Alloy.CFG.access_token_url + "&username=" + username + "&password=" + password;
        if (isRefresh){
            url= Alloy.CFG.base_url + Alloy.CFG.refresh_token_url + "&refresh_token=" + refreshToken;
            Ti.API.info("crud: getOAuth - new token refresh request "+url);
        } 
        else {
           Ti.API.info("crud: getOAuth - new token login request "+url);
        }
    
        var httpClient = Titanium.Network.createHTTPClient();
        
        httpClient.onload = function(e){
            Ti.API.debug("crud - getOAuth response= "+this.responseText);
    
            var response = JSON.parse(this.responseText);   
            Ti.API.info("crud - getOAuth JSON.stringify(response) "+JSON.stringify(response));
            Ti.API.info("crud - getOAuth response "+response);
    
            token = response.access_token;
            Ti.App.Properties.setString('access_token', token);
            refreshToken = response.refresh_token;
            Ti.App.Properties.setString('refresh_token', refreshToken);
            
            if (tokenValidity!==-1) tokenValidity=response.expires_in;
            
            Ti.API.info("crud - getOAuth token "+token);
            Ti.API.info("crud - getOAuth refreshToken "+refreshToken);
            Ti.API.info("crud - getOAuth tokenValidity "+tokenValidity);
            getUserinfo(function(role) {
            	Ti.API.info("crud - getOAuth role " + role);
            	callback(response);
            });  
        };
        
        httpClient.onerror = function(){
            try{
                Titanium.API.error("crud - getOAuth  error "+this.responseText);
                var error=JSON.parse(this.responseText);
                alert("Problemi durante la procedura di autenticazione.\r\n"+error.error_description);
            }
            catch(excv){
                Ti.API.debug("crud - getOAuth  error "+excv+" "+this.responseText);
                alert("Problemi durante la procedura di autenticazione.\r\n"+this.responseText);    
            }
        };
        
        httpClient.open("GET",url);
        httpClient.send(null);
    } 
    else {
       alert("Problemi durante la procedura di autenticazione.\r\nNon sei online"); 
    }

};

function getUserinfo(callback){
    
	var httpClient=Titanium.Network.createHTTPClient();
	
    httpClient.onload = function(e) {
    	var userinfo = JSON.parse(this.responseText);
        Ti.API.debug("crud: getUserInfo: " + this.responseText);  
        Ti.API.info("crud: getUserInfo: " + JSON.stringify(userinfo));       
        Ti.API.debug("crud: getUserInfo: " + JSON.stringify(e));  
        Ti.App.Properties.setString('role', userinfo.authorities[0].authority);
        Ti.App.Properties.setString('organization', userinfo.organization);
        callback(Ti.App.Properties.getString('role'));
    };
    
    httpClient.onerror = function(){
        Titanium.API.error("crud - getRole errore mentre stavo servendo la richiesta "+url);
        alert ('Errore nel recupero del ruolo utente '+url+"\r\n"+this.responseText);
    };

    var url = Alloy.CFG.base_url +  Alloy.CFG.userinfo_url + "?access_token=" + Ti.App.Properties.getString('access_token');
    
    Ti.API.info("crud: getRole - " + url);
    httpClient.open("GET",url);
    Ti.API.info("crud: getRole - invocata get");
    httpClient.send(null);
    return;
};

function startRefreshScheduler(){
	
}

exports.getUserRole = function(){
    return Ti.App.Properties.getString('role');
};