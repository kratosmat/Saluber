var args = arguments[0] || {};
var REST = require("rest");

Ti.API.info(JSON.stringify($.mainWin));

$.specializaton.parent = $.mainWin;

var stalloSelezionato;
var nSpecialization = [];
REST.getListSpecializations(function(results) {
	_.each(results, function(result) {
    	var nSpec = { 
    		id: result.id,
    		value: result.name
    	};		
    	nSpecialization.push(nSpec);
	});
});	

$.specializaton.selectedValues = ((stalloSelezionato == null) ? [null] : [stalloSelezionato.cTipStl]);
$.specializaton.pickerValues = nSpecialization;

$.newCheckTableId.addEventListener("click", function(e) {
	Ti.API.info(JSON.stringify(e));
	if(e.row.data!=null) {
		Ti.API.info(JSON.stringify(e.row.data));
		if(e.row.data.id=='doctor') {
			var wListDoctors = Alloy.createController("WindowListDoctors");
			wListDoctors.getView().open();
		}
		if(e.row.data.id=='location') {
			var stationWindow = Alloy.createController("StationWindow");
			stationWindow.getView().open();
		}
		if(e.row.data.id=='date') {
			
		}
	}
});


function indietroWindow(){
	if (OS_IOS){
		$.nav.close();
	}
}