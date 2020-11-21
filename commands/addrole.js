const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../json/config.json");
const roles = require('../json/roles.json');


module.exports.run = async (bot, message, args) => {
       try{
        if(!args[0]){message.channel.send("You need to inculed what role you want")}else{
          const rolelist = require('../json/rolenames.json');

        if (
            !rolelist.some((word) => message.content.toLowerCase().includes(word))
          ) {
            message.delete();
            message.reply('You cant get that role sorry')
          }else{
            let role = message.guild.roles.cache.find(r => r.name === args[0]);
            message.member.roles.add(role).then(message.channel.send("Gave you the role :ringed_planet:"))
          }

        }
        

       }
  catch (error) {  
    message.channel.send("There was an error giving you the role :warning:")
    console.log(error)
}





}
module.exports.help = {
  name:"add role",
  aliases: ["addrole"]
}
