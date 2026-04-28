const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
 name: "help",
 version: "2.1.1",
 hasPermission: 0,
 credits: "Joy Ahmed",
 description: "সব কমান্ড এবং বট তথ্য দেখায়",
 commandCategory: "system",
 usages: "[command name]",
 cooldowns: 5
};

// ছোট বক্স ডিজাইন
function smallBox(text) {
 return `╭╼|━━━━━━━━━━━━━━|╾╮\n${text}\n╰╼|━━━━━━━━━━━━━━|╾╯`;
}

module.exports.run = async function ({ api, event, args }) {
 const commands = global.client.commands;
 const prefix = global.config.PREFIX || ".";
 let msg = "";

 // 🔍 Single command help
 if (args[0]) {
 const name = args[0].toLowerCase();
 const cmd = commands.get(name);

 if (!cmd) {
 return api.sendMessage(
 smallBox("❌ এই নামে কোনো কমান্ড নেই!"),
 event.threadID,
 event.messageID
 );
 }

 msg += smallBox(`⌨️ Command: ${name}`) + "\n\n";
 msg += `📄 Desc: ${cmd.config.description || "নেই"}\n`;
 msg += `📂 Category: ${cmd.config.commandCategory || "Unknown"}\n`;
 msg += `📌 Usage: ${prefix}${cmd.config.name} ${cmd.config.usages || ""}\n`;
 msg += `⏱️ Cooldown: ${cmd.config.cooldowns || 3}s\n`;
 msg += `👤 Permission: ${cmd.config.hasPermission}\n`;

 return api.sendMessage(msg, event.threadID, event.messageID);
 }

 // 📂 Category wise command list
 let categories = {};

 commands.forEach(cmd => {
 const cat = cmd.config.commandCategory || "unknown";
 if (!categories[cat]) categories[cat] = [];
 categories[cat].push(cmd.config.name);
 });

 msg += smallBox(`🤖 HELP MENU — ${global.config.BOTNAME || "Merai Bot"}`) + "\n\n";

 for (let cat in categories) {
 msg += smallBox(`📁 ${cat.toUpperCase()}`);
 msg += `\n➤ ${categories[cat].sort().join(", ")}\n\n`;
 }

 // 👑 Admin Info
 msg += smallBox("👑 BOT ADMIN INFO") + "\n\n";
 msg += `👤 Owner: Joy Ahmed\n`;
 msg += `📞 WhatsApp: wa.me/+8801709045888\n`;
 msg += `🌐 Facebook: facebook.com/100003661522127\n`;
 msg += `⚙️ Prefix: ${prefix}\n`;
 msg += `📦 Version: 2.1.1\n`;
 msg += `📊 Total Commands: ${commands.size}\n`;

 // 🖼️ Image attach
 const imgURL = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/joy404.png";
 const imgPath = __dirname + "/cache/help.jpg";

 try {
 const res = await axios.get(imgURL, { responseType: "arraybuffer" });
 fs.writeFileSync(imgPath, res.data);

 return api.sendMessage(
 {
 body: msg,
 attachment: fs.createReadStream(imgPath)
 },
 event.threadID,
 () => fs.unlinkSync(imgPath),
 event.messageID
 );

 } catch (e) {
 return api.sendMessage(
 msg + "\n⚠️ ইমেজ লোড করা যায়নি!",
 event.threadID,
 event.messageID
 );
 }
};