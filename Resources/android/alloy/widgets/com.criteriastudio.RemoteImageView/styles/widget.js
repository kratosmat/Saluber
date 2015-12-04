function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.criteriastudio.RemoteImageView/" + s : s.substring(0, index) + "/com.criteriastudio.RemoteImageView/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0005,
    key: "imgContainer",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100101.0006,
    key: "img",
    style: {
        height: Ti.UI.SIZE
    }
} ];