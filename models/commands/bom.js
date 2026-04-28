const axios = require("axios");

// 🌐 global running control
if (!global.runningBom) global.runningBom = {};

module.exports.config = {
  name: "bom",
  version: "6.0.0",
  hasPermission: 2, // 🔥 only bot admin
  credits: "Joy", // ⚠️ change korle off
  prefix: true,
  description: "BOM + STOP (admin only)",
  commandCategory: "fun",
  usages: ".bom <amount> | .bom <threadID> <amount> | .bom stop | .bom stop <threadID>",
  cooldowns: 5
};

// 🔒 CREDIT LOCK
if (module.exports.config.credits !== "Joy") {
  module.exports.run = () => {};
  return;
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  const bomURL1 = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/bom.json";
  const bomURL2 = "https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/main/bom2.json";

  // ================= STOP =================
  if (args[0] && args[0].toLowerCase() === "stop") {
    let targetThread = threadID;

    if (args[1] && !isNaN(args[1])) {
      targetThread = args[1];
    }

    if (!global.runningBom[targetThread]) {
      return api.sendMessage("⚠️ No BOM running in that thread!", threadID, messageID);
    }

    global.runningBom[targetThread] = false;

    return api.sendMessage(
      `🛑 BOM STOPPED\n🎯 Target: ${targetThread}`,
      threadID,
      messageID
    );
  }

  // ================= CHECK =================
  if (!args[0]) {
    return api.sendMessage(
      "⚠️ Usage:\n.bom <amount>\n.bom <threadID> <amount>\n.bom stop\n.bom stop <threadID>",
      threadID,
      messageID
    );
  }

  let targetThread;
  let amount;

  // .bom 10
  if (!isNaN(args[0]) && !args[1]) {
    targetThread = threadID;
    amount = parseInt(args[0]);
  }
  // .bom threadID amount
  else if (!isNaN(args[0]) && !isNaN(args[1])) {
    targetThread = args[0];
    amount = parseInt(args[1]);
  } else {
    return api.sendMessage("❌ Invalid format!", threadID, messageID);
  }

  // limit
  amount = Math.min(Math.max(amount, 1), 50);

  // already running
  if (global.runningBom[targetThread]) {
    return api.sendMessage("⚠️ Already running in this thread!", threadID, messageID);
  }

  global.runningBom[targetThread] = true;

  try {
    const [res1, res2] = await Promise.all([
      axios.get(bomURL1),
      axios.get(bomURL2)
    ]);

    const messages1 = Array.isArray(res1.data.message)
      ? res1.data.message
      : [res1.data.message || "💣 BOOM!"];

    const messages2 = Array.isArray(res2.data.message)
      ? res2.data.message
      : [res2.data.message || "💥 BOOM!"];

    api.sendMessage(
      `💣 BOM STARTED\n🎯 Target: ${targetThread}\n🔢 Amount: ${amount}`,
      threadID,
      messageID
    );

    for (let i = 0; i < amount; i++) {
      setTimeout(async () => {

        if (!global.runningBom[targetThread]) return;

        try {
          await api.sendMessage(
            messages1[i % messages1.length],
            targetThread
          );

          setTimeout(async () => {
            if (!global.runningBom[targetThread]) return;

            await api.sendMessage(
              messages2[i % messages2.length],
              targetThread
            );
          }, 800);

        } catch (e) {
          console.log("Error:", e);
        }

        // auto stop
        if (i === amount - 1) {
          global.runningBom[targetThread] = false;
        }

      }, i * 2000);
    }

  } catch (err) {
    console.error(err);
    global.runningBom[targetThread] = false;
    api.sendMessage("❌ Error loading BOM data!", threadID, messageID);
  }
};