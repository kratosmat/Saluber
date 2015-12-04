function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.expandabletext/" + s : s.substring(0, index) + "/ti.ux.expandabletext/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0025,
    key: "label",
    style: {
        top: 5
    }
} ];