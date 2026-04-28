const fs = require("fs");
const axios = require("axios");

module.exports.config = {
 name: "bin",
 version: "1.0.0",
 permission: 2, // 🔥 ADMIN ONLY
 credits: "JOY",
 description: "Upload file to bin and get link",
 commandCategory: "utility",
 usages: ".bin <filename>",
 cooldowns: 5
};

module.exports.run = async function({ api, event, args, global }) {

 // 🔐 ADMIN CHECK (extra safety)
 const uid = event.senderID;
 const isAdmin =
 global.config.ADMINBOT?.includes(uid) ||
 global.config.NDH?.includes(uid);

 if (!isAdmin) {
 return api.sendMessage(
 "⛔ You don't have permission to use this command!",
 event.threadID,
 event.messageID
 );
 }

 const fileName = args.join(" ");

 if (!fileName) {
 return api.sendMessage(
 "❌ Usage: .bin <filename>\nExample: .bin hack.js",
 event.threadID,
 event.messageID
 );
 }

 const filePath = __dirname + "/" + fileName;

 if (!fs.existsSync(filePath)) {
 return api.sendMessage(
 `❌ File not found: ${fileName}`,
 event.threadID,
 event.messageID
 );
 }

 try {
 const content = fs.readFileSync(filePath, "utf8");

 const res = await axios.post(
 "https://hastebin.com/documents",
 content
 );

 const link = `https://hastebin.com/${res.data.key}`;

 return api.sendMessage(
 `📄 BIN CREATED (ADMIN)\n\n📁 ${fileName}\n🔗 ${link}`,
 event.threadID,
 event.messageID
 );

 } catch (err) {
 return api.sendMessage(
 "❌ Failed to create bin!",
 event.threadID,
 event.messageID
 );
 }
};