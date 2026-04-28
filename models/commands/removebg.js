const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');
const path = require('path');
const { image } = require('image-downloader');

module.exports.run = async function({ api, event, args }) {
 try {
 const tpk = `🖼️=== [ REMOVING BACKGROUND ] ===🖼️
━━━━━━━━━━━━━━━
[⚜️]➜ Api By JOY ✅`;

 // check reply
 if (event.type !== "message_reply") 
 return api.sendMessage("❌ You must reply to a photo", event.threadID, event.messageID);

 const attach = event.messageReply.attachments;
 if (!attach || attach.length === 0) 
 return api.sendMessage("❌ You must reply to a photo", event.threadID, event.messageID);

 if (attach[0].type !== "photo") 
 return api.sendMessage("❌ This is not an image", event.threadID, event.messageID);

 // prepare image
 const content = attach[0].url;
 const cacheDir = path.join(__dirname, 'cache');
 if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

 const inputPath = path.join(cacheDir, 'photo.png');

 await image({ url: content, dest: inputPath });

 // API keys
 const KeyApi = [
 "qReKoWSpkMAi2vbi6RUEHctA",
 "ho37vvCUppqTKcyfjbLXnt4t",
 "ytr2ukWQW2YrXV8dshPbA8cE"
 ];

 const formData = new FormData();
 formData.append('size', 'auto');
 formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

 const response = await axios({
 method: 'post',
 url: 'https://api.remove.bg/v1.0/removebg',
 data: formData,
 responseType: 'arraybuffer',
 headers: {
 ...formData.getHeaders(),
 'X-Api-Key': KeyApi[Math.floor(Math.random() * KeyApi.length)]
 },
 encoding: null
 });

 if (response.status !== 200) {
 console.error('❌ Error:', response.status, response.statusText);
 return api.sendMessage("❌ RemoveBG failed", event.threadID, event.messageID);
 }

 fs.writeFileSync(inputPath, response.data);
 await api.sendMessage(
 { body: `✔️ Successfully removed background ✅\n${tpk}`, attachment: fs.createReadStream(inputPath) },
 event.threadID,
 () => fs.unlinkSync(inputPath)
 );

 } catch (e) {
 console.error("❌ ERROR:", e);
 return api.sendMessage("❌ Server Is Busy Now", event.threadID, event.messageID);
 }
};

module.exports.config = {
 credits: "Joy", 
 name: "removebg",
 version: "1.0.2",
 hasPermission: 0,
 description: "Remove background from replied photo",
 prefix: true,
 commandCategory: "image",
 usages: "reply to photo",
 cooldowns: 10,
 dependencies: {
 'form-data': '',
 'image-downloader': '',
 'fs-extra': '',
 'axios': ''
 }
};