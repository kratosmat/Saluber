/*
 * Matteo require ACS
 */
//var acs = require("acs");
//var oauth = require("oauth");
var rows = [];
var countRow = 0;
var lastRowTouch = -1;
//var selectedVeicle="";

//acs.enablePushNotifications(showToDo);

$.tick.visible = !($.password.passwordMask);

var style;
if (OS_IOS){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.BIG_DARK;
}

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'grey',
  style : style,
  top:20,
  left:20,
  height:Ti.UI.SIZE,
  width:Ti.UI.SIZE
});

$.index.add(activityIndicator);

$.index.open();

function changeStatus(e){
	$.password.passwordMask = $.tick.visible;
	$.tick.visible = !($.tick.visible);
	$.password.setSelection($.password.value.length,$.password.value.length);
	Ti.API.info(JSON.stringify(e.source));
}

function closeWindow(){
    if (OS_IOS) {
       $.index.close();
    } else {
       $.index.close();
    }    
}

function emptyTextFieldUser(e) {
    $.user.value = "";
}

function emptyTextFieldPassword(e) {
    $.password.value = "";
}

function emptyTextFieldVehicle(e) {
    $.vehicleName.value = "";
}

$.user.value = Ti.App.Properties.getString('username');
$.password.value = Ti.App.Properties.getString('password');

function login() {
    //activityIndicator.show();
    
    username = $.user.value;
    password = $.password.value;
    
	var savedUsername = Ti.App.Properties.getString('username');
    var savedPassword = Ti.App.Properties.getString('password');
    
    Ti.API.info(username + " -> " + savedUsername);
    Ti.API.info(password + " -> " + savedPassword);
    /*
    if(savedUsername!=null && savedUsername.length>0 && savedPassword!=null && savedPassword.length>0) {
		if(username!=savedUsername || password!=savedPassword) {
			forceDBClean = true;
	    }    	
    }
    */
	Ti.App.Properties.setString('username', username);
	Ti.App.Properties.setString('password', password);
    
    /*
    oauth.getOAuth(function(response){
            Ti.API.debug("widget: login - autorizzato. recupera ruolo");
            
            var token = response.access_token;
            
            Ti.App.Properties.setString('access_token', token);
            
            var callbackRole=function(roleRicevuto){
                Ti.API.debug("widget: login - il ruolo e' "+roleRicevuto+". Creazione della main window");
                if (roleRicevuto!=='ROLE_ADM00' && roleRicevuto!=='ROLE_AAO03' 
                    && roleRicevuto!=='ROLE_GBS02' && roleRicevuto!=='ROLE_ADA01'){
                        alert ('Attenzione il tuo ruolo non è Gestito\r\n contatta l amministratore');
                        activityIndicator.hide();
                } 
                else {
                    oauth.setUserRole(roleRicevuto);
                    Ti.App.Properties.setString('role', roleRicevuto);
                
                    //Solo per ABS
                    var homeCtrl = Alloy.createController('home', [forceDBClean]);
                    
                    activityIndicator.hide();
                }
            };
            oauth.getRuolo(token,callbackRole);  
    },username,password,false);
    */
   
   var homeCtrl = Alloy.createController('home');
   activityIndicator.hide();
};