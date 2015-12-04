function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getListBookingsView() {
        Ti.API.info("home: getListBookingsView richiesta creazione del controller main");
        view = Alloy.createController("ListBookings");
        view.menuButton.add(getMenuButton({
            h: "60",
            w: "60"
        }));
        view.menuButton.addEventListener("click", function() {
            $.drawermenu.showhidemenu();
            $.drawermenu.menuOpen = !$.drawermenu.menuOpen;
        });
        Ti.API.info("getListBookingsView: " + JSON.stringify(view.menuButton));
        return view;
    }
    function getBookingsView() {
        Ti.API.info("getBookingsView ");
        view = Alloy.createController("Booking");
        view.menuButton.add(getMenuButton({
            h: "60",
            w: "60"
        }));
        view.menuButton.addEventListener("click", function() {
            $.drawermenu.showhidemenu();
            $.drawermenu.menuOpen = !$.drawermenu.menuOpen;
        });
        return view;
    }
    function getUserProileView() {
        Ti.API.info("home: getUserProileView ");
        view = Alloy.createController("UserProfile");
        view.menuButton.add(getMenuButton({
            h: "60",
            w: "60"
        }));
        view.menuButton.addEventListener("click", function() {
            $.drawermenu.showhidemenu();
            $.drawermenu.menuOpen = !$.drawermenu.menuOpen;
        });
        return view;
    }
    function getMenuView() {
        if (null == menuView) {
            menuView = Alloy.createController("menuview");
            menuView.menuTable.addEventListener("click", function(e) {
                $.drawermenu.showhidemenu();
                $.drawermenu.menuOpen = false;
                if ("row1" === e.rowData.id) {
                    if (1 != activeView) {
                        $.drawermenu.drawermainview.removeAllChildren();
                        $.drawermenu.drawermainview.add(getListBookingsView().getView());
                    }
                    activeView = 1;
                }
                if ("row2" === e.rowData.id) {
                    if (2 != activeView) {
                        $.drawermenu.drawermainview.removeAllChildren();
                        $.drawermenu.drawermainview.add(getBookingsView().getView());
                    }
                    activeView = 2;
                }
                if ("row3" === e.rowData.id) {
                    if (3 != activeView) {
                        $.drawermenu.drawermainview.removeAllChildren();
                        $.drawermenu.drawermainview.add(getUserProileView().getView());
                    }
                    activeView = 3;
                }
                Ti.API.debug(e.rowData.id);
            });
        }
        return menuView;
    }
    function getMenuButton(args) {
        Ti.API.info("getMenuButton");
        var v = Ti.UI.createView({
            height: args.h,
            width: args.w,
            backgroundColor: "#A1D0E0"
        });
        var b = Ti.UI.createView({
            height: "20dp",
            width: "20dp",
            backgroundImage: "/106-sliders.png"
        });
        v.add(b);
        Ti.API.info("getMenuButton: " + JSON.stringify(v));
        return v;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
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
    $.__views.home = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: "true",
        id: "home"
    });
    $.__views.home && $.addTopLevelView($.__views.home);
    $.__views.drawermenu = Alloy.createWidget("com.alcoapps.drawermenu", "widget", {
        id: "drawermenu",
        __parentSymbol: $.__views.home
    });
    $.__views.drawermenu.setParent($.__views.home);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0];
    var menuView;
    var activeView = 1;
    $.drawermenu.init({
        menuview: getMenuView().getView(),
        mainview: getListBookingsView().getView(),
        duration: 200,
        parent: $.home
    });
    $.home.open();
    Ti.API.info("home: main win " + $.home);
    $.home.addEventListener("android:back", function() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ L("CONFIRM"), L("CANCEL") ],
            message: L("EXIT_THE_APP"),
            title: L("CONFIRM_EXIT")
        });
        dialog.addEventListener("click", function(e) {
            Ti.API.info("home: e.cancel: " + e.cancel);
            Ti.API.info("home: e.source.cancel: " + e.source.cancel);
            Ti.API.info("home: e.index: " + e.index);
            if (e.index == e.source.cancel) Ti.API.info("home: l utente non conferma uscita da APP"); else {
                $.home.close();
                Ti.API.info("home: l utente conferma uscita da APP. Reset della cache..");
            }
        });
        dialog.show();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;