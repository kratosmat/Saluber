function cancel(e) {
	openItem($.buttonConfirmId.controller);
}

function confirm(e) {
	openItem($.buttonConfirmId.controller);
}

function openItem(pag){
	
	// var view = Alloy.createController(pag).getView();
	var homeCtrl = Alloy.createController(pag).getView();

	
}
