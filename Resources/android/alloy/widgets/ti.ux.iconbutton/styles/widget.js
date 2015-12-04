function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.iconbutton/" + s : s.substring(0, index) + "/ti.ux.iconbutton/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.002,
    key: "Button",
    style: {
        color: "#669"
    }
}, {
    isApi: true,
    priority: 1101.0021000000002,
    key: "Button",
    style: {
        backgroundColor: "none"
    }
} ];