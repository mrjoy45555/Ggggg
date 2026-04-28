module.exports.config = {
  name: "uid",
  aliases: ["getuid"],
  version: "1.0.0",
  hasPermission: 0,
  credits: "Joy",
  prefix: true,
  description: "Get Facebook user UID.",
  commandCategory: "without prefix",
  cooldowns: 5
};

module.exports.run = async function({ event, api, args, Users }) {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];

  // === Helper Function === //
  const sendUID = (uid, threadID, messageID) => {
      const avatarURL = `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

      const messageBody = 
`🌐 ===「 𝗨𝗦𝗘𝗥 𝗨𝗜𝗗 」=== 🌐
━━━━━━━━━━━━━━━━━━
👤 𝗜𝗗     : ${uid}
💬 𝗜𝗕     : m.me/${uid}
🔗 𝗟𝗶𝗻𝗸𝗙𝗕 : https://www.facebook.com/profile.php?id=${uid}
━━━━━━━━━━━━━━━━━━`;

      const callback = () => api.sendMessage(
          { body: messageBody, attachment: fs.createReadStream(__dirname + "/cache/uid.png") },
          threadID,
          () => fs.unlinkSync(__dirname + "/cache/uid.png"),
          messageID
      );

      request(encodeURI(avatarURL))
          .pipe(fs.createWriteStream(__dirname + '/cache/uid.png'))
          .on('close', () => callback());
  };

  // === Case 1: Reply করা মেসেজ === //
  if (event.type === "message_reply") {
      const uid = event.messageReply.senderID;
      sendUID(uid, event.threadID, event.messageID);
      return;
  }

  // === Case 2: Argument নাই (নিজের UID) === //
  if (!args[0]) {
      sendUID(event.senderID, event.threadID, event.messageID);
      return;
  }

  // === Case 3: Link দেওয়া হলে === //
  if (args[0].indexOf(".com/") !== -1) {
      const res_ID = await api.getUID(args[0]);
      sendUID(res_ID, event.threadID, event.messageID);
      return;
  }

  // === Case 4: Mention করা হলে === //
  if (args.join().indexOf('@') !== -1) {
      const uid = Object.keys(event.mentions)[0];
      sendUID(uid, event.threadID, event.messageID);
      return;
  }
};