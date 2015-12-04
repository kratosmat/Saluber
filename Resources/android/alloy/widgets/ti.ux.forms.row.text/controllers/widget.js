function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.forms.row.text/" + s : s.substring(0, index) + "/ti.ux.forms.row.text/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function initUI() {
        if (args.icon) {
            $.icon.setIcon(args.icon);
            args.iconColor && ($.icon.getView().color = args.iconColor);
        } else $.titleLbl.left = $.icon.getView().left;
        $.titleLbl.text = args.title || "";
        $.field.hintText = args.hintText || "";
        $.field.value = args.value || "";
        $.alertIcon.getView().opacity = 0;
        Scope.setupField({
            params: args,
            control: $.field
        });
    }
    function showValidationError() {
        var icon = $.alertIcon.getView();
        Ti.API.debug("icona validazione");
        icon.opacity = .9;
        icon.show();
    }
    function hideValidationError() {
        var icon = $.alertIcon.getView();
        icon.opacity = 0;
        icon.hide();
    }
    function focus() {
        $.field.focus();
    }
    new (require("alloy/widget"))("ti.ux.forms.row.text");
    this.__widgetId = "ti.ux.forms.row.text";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.icon = Alloy.createWidget("ti.ux.iconfont", "widget", {
        id: "icon",
        __parentSymbol: $.__views.row
    });
    $.__views.icon.setParent($.__views.row);
    $.__views.titleLbl = Ti.UI.createLabel({
        id: "titleLbl"
    });
    $.__views.row.add($.__views.titleLbl);
    $.__views.field = Ti.UI.createTextField({
        hintTextColor: "#89896C",
        id: "field"
    });
    $.__views.row.add($.__views.field);
    $.__views.actInd = Ti.UI.createActivityIndicator({
        id: "actInd"
    });
    $.__views.row.add($.__views.actInd);
    $.__views.alertIcon = Alloy.createWidget("ti.ux.iconfont", "widget", {
        id: "alertIcon",
        right: "10",
        icon: "fa-exclamation-triangle",
        iconColor: "#900",
        zIndex: "99",
        __parentSymbol: $.__views.row
    });
    $.__views.alertIcon.setParent($.__views.row);
    $.__views.__alloyId4 = Ti.UI.createView({
        id: "__alloyId4"
    });
    $.__views.row.add($.__views.__alloyId4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    var Scope = require(WPATH("Scope"));
    require("alloy/animation");
    $.id = args.id || "none_id";
    initUI();
    $.validate = function(callback) {
        hideValidationError();
        if ($.field.validate.useCallback) {
            $.actInd.show();
            $.field.validate($.field.value, function(e) {
                callback && callback(e);
                e || showValidationError();
                $.actInd.hide();
            });
        } else {
            var isValid = $.field.validate($.field.value);
            Ti.API.info("isValid: " + isValid);
            callback && callback(isValid);
            isValid || showValidationError();
        }
    };
    $.focus = focus;
    $.blur = function() {
        $.field.blur();
    };
    $.getField = function() {
        return $.field;
    };
    $.getValue = function() {
        return $.field.value;
    };
    require("WidgetTools").cleanArgs(args);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;