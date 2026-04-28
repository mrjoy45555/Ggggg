const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "bot",
  version: "1.0.1",
  hasPermssion: 0,
 credits: "JOY",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["আমি এখন আমার বস ❤️‍🔥𒄬𓆩๛⃝ JOY AHMED ❤️‍🔥 এর সাথে বিজি আছি", "শুনবো না 😎 তুমি এখনো পর্যন্ত আমার বসের জিএফ দাও নাই 😒(তুমি পঁচা 🙁", "আমার বস তোমাকে ভালোবাসে😘🫂", "Love you 3000-😍💋💝", "ji bolen ki korte pari ami apnar jonno?","আমাকে না ডেকে আমার বস ❤️‍🔥𒄬𓆩๛⃝ JOY AHMED‣᭄𓆪❤️‍🔥 কে একটা জি এফ দেন", "Ato daktasen kn bujhlam na 😡", "jan bal falaba,🙂","ask amr mon vlo nei dakben na🙂", "Hmm jan oi khane ummah😘😘","jang hanga korba 🙂🖤","iss ato dako keno lojja lage to 🫦🙈","suna tomare amar valo lage,🙈😽","জি তুমি কি আমাকে ডেকেছো 😇🖤🥀"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
  if (event.body.indexOf("বট") == 0 || (event.body.indexOf("Bot") == 0)) {
    var msg = {
      body: `${name}, ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
