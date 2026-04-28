const fs = require("fs");
module.exports.config = {
  name: "joy1",
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
  if (event.body.indexOf("cudi")==0 || event.body.indexOf("vuda")==0 || event.body.indexOf("sex")==0 || event.body.indexOf("sawya")==0) {
    var msg = {
        body: "👉উপ্স জান অনেক জ্বালা🍆🥵\n\nhttps://www.facebook.com/pinikjoy4200",
        attachment: fs.createReadStream(__dirname + `/JOY/joy1.mp3`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍆", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
