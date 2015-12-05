function cancel(e) {
	Titanium.API.log('cancel: ' + $.buttonCancelId.numero);
	// Ti.App.Properties.setString('new-check', $.buttonCancelId.numero);
	openItem($.buttonConfirmId.controller);
}

function confirm(e) {
	Titanium.API.log('confirm: ' + $.buttonConfirmId.numero);
	// Ti.App.Properties.setString('new-check', $.buttonConfirmId.numero);
	openItem($.buttonConfirmId.controller);
}

function openItem(pag){
	
	var newWin = Alloy.createController(pag).getView();
	
	if(OS_IOS && newWin){
		Alloy.Globals.navWindow.openWindow(newWin);
	}
	
	if(OS_ANDROID && newWin){
		newWin.open();
	}
	
}
