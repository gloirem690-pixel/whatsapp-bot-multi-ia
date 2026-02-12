const { register } = require('./handler');

register('aide', async (sock, msg, chat) => {
    await sock.sendMessage(chat, {
        text: `🤖 *Bot Multi‑IA (OpenRouter)*\n\n` +
              `*Commandes :*\n` +
              `!aide – Affiche ce message\n` +
              `!ia <question> – GPT‑3.5 Turbo\n` +
              `!ia gpt4 <question> – GPT‑4\n` +
              `!ia claude <question> – Claude 3 Haiku\n` +
              `!ia gemini <question> – Gemini Pro\n` +
              `(d'autres modèles sont disponibles)\n\n` +
              `🔧 Plus d’outils à venir !`
    });
});