const Discord = require("discord.js")
const botconfig = require("../config.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    let uEmbed = new Discord.RichEmbed()
        .setColor(colors.blue)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
        .addField("**Username:**", `${message.author.username}`, true)
        .addField("**Discriminator:**", `${message.author.discriminator}`, true)
        .addField("**ID:**", `${message.author.id}`, true)
        .addField("**Status:**", `${message.author.presence.status}`, true)
        .addField("**Created At:**", `${message.author.createdAt}`, true)
        .setFooter(`Bot interguilde`, bot.user.displayAvatarURL);

    message.channel.send({embed: uEmbed});
}

module.exports.config = {
    name: "userinfo",
    description: "Pulls the userinfo of yourself or a user!",
    usage: "!userinfo (@mention)",
    accessableby: "Members",
    aliases: ["ui"]
}
