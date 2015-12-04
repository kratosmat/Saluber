function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createMenuRow(rowId, rowClass, rowText) {
        var row = Ti.UI.createTableViewRow({
            id: rowId,
            height: "50dp"
        });
        var viewContainer = Ti.UI.createView({
            height: "30dp",
            layout: "horizontal"
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
            font: {
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menuview";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.menuView = Ti.UI.createView({
        id: "menuView"
    });
    $.__views.menuView && $.addTopLevelView($.__views.menuView);
    $.__views.menuTopBar = Ti.UI.createView({
        id: "menuTopBar"
    });
    $.__views.menuView.add($.__views.menuTopBar);
    $.__views.menuTable = Ti.UI.createTableView({
        id: "menuTable"
    });
    $.__views.menuView.add($.__views.menuTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var menus = [];
    menus.push(createMenuRow("row1", "rowSkull", "ListBookings"));
    menus.push(createMenuRow("row2", "rowGear", "Booking"));
    menus.push(createMenuRow("row3", "rowGear", "UserProfile"));
    Ti.API.info("menu row1: " + JSON.stringify(menus));
    $.menuTable.data = menus;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;