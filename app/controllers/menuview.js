var args = arguments[0] || {};

var menus = [];

//var row1 = createMenuRow('row1', 'rowSkull', 'Mappa');

menus.push(createMenuRow('row1', 'rowSkull', 'ListBookings'));
menus.push(createMenuRow('row2', 'rowGear', 'Booking'));

/*
if(Ti.App.Properties.getString('role') != "ROLE_GBS02") {
	menus.push(createMenuRow('row3', 'rowGear', 'Lista Missioni Emergenza'));	
}
*/

menus.push(createMenuRow('row3', 'rowGear', 'UserProfile'));

Ti.API.info("menu row1: " + JSON.stringify(menus));

$.menuTable.data = menus;


function createMenuRow(rowId, rowClass, rowText) {
	var row = Ti.UI.createTableViewRow({
		id: rowId,
		height: '50dp'
	});
	var viewContainer = Ti.UI.createView({
		height: '30dp',
		layout:'horizontal'
	});
	var view = Ti.UI.createView({
		left: 5,
		top: 7,
		width: "20dp",
		height: "20dp"
	});
	var label = Ti.UI.createLabel({
		top: 7,
		left: 10,
		height: "20dp",
		font:{
			fontSize: "15dp"
		},
		color: "#000",
		text: rowText
	});
	viewContainer.add(view);
	viewContainer.add(label);
	row.add(viewContainer);
	
	return row;
}



//$.menuView.show();
