const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/fortune', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Write a wise fortune cookie saying:',
      temperature: 0.7,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.json({ fortune: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the fortune.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
