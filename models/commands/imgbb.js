const axios = require("axios");
const fs = require("fs-extra");
const qs = require("qs");

const TOKEN_URL = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/token.json";

async function getImgbbKey() {
 try {
 const res = await axios.get(TOKEN_URL);
 return res.data.imgbb;
 } catch (err) {
 console.error("❌ Token load করতে সমস্যা হয়েছে:", err.message);
 return null;
 }
}

module.exports.config = {
 name: "imgbb",
 version: "1.0.2",
 hasPermission: 0,
 credits: "Joy Ahmed",
 description: "Upload image to imgbb and return link (API key loaded from GitHub)",
 prefix: true,
 commandCategory: "utility",
 usages: "reply to image",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
 try {
 const API_KEY = await getImgbbKey();
 if (!API_KEY) {
 return api.sendMessage("❌ API key লোড করতে সমস্যা হয়েছে।", event.threadID, event.messageID);
 }

 if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
 return api.sendMessage("⚠️ দয়া করে একটি ছবি reply করে কমান্ড দিন।", event.threadID, event.messageID);
 }

 const attachment = event.messageReply.attachments[0];
 if (attachment.type !== "photo") {
 return api.sendMessage("⚠️ শুধু ছবি টাইপ reply করলে কাজ করবে।", event.threadID, event.messageID);
 }

 const url = attachment.url;
 const fileName = `imgbb_${Date.now()}.jpg`;
 const filePath = __dirname + `/cache/${fileName}`;

 // Download image
 const response = await axios.get(url, { responseType: "arraybuffer" });
 fs.writeFileSync(filePath, response.data);

 // Convert to base64
 const imageBase64 = fs.readFileSync(filePath, { encoding: "base64" });

 // Upload to imgbb using urlencoded format
 const data = qs.stringify({
 key: API_KEY,
 image: imageBase64,
 });

 const imgbbRes = await axios.post("https://api.imgbb.com/1/upload", data, {
 headers: {
 "Content-Type": "application/x-www-form-urlencoded",
 },
 });

 fs.unlinkSync(filePath); // delete after upload

 if (imgbbRes.data && imgbbRes.data.data && imgbbRes.data.data.url) {
 return api.sendMessage(`✅ ইমেজ আপলোড হয়েছে:\n🔗 ${imgbbRes.data.data.url}`, event.threadID, event.messageID);
 } else {
 console.log("imgbb response:", imgbbRes.data);
 return api.sendMessage("❌ ইমেজ আপলোডে সমস্যা হয়েছে।", event.threadID, event.messageID);
 }
 } catch (err) {
 console.error("❌ ERROR:", err);
 return api.sendMessage("❌ কিছু একটা ভুল হয়েছে:\n" + err.message, event.threadID, event.messageID);
 }
};