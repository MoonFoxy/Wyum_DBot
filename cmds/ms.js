//Завершено

const Minesweeper = require('discord.js-minesweeper')

exports.run = async (client, message, args) => {
    let config = require('../config.json');
    let lang = require(`../lang_${client.lang}.json`);
    let evaled = eval('`' + lang.ms + '`');
    let ntf = eval('`' + lang.ntf + '`');
    let msgs = evaled.split('<>');
    const minesweeper = new Minesweeper();
    client.send(`${msgs[0]}!\n${minesweeper.start()}`);

}
exports.help = {
    name: 'ms',
    aliases: ["сапер", 'взорвать', 'теракт', 'minesweeper']
}