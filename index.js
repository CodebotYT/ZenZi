const discord = require('discord.js');
const config = require('./json/config.json');
const roles = require('./json/roles.json');
const db = require('quick.db');
const fs = require("fs");
const bot = new discord.Client({partials: ["MESSAGE","CHANNEL","REACTION", "GUILD_MEMBER"]});

bot.on('guildMemberAdd', member =>{
  var guild = bot.guilds.cache.get('766734351235809320')
  var members = guild.memberCount
  var channel = guild.channels.cache.get('767329346884730920')
  channel.setName(`Members: ${members}`)
  const welcomechannel = member.guild.channels.cache.find(channel => channel.name === "📚member-log")
  welcomechannel.send(`:ringed_planet: Welcome ${member} to Visual's server We now have ${members} members`)

})

bot.on('guildMemberRemove', member =>{
  var guild = bot.guilds.cache.get('766734351235809320')
  var members = guild.memberCount
  var channel = guild.channels.cache.get('767329346884730920')
  channel.setName(`Members: ${members}`)
  const welcomechannel = member.guild.channels.cache.find(channel => channel.name === "📚member-log")
  welcomechannel.send(`:ringed_planet: ${member} Just left we are now at ${members} members`)
})

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});
})

bot.on("ready", async () => {
  var guild = bot.guilds.cache.get('766734351235809320')
  var members = guild.memberCount
  var channel = guild.channels.cache.get('767329346884730920')
  channel.setName(`Members: ${members}`)
    console.log(`${bot.user.tag} is online`);
        bot.user.setActivity(`ZenZi's Youtube`, { type: "WATCHING"});
    
    
    bot.on("message", async message => {
      

      if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) {
        message.delete()
          .then(message.channel.send('We think you sent a invite link please dont'))
      }
      const badwordlist = require('./json/badwords.json');

if (
    badwordlist.some((word) => message.content.toLowerCase().includes(word))
  ) {
    message.delete();
    message.reply('You cant swear here')
  }

      if(message.channel.type === "dm") return;
      let prefix = config.Prefix
      if(!message.content.startsWith(prefix) || message.author.bot) return;
      let messageArray = message.content.split(" ");
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase();
      let commandfile;
  
      if (bot.commands.has(cmd)) {
        commandfile = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
      commandfile = bot.commands.get(bot.aliases.get(cmd));
    }
    
  
  
            
    try {
      commandfile.run(bot, message, args);
    
    } catch (e) {
    }}
)})

bot.login(config.token)