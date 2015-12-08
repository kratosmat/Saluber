var args = arguments[0] || {};

var doctorDetail = Alloy.createController("DoctorDetail", {
	args : args,
});
/*
dettaglioArea.on('close', function() {
	Ti.API.info("closing windowDettaglioPrenotazione");
	if(OS_IOS) $.navWin.close();
	else $.mainWin.close();
});
*/
$.mainWin.add(doctorDetail.getView());


function doOpen(e){
	var actionBar = e.source.activity.actionBar;
	actionBar.title = L("BACK");
	if (actionBar) {
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function() {
			e.source.close();
		};
		e.source.activity.invalidateOptionsMenu();
	}	
}

function indietroWindow(e){
	$.navWin.close();
}
