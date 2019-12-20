const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("Sorry, you don't have permission to perform this command!")

    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)
}

module.exports.config = {
    name: "reload",
    noalias: "No Aliases",
    description: "Reloads a bot command!",
    usage: "!reload <command>",
    accessableby: "Admin",
    aliases: []
}
