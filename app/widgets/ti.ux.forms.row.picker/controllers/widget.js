var args = arguments[0];

var TYPE_OPTION_DIALOG = 'dialog',
	TYPE_POPUP = 'popup',
	TYPE_MODALWINDOW = 'modalwindow';

var CUSTOM_PROPS = [
	"title",
	"hintText",	
	"options",	//Values to show by the picker. An array of values or a string containing several values separated by '|' char
	"type",		//What kind of picker opens: optiondialog, popup, modalwindow
	"value",	//Selected value, as index of the options array. Use -1 to not show any value by default (hintText will be shown instead)
];

$.id = args.id || 'optionPicker';

initUI();
initValues();


function initValues(){
	//var allValues = prepareValues(args.options);
	if(typeof $.value == 'undefined' || $.value == null) {
		var value = args.value;
		if(typeof value !== 'undefined' && value !== -1 && value !== "-1") {
			value = parseInt(value);		
			$.value = value;
		}
	}
}

function initUI(){
	//not icon? move the title to the left
	if(!args.icon){
		$.titleLbl.left = $.icon.getView().left;
	}
	else{
		$.icon.setIcon(args.icon);
		if(args.iconColor) $.icon.getView().color = args.iconColor;
	}
	$.titleLbl.text = args.title || '';
}


function openPicker(e) {
	switch(args.pickerType) {
		case 'date-time-picker':
			Alloy.createWidget('it.fusedcloud.pickerWidget', {
			  id: args.id,
			  outerView: $.parent,
			  hideNavBar: false,
			  type: args.pickerType,
			  pickerParams: {
			    value: (($.value ==null) ? Date() : $.value),
			  },
			  onDone: optionDateSelected
			});
			break;
		case 'single-column':
			Alloy.createWidget('it.fusedcloud.pickerWidget', {
			  id: args.id,
			  outerView: $.parent,
			  hideNavBar: false,
			  type: 'single-column',
			  selectedValues: (($.value == null) ? [null] : [$.value]),
			  pickerValues: $.pickerValues,
			  onDone: optionSelected
  			});
			break;
	}
	
}

function optionDateSelected(e){
	if (e.cancel === true) {
		Ti.API.info('Entry was cancelled');
     	return;
  	}
  	
  	$.value = new Date(e.data.unixMilliseconds);
  	$.subtitleLbl.text = formatDateAsString($.value);
  	
  	$.trigger('change', { value: $.value});
}

function optionSelected(e) {	
  	 if (e.cancel === true) {
    	Ti.API.info('Entry was cancelled');
     	return;
  	}
  	$.subtitleLbl.text = e.data[0].value;
  	$.value = e.data[0].key;
	$.extra = e.data[0].extra;
	
	$.trigger('change', { key: e.data[0].key, value: e.data[0].value, extra: e.data[0].extra});
}

$.getOptions = function(){
	return $.OPTIONS || [];
};

$.getValue = function(){
	return $.value;
};

$.getExtra = function(){
	return $.extra;
};

$.setValue = function(value) {
	if(args.pickerType == 'date-time-picker') $.subtitleLbl.text = formatDateAsString(value);

	$.value = value;
};

$.setValueText = function(valueText) {
	$.subtitleLbl.text = valueText;
};

$.setExtra = function(extra){
	$.extra = extra;
};

require('WidgetTools').cleanArgs(args);


function formatDateAsString(dateToFormat, adjust){
	if (typeof(adjust)==='undefined') adjust = true;
	var formattedDate = pad(dateToFormat.getDate()+"") + "/";
	formattedDate = formattedDate + ((adjust == true) ? pad((dateToFormat.getMonth()+1)+"") : pad(dateToFormat.getMonth()+"") );
	formattedDate = formattedDate + "/"+dateToFormat.getFullYear()  +" "+pad(dateToFormat.getHours() +"")+":"+pad(dateToFormat.getMinutes() +"");
	return formattedDate;
}

function pad(str){
  str = str.toString();
  return str.length < 2 ? "0" + str: str;
};







