var fs = require("fs");

module.exports = function() {
    var opts = arguments[0];
    var callback = arguments[1];
    var inputFolder = opts.input;
    var outputFile = opts.output;
    var list = {};
    var types = {
        "mp3": "audio/mpeg",
        "m4a": "audio/mp4",
        "mp4": "audio/mp4",
        "mpg": "audio/mpeg",
        "mpeg": "audio/mpeg",
        "mpga": "audio/mpeg",
        "mp1": "audio/mpeg",
        "mp2": "audio/mpeg",
        "aac": "audio/aac",
        "ogg": "audio/ogg",
        "oga": "audio/ogg",
        "wav": "audio/wav",
        "webm": "audio/webm",
        "weba": "audio/webm",
        "aif": "audio/x-aiff",
        "aifc": "audio/x-aiff",
        "aiff": "audio/x-aiff",
        "mid": "audio/midi",
        "midi": "audio/midi"
    }

    if (inputFolder) listFiles(inputFolder);
    fs.writeFileSync(outputFile, JSON.stringify(list));

    function listFiles(folder) {
        try {
            var files = fs.readdirSync(folder);
            files.forEach(function (file) {
                for (var i = 0; i < IGNORE_FILES.length; i++) if (IGNORE_FILES[i].test(file)) return;

                var ext = file.split(".").pop();
                var filePath = folder + "/" + file;
                var stats = fs.statSync(filePath);
                if (stats.isDirectory()) listFiles(filePath);
                var data = fs.readFileSync(filePath, "base64");

                if(types[ext]) list[filePath] = "data:" + types[ext] + ";base64," + data;
            });
        }
        catch (e) {
            callback("can't read directory - " + folder);
        }
    }
}