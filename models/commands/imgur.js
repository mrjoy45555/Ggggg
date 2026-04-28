module.exports.config = {
  name: "imgur",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "JOY",
  description: "Create an Imgur link from an image",
  commandCategory: "other", 
  usages: "[reply with image or provide image URL]", 
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule['axios'];

  try {
    const apis = await axios.get('https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/api.json');
    const Joy = apis.data.imgur;

    let linkanh;

    if (event.messageReply && event.messageReply.attachments.length > 0) {
      linkanh = event.messageReply.attachments[0].url;
    } else if (args.length > 0) {
      linkanh = args.join(" ");
    }

    if (!linkanh) {
      return api.sendMessage(
        'আপনি যেই ছবিটাকে Imgur লিংক বানাতে চান, সেই ছবিটা "imgur" লিখে রিপ্লাই করুন অথবা লিংক দিন।',
        event.threadID,
        event.messageID
      );
    }

    const res = await axios.get(`${Joy}/imgur?link=${encodeURIComponent(linkanh)}`); 
    const img = res.data.uploaded?.image;

    if (!img) {
      return api.sendMessage("Imgur লিংক তৈরি করা যায়নি। দয়া করে আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }

    return api.sendMessage(img, event.threadID, event.messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("একটি ত্রুটি ঘটেছে। দয়া করে পরে আবার চেষ্টা করুন।", event.threadID, event.messageID);
  }
};
