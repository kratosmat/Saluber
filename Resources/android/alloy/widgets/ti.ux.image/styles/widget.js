function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.image/" + s : s.substring(0, index) + "/ti.ux.image/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0022,
    key: "container",
    style: {
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0023,
    key: "img",
    style: {
        top: 0,
        defaultImage: ""
    }
}, {
    isId: true,
    priority: 100101.0024,
    key: "img",
    style: {
        canScale: true,
        enableZoomControls: false,
        height: Ti.UI.SIZE
    }
} ];