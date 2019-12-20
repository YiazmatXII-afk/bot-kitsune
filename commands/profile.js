const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")
    image = message.attachments.first().url;
        if (image != null) bot.user.setAvatar(image);
}

module.exports.config = {
    name: "profile",
    description: "Change the Avatar for the Bot interguilde",
    usage: "!profile <paste image>",
    accessableby: "Admin",
    aliases: ["p"]
}
