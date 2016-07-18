# waudbase64

![waud logo](https://raw.githubusercontent.com/adireddy/waud/dev/logo.png)

Base64 generator for [waud.js](https://github.com/adireddy/waud)

Base64 decoding is widely supported across all browsers with the exception of IE 9 and below. IE 10+ and Edge are supported.

[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://adireddy.github.io/demos/waud/base64.html)

###Installation

```
npm install -g waudbase64
```

###Usage

```
waudbase64 -i sounds -o sounds.json
```

###Help

```
waudbase64 --help
info: Usage: waudbase64 -i sounds -o sounds.json
info: Options:
  --input, -i   input folder                           
  --output, -o  output JSON file (default: sounds.json)
  --help, -h    help
```

###Example with waud.js

```
var base64pack = WaudBase64Pack("assets/sounds.json", _onLoad);

function _onLoad(snds:Map<String, IWaudSound>) {
  snds.get("assets/beep.mp3").play();
}
```

###More Info

Note that the file size of base64 encoded JSON file will be more than the actual sound file(s).

But if your web server have **gzip** compression enabled for JSON files then the network trabsfer size will be smaller than loading individual sound files.

Enabling gzip compression is a standard practice and most likely your web server has it enabled already and to verify that you can open the network tab in chrome developer tools and click on any JSON file thats loaded. If you notice **`Content-Encoding:gzip`** in Response Headers section then it's already enabled.

**Some numbers for example:**

Size of 6 individual mp3 sound files before base64 encoding: **589 KB**

Size of base64 encoded JSON with all the 6 sounds: **785 KB**

Network transfer size with gzip enabled: **552 KB**
