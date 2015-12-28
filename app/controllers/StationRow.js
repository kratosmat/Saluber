var args = arguments[0] || {};
var station = args._station;

Ti.API.debug("row details: " + JSON.stringify(station));

$.firstRow.text = "Name:	" + station.name;
$.secondRow.text = "Address:	" + station.completeAddress;
$.thirdRow.text = "N.Room:	" + station.nroom;
$.StationRow.selected = false;
$.StationRow._info = station;

var filter = station.name + ", " + station.completeAddress;

if(OS_IOS) $.StationRow.filter = filter;
else if(OS_ANDROID) $.StationRow.title = filter;

var currFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "images/station-" + station.id + ".jpg");
$.iconImgRowId.setImage(currFile);

