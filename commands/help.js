const Discord = require("discord.js")
const botconfig = require("../config.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor(colors.blue)
            .setAuthor(`Bot intergu HELP`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHembed);
    }}
    if(!args[0]) {
        if(message.member.hasPermission("MANAGE_ROLES") || message.guild.owner) {
            let uEmbed = new Discord.RichEmbed()
                .setColor(colors.blue)
                .setTitle("Help")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`These are the avaliable commands:`)
                .addField(`Commands:`, "``ban``\n ``cornumollu``\n ``help``\n ``kick``\n ``kitsune``\n ``moonlight``\n ``mute``\n ``nickname``\n ``noarnaknonoob``\n ``ping``\n ``profile``\n  ``purge``\n ``reload``\n ``removerole``\n ``serverinfo``\n ``shutdown``\n ``softban``\n ``status``\n ``unban``\n ``unmute``\n ``userinfo``")
                .addField("To get more information about a command, use: ", "`!help [command_name]`")
            message.channel.send({embed: uEmbed});
        } else {
            let uEmbed = new Discord.RichEmbed()
                .setColor(colors.blue)
                .setTitle("Help")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`These are the avaliable commands:`)
                .addField(`Commands:`, "``help``\n ``ping``\n ``serverinfo``\n ``userinfo``")
                .addField("To get more information about a command, use: ", "`!help [command_name]`")
            message.channel.send({embed: uEmbed});
        }
    }
}

module.exports.config = {
    name: "help",
    description: "Show information about commands!",
    usage: "!help",
    accessableby: "Members",
    aliases: ["h"]
}
