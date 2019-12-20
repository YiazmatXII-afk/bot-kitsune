const Discord = require("discord.js")
const botconfig = require("../config.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
        .setColor(colors.blue)
        .setTitle("ServerInfo")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Guild Count:**", `${message.guild.memberCount}`, true)
        .addField("**Roles Count:**", `${message.guild.roles.size}`, true)
        .setFooter('Bot interguilde', bot.user.displayAvatarURL);
        message.channel.send({embed: sEmbed});
}

module.exports.config = {
    name: "serverinfo",
    description: "Pulls the serverinfo of the guild!",
    usage: "!serverinfo",
    accessableby: "Members",
    aliases: ["si"]
}
