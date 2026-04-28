module.exports.config = {
 name: "\n",
 version: "4.0.0",
 hasPermission: 0,
 credits: "Joy",
 description: "Crush video with caption (API from GitHub)",
 prefix: true,
 commandCategory: "user",
 cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
 const axios = require("axios");
 const request = require("request");
 const fs = require("fs-extra");
 const path = require("path");


 const captions = [
 "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n🐰🍒শী্ঁত্ঁ শী্ঁত্ঁ ভা্ঁব্ঁ কি্ঁসে্ঁর্ঁ জা্ঁনি্ঁ এ্ঁক্ঁটা্ঁ অ্ঁভা্ঁব্ঁ_🙊🙈\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 ",
" === 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n--ღღ🦋🖤✨-\n\n--𝐋𝐨𝐯𝐞 𝐢'𝐬 𝐁𝐞𝐚𝐮𝐭𝐢𝐟𝐮𝐥 __☺️🦋✨\n\n--𝐥𝐟 𝐭𝐡𝐞 𝐥𝐨𝐯𝐞𝐝 𝐨𝐧𝐞 𝐢𝐬 𝐫𝐢𝐠𝐡𝐭..!🦋🍁💫\n\n-ভালোবাসা সুন্দর ___,🖤🦋\n\n- যদি প্রিয় মানুষটি সঠিক হয়....!☺️🖤🙂✨🌼\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 ",
"___=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n❥◎⃝! শূন্যতায় ভাসি🙃 \n\n❥কখনো হাসি -😁💚_আবার কাঁদি!-😅\n\n❥বেলা শেষে 🌌শূন্যতায় জড়িয়ে ও পূর্ণতা খুঁজি😊❤\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖--𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n ❥»̶̶͓͓͓̽̽̽⑅⃝✺❥᭄❥\n\n___💚__পৃথিবীটা আজ...\n\nমিথ্যে মায়াতে ভরা...!💚🌺\n\n____🥀_তাই তো পৃথীবীর মানুষ আজ....!\n\nঅভিনয়ের সেরা...👎🥀\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n💜🔐🌈 ___\n\n- 𝗧𝗵𝗶𝘀 𝗮𝗯𝗼𝘂𝘁 𝗹𝗶𝗻𝗲-!! 😽🧡✨\n\n🍁_সবাই তো খুশি চায়_আর আমি প্রতিটা খুশিতে তোমাকে চাই⚜️— -!!-) 😊🖤\n\n___💜🔐🌈\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n>🐰✨𝑻𝒉𝒊𝒔 𝒍𝒊𝒏𝒆 𝒊𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖🖤🌸\n\n___চোখের দেখায় নয়,মনের দেখায় ভালবাসি!!😇✨\n\n- কাছে থাকো কিংবা দূরে,তোমাকে ভেবেই হাসি!!🖤🐰\n\n💖🦋\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n:༅༎💙🦋\n༆𝐓𝐡𝐢𝐬 𝐚𝐛𝐨𝐮𝐭 𝐥𝐢𝐧𝐞_⚠︎🙅🏻‍♂️✨\n\n😽︵۵মানুষ! হচ্ছে!বৃষ্টির!মতো!Life a ! অনেক মানুষ !আসবে!অনেক মানুষ !যাবে!💔🥰\n\n:༅༎💙🦋 সঠিক!মানুষটা!ঠিকই!ছায়া!হয়ে!পাশে!থাকবে -/ ఌ︵💚🌻\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n:(-𝙄 𝙖𝙢 𝘼𝙙𝙙𝙞𝙘𝙩𝙚𝙙 𝙏𝙤👀🙈\n\n_')𝙈𝙮 𝙁𝙖𝙫𝙤𝙧𝙞𝙩𝙚 𝙋𝙚𝙧𝙨𝙤𝙣..!\n\n🐰🦋 -(^আমি আমার প্রিয় মানুষটার প্রতি আসক্ত >!💖🔐🍭)😇\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",

"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n𝙗𝙚𝙡𝙞𝙚𝙫𝙚 𝙩𝙝𝙞𝙨 𝙡𝙞𝙣𝙚-!!🦋🐭\n\n🐰' —'পারফেক্ট' কাউকে পাবার থেকে'কাউকে' পারফেক্ট' বানিয়ে নিতে পারাটা' বড় অর্জন'--)🌼💜\n\n___🍒🖇️✨___\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",
"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n°🐹💙🍒\n\n_𝗧𝗿𝘂𝘀𝘁 𝗺e 🔐💚\n°\n\n__!!☁️✨🌺আপনাকে পাওয়ার দাবি!আমি মৃত্যুর পরও ছাড়বো না,,🔐💚 🙂\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘",

"=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n --❖-- 𝐌𝐃 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘 --❖--\n✢━━━━━━━━━━━━━━━✢\n\n__𝗥𝗶𝗴𝗵𝘁 𝗽𝗲𝗼𝗽𝗹𝗲 𝗮𝗿𝗲 𝗮𝗹𝘄𝗮𝘆𝗲𝘀 𝗮𝗻𝗴𝗿𝘆 𝗯𝗲𝗰𝗮𝘂𝘀𝗲 𝘁𝗵𝗲𝘆 𝗰𝗮𝗻'𝘁 𝘀𝘁𝗮𝗻𝗱 𝘆𝗼𝘂 𝘄𝗶𝘁𝗵 𝗼𝘁𝗵𝗲𝗿𝘀🌸✨\n\n___সঠিক মানুষ সব সময়ই রাগি হয়'\n\nকারণ তারা অন্যের সাথে তোমাকে সহ্য করতে পারবে নাহ্!😌🫶🖤\n\n✢━━━━━━━━━━━━━━━✢\n\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝐊𝐈𝐍𝐆 _ 𝐉𝐔𝐁𝐀𝐄𝐃 𝐀𝐇𝐌𝐌𝐄𝐃 𝐉𝐎𝐘"
 ];
 const caption = captions[Math.floor(Math.random() * captions.length)];

 try {

 const apiRes = await axios.get("https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/api.json");
 const apiData = apiRes.data;

 if (!apiData.joy11) {
 return api.sendMessage("❌ API link not found in JSON", event.threadID, event.messageID);
 }

 const baseUrl = apiData.joy11; // এইখানেই API base URL
 const apiUrl = `${baseUrl}/random?JOY=crush`;


 const res = await axios.get(apiUrl);
 const videoUrl = res.data; // সরাসরি mp4 link

 if (!videoUrl) {
 return api.sendMessage("❌ API did not return video link", event.threadID, event.messageID);
 }


 const cacheFolder = path.join(__dirname, "cache");
 if (!fs.existsSync(cacheFolder)) fs.mkdirSync(cacheFolder);

 const cachePath = path.join(cacheFolder, "crush.mp4");


 const sendVideo = () => {
 api.sendMessage(
 {
 body: caption,
 attachment: fs.createReadStream(cachePath)
 },
 event.threadID,
 () => fs.unlinkSync(cachePath),
 event.messageID
 );
 };


 return request(videoUrl)
 .pipe(fs.createWriteStream(cachePath))
 .on("close", sendVideo)
 .on("error", () => {
 api.sendMessage("❌ Video download failed", event.threadID, event.messageID);
 });

 } catch (err) {
 console.error(err);
 return api.sendMessage("❌ API error", event.threadID, event.messageID);
 }
};