const commands = new Map();

function register(name, handler) {
    commands.set(name, handler);
}

async function handleCommand(sock, msg, chat, sender, text) {
    if (!text.startsWith('!')) return;
    const args = text.slice(1).split(' ');
    const cmd = args.shift().toLowerCase();
    const handler = commands.get(cmd);
    if (handler) {
        try {
            await handler(sock, msg, chat, sender, args);
        } catch (e) {
            console.error(e);
            await sock.sendMessage(chat, { text: '❌ Erreur interne.' });
        }
    }
}

module.exports = { register, handleCommand };