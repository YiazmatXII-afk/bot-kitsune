const Discord = require("discord.js");
const botconfig = require("../config.json");
const colors = require("../colors.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("I don't have permission to add roles!")

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return message.channel.send("Please supply a user to be muted!");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if(!muterole) {
        try{
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#514f48",
                permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }}

    mutee.addRole(muterole.id).then(() => {
        message.delete()
        mutee.send(`Hello, you have been in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
        message.channel.send(`${mutee.user.username} was successfully muted.`)
    })

    let embed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "mute")
        .addField("Mutee:", mutee.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "modlogs")
        sChannel.send(embed)
}

module.exports.config = {
    name: "mute",
    description: "Mutes a member in the discord!",
    usage: "!mute <@user_mention> <reason>",
    accessableby: "Admin",
    aliases: ["m"]
}
