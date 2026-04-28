const axios = require("axios");
const yts = require("yt-search");
const fs = require("fs-extra");
const path = require("path");
const { downloadVideo } = require("joy-video-downloader"); 
// ⚠️ যদি audio downloader থাকে তাহলে সেটাই ব্যবহার করবি

module.exports.config = {
  name: "song",
  version: "1.0.0",
  credits: "Joy",
  hasPermission: 0,
  description: "Download audio from YouTube by song name",
  commandCategory: "media",
  usages: "song <name>",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args.length)
    return api.sendMessage("⚠️ গানের নাম দিন।", threadID, messageID);

  let query = args.join(" ");

  try {
    // YouTube search
    const search = await yts(query);
    if (!search || !search.videos.length)
      return api.sendMessage("❌ গান পাওয়া যায়নি।", threadID, messageID);

    const video = search.videos[0];
    const videoLink = video.url;

    api.setMessageReaction("⏳", messageID, () => {}, true);
    const loading = await api.sendMessage(
      "⏳ গান ডাউনলোড হচ্ছে, অপেক্ষা করুন...",
      threadID
    );

    // cache folder
    const cacheDir = path.resolve(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    // mp3 file path
    const filePath = path.join(cacheDir, `song_${Date.now()}.mp3`);

    // ⚠️ এখানে যদি তোমার lib audio support না করে,
    // তাহলে ytdl-core + ffmpeg লাগবে
    const data = await downloadVideo(videoLink, filePath);

    if (!data || !data.title) {
      api.unsendMessage(loading.messageID);
      api.setMessageReaction("❌", messageID, () => {}, true);
      return api.sendMessage("❌ গান ডাউনলোড হয়নি!", threadID, messageID);
    }

    const { title, filePath: savedPath } = data;

    api.setMessageReaction("✅", messageID, () => {}, true);
    api.unsendMessage(loading.messageID);

    return api.sendMessage(
      {
        body: `🎵 গান: ${title}\n✅ ডাউনলোড সম্পন্ন`,
        attachment: fs.createReadStream(savedPath),
      },
      threadID,
      () => {
        if (fs.existsSync(savedPath)) fs.unlinkSync(savedPath);
      },
      messageID
    );

  } catch (err) {
    console.error(err);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ গান ডাউনলোড করতে সমস্যা হয়েছে!", threadID, messageID);
  }
};