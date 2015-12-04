function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function changeStatus(e) {
        $.password.passwordMask = $.tick.visible;
        $.tick.visible = !$.tick.visible;
        $.password.setSelection($.password.value.length, $.password.value.length);
        Ti.API.info(JSON.stringify(e.source));
    }
    function emptyTextFieldUser() {
        $.user.value = "";
    }
    function emptyTextFieldPassword() {
        $.password.value = "";
    }
    function login() {
        username = $.user.value;
        password = $.password.value;
        var savedUsername = Ti.App.Properties.getString("username");
        var savedPassword = Ti.App.Properties.getString("password");
        Ti.API.info(username + " -> " + savedUsername);
        Ti.API.info(password + " -> " + savedPassword);
        Ti.App.Properties.setString("username", username);
        Ti.App.Properties.setString("password", password);
        Alloy.createController("home");
        activityIndicator.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.loginView = Ti.UI.createScrollView({
        id: "loginView",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "#D4D4D4"
    });
    $.__views.index.add($.__views.loginView);
    $.__views.__alloyId13 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        top: 20,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.loginView.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        width: 250,
        height: 50,
        top: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "black",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.user = Ti.UI.createTextField({
        left: 5,
        right: 37,
        height: Titanium.UI.SIZE,
        hintText: "Username",
        color: "black",
        id: "user"
    });
    $.__views.__alloyId14.add($.__views.user);
    $.__views.__alloyId15 = Ti.UI.createButton({
        backgroundImage: "/images/close_button.png",
        width: "32",
        height: "32",
        right: 5,
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    emptyTextFieldUser ? $.addListener($.__views.__alloyId15, "click", emptyTextFieldUser) : __defers["$.__views.__alloyId15!click!emptyTextFieldUser"] = true;
    $.__views.__alloyId16 = Ti.UI.createView({
        width: 250,
        height: 50,
        top: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "black",
        id: "__alloyId16"
    });
    $.__views.__alloyId13.add($.__views.__alloyId16);
    $.__views.password = Ti.UI.createTextField({
        left: 5,
        right: 37,
        height: Titanium.UI.SIZE,
        hintText: "Password",
        color: "black",
        id: "password",
        passwordMask: "true"
    });
    $.__views.__alloyId16.add($.__views.password);
    $.__views.__alloyId17 = Ti.UI.createButton({
        backgroundImage: "/images/close_button.png",
        width: "32",
        height: "32",
        right: 5,
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    emptyTextFieldPassword ? $.addListener($.__views.__alloyId17, "click", emptyTextFieldPassword) : __defers["$.__views.__alloyId17!click!emptyTextFieldPassword"] = true;
    $.__views.__alloyId18 = Ti.UI.createView({
        width: 250,
        height: 50,
        top: 10,
        id: "__alloyId18"
    });
    $.__views.__alloyId13.add($.__views.__alloyId18);
    $.__views.checkBox = Ti.UI.createView({
        width: 32,
        height: 32,
        left: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black",
        id: "checkBox"
    });
    $.__views.__alloyId18.add($.__views.checkBox);
    changeStatus ? $.addListener($.__views.checkBox, "click", changeStatus) : __defers["$.__views.checkBox!click!changeStatus"] = true;
    $.__views.tick = Ti.UI.createImageView({
        image: "tick.png",
        id: "tick"
    });
    $.__views.checkBox.add($.__views.tick);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: 42,
        right: 5,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 15,
            fontWeight: "bold"
        },
        text: L("SHOW_PASSWORD"),
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createButton({
        width: 250,
        height: 50,
        top: 10,
        borderRadius: 5,
        color: "black",
        borderColor: "black",
        backgroundColor: "#A7A7A7",
        title: "Login",
        id: "__alloyId20"
    });
    $.__views.__alloyId13.add($.__views.__alloyId20);
    login ? $.addListener($.__views.__alloyId20, "click", login) : __defers["$.__views.__alloyId20!click!login"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tick.visible = !$.password.passwordMask;
    var style;
    style = Ti.UI.ActivityIndicatorStyle.BIG_DARK;
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "grey",
        style: style,
        top: 20,
        left: 20,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    $.index.add(activityIndicator);
    $.index.open();
    $.user.value = Ti.App.Properties.getString("username");
    $.password.value = Ti.App.Properties.getString("password");
    __defers["$.__views.__alloyId15!click!emptyTextFieldUser"] && $.addListener($.__views.__alloyId15, "click", emptyTextFieldUser);
    __defers["$.__views.__alloyId17!click!emptyTextFieldPassword"] && $.addListener($.__views.__alloyId17, "click", emptyTextFieldPassword);
    __defers["$.__views.checkBox!click!changeStatus"] && $.addListener($.__views.checkBox, "click", changeStatus);
    __defers["$.__views.__alloyId20!click!login"] && $.addListener($.__views.__alloyId20, "click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;