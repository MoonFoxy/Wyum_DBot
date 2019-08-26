const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        let config = require('../config.json');
        const args = message.content.split(" ").slice(1);

        if (message.content.startsWith(config.prefix + "eval")) {
            if (message.author.id !== config.admin) return;
            try {
                const code = args.join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }

    } catch (err) {
        let config = require('../config.json');
        let a = client.users.get(config.admin)
        let errEmb = new Discord.RichEmbed()
            .setTitle('Ошибка')
            .setColor('#ff2400')
            .addField(`**${err.name}**`, `**${err.message}**`)
            .setFooter(`Если ошибка не пропадает обратитесь к ${a.tag}`, client.user.avatarURL)
            .setTimestamp();
        message.channel.send(errEmb)
        console.log(err.stack)
    }

};
module.exports.help = {
    name: "eval",
    aliases: ['евал']
};