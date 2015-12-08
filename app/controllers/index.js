var REST = require("rest");
var oauth = require("oauth");
var rows = [];
var countRow = 0;
var lastRowTouch = -1;

// $.tick.visible = !($.password.passwordMask);

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

function closeWindow(){
    if (OS_IOS) {
       $.index.close();
    } else {
       $.index.close();
    }    
}

$.user.setValue(Ti.App.Properties.getString('username'));
$.password.setValue(Ti.App.Properties.getString('password'));

function login() {
        
    username = $.user.getValue();
    password = $.password.getValue();
    
	Ti.API.info("username: " + username);
	Ti.API.info("password: " + password);
	
	
    oauth.getOAuth(function(response) {
    	Ti.App.Properties.setString('username', username);
    	Ti.App.Properties.setString('password', password);
        Ti.API.info("widget: login - autorizzato. recupera ruolo");
        
        REST.getListBookings(function(results) {
			_.each(results, function(result) {
				Ti.API.info(JSON.stringify(result));
			});
			REST.getListDoctors(function(results) {
				_.each(results, function(result) {
					Ti.API.info(JSON.stringify(result));
				});	
			});			
			REST.getListPatients(function(results) {
				_.each(results, function(result) {
					Ti.API.info(JSON.stringify(result));
				});	
			});
			REST.getListHospitals(function(results) {
				_.each(results, function(result) {
					Ti.API.info(JSON.stringify(result));
				});	
			});
			REST.getListMedicalTests(function(results) {
				_.each(results, function(result) {
					Ti.API.info(JSON.stringify(result));
				});
			});
			REST.getListSpecializations(function(results) {
				_.each(results, function(result) {
					Ti.API.info(JSON.stringify(result));
				});
			});		
	   	});
        
        var homeCtrl = Alloy.createController('home');
   	}, username, password, false);
};

function changeSwitchStatus(e) {
	setTimeout(function()
		{
		   // $.password.passwordMask = !(e.value) + '';
		   $.password.setPasswordMask(!e.value);
		},200);		
}