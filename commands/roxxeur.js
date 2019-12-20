const Discord = require("discord.js")
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Couché Médor!", {files: ["./ressources/skull.png", "./ressources/whip.png"]});
}

module.exports.config = {
    name: "roxxeur",
    noalias: "No Aliases",
    description: "Catchphrase from roxxeur",
    usage: "!roxxeur",
    accessableby: "Members",
    aliases: []
}
