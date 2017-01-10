module.exports = function() {
    var fs = require("fs");
    var opts = arguments[0];
    var callback = arguments[1];
    var inputFolder = opts.input;
    var outputFile = opts.output;
    var list = { "meta": [0, 0] };
    var count = 0;
    var size = 0;
    var MIME_TYPES = {
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
    };

    listFiles(inputFolder);
    list["meta"] = [count, size];

    fs.writeFileSync(outputFile, JSON.stringify(list));

    function listFiles(folder) {
        try {
            var files = fs.readdirSync(folder);
            files.forEach(function (file) {
                var ext = file.split(".").pop();
                var filePath = folder + "/" + file;
                var stats = fs.statSync(filePath);
                if (stats.isDirectory()) listFiles(filePath);
                else {
                    var data = fs.readFileSync(filePath, "base64");
                    if(MIME_TYPES[ext]) {
                        list[opts.noBasePath ? filePath.replace(inputFolder + "/", "") : filePath] = "data:" + MIME_TYPES[ext] + ";base64," + data;
                        count++;
                        size += stats.size;
                    }
                }
            });
        }
        catch (e) {
            callback("failed with exception: " + e.message);
        }
    }
}
