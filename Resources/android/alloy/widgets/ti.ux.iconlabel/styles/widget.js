function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ti.ux.iconlabel/" + s : s.substring(0, index) + "/ti.ux.iconlabel/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0014,
    key: "view",
    style: {
        top: 0,
        height: "54dp",
        backgroundColor: Alloy.CFG.barColor
    }
}, {
    isId: true,
    priority: 100000.0015,
    key: "img",
    style: {
        top: "5dp",
        height: "40dp",
        image: "/images/headerLogo.png"
    }
}, {
    isId: true,
    priority: 100000.0016,
    key: "line",
    style: {
        bottom: 0,
        height: "2dp",
        backgroundColor: "#6000"
    }
} ];