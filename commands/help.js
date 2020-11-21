const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../json/config.json");
const ytdl = require('ytdl-core')


module.exports.run = async (bot, message, args) => {
   var embed = new Discord.MessageEmbed()
   .setColor(`BLUE`)
   .setDescription(`**Basic Help **:ringed_planet:\n**Prefix :** ${config.Prefix}\n**Youtube :** https://www.youtube.com/channel/UCWIdWG9agm9OQvs1lDsdHLg\n**Get a custom role :** ${config.Prefix}addrole <role> (to get youtube updates do ${config.Prefix}addrole youtube)`)
   .setTitle(`${message.guild.name}`)
   .setFooter(`Requested by ${message.author.username}`)
   message.channel.send(embed)
}

module.exports.help = {
  name:"help",
  aliases: ["help"]
}
