const Discord = require("discord.js")
const botconfig = require("../config.json");


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("Sorry, you don't have permission to perform this command!")

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
}

module.exports.config = {
    name: "shutdown",
    description: "Shuts down the bot!",
    usage: "!shutdown",
    accessableby: "Admin",
    aliases: ["botstop"]
}
