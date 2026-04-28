const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
 name: "hack",
 version: "1.0.1",
 hasPermission: 0,
 credits: "Joy",
 description: "Canvas hack image with reply support",
 commandCategory: "fun",
 usages: "[tag/reply]",
 cooldowns: 5,
 dependencies: {
 "axios": "",
 "fs-extra": "",
 "canvas": ""
 }
};

// 🔤 Text wrap function
module.exports.wrapText = async (ctx, text, maxWidth) => {
 if (ctx.measureText(text).width < maxWidth) return [text];

 let words = text.split(" ");
 let lines = [];
 let line = "";

 for (let word of words) {
 let testLine = line + word + " ";
 let width = ctx.measureText(testLine).width;

 if (width > maxWidth && line !== "") {
 lines.push(line.trim());
 line = word + " ";
 } else {
 line = testLine;
 }
 }

 if (line) lines.push(line.trim());
 return lines;
};

module.exports.run = async function ({ api, event, Users }) {
 const { loadImage, createCanvas } = require("canvas");

 const { threadID, messageID, senderID, messageReply, mentions, type } = event;

 let pathImg = __dirname + `/cache/hack_${Date.now()}.png`;
 let pathAvt = __dirname + `/cache/avt_${Date.now()}.png`;

 // 🎯 Target ID
 let id;
 if (type == "message_reply") {
 id = messageReply.senderID;
 } else if (Object.keys(mentions).length > 0) {
 id = Object.keys(mentions)[0];
 } else {
 id = senderID;
 }

 try {
 let name = await Users.getNameUser(id);

 let bgURL = "https://drive.google.com/uc?id=1RwJnJTzUmwOmP3N_mZzxtp63wbvt9bLZ";

 // 📥 Avatar
 let avt = (await axios.get(
 `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
 { responseType: "arraybuffer" }
 )).data;
 fs.writeFileSync(pathAvt, Buffer.from(avt));

 // 📥 Background
 let bg = (await axios.get(bgURL, { responseType: "arraybuffer" })).data;
 fs.writeFileSync(pathImg, Buffer.from(bg));

 // 🎨 Canvas
 let base = await loadImage(pathImg);
 let avatar = await loadImage(pathAvt);

 let canvas = createCanvas(base.width, base.height);
 let ctx = canvas.getContext("2d");

 ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

 // ✍️ Name
 ctx.font = "23px Arial";
 ctx.fillStyle = "#1878F3";

 let lines = await module.exports.wrapText(ctx, name, 1160);
 ctx.fillText(lines.join("\n"), 200, 497);

 // 👤 Avatar
 ctx.drawImage(avatar, 83, 437, 100, 101);

 let buffer = canvas.toBuffer();
 fs.writeFileSync(pathImg, buffer);

 return api.sendMessage(
 {
 body: "💀 HACK COMPLETE REPORT 💀",
 attachment: fs.createReadStream(pathImg)
 },
 threadID,
 () => {
 fs.unlinkSync(pathImg);
 fs.unlinkSync(pathAvt);
 },
 messageID
 );

 } catch (err) {
 console.log(err);
 return api.sendMessage("❌ Error হয়েছে, আবার চেষ্টা করো!", threadID, messageID);
 }
};