const Discord = require("discord.js")
const botconfig = require("../config.json");
const colors = require("../colors.json");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("I don't have permission to add roles!")

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return message.channel.send("Please supply a user to be muted!");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if(!muterole) return message.channel.send("There is no mute role to remove!")

    mutee.removeRole(muterole.id).then(() => {
        message.delete()
        mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
        message.channel.send(`${mutee.user.username} was unmuted!`)
    })

    let embed = new Discord.RichEmbed()
        .setColor(colors.green)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unmute")
        .addField("Mutee:", mutee.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "modlogs")
    sChannel.send(embed)
}

module.exports.config = {
    name: "unmute",
    description: "Unmutes a member in the discord!",
    usage: "!unmute <@user_mention> <reason>",
    accessableby: "Admin",
    aliases: ["unm"]
}
