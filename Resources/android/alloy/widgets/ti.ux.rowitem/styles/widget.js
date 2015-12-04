function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.rowitem/" + s : s.substring(0, index) + "/ti.ux.rowitem/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0026,
    key: "childrenImage",
    style: {
        height: 28,
        width: 15
    }
}, {
    isId: true,
    priority: 100000.0027,
    key: "line",
    style: {
        bottom: 0,
        height: "2dp",
        backgroundColor: "#6000"
    }
} ];