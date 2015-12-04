var args = arguments[0];


var CUSTOM_PROPS = [
	"title",
	"value",	//true|false
];

$.id = args.id || 'switch';

initUI();
initValues();

function initUI(){

	//not icon? move the title to the left
	if(!args.icon){
		$.titleLbl.left = $.icon.getView().left;
	}else{
		$.icon.setIcon(args.icon);
		if(args.iconColor) $.icon.getView().color = args.iconColor;
	}
	
	$.titleLbl.text = args.title || '';
	
}

exports.addEventListener = function(name, cb) { return $.switchControl.addEventListener(name, cb); };
exports.removeEventListener = function(name, cb) { return $.switchControl.removeEventListener(name, cb); };
exports._hasListenersForEventType = function(name, flag) {
    return $.switchControl._hasListenersForEventType(name, flag);
};

function initValues(){
	
	var value = args.value === "true" || args.value == true;
	Ti.API.debug('value: ' + value);
	$.switchControl.value = value;
	$.value = value;
	$.switchControl.extra = args.extra;
}

$.getValue = function(){
	return $.switchControl.value;
};

$.setValue = function(value){
	$.switchControl.value = value;
	$.value = value;
};

$.getExtraData = function() {
	return $.switchControl.extra;
};

require('WidgetTools').cleanArgs(args);








