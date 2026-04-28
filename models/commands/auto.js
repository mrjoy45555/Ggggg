const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { downloadVideo } = require("joy-video-downloader");

module.exports.config = {
  name: "auto",
  version: "0.0.3",
  hasPermission: 0,
  prefix: false, // ✅ noprefix
  credits: "Joy",
  description: "Auto video download from any link",
  commandCategory: "user",
  cooldowns: 3,
};

// auto trigger on every message
module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body || "";

    // শুধু https link ধরবে
    if (!body.match(/^https?:\/\//)) return;

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    const filePath = path.join(cacheDir, `auto_${Date.now()}.mp4`);

    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    const data = await downloadVideo(body, filePath);

    if (!data || !data.title) {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      return api.sendMessage(
        "❌ Video download kora jacche na!",
        event.threadID,
        event.messageID
      );
    }

    api.setMessageReaction("✅", event.messageID, () => {}, true);

    return api.sendMessage(
      {
        body: `🎬 TITLE: ${data.title}`,
        attachment: fs.createReadStream(data.filePath),
      },
      event.threadID,
      () => fs.unlinkSync(data.filePath),
      event.messageID
    );

  } catch (err) {
    console.error(err);
    return api.sendMessage(
      "❌ Video download e problem hocche!",
      event.threadID,
      event.messageID
    );
  }
};

// no manual command needed
module.exports.run = async function () {};