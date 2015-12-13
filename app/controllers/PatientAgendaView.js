var args = arguments[0] || {};

var doctor = args.doctor;
var station = args.station;

Ti.API.info("io sono qui" + JSON.stringify(args));

var REST = require("rest");
var moment = require('moment');

var currentMonth = null;

init();
function init() {
	//$.vCalendar.init();
//  	$.index.open();
	$.vCalendar.init({
		dateFormatter: dateFormatter,
		weekFormatter: weekFormatter
	});

}

//var daysAvailability = null;

function calendarChange(e) {
  	if (e.type == 'month') {
  		daysAvailability = [];
  		REST.getAvailability(e.date.year(), e.date.month()+1, doctor, station, function(month) {
  			if(typeof(month) != undefined && month!=null) {
  				Ti.API.info("calendarChange: " + JSON.stringify(month));
  				currentMonth = month;
  				$.hoursTable.setData([]);
  				
  				/*			
  				_.each(month.days, function(day) {
  					if(_.where(day.slots, {doctorAvailability: true, stationAvailability: true }).length>0) {
  						daysAvailability.push(true);
  					}
  					else daysAvailability.push(false);
  				});
  				*/
  			}
  			else {
  				alert("Per il mese non è disponibile un calendario di disponibilità");
  			}
	  		$.lMonth.text = e.date.format("MM-YYYY");
	  		$.btnPrev.title = moment(e.date).subtract(1, 'months').format("MMM");
  			$.btnNext.title = moment(e.date).add(1, 'months').format("MMM");
  			Ti.API.info("calendarChange " + e.date.format("MM-YYYY"));
		  	
  		});
  	} 
  	else if (e.type == 'selected') {
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

	createHoursTable(selectedDate.date());
	
	Ti.API.info("selectedDate: " + selectedDate.format());	
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
	Ti.API.info("dateFormatter: " + JSON.stringify(params));
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
	
	/*
	Ti.API.info(JSON.stringify(daysAvailability));
	
	if(daysAvailability[params.dateText-1]) viewClasses.push('calendar-date-available');
	else viewClasses.push('calendar-date-notavailable');
	*/
	var vDate = $.UI.create('View', { date: params.dateId, classes: viewClasses.join(' ') });
   	vDate.add( $.UI.create('Label', { text: params.dateText, classes: labelClasses.join(' ') }) );	
	
   	
	return vDate;
}

selectedSlot = null;
$.getSelectedSlot = function() {
	return {
		slotStationId: selectedSlot.stationId,
		slotDoctorId: selectedSlot.doctorId,
		date: selectedDate.format()
	};
};

$.hoursTable.addEventListener("click", function(e) {	
	if(!e.row._slot.stationAvailability || !e.row._slot.doctorAvailability) return;
	if(typeof(e.row.selected)!=undefined && (e.row.selected==true)) {
		e.row.selected = false;
		selectedSlot = null;
		e.row.backgroundColor = 'white';
	}
	else if(selectedSlot==null) {
		e.row.selected = true;
		selectedSlot = e.row._slot;
		e.row.backgroundColor = '#D3D3D3';
	}
	
	Ti.API.info("hoursTable: e "+JSON.stringify(e));	
});

function updateMonth(_slot, selected) {
	Ti.API.info("updateMonth: " + JSON.stringify(_slot));
	if(currentMonth != null) {
		_.each(currentMonth.days, function(day) {
			_.each(day.slots, function(slot) {
				if(slot.id == _slot.id) {
					slot.selected = selected;
					Ti.API.info("updateMonth: " + JSON.stringify(slot));
				}
				
			});
		});
	}
}

function createHoursTable(selectedDay) {
	Ti.API.info("createHoursTable: " + selectedDay);
	if(currentMonth != null) {
		_.each(currentMonth.days, function(day) {
			Ti.API.debug("createHoursTable: " + currentMonth.month + " " + day.number + " "+ selectedDay);
			if(day.number == selectedDay) {
				
				var hourRows = [];
				var orderedSlots = _.sortBy(day.slots, 'id');
				_.each(orderedSlots, function(slot) {
					
					Ti.API.debug("createHoursTable: " + slot.id);
					var hourView = Ti.UI.createView({
						layout: 'horizontal'
					});
					var select = Alloy.createWidget("ti.ux.iconlabel", {
						icon: "fa-check-circle",
						width: 50
					});
					var startLbl = Ti.UI.createLabel({
						text: slot.start,
						left: 10,
						top: 5,
						width: '50',
						//borderColor: "purple"
					});
					
					var endLbl = Ti.UI.createLabel({
						text: slot.end,
						width: '50',
						top: 5,
						//borderColor: "purple"
					});
					
					var stateDoctor = Alloy.createWidget("ti.ux.iconlabel", {
						icon: "fa-user-md",
						width: 50,
						color: (slot.doctorAvailability?'green' : 'red')
					});
					var stateStation = Alloy.createWidget("ti.ux.iconlabel", {
						icon: "fa-map-marker",
						width: 50,
						color: (slot.stationAvailability ? 'green' : 'red')
					});
					/*
					var statusLbl = Ti.UI.createView({
						borderColor: "purple",
						width: Ti.UI.FILL
					});
					*/
					hourView.add(select.getView());
					hourView.add(startLbl);
					hourView.add(endLbl);
					hourView.add(stateDoctor.getView());
					hourView.add(stateStation.getView());
					
					//Ti.API.info(JSON.stringify(hourView));
					var hourRow = Ti.UI.createTableViewRow({
						height: 30,
						backgroundColor: 'white',
						id: slot.id,
						_slot: slot,
						selected: slot.selected
					});
					
					/*
					if(slot.selected == true) {
						$.addClass(hourRow, 'rowHourSelectedClass');
					}
					*/
					
					hourRow.add(hourView);
					hourRows.push(hourRow);
				});
				
				$.hoursTable.setData(hourRows); 
			}
		});
	}
}
