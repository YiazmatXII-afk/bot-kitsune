const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 1000) return message.reply("Please provide a number between 2 and 1000 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

module.exports.config = {
    name: "purge",
    noalias: "No Aliases",
    description: "Delete a designated number of message from the chanel",
    usage: "!purge <nbr of message> (min 2, max 1000)",
    accessableby: "Admin",
    aliases: []
}
