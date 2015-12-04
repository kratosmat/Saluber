function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.criteriastudio.RemoteImageView/" + s : s.substring(0, index) + "/com.criteriastudio.RemoteImageView/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0007,
    key: "win",
    style: {
        backgroundColor: "transparent",
        navBarHidden: true
    }
}, {
    isId: true,
    priority: 100000.001,
    key: "scroll",
    style: {
        opacity: 0,
        backgroundColor: "#000",
        contentHeight: "auto",
        contentWidth: "auto",
        maxZoomScale: 10,
        minZoomScale: 1
    }
}, {
    isId: true,
    priority: 100101.0009,
    key: "img",
    style: {
        canScale: true,
        enableZoomControls: true,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
} ];