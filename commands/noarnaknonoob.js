const Discord = require("discord.js")
const colours = require("../colors.json")

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Sorry, you dont have permission to perform this command!")

    let role = message.guild.roles.find(r => r.name === "No Arnak No Noob");
    let member = message.mentions.members.first();

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Sorry, I don't have permission to perform this command.")

    if(member.roles.has(role.id)) {
        return message.channel.send(`${member.displayName}, already has the role!`)
    } else {
        await member.addRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been added to ${member.displayName}.`)
    }

    let embed = new Discord.RichEmbed()
        .setColor(colours.green)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "noarnaknonoob")
        .addField("Mutee:", member.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "modlogs")
    sChannel.send(embed)
}

module.exports.config = {
    name: "noarnaknonoob",
    description: "Adds the role No Arnak No Noob to a member",
    usage: "!noarnaknonoob <(@mention)>",
    accessableby: "Admin",
    aliases: ["nann"]
}
