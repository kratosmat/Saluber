
var args = arguments[0] || {};
var WTools = require('WidgetTools');

var IconicFont = require(WPATH('IconicFont')),
	fontawesome = new IconicFont({
		font: WPATH('FontAwesome')
	});

function initUI(){

	WTools.setTiProps(args, $.iconLbl);
	
	$.init(args);

	WTools.cleanArgs(args);
}

//returns the whole map of charcodes
$.getCharMap = function(){
	return fontawesome.font.charcode || {};
};

$.setIcon = function(codename){
	$.iconLbl.text = fontawesome.icon(codename);	
};

$.setIconColor = function(color) {
	$.iconLbl.color = color;
};

$.init = function(argsInit){

	$.iconLbl.font = {
		fontSize: args.size || 24,
		fontFamily: fontawesome.fontfamily
	};

	if(argsInit.iconColor) $.setIconColor(args.iconColor);
	
	if(argsInit.icon) {
		$.iconLbl.text = fontawesome.icon(args.icon);
	}
};
exports.hide = function (){
	$.iconLbl.hide();
};

initUI();