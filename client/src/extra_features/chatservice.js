import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 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`,
  },
});

export const getChatbotResponse = async (message) => {
  try {
    const response = await api.post('/completions', {
      model: "text-davinci-003",
      prompt: message, 
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error fetching response:', error);
    return 'Sorry, an error occurred.';
  }
};