#!/usr/bin/env node

// used tool to copy images folder

const fs = require("fs");
const path = require("path");
const targetDir = path.join(__dirname, "images");

var directories = [
    "iOS",
    "Android",
    "Android/drawable-mdpi",
    "Android/drawable-hdpi",
    "Android/drawable-xhdpi",
    "Android/drawable-xxhdpi",
    "Android/drawable-xxxhdpi"
];

for (var i in directories) {
    var dir = path.join(targetDir, directories[i]);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}
var reIOS = /.*(?:@2x|@3x)\.png$/;
var reMdpi = /.*-mdpi\.png$/;
var reHdpi = /.*-hdpi\.png$/;
var reXhdpi = /.*-xhdpi\.png$/;
var reXxhdpi = /.*-xxhdpi\.png$/;
var reXxxhdpi = /.*-xxxhdpi\.png$/;

function resetRegexp() {
    reIOS.lastIndex = reMdpi.lastIndex =
        reHdpi.lastIndex = reXxhdpi.lastIndex =
        reXxxhdpi.lastIndex = 0;
}


fs.readdirSync(targetDir).forEach(function(file) {
    resetRegexp();
    file = path.join(targetDir, file);
    var fileInfo = path.parse(file);
    var isAndroid = reMdpi.test(fileInfo.base) ||
        reHdpi.test(fileInfo.base) ||
        reXhdpi.test(fileInfo.base) ||
        reXxhdpi.test(fileInfo.base) ||
        reXxxhdpi.test(fileInfo.base);
    if (isAndroid) {
        moveToAndroid(file);
    } else if (reIOS.test(fileInfo.base) || fileInfo.ext === ".png") {
        moveToIOS(file);
    }
});


function moveToIOS(file) {
    resetRegexp();
    var fileInfo;
    if (typeof file === "string")
        fileInfo = path.parse(file);
    else fileInfo = file;
    var oldPath = path.format(fileInfo);
    var newPath = path.format(Object.assign({}, fileInfo, {
        dir: path.join(targetDir, "iOS")
    }));
    fs.renameSync(oldPath, newPath);
}


function moveToAndroid(file) {
    resetRegexp();
    var fileInfo;
    if (typeof file === "string")
        fileInfo = path.parse(file);
    else fileInfo = file;
    var oldPath = path.format(fileInfo);
    re = /(.*)(-(?:m|h|xh|xxh|xxxh)dpi)(\.png)$/;
    var newPath2 = oldPath.replace(re, "$1$3");
    re.lastIndex = 0;
    var subFolder = "drawable" + fileInfo.base.replace(re, "$2");
    var newPath = path.format(Object.assign({}, path.parse(newPath2), {
        dir: path.join(targetDir, "Android", subFolder)
    }));
    fs.renameSync(oldPath, newPath);
}

process.exit();