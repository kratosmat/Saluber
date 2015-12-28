var args = arguments[0] || {};

function indietroWindow(e) {
	//FIXME: questo su android non funziona
	if(OS_IOS) $.tab.close();
}

function next(e) {
	//FIXME: questo su android non funziona
	if($.listView.getSelectedStation()==null && $.mapView.getSelectedStation()==null) {
		alert(L('SELECT_A_STATION'));
	}
	else {
		if($.listView.getSelectedStation()!=null) {
			$.trigger('selectedStation', {
				selectedStation: $.listView.getSelectedStation()
			});
		}
		if($.mapView.getSelectedStation()!=null) {
			$.trigger('selectedStation', {
				selectedStation: $.mapView.getSelectedStation()
			});
		}
		if(OS_IOS) $.tab.close();
	}
}