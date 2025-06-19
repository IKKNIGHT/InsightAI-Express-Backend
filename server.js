// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-feedback', async (req, res) => {
    const { essay } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek/deepseek-chat-v3-0324:free',
            messages: [{ role: 'user', content: `Give feedback on this essay (also put in a percent at the beginning which is the grade of the essay! for ex: 30% {feedback}): ${essay}` }]
        })
    });

    const data = await response.json();
    const feedback = data.choices?.[0]?.message?.content || "No feedback received";
    res.json({ feedback });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
