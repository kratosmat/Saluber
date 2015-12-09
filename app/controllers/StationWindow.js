var args = arguments[0] || {};

function indietroWindow(e) {
	//FIXME: questo su android non funziona
	if($.listView!=null) {
		$.trigger('selectedStation', {
			selectedStation: $.listView.getSelectedStation()
		});
	}
	if(OS_IOS) $.tab.close();
}