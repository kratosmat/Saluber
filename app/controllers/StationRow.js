var args = arguments[0] || {};
var station = args._station;

Ti.API.debug("row details: " + JSON.stringify(station));

$.firstRow.text = "Nome: " + station.name;
$.secondRow.text = "Indirizzo: " + station.completeAddress;
$.thirdRow.text = "N.Room: " + station.nroom;
$.StationRow.selected = false;
$.StationRow._info = station;

var filter = station.name + ", " + station.completeAddress;

if(OS_IOS) $.StationRow.filter = filter;
else if(OS_ANDROID) $.StationRow.title = filter;

/*
addIcons();

function addIcons() {
	Ti.API.debug("addIcons booking.bookingState: " + booking.bookingState);
	var state = Alloy.createWidget("ti.ux.iconvalue", {
		icon : UTILS.getStateIcon(booking.bookingState),
		color : "blue"
	});
	$.iconsView.add(state.getView());
	
	if(booking.bookingType=="3") {
		var emergencyState = Alloy.createWidget("ti.ux.iconvalue", {
			icon : "fa-exclamation-triangle",
			color : "red"
		});
		$.iconsView.add(emergencyState.getView());
	}
}
*/

