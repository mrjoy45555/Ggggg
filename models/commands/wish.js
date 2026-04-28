module.exports.config = {
  'name': "wish",
  'version': "1.0.0",
  'hasPermssion': 0x0,
  'credits': "JOY",
  'description': "wish for happy birthday",
  'commandCategory': "wish",
  'usages': "@mention",
  'dependencies': {
    'axios': '',
    'fs-extra': ''
  },
  'cooldowns': 0x0
};
module.exports.wrapText = (_0x38b2b9, _0x4c5db3, _0x231e63) => {
  return new Promise(_0x383309 => {
    if (_0x38b2b9.measureText(_0x4c5db3).width < _0x231e63) {
      return _0x383309([_0x4c5db3]);
    }
    if (_0x38b2b9.measureText('W').width > _0x231e63) {
      return _0x383309(null);
    }
    const _0x575989 = _0x4c5db3.split(" ");
    const _0x52f014 = [];
    let _0xaef703 = '';
    while (_0x575989.length > 0) {
      let _0x52b939 = false;
      while (_0x38b2b9.measureText(_0x575989[0]).width >= _0x231e63) {
        const _0x219008 = _0x575989[0];
        _0x575989[0] = _0x219008.slice(0, -1);
        if (_0x52b939) {
          _0x575989[1] = '' + _0x219008.slice(-1) + _0x575989[1];
        } else {
          _0x52b939 = true;
          _0x575989.splice(1, 0, _0x219008.slice(-1));
        }
      }
      if (_0x38b2b9.measureText('' + _0xaef703 + _0x575989[0]).width < _0x231e63) {
        _0xaef703 += _0x575989.shift() + " ";
      } else {
        _0x52f014.push(_0xaef703.trim());
        _0xaef703 = '';
      }
      if (_0x575989.length === 0) {
        _0x52f014.push(_0xaef703.trim());
      }
    }
    return _0x383309(_0x52f014);
  });
};
module.exports.run = async function ({
  args: _0x45feac,
  Users: _0x10651b,
  Threads: _0xd2d321,
  api: _0x35d9e5,
  event: _0x330e74,
  Currencies: _0x404a70
}) {
  const {
    loadImage: _0x3ff92b,
    createCanvas: _0x268024
  } = require("canvas");
  const _0x50f93f = global.nodemodule["fs-extra"];
  const _0x2de3ff = global.nodemodule.axios;
  let _0x1ffe63 = __dirname + "/cache/background.png";
  let _0x20950f = __dirname + "/cache/Avtmot.png";
  var _0x340f2a = Object.keys(_0x330e74.mentions)[0] || _0x330e74.senderID;
  var _0x1c848f = await _0x10651b.getNameUser(_0x340f2a);
  var _0x31a8fa = ["https://i.imgur.com/aUyYnBw.jpg"];
  var _0x307439 = _0x31a8fa[Math.floor(Math.random() * _0x31a8fa.length)];
  let _0x3772e7 = (await _0x2de3ff.get("https://graph.facebook.com/" + _0x340f2a + "/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x50f93f.writeFileSync(_0x20950f, Buffer.from(_0x3772e7, "utf-8"));
  let _0x1f285e = (await _0x2de3ff.get('' + _0x307439, {
    'responseType': "arraybuffer"
  })).data;
  _0x50f93f.writeFileSync(_0x1ffe63, Buffer.from(_0x1f285e, "utf-8"));
  let _0x4e3eba = await _0x3ff92b(_0x1ffe63);
  let _0x42e56a = await _0x3ff92b(_0x20950f);
  let _0x18b4b3 = _0x268024(_0x4e3eba.width, _0x4e3eba.height);
  let _0x20299f = _0x18b4b3.getContext('2d');
  _0x20299f.drawImage(_0x4e3eba, 0, 0, _0x18b4b3.width, _0x18b4b3.height);
  _0x20299f.font = "400 23px Arial";
  _0x20299f.fillStyle = "#000000";
  _0x20299f.textAlign = "start";
  const _0x2230bf = await this.wrapText(_0x20299f, _0x1c848f, 1160);
  _0x20299f.fillText(_0x2230bf.join("\n"), 120, 592);
  _0x20299f.beginPath();
  _0x20299f.drawImage(_0x42e56a, 124, 254, 230, 231);
  const _0x3c2781 = _0x18b4b3.toBuffer();
  _0x50f93f.writeFileSync(_0x1ffe63, _0x3c2781);
  _0x50f93f.removeSync(_0x20950f);
  return _0x35d9e5.sendMessage({
    'body': "𝐇𝐀𝐏𝐏𝐘 𝐁𝐈𝐑𝐓𝐇𝐃𝐀𝐘\n┏╮/╱\n╰ 🌺•••✿🦋༎࿐• \n╱/ ╰🦋༎࿐\n\n\n━༊জন্মদিনের༉༎⊱ অনেক༉༎⊱\nঅনেক༉༎⊱ শুভ-কামনা-!!✨🧡\n\n༊_সুন্দর༎ এই༎ পৃথিবীতে༎\n সুন্দরতম༎ জীবন༎ হোক༎ তোমার༎࿐___❤️😍\n\n__~শুভ༎࿔ জন্মদিন༎࿔ ডিয়ার༎࿔~__🎂🍫\n\n•.¸¸.•°»̶̶͓͓͓̽̽̽⑅⃝🧡✨" + _0x1c848f + "✨🧡❥᭄»̶̶͓͓͓̽̽̽-🎊🎈࿐͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌͌\n\n_তুমার জীবনের প্রতিটা ক্ষণ আনন্দময় হোক এই কামনা করি-!!🤲🍒\n_আশা করি সারা জীবন এমনই থাকো সবসময় ভালো থাকো, এই কামনাই করি-!!💜😊\n_আজকের এই দিনে সবকিছু হউক নতুন করে-!!😌\nসুখের স্মৃতি টুকু থাক কাছে-!!🤗\nদুঃখ গুলা যাক দূরে-!!❤️🌼\n\n\n┏╮/╱\n╰ 🌺•••✿🦋༎\n╱/ ╰┛🦋\n𝐖𝐈𝐒𝐇 𝐅𝐎𝐑𝐌 ✿🦋༎ " + global.config.BOTNAME + " ༎ ✨🧡",
    'attachment': _0x50f93f.createReadStream(_0x1ffe63)
  }, _0x330e74.threadID, () => _0x50f93f.unlinkSync(_0x1ffe63), _0x330e74.messageID);
};
