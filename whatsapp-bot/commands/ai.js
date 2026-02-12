const { register } = require('./handler');
const { askOpenRouter } = require('../ai/openrouter');

register('ia', async (sock, msg, chat, sender, args) => {
    if (args.length === 0) {
        await sock.sendMessage(chat, { text: '❓ Utilisation : !ia <question> ou !ia [modèle] <question>' });
        return;
    }

    // Déterminer le modèle
    let model = 'openai/gpt-3.5-turbo'; // modèle par défaut
    let question = args.join(' ');

    const modeleIndique = args[0].toLowerCase();
    if (modeleIndique === 'gpt4' || modeleIndique === 'gpt-4') {
        model = 'openai/gpt-4';
        question = args.slice(1).join(' ');
    } else if (modeleIndique === 'claude') {
        model = 'anthropic/claude-3-haiku';
        question = args.slice(1).join(' ');
    } else if (modeleIndique === 'gemini') {
        model = 'google/gemini-pro';
        question = args.slice(1).join(' ');
    } else if (modeleIndique === 'mistral') {
        model = 'mistralai/mistral-7b-instruct';
        question = args.slice(1).join(' ');
    }

    if (!question) {
        await sock.sendMessage(chat, { text: '❓ Pose une question après le modèle.' });
        return;
    }

    await sock.sendMessage(chat, { text: `🧠 Je réfléchis avec ${model.split('/')[1]}...` });

    try {
        const reponse = await askOpenRouter(question, model);
        await sock.sendMessage(chat, { text: reponse });
    } catch (e) {
        await sock.sendMessage(chat, { text: '❌ Erreur avec l’IA. Vérifie ta clé OpenRouter.' });
    }
});