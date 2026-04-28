module.exports.config = {
 name: "prefix",
 version: "3.1.0", 
 hasPermission: 0,
 credits: "Joy",
 description: "Stylish Prefix Show",
 prefix: true,
 commandCategory: "user",
 cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
 const axios = require("axios");
 const request = require("request");
 const fs = require("fs");
 const moment = require("moment-timezone");

 const { threadID, messageID, body } = event;
 const { PREFIX, BOTNAME } = global.config;

 if (!body || body.toLowerCase() !== "prefix") return;

 let threadSetting = global.data.threadData.get(threadID) || {};
 let prefix = threadSetting.PREFIX || PREFIX;

 const timeStart = Date.now();
 const times = moment.tz("Asia/Dhaka").format("HH:mm:ss • DD/MM/YYYY");
 const day = moment.tz("Asia/Dhaka").format("dddd");

 try {

 // 🔥 GitHub JSON থেকে base URL নেওয়া
 const jsonRes = await axios.get(
 "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/api.json",
 { timeout: 10000 }
 );

 const baseUrl = jsonRes.data.joy11;

 if (!baseUrl) {
 return api.sendMessage("❌ Base URL not found in github.json", threadID, messageID);
 }

 // 🔥 বাকি endpoint command এর ভিতরে
 const res = await axios.get(
 `${baseUrl}/random?JOY=status`,
 { timeout: 10000 }
 );

 const videoUrl = (res.data || "").trim();

 if (!videoUrl.startsWith("http")) {
 return api.sendMessage("❌ API Invalid Response", threadID, messageID);
 }

 const filePath = __dirname + `/video.mp4`;

 const callback = () => {
 api.sendMessage(
 {
 body:
`╔══════════════════╗
 𝑷𝑹𝑬𝑭𝑰𝑿 𝑷𝑨𝑵𝑬𝑳
╚══════════════════╝

➤ 𝐆𝐫𝐨𝐮𝐩 𝐏𝐫𝐞𝐟𝐢𝐱 : ${prefix}
➤ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱 : ${PREFIX}
➤ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 : ${BOTNAME}
➤ 𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 : ${client.commands.size}
➤ 𝐏𝐢𝐧𝐠 : ${Date.now() - timeStart} ms

─────────────
📅 ${day}
⏰ ${times}
─────────────`,
 attachment: fs.createReadStream(filePath)
 },
 threadID,
 () => {
 if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
 },
 messageID
 );
 };

 request(videoUrl)
 .on("error", () => {
 api.sendMessage("❌ Video download failed", threadID, messageID);
 })
 .pipe(fs.createWriteStream(filePath))
 .on("close", callback);

 } catch (err) {
 console.log("API ERROR:", err.message);
 return api.sendMessage("❌ API Error (Maybe 500)", threadID, messageID);
 }
};

module.exports.run = async () => {};