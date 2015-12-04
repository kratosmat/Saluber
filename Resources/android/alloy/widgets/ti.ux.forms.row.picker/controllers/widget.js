function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.forms.row.picker/" + s : s.substring(0, index) + "/ti.ux.forms.row.picker/" + s.substring(index + 1);
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
    function initValues() {
        if ("undefined" == typeof $.value || null == $.value) {
            var value = args.value;
            if ("undefined" != typeof value && -1 !== value && "-1" !== value) {
                value = parseInt(value);
                $.value = value;
            }
        }
    }
    function initUI() {
        if (args.icon) {
            $.icon.setIcon(args.icon);
            args.iconColor && ($.icon.getView().color = args.iconColor);
        } else $.titleLbl.left = $.icon.getView().left;
        $.titleLbl.text = args.title || "";
    }
    function openPicker() {
        switch (args.pickerType) {
          case "date-time-picker":
            Alloy.createWidget("it.fusedcloud.pickerWidget", {
                id: args.id,
                outerView: $.parent,
                hideNavBar: false,
                type: args.pickerType,
                pickerParams: {
                    value: null == $.value ? Date() : $.value
                },
                onDone: optionDateSelected
            });
            break;

          case "single-column":
            Alloy.createWidget("it.fusedcloud.pickerWidget", {
                id: args.id,
                outerView: $.parent,
                hideNavBar: false,
                type: "single-column",
                selectedValues: null == $.value ? [ null ] : [ $.value ],
                pickerValues: $.pickerValues,
                onDone: optionSelected
            });
        }
    }
    function optionDateSelected(e) {
        if (true === e.cancel) {
            Ti.API.info("Entry was cancelled");
            return;
        }
        $.value = new Date(e.data.unixMilliseconds);
        $.subtitleLbl.text = formatDateAsString($.value);
        $.trigger("change", {
            value: $.value
        });
    }
    function optionSelected(e) {
        if (true === e.cancel) {
            Ti.API.info("Entry was cancelled");
            return;
        }
        $.subtitleLbl.text = e.data[0].value;
        $.value = e.data[0].key;
        $.extra = e.data[0].extra;
        $.trigger("change", {
            key: e.data[0].key,
            value: e.data[0].value,
            extra: e.data[0].extra
        });
    }
    function formatDateAsString(dateToFormat, adjust) {
        "undefined" == typeof adjust && (adjust = true);
        var formattedDate = pad(dateToFormat.getDate() + "") + "/";
        formattedDate += pad(true == adjust ? dateToFormat.getMonth() + 1 + "" : dateToFormat.getMonth() + "");
        formattedDate = formattedDate + "/" + dateToFormat.getFullYear() + " " + pad(dateToFormat.getHours() + "") + ":" + pad(dateToFormat.getMinutes() + "");
        return formattedDate;
    }
    function pad(str) {
        str = str.toString();
        return str.length < 2 ? "0" + str : str;
    }
    new (require("alloy/widget"))("ti.ux.forms.row.picker");
    this.__widgetId = "ti.ux.forms.row.picker";
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
    var __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    openPicker ? $.addListener($.__views.row, "click", openPicker) : __defers["$.__views.row!click!openPicker"] = true;
    $.__views.icon = Alloy.createWidget("ti.ux.iconfont", "widget", {
        id: "icon",
        __parentSymbol: $.__views.row
    });
    $.__views.icon.setParent($.__views.row);
    $.__views.titleLbl = Ti.UI.createLabel({
        id: "titleLbl"
    });
    $.__views.row.add($.__views.titleLbl);
    $.__views.subtitleLbl = Ti.UI.createLabel({
        id: "subtitleLbl"
    });
    $.__views.row.add($.__views.subtitleLbl);
    $.__views.countLbl = Ti.UI.createLabel({
        id: "countLbl"
    });
    $.__views.row.add($.__views.countLbl);
    $.__views.__alloyId5 = Alloy.createWidget("ti.ux.iconfont", "widget", {
        id: "__alloyId5",
        __parentSymbol: $.__views.row
    });
    $.__views.__alloyId5.setParent($.__views.row);
    $.__views.__alloyId6 = Ti.UI.createView({
        id: "__alloyId6"
    });
    $.__views.row.add($.__views.__alloyId6);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0];
    $.id = args.id || "optionPicker";
    initUI();
    initValues();
    $.getOptions = function() {
        return $.OPTIONS || [];
    };
    $.getValue = function() {
        return $.value;
    };
    $.getExtra = function() {
        return $.extra;
    };
    $.setValue = function(value) {
        "date-time-picker" == args.pickerType && ($.subtitleLbl.text = formatDateAsString(value));
        $.value = value;
    };
    $.setValueText = function(valueText) {
        $.subtitleLbl.text = valueText;
    };
    $.setExtra = function(extra) {
        $.extra = extra;
    };
    require("WidgetTools").cleanArgs(args);
    __defers["$.__views.row!click!openPicker"] && $.addListener($.__views.row, "click", openPicker);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;