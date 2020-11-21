const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../json/config.json");

module.exports.run = async (bot, message, args) => {
    let message2 = await message.channel.send("Test")
    message2.react("1️⃣")
}

module.exports.help = {
  name:"role react",
  aliases: ["rolereact"]
}
