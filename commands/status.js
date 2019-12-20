const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Sorry, you dont have permission to use this command.");

    if (!args[0]) return;
    let output = args.join(" ")
    bot.user.setActivity(output).catch(console.error);
}

module.exports.config = {
    name: "status",
    description: "Change the status of the Bot!",
    usage: "!status <New status>",
    accessableby: "Admin",
    aliases: []
}
