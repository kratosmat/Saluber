var args = arguments[0] || {};

var moment = require('moment');

init();
function init() {
	$.vCalendar.init();
//  	$.index.open();
}

function calendarChange(e) {
  	if (e.type == 'month') {
  		$.lMonth.text = e.date.format("MM-YYYY");
  		
  		Ti.API.info("calendarChange " + e.date.format("MM-YYYY"));
  		
  		$.btnPrev.title = moment(e.date).subtract(1, 'months').format("MMM");
  		$.btnNext.title = moment(e.date).add(1, 'months').format("MMM");
  	} else if (e.type == 'selected') {
  		//alert('Select ' + e.date.format("DD-MM-YYYY"));
  		selectedChange(e);
  	}
}

var selectedDate = null;
var selectedViewDate = null;

function selectedChange(e) {
	var date = e.date,
		view = e.view;
	
	if(selectedDate!=null && (!(date>selectedDate) && !(date<selectedDate))) {
		Ti.API.info("Selezionata la stessa data: " + selectedDate);
		return;
	}
	
	if(selectedDate!=null && selectedDate!=date) {
		Ti.API.info("cancelliamo la selezione precedente");
		$.removeClass(selectedViewDate, 'imc-calendar-date-selected');
		$.removeClass(selectedViewDate.children[0], 'imc-calendar-date-selected-label');
		selectedDate = null;
		selectedViewDate = null;		
	}
	selectedDate = date;
	selectedViewDate = view;
	
	$.addClass(selectedViewDate, 'imc-calendar-date-selected');
	$.addClass(selectedViewDate.children[0], 'imc-calendar-date-selected-label');

	createHoursTable();
	
	Ti.API.info("selectedDate: " + selectedDate);	
}

function prevMonth(e) {
  	$.vCalendar.previous();
  	Ti.API.info("prevMonth");
}

function nextMonth(e) {
  	$.vCalendar.next();
  	Ti.API.info("nextMonth");
}

// Advanced 

function getDate(e) {
  	this.title = 'Get month - ' + $.vCalendar.get().format("DD-MM-YYYY");
}

function setDate(e) {
  	$.vCalendar.set( new Date(1986, 1, 20, 0, 0, 0, 0) );
}

function customStyle() {
	$.vCalendar.unload();
	
	$.vCalendar.init({
		dateFormatter: dateFormatter,
		weekFormatter: weekFormatter
	});
};

function weekFormatter(params) {
  	var vDate = $.UI.create('View', { classes: 'calendar-week calendar-week-' + params.column });
		vDate.add( $.UI.create('Label', { text: params.weekText, classes: 'calendar-week-label calendar-week-label-' + params.column }) );
	return vDate;
}
function dateFormatter(params) {
  	var  viewClasses = ['calendar-date'],
		labelClasses = ['calendar-date-label'];
	
	if (params.isThisMonth) {
		if (params.isToday) {
			viewClasses.push('calendar-today');
  			labelClasses.push('calendar-today-label');
		}
	} else {
	 	viewClasses.push('calendar-disabled');
		labelClasses.push('calendar-disabled-label');
	}
	
	viewClasses.push('calendar-date-' + params.column);
	labelClasses.push('calendar-date-label-' + params.column);
	
	var vDate = $.UI.create('View', { date: params.dateId, classes: viewClasses.join(' ') });
   		vDate.add( $.UI.create('Label', { text: params.dateText, classes: labelClasses.join(' ') }) );
		
		if (params.dateText == 14) {
			var vEvents = $.UI.create('View', { classes: 'calendar-events' });
			vEvents.add( $.UI.create('View', { classes: 'calendar-event calendar-event-yellow' }) );
			vEvents.add( $.UI.create('View', { classes: 'calendar-event calendar-event-blue' }) );
			vEvents.add( $.UI.create('View', { classes: 'calendar-event calendar-event-red' }) );
			vDate.add(vEvents);
		}
		
	return vDate;
}

$.hoursTable.addEventListener("longpress", function(e) {	
	
	Ti.API.info("hoursTable: e "+JSON.stringify(e));
	if(typeof(e.row.selected)!=undefined && (e.row.selected==true)) {
		e.row.selected = false;
		$.removeClass(e.row, 'rowHourSelectedClass');
		$.addClass(e.row, 'rowHourUnselectedClass');
	}
	else {
		e.row.selected = true;
		$.addClass(e.row, 'rowHourSelectedClass');
		$.removeClass(e.row, 'rowHourUnselectedClass');
	}
	Ti.API.info("hoursTable: e "+JSON.stringify(e));	
});

var hours = ["8.00", "8.30", "9.00", "10.00", "10.30", "11.00", "11.30", "12.00"]; 

function createHoursTable() {
	
	var hourRows = [];
	_.each(hours, function(hour) {
		var time_hour = hour.split(".")[0];
		var time_minute = hour.split(".")[1];
		
		Ti.API.debug(time_hour + ", " + time_minute);
		var startTime = moment().hours(time_hour).minutes(time_minute);
		
		var hourView = Ti.UI.createView({
			layout: 'horizontal'
		});
		var startLbl = Ti.UI.createLabel({
			text: startTime.hours() + ":" + startTime.minutes(),
			left: 10,
			top: 5,
			width: '50',
			//borderColor: "purple"
		});
		startTime.add(30, 'minutes');
		var endLbl = Ti.UI.createLabel({
			text: startTime.hours() + ":" + startTime.minutes(),
			width: '50',
			top: 5,
			//borderColor: "purple"
		});
		var statusLbl = Ti.UI.createView({
			borderColor: "purple",
			width: Ti.UI.FILL
		});
		
		hourView.add(startLbl);
		hourView.add(endLbl);
		hourView.add(statusLbl);
		
		//Ti.API.info(JSON.stringify(hourView));
		var hourRow = Ti.UI.createTableViewRow({
			height: 50,
			backgroundColor: 'white',
			id: hour,
		});
		
		
		hourRow.add(hourView);
		
		hourRows.push(hourRow);
		Ti.API.info(JSON.stringify(hourRow));
	});
	$.hoursTable.setData(hourRows); 

}
