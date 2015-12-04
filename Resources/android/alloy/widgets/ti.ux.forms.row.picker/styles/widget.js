function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.forms.row.picker/" + s : s.substring(0, index) + "/ti.ux.forms.row.picker/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0029,
    key: "childrenImage",
    style: {
        height: 15,
        width: 15
    }
} ];