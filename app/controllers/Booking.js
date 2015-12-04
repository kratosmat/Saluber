var args = arguments[0] || {};

var REST = require("rest");

REST.getListBookings(function(listBookings) {
	_.each(listBookings, function(booking) {
		Ti.API.info(JSON.stringify(booking));
	});
});