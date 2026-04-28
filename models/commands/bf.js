module.exports.config = {
  'name': 'bf',
  'version': "7.3.1",
  'hasPermssion': 0x0,
  'credits': "JOY",
  'description': "Get Pair From Mention",
  'commandCategory': "img",
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
    resolve: _0x505b45
  } = global.nodemodule.path;
  const {
    existsSync: _0x551601,
    mkdirSync: _0x6c571b
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x6444d
  } = global.utils;
  const _0x1be09f = __dirname + "/cache/canvas/";
  const _0x304403 = _0x505b45(__dirname, "cache/canvas", "arr2.png");
  if (!_0x551601(_0x1be09f + "canvas")) {
    _0x6c571b(_0x1be09f, {
      'recursive': true
    });
  }
  if (!_0x551601(_0x304403)) {
    await _0x6444d("https://i.imgur.com/iaOiAXe.jpeg", _0x304403);
  }
};
async function makeImage({
  one: _0x2481e6,
  two: _0x34eb4c
}) {
  const _0x45c9b2 = global.nodemodule["fs-extra"];
  const _0x3735c7 = global.nodemodule.path;
  const _0x4481ae = global.nodemodule.axios;
  const _0x56ea3e = global.nodemodule.jimp;
  const _0x1c6771 = _0x3735c7.resolve(__dirname, "cache", "canvas");
  let _0x477f0f = await _0x56ea3e.read(_0x1c6771 + "/arr2.png");
  let _0x3d4132 = _0x1c6771 + ("/batman" + _0x2481e6 + '_' + _0x34eb4c + ".png");
  let _0x331bb2 = _0x1c6771 + ("/avt_" + _0x2481e6 + ".png");
  let _0x4511fe = _0x1c6771 + ("/avt_" + _0x34eb4c + ".png");
  let _0x3ede7c = (await _0x4481ae.get("https://graph.facebook.com/" + _0x2481e6 + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x45c9b2.writeFileSync(_0x331bb2, Buffer.from(_0x3ede7c, "utf-8"));
  let _0x389089 = (await _0x4481ae.get("https://graph.facebook.com/" + _0x34eb4c + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x45c9b2.writeFileSync(_0x4511fe, Buffer.from(_0x389089, "utf-8"));
  let _0x596a5b = await _0x56ea3e.read(await circle(_0x331bb2));
  let _0x29e174 = await _0x56ea3e.read(await circle(_0x4511fe));
  _0x477f0f.composite(_0x596a5b.resize(200, 200), 70, 110).composite(_0x29e174.resize(200, 200), 465, 110);
  let _0x1a019a = await _0x477f0f.getBufferAsync("image/png");
  _0x45c9b2.writeFileSync(_0x3d4132, _0x1a019a);
  _0x45c9b2.unlinkSync(_0x331bb2);
  _0x45c9b2.unlinkSync(_0x4511fe);
  return _0x3d4132;
}
async function circle(_0x4eab0c) {
  const _0x330e38 = require("jimp");
  _0x4eab0c = await _0x330e38.read(_0x4eab0c);
  _0x4eab0c.circle();
  return await _0x4eab0c.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0x591b9d,
  api: _0x334d52,
  args: _0x5f25da
}) {
  const _0x4e145e = global.nodemodule["fs-extra"];
  const {
    threadID: _0x4ff46e,
    messageID: _0x28edec,
    senderID: _0x36dcaf
  } = _0x591b9d;
  const _0x15cbd1 = Object.keys(_0x591b9d.mentions);
  if (!_0x15cbd1[0]) {
    return _0x334d52.sendMessage("তোর তার ছেড়া bf রে মেনশন দে 🐸", _0x4ff46e, _0x28edec);
  } else {
    const _0x482b0c = _0x15cbd1[0];
    return makeImage({
      'one': _0x36dcaf,
      'two': _0x482b0c
    }).then(_0x4f49e3 => _0x334d52.sendMessage({
      'body': "╔═══❖••° °••❖═══╗\n  দুই হৃদয়ের সুন্দর মিলন\n╚═══❖••° °••❖═══╝\n\n   ✶⊶⊷⊷❍⊶⊷⊷✶\n\n       👑 অবশেষে আমরা একসাথে ❤\nতোমার একমাত্র ভালোবাসা 🩷\n\n   ✶⊶⊷⊷❍⊶⊷⊷✶\n   ব্রেকআপ হলে নক দিস , আমার বস এখনো সিঙ্গেল 🫢🙂",
      'attachment': _0x4e145e.createReadStream(_0x4f49e3)
    }, _0x4ff46e, () => _0x4e145e.unlinkSync(_0x4f49e3), _0x28edec));
  }
};
