#!/usr/bin/env node

var _ = require("underscore")._;
var winston = require("winston");

var pack = require("./pack");

var optimist = require("optimist")
    .options("input", {
        alias: "i", describe: "input folder (default: ./)"
    })
    .options("output", {
        alias: "o", describe: "output JSON file (default: sounds.json)"
    })
    .options("noBasePath", {
        alias: "nb", describe: "doesn't prepend base path to each asset id"
    })
    .options("help", {
        alias: "h", describe: "help"
    });

var argv = optimist.argv;
var opts = _.extend({}, argv);

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    colorize: true
    , level: argv.log
    , handleExceptions: false
});
winston.debug("parsed arguments", argv);

opts.logger = winston;

if (!opts.input) opts.input = "./";
opts.output = argv.output ? argv.output : opts.input + "/sounds.json";

if (argv.help) {
    if (!argv.help) winston.error("invalid options");
    winston.info("Usage: waudbase64 -i sounds -o sounds.json");
    winston.info(optimist.help());
    process.exit(1);
}

pack(opts, function (err, obj) {
    if (err) {
        winston.error(err);
        process.exit(0);
    }
    winston.info("done");
});