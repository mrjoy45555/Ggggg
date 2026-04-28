const fs = require("fs");
module.exports.config = {
  name: "Joy404",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "JOY", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "tea",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("Owner")==0 || event.body.indexOf("owner")==0 || event.body.indexOf("admin")==0 || event.body.indexOf("Admin")==0) {
    var msg = {
        body: "𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑 : 𝐉𝐎𝐘 𝐀𝐇𝐌𝐄𝐃\n\n𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 : https://www.facebook.com/profile.php?id=100001435123762",
        attachment: fs.createReadStream(__dirname + `/JOY/JOY404.jpeg`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🖤", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
