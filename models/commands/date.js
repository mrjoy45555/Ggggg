module.exports.config = {
  'name': "date",
  'version': "2.0.0",
  'hasPermssion': 0x0,
  'credits': "JOY",
  'description': "Mention your partner",
  'commandCategory': "Love",
  'usages': "[@mention]",
  'cooldowns': 0x5,
  'dependencies': {
    'axios': '',
    'fs-extra': '',
    'path': '',
    'jimp': ''
  }
};
module.exports.onLoad = async () => {
  const {
    resolve: _0x31d773
  } = global.nodemodule.path;
  const {
    existsSync: _0x4ac2be,
    mkdirSync: _0x13db5d
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x2f2531
  } = global.utils;
  const _0x1546e9 = __dirname + "/cache/canvas/";
  const _0x3c91d9 = _0x31d773(__dirname, "cache/canvas", "josh.png");
  if (!_0x4ac2be(_0x1546e9 + "canvas")) {
    _0x13db5d(_0x1546e9, {
      'recursive': true
    });
  }
  if (!_0x4ac2be(_0x3c91d9)) {
    await _0x2f2531("https://i.pinimg.com/736x/15/fa/9d/15fa9d71cdd07486bb6f728dae2fb264.jpg", _0x3c91d9);
  }
};
async function makeImage({
  one: _0x28dcba,
  two: _0x46cc03
}) {
  const _0x1d1445 = global.nodemodule["fs-extra"];
  const _0x268c99 = global.nodemodule.path;
  const _0x84275a = global.nodemodule.axios;
  const _0x3af43d = global.nodemodule.jimp;
  const _0x237954 = _0x268c99.resolve(__dirname, "cache", "canvas");
  let _0xd001bb = await _0x3af43d.read(_0x237954 + "/josh.png");
  let _0x1e5d68 = _0x237954 + ("/batman" + _0x28dcba + '_' + _0x46cc03 + ".png");
  let _0x420c51 = _0x237954 + ("/avt_" + _0x28dcba + ".png");
  let _0xbb7272 = _0x237954 + ("/avt_" + _0x46cc03 + ".png");
  let _0x425660 = (await _0x84275a.get("https://graph.facebook.com/" + _0x28dcba + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x1d1445.writeFileSync(_0x420c51, Buffer.from(_0x425660, "utf-8"));
  let _0x376099 = (await _0x84275a.get("https://graph.facebook.com/" + _0x46cc03 + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x1d1445.writeFileSync(_0xbb7272, Buffer.from(_0x376099, "utf-8"));
  let _0xa73ffd = await _0x3af43d.read(await circle(_0x420c51));
  let _0x5d20d3 = await _0x3af43d.read(await circle(_0xbb7272));
  _0xd001bb.composite(_0xa73ffd.resize(85, 85), 355, 100).composite(_0x5d20d3.resize(75, 75), 250, 140);
  let _0x3206e0 = await _0xd001bb.getBufferAsync("image/png");
  _0x1d1445.writeFileSync(_0x1e5d68, _0x3206e0);
  _0x1d1445.unlinkSync(_0x420c51);
  _0x1d1445.unlinkSync(_0xbb7272);
  return _0x1e5d68;
}
async function circle(_0x258595) {
  const _0x4ad884 = require("jimp");
  _0x258595 = await _0x4ad884.read(_0x258595);
  _0x258595.circle();
  return await _0x258595.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0xfb2814,
  api: _0x4635b7,
  args: _0x5be7ee
}) {
  const _0x51bf71 = global.nodemodule["fs-extra"];
  const {
    threadID: _0x2dcc40,
    messageID: _0x4d651d,
    senderID: _0x1d8d28
  } = _0xfb2814;
  var _0x84b205 = Object.keys(_0xfb2814.mentions)[0];
  let _0x36e149 = _0xfb2814.mentions[_0x84b205].replace('@', '');
  if (!_0x84b205) {
    return _0x4635b7.sendMessage("Please tag1 person", _0x2dcc40, _0x4d651d);
  } else {
    return makeImage({
      'one': _0x1d8d28,
      'two': _0x84b205
    }).then(_0x415723 => _0x4635b7.sendMessage({
      'body': "Ship and get married >\\<",
      'mentions': [{
        'tag': _0x36e149,
        'id': _0x84b205
      }],
      'attachment': _0x51bf71.createReadStream(_0x415723)
    }, _0x2dcc40, () => _0x51bf71.unlinkSync(_0x415723), _0x4d651d));
  }
};
