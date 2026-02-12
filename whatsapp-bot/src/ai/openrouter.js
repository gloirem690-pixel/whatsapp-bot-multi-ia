const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Envoie une requête à OpenRouter
 * @param {string} prompt - La question posée
 * @param {string} model - Le modèle souhaité (ex: 'openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'google/gemini-pro')
 * @returns {Promise<string>} - La réponse du modèle
 */
async function askOpenRouter(prompt, model = 'openai/gpt-3.5-turbo') {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: model,
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Erreur OpenRouter:', error.response?.data || error.message);
        throw new Error('Échec de la requête à l’IA.');
    }
}

module.exports = { askOpenRouter };