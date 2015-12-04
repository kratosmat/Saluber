var args = arguments[0] || {};

var menus = [];

//var row1 = createMenuRow('row1', 'rowSkull', 'Mappa');

menus.push(createMenuRow('row1', 'rowSkull', 'ListBookings'));
menus.push(createMenuRow('row2', 'rowGear', 'Booking'));
menus.push(createMenuRow('row3', 'rowGear', 'UserProfile'));
menus.push(createMenuRow('row4', 'rowGear', 'Calendar'));

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
