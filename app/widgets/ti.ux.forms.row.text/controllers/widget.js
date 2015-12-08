var args = arguments[0];
var Scope = require(WPATH('Scope'));
var Animations = require('alloy/animation');

var CUSTOM_PROPS = [
	"title",
	"hintText",
	"value",	//true|false
];

$.id = args.id || 'none_id'; //not sure how to manage if id is not specified

// valori di default sull'obfocus e onblue
// si possono cambiare mettendo sul widget l'attributo colorOnBlue e/o colorOnFocus
var rowTextOnBlueColor = "#CACAFF";
var rowTextOnFocusColor = "#79FFBC";

initUI();

function initUI(){
	var appoColor = args.colorOnBlue;
	if (appoColor != undefined) {
		rowTextOnBlueColor = appoColor;
	}
	
	appoColor = args.colorOnFocus;
	if (appoColor != undefined) {
		rowTextOnFocusColor = appoColor;
	}
	$.field.backgroundColor = rowTextOnBlueColor;	
	
	if (args.borderColor) {
		$.field.borderColor=args.borderColor;
	}
	if (args.borderWidth) {
		$.field.borderWidth=args.borderWidth;
	}
	if (args.height) {
		$.row.height=args.height;
	}
	if (args.passwordMask) {
		$.field.passwordMask=args.passwordMask;
	}
	
	//not icon? move the title to the left
	if(!args.icon){
		$.titleLbl.left = $.icon.getView().left;
	}else{
		$.icon.setIcon(args.icon);
		if(args.iconColor) $.icon.getView().color = args.iconColor;
	}
	
	$.titleLbl.text = args.title || '';
	$.field.hintText = args.hintText || '';
	$.field.value = args.value || '';
	$.alertIcon.getView().opacity = 0;
	
	Scope.setupField({params:args, control:$.field});
}

function showValidationError(){
	var icon = $.alertIcon.getView();
	if (OS_ANDROID){
		Ti.API.debug("icona validazione");
		icon.opacity = 0.90;
		icon.show();
	}else{
		Animations.fadeIn(icon);
		Animations.shake($.field, 200);
	}
}

function hideValidationError(){
	var icon = $.alertIcon.getView();
	if (OS_ANDROID){
		icon.opacity = 0;
		icon.hide();
	}else{
		Animations.fadeOut(icon);
	}

}

function focus(e){
	$.field.focus();
}

function validate(e){
	$.validate();
}

//Public methods. These methods should exist in every ti.ux.forms component

$.validate = function(callback){
		
	hideValidationError();
	
	if($.field.validate.useCallback){
		$.actInd.show();
		$.field.validate($.field.value, function(e){
			if(callback)callback(e);
			if(!e){
				showValidationError();
			}
			$.actInd.hide();
		});
	}else{
		var isValid = $.field.validate($.field.value);
		Ti.API.info('isValid: ' + isValid);
		if(callback)callback(isValid);	
		if(!isValid) showValidationError();
	}
};


$.focus = focus;

$.blur = function(e){
	$.field.blur();
};


$.getField = function(){
	return $.field;
};

$.getValue = function(){
	return $.field.value;
};

$.setValue = function(value){
	$.field.value = value;
};

$.setPasswordMask = function(isValue){
	$.field.passwordMask = isValue;
};

require('WidgetTools').cleanArgs(args);

function onBlurBackColor(e) {
	$.field.backgroundColor = rowTextOnBlueColor;
}

function onFocusBackColor(e) {
	$.field.backgroundColor = rowTextOnFocusColor;
}
