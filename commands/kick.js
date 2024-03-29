const Discord = require("discord.js")
const botconfig = require("../config.json");
const colours = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sorry, you dont have permission to perform this command!")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!kickMember) return message.channel.send("Please provide a user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS"])) return message.channel.send("Sorry, I dont have permission to do this!")

    kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() =>
    kickMember.kick()).catch(err => console.log(err))

    message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "kick")
        .addField("Mutee:", kickMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "modlogs")
    sChannel.send(embed)
}

module.exports.config = {
    name: "kick",
    description: "Kick a user from the guild!",
    usage: "!kick",
    accessableby: "Admin",
    aliases: ["k"]
}
