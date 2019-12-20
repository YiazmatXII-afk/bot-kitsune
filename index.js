const Discord = require('discord.js');
const config = require('./config.json');
const colors = require('./colors.json');
const superagent = require("superagent");
const fs = require("fs");

const bot = new Discord.Client();

bot.on('ready', function () {
      console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
});

bot.on('ready', function () {
    bot.user.setAvatar('./ressources/8tCqtXLI.jpg').catch(console.error);
    bot.user.setActivity('Chopper un Vulbis').catch(console.error);
});

bot.on("guildCreate", guild => {
  console.log(`Added to: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on("guildDelete", guild => {
  console.log(`Removed from: ${guild.name} (id: ${guild.id})`);
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix_user;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send("Bienvenue sur l'Alliance inter-guilde du serveur Ayuto " + member.displayName + "contacte un Administrateur pour te faire attribuer un rôle!")
    }).catch(console.error)
});

bot.login(process.env.BOT_TOKEN);
